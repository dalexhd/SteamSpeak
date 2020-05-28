import SteamTotp from 'steam-totp';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import log from '@utils/log';
import config from '@config/steam';
import { getFiles, validateGame } from '@utils/files';
import { flattenArray } from '@utils/array';
import VerifiedClient from '@core/Database/models/verifiedClient';
import * as path from 'path';
import * as chokidar from 'chokidar';
import { Ts3 } from '@core/TeamSpeak';
import * as fs from 'fs';

const steamUser = new SteamUser({
	language: config.language || 'english'
});

steamUser.games = new Map();
steamUser.setOption('debug', config.debug || false);
steamUser.setOption('enablePicsCache', true);

const community = new SteamCommunity();

steamUser.logOn({
	accountName: config.username,
	password: config.password,
	...(config.shared_secret !== '' && { twoFactorCode: SteamTotp.getAuthCode(config.shared_secret) })
});

steamUser.once('loggedOn', function () {
	log.success('logged in.', 'steam');
	const { Online, Invisible } = SteamUser.EPersonaState;
	steamUser.setPersona(
		process.env.NODE_ENV === 'production' ? Online : Invisible,
		config.bot_name || '[SteamSpeak] - BOT'
	);
	steamUser.webLogOn();
	steamUser.once('webSession', function (sessionID, cookies) {
		log.success('Got web session', 'steam');
		community.setCookies(cookies);
	});
	loadGames();
});

function loadGames(): void {
	getFiles(`${__dirname}/games/`).then((files) => {
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
		loadModules();
		watchGames();
	});
}

/**
 * Watch games
 */
function watchGames(): void {
	chokidar.watch(`${__dirname}/games`, { ignoreInitial: true }).on('all', (event, file) => {
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
}

/**
 * Load plugins
 */
function loadModules(): void {
	getFiles(`${__dirname}/modules/`).then((files) => {
		const jsfiles = flattenArray(files).filter((f) => f.split('.').pop() === 'ts');
		jsfiles.forEach((file) => {
			try {
				require(path.resolve(file));
				log.info(`Loaded module ${path.basename(file, '.ts')}.`, 'steam');
			} catch (err) {
				log.warn(`Issue loading module file ${file}: ${err.message}`, 'steam');
			}
		});
		initUsers();
	});
}

/**
 * Load initial users.
 */
async function initUsers(): Promise<void> {
	const connectedClients = await Ts3.clientList({
		client_type: 0
	});
	const verifiedUsers = await VerifiedClient.find({
		uid: { $in: connectedClients.map((client) => client.uniqueIdentifier) }
	});
	if (verifiedUsers.length > 0) {
		steamUser.getPersonas(verifiedUsers.map((user) => user.steamId));
	}
}

export { steamUser, community };
