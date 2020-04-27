const { TeamSpeak, TeamSpeakClient } = require('ts3-nodejs-library');
const log = require('../../utils/log.js');
const config = require('../../config/teamspeak');
const { spawn } = require('child_process');
const { getFiles, validatePlugin } = require('../../utils/files');
const { flatArray } = require('../../utils/array');
const { convertToMiliseconds } = require('../../utils/time');
const path = require('path');
const chokidar = require('chokidar');
const fs = require('fs');
const instance = process.env.INSTANCE;
const Ts3 = new TeamSpeak(instance ? Object.assign(config, config.instances[instance]) : config);
let initialized = false;

Ts3.plugins = new Map();

initEvents();

/**
 * Init events
 */
function initEvents() {
	Ts3.on('ready', onReady);
	Ts3.on('timeout', () => log.error('timeout', 'ts3'));
	Ts3.on('error', (err) => log.error(err, 'ts3'));
	Ts3.on('flooding', (err) => console.log('Flood protection activated', err.msg, err));
	if (config.debug) {
		Ts3.on('debug', (ev) => {
			const { type, data } = ev;
			if (type === 'send') log.debug(`>>> ${data}`, 'ts3');
			if (type === 'receive') {
				if (data.startsWith('error')) log.debug(`<<< ${data}`, 'ts3');
				log.debug(`<<< ${data.length}`, 'ts3');
			}
		});
	}
}

/**
 * On connection ready
 */
function onReady() {
	if (!initialized) {
		Promise.all([
			Ts3.useBySid(config.server_id || 1),
			Ts3.whoami().then((info) => {
				Ts3.clientMove(info.client_id, config.channel_id);
			})
		])
			.then(() => {
				subscribeEvents();
			})
			.catch((err) => {
				log.error(err, 'ts3');
			});
		initialized = true;
	}
}

/**
 * On connection ready, subscribe to events of ts3.
 */
function subscribeEvents() {
	Promise.all([
		Ts3.registerEvent('server'),
		Ts3.registerEvent('channel', 0),
		Ts3.registerEvent('textserver'),
		Ts3.registerEvent('textchannel'),
		Ts3.registerEvent('textprivate')
	])
		.then(() => {
			log.success('Subscribed to all Events', 'ts3');
			listenEvents();
		})
		.catch((error) => log.error(error));
}

/**
 * Listen events
 */
function listenEvents() {
	Ts3.on('close', async () => {
		log.error('disconnected, trying to reconnect...', 'ts3');
		Ts3.reconnect().catch(() => {});
		log.success('reconnected!', 'ts3');
		Promise.all([
			Ts3.registerEvent('server'),
			Ts3.registerEvent('channel', 0),
			Ts3.registerEvent('textserver'),
			Ts3.registerEvent('textchannel'),
			Ts3.registerEvent('textprivate')
		]).then(() => {
			log.success('Subscribed to all Events', 'ts3');
		});
	});
	beforeExit();
	instance ? loadPlugins() : loadInstances();
}

/**
 * Before exit
 */
function beforeExit() {
	process.on('SIGINT', () => {
		Ts3.quit();
		process.exit(1);
	});
}

/**
 * Load plugins
 */
function loadInstances() {
	let { instances } = config;
	Object.keys(instances).forEach(function (name) {
		spawn('node', ['index.js'], {
			env: {
				INSTANCE: name
			},
			cwd: process.cwd(),
			shell: true,
			stdio: 'inherit'
		});
	});
}

/**
 * Load plugins
 */
function loadPlugins() {
	getFiles(`./core/TeamSpeak/plugins/${instance}`)
		.then((files) => {
			let jsfiles = flatArray(files).filter((f) => f.split('.').pop() === 'js');
			jsfiles.forEach((file) => {
				try {
					let plugin = require(path.resolve(file));
					validatePlugin(plugin.info)
						.then(() => {
							if (plugin.info.config.enabled) {
								if (typeof plugin['load'] !== 'undefined') {
									plugin.load();
								}
								Ts3.plugins.set(plugin.info.name, plugin);
								log.info(`Loaded plugin ${plugin.info.name}`, 'ts3');
							}
						})
						.catch((err) => {
							log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, 'ts3');
						});
				} catch (err) {
					log.warn(`Issue loading plugin file ${file}:`, err.stack);
				}
			});
			[
				'clientconnect',
				'clientdisconnect',
				'tokenused',
				'textmessage',
				'clientmoved',
				'serveredit',
				'channeledit',
				'channelcreate',
				'channelmoved',
				'channeldelete'
			].forEach((value) => {
				Ts3.on(value, (ev) => {
					Ts3.plugins.forEach((plugin) => {
						if (typeof plugin[value] !== 'undefined') {
							plugin[value](ev);
						}
					});
				});
			});
		})
		.then(() => {
			watchPlugins();
		});
}

/**
 * Watch plugins
 */
function watchPlugins() {
	chokidar
		.watch(`./core/TeamSpeak/plugins/${instance}`, { ignoreInitial: true })
		.on('all', (event, file) => {
			let fileName = path.basename(file);
			let plugin = fileName.slice(0, -3);
			Ts3.plugins.delete(plugin);
			let cached = require.cache[require.resolve(path.resolve(file))];
			if (typeof cached.exports.unload !== 'undefined') {
				cached.exports.unload();
			}
			delete require.cache[require.resolve(path.resolve(file))];
			if (fs.existsSync(path.resolve(file))) {
				try {
					let plugin = require(path.resolve(file));
					validatePlugin(plugin.info)
						.then(() => {
							if (plugin.info.config.enabled) {
								if (typeof plugin['load'] !== 'undefined') {
									plugin.load();
								}
								Ts3.plugins.set(plugin.info.name, plugin);
								log.info(`Loaded plugin ${plugin.info.name}`, 'ts3');
							} else {
								if (typeof plugin['unload'] !== 'undefined') {
									plugin.unload();
								}
								log.info(`Unloaded plugin ${plugin.info.name}`, 'ts3');
							}
						})
						.catch((err) => {
							log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, 'ts3');
						});
				} catch (err) {
					log.warn(`Issue loading plugin file ${fileName}:`, err.stack);
				}
			} else {
				log.info(`Detected removal of plugin ${fileName}, unloading.`);
			}
		});
}

/**
 * Check if the client is AFK
 * @param {object} minTime the min time to to consider client is afk
 * @returns {boolean} true/false
 */
TeamSpeakClient.prototype.isAfk = function (minTime) {
	return (
		this.idleTime > convertToMiliseconds(minTime) &&
		(this.outputMuted === 1 || this.away === 1 || this.inputMuted === 1)
	);
};

module.exports = Ts3;
