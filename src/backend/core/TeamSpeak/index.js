const { TeamSpeak } = require('ts3-nodejs-library');
const log = require('../../utils/log.js');
const config = require('../../config/teamspeak');
const { getFiles, validatePlugin } = require('../../utils/files');
const { flatArray } = require('../../utils/array');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const Ts3 = new TeamSpeak({
	protocol: 'ssh',
	host: config.ip,
	queryport: config.query_port,
	serverport: config.port,
	username: config.login,
	password: config.password,
	nickname: config.name,
	antispam: true,
	antispamtimer: 350
});
Ts3.plugins = new Map();

initEvents();

function initEvents() {
	Ts3.on('ready', onReady);
	Ts3.on('timeout', () => log.error('timeout', 'ts3'));
	Ts3.on('error', (err) => log.error(err, 'ts3'));
	Ts3.on('flooding', (err) => console.log('Flood protection activated', err.msg));
	if (config.debug) {
		Ts3.on('debug', (ev) => {
			if (ev.type === 'send') log.debug(`>>> ${ev.data}`, 'ts3');
			if (ev.type === 'receive') {
				if (ev.data.startsWith('error')) log.debug(`<<< ${ev.data}`, 'ts3');
				log.debug(`<<< ${ev.data.length}`, 'ts3');
			}
		});
	}
}

function onReady() {
	Ts3.useBySid(config.server_id)
		.then(() => {
			log.success(`Selected Server Nº ${config.server_id}.`, 'ts3');
			Ts3.whoami()
				.then((info) => {
					if (info.client_channel_id !== config.channel_id) {
						Ts3.clientMove(info.client_id, config.channel_id).catch((error) => {
							log.error(error, 'ts3');
						});
					}
				})
				.then(() => subscribeEvents());
		})
		.catch((err) => {
			log.error(err);
		});
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
	Ts3.on('close', () => {
		log.error('Connection has been closed!', 'ts3');
	});
	beforeExit();
	loadPlugins();
}

/**
 * Before exit
 */
function beforeExit() {
	process.on('SIGINT', () => {
		Ts3.quit();
		process.exit();
	});
}

/**
 * Load plugins
 */
function loadPlugins() {
	getFiles('./core/TeamSpeak/plugins/')
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

function watchPlugins() {
	chokidar.watch('./core/TeamSpeak/plugins/', { ignoreInitial: true }).on('all', (event, file) => {
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

module.exports = Ts3;
