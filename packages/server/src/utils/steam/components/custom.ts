import { steamUser } from '@core/Steam';
import SteamUser from 'steam-user';
import { getFiles, validateGame } from '@utils/files';
import log from '@utils/log';
import { flattenArray } from '@utils/array';
import path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

/**
 * Load SteamSpeak steam games
 */
SteamUser.prototype.loadGames = async function (): Promise<void> {
	getFiles(path.join(__dirname, '../../../core/Steam/games')).then((files) => {
		const jsfiles = flattenArray(files).filter((f) => f.split('.').pop() === 'ts');
		jsfiles.forEach((file) => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const game = require(path.resolve(file));
				validateGame(game.info)
					.then(() => {
						if (game.info.config.enabled) {
							if (typeof game['load'] !== 'undefined') {
								game.load();
							}
							steamUser.games.set(game.info.appId, game);
							log.info(`Loaded game ${game.info.name}.`, 'steam');
						} else {
							log.info(`${game.info.name} disabled. Skipping`, 'steam');
						}
					})
					.catch((err) => {
						log.error(`Invalid ${game.info.name} config: ${err.message}. Skipping`, 'steam');
					});
			} catch (err) {
				log.warn(`Issue loading game file ${file}: ${err.message}`, 'steam');
			}
		});
	});
};

/**
 * Load SteamSpeak steam modules
 */
SteamUser.prototype.loadModules = async function (): Promise<void> {
	getFiles(path.join(__dirname, '../../../core/Steam/modules/')).then((files) => {
		const jsfiles = flattenArray(files).filter((f) => f.split('.').pop() === 'ts');
		jsfiles.forEach((file) => {
			try {
				require(path.resolve(file));
				log.info(`Loaded module ${path.basename(file, '.ts')}.`, 'steam');
			} catch (err) {
				log.warn(`Issue loading module file ${file}: ${err.message}`, 'steam');
			}
		});
	});
};

/**
 * Watch SteamSpeak steam games
 */
SteamUser.prototype.watchGames = function (): void {
	chokidar
		.watch(path.join(__dirname, '../../../core/Steam/games'), { ignoreInitial: true })
		.on('all', (event, file) => {
			const fileName = path.basename(file);
			const game = fileName.slice(0, -3);
			steamUser.games.delete(game);
			const cached = require.cache[require.resolve(path.resolve(file))];
			if (typeof cached?.exports.unload !== 'undefined') {
				cached.exports.unload();
			}
			if (fs.existsSync(path.resolve(file))) {
				try {
					delete require.cache[require.resolve(path.resolve(file))];
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					const game = require(path.resolve(file));
					validateGame(game.info)
						.then(() => {
							if (game.info.config.enabled) {
								if (typeof game['load'] !== 'undefined') {
									game.load();
								}
								steamUser.games.set(game.info.appId, game);
								log.info(`Loaded game ${game.info.name}`, 'steam');
							} else {
								if (typeof game['unload'] !== 'undefined') {
									game.unload();
								}
								log.info(`Unloaded game ${game.info.name}`, 'steam');
							}
						})
						.catch((err) => {
							log.error(`Invalid ${game.info.name} config: ${err.message}. Skipping`, 'steam');
						});
				} catch (err) {
					if (err.message.includes("Cannot find module '@core/Steam'")) return;
					log.warn(`Issue loading game file ${fileName}: ${err.message}`, 'steam');
				}
			} else {
				log.info(`Detected removal of game ${fileName}, unloading.`);
			}
		});
};

/**
 * SteamSteak games
 */
SteamUser.prototype.games = new Map();
