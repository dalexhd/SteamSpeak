import { spawn } from 'child_process';
import { getFiles, validatePlugin } from '@utils/files';
import { flattenArray } from '@utils/array';
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import log from '@utils/log';
import { TeamSpeak } from 'ts3-nodejs-library';
import config from '@config/teamspeak';
import { Ts3 } from '@core/TeamSpeak';

const instance = process.env.INSTANCE;

TeamSpeak.prototype.loadInstances = function (): void {
	const { instances } = config;
	Object.keys(instances).forEach(function (name) {
		if (instances[name].enabled) {
			spawn(
				`ts-node -r tsconfig-paths/register ${path.join(
					__dirname,
					'../../../core/TeamSpeak/index.ts'
				)}`,
				['--trace-warnings'],
				{
					env: {
						INSTANCE: name,
						PATH: process.env.PATH,
						TS_NODE_FILES: 'true',
						NODE_ENV: process.env.NODE_ENV
					},
					cwd: process.cwd(),
					shell: true,
					stdio: 'inherit'
				}
			);
		} else {
			log.warn(`Instance ${name} is disabled. Skipping...`, { type: 'ts3' });
		}
	});
};

TeamSpeak.prototype.loadPlugins = async function (): Promise<void> {
	getFiles(path.join(__dirname, `../../../core/TeamSpeak/plugins/${instance}`)).then((files) => {
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
							log.info(`Loaded plugin ${plugin.info.name}`, { type: 'ts3' });
						} else {
							log.info(`${plugin.info.name} disabled. Skipping`, { type: 'ts3' });
						}
					})
					.catch((err) => {
						log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, {
							type: 'ts3'
						});
					});
			} catch (err) {
				log.error(`Issue loading plugin file ${file}: ${err.message}`, { type: 'ts3' });
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
		log.success('Subscribed to all Events.', { type: 'ts3' });
	});
};

TeamSpeak.prototype.watchPlugins = async function (): Promise<void> {
	chokidar
		.watch(path.join(__dirname, `../../../core/TeamSpeak/plugins/${instance}`), {
			ignoreInitial: true
		})
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
								log.info(`Loaded plugin ${plugin.info.name}`, { type: 'ts3' });
							} else {
								if (typeof plugin['unload'] !== 'undefined') {
									plugin.unload();
								}
								Ts3.plugins.delete(plugin.info.name);
								log.info(`Unloaded plugin ${plugin.info.name}`, { type: 'ts3' });
							}
						})
						.catch((err) => {
							log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, {
								type: 'ts3'
							});
						});
				} catch (err) {
					if (err.message.includes("Cannot find module '@core/TeamSpeak'")) return;
					log.warn(`Issue loading plugin file ${fileName}: ${err.message}`, { type: 'ts3' });
				}
			} else {
				log.info(`Detected removal of plugin ${fileName}, unloading.`);
			}
		});
};

TeamSpeak.prototype.plugins = new Map();
