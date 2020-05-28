import { TeamSpeak, TeamSpeakClient } from 'ts3-nodejs-library';
import config from '@config/teamspeak';
import '@utils/string';
import '@utils/teamspeak';
import { spawn } from 'child_process';
import { getFiles, validatePlugin } from '@utils/files';
import { flattenArray } from '@utils/array';
import log from '@utils/log';
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';

const instance = process.env.INSTANCE;

const Ts3 = new TeamSpeak(instance ? Object.assign(config, config.instances[instance]) : config);
let initialized = false;

Ts3.plugins = new Map();

initEvents();

/**
 * Init events
 */
function initEvents(): void {
	Ts3.on('ready', onReady);
	Ts3.on('error', (err) => log.error(err.message, 'ts3'));
	Ts3.on('flooding', (err) => console.log('Flood protection activated', err.message));
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
function onReady(): void {
	if (!initialized) {
		Promise.all([
			Ts3.useBySid(config.server_id || 1),
			Ts3.whoami().then((info) => {
				config.channel_id !== 1 && Ts3.clientMove(info.client_id, config.channel_id);
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
function subscribeEvents(): void {
	Promise.all([
		Ts3.registerEvent('server'),
		Ts3.registerEvent('channel', 0),
		Ts3.registerEvent('textserver'),
		Ts3.registerEvent('textchannel'),
		Ts3.registerEvent('textprivate')
	])
		.then(() => {
			log.success('Subscribed to all Events.', 'ts3');
			listenEvents();
		})
		.catch((error) => log.error(error));
}

/**
 * Listen events
 */
function listenEvents(): void {
	Ts3.on('close', async () => {
		log.error('disconnected, trying to reconnect...', 'ts3');
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		Ts3.reconnect().catch(() => {});
		log.success('reconnected!', 'ts3');
		Promise.all([
			Ts3.registerEvent('server'),
			Ts3.registerEvent('channel', 0),
			Ts3.registerEvent('textserver'),
			Ts3.registerEvent('textchannel'),
			Ts3.registerEvent('textprivate')
		]).then(() => {
			log.success('Subscribed to all Events.', 'ts3');
		});
	});
	beforeExit();
	instance ? loadPlugins() : loadInstances();
}

/**
 * Before exit
 */
function beforeExit(): void {
	process.on('SIGINT', () => {
		Ts3.quit();
		process.exit(1);
	});
}

/**
 * Load plugins
 */
function loadInstances(): void {
	const { instances } = config;
	Object.keys(instances).forEach(function (name) {
		if (instances[name].enabled) {
			spawn(`ts-node -r tsconfig-paths/register ${__dirname}/index.ts`, ['--trace-warnings'], {
				env: {
					INSTANCE: name,
					PATH: process.env.PATH,
					TS_NODE_FILES: 'true',
					NODE_ENV: 'production'
				},
				cwd: process.cwd(),
				shell: true,
				stdio: 'inherit'
			});
		} else {
			log.warn(`Instance ${name} is disabled. Skipping...`, 'ts3');
		}
	});
}

/**
 * Load plugins
 */
function loadPlugins(): void {
	getFiles(`${__dirname}/plugins/${instance}`)
		.then((files) => {
			const jsfiles = flattenArray(files).filter((f) => f.split('.').pop() === 'ts');
			jsfiles.forEach((file) => {
				try {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					const plugin = require(path.resolve(file));
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
					log.error(`Issue loading plugin file ${file}: ${err.message}`, 'ts3');
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
			].forEach((value: any) => {
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
function watchPlugins(): void {
	chokidar
		.watch(`${__dirname}/plugins/${instance}`, { ignoreInitial: true })
		.on('all', (event, file) => {
			const fileName = path.basename(file);
			const plugin = fileName.slice(0, -3);
			Ts3.plugins.delete(plugin);
			const cached = require.cache[require.resolve(path.resolve(file))];
			if (typeof cached?.exports.unload !== 'undefined') {
				cached.exports.unload();
			}
			if (fs.existsSync(path.resolve(file))) {
				try {
					delete require.cache[require.resolve(path.resolve(file))];
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					const plugin = require(path.resolve(file));
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
								Ts3.plugins.delete(plugin.info.name);
								log.info(`Unloaded plugin ${plugin.info.name}`, 'ts3');
							}
						})
						.catch((err) => {
							log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, 'ts3');
						});
				} catch (err) {
					if (err.message.includes("Cannot find module '@core/TeamSpeak'")) return;
					log.warn(`Issue loading plugin file ${fileName}: ${err.message}`, 'ts3');
				}
			} else {
				log.info(`Detected removal of plugin ${fileName}, unloading.`);
			}
		});
}

export { Ts3, TeamSpeakClient };
