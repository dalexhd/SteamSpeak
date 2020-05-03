import SteamTotp from 'steam-totp';
import SteamUser from 'steam-user';
import GlobalOffensive from 'globaloffensive';
import SteamCommunity from 'steamcommunity';
import log from '@utils/log';
import config from '@config/steam';
import { getFiles } from '@utils/files';
import { flattenArray } from '@utils/array';
import VerifiedClient from '@core/Database/models/verifiedClient';
import * as path from 'path';
import { Ts3 } from '@core/TeamSpeak';

const steamUser = new SteamUser({
	language: config.language || 'english'
});
steamUser.setOption('promptSteamGuardCode', false);
steamUser.setOption('debug', config.debug || false);

const community = new SteamCommunity();

steamUser.logOn({
	accountName: config.username,
	password: config.password,
	twoFactorCode: SteamTotp.getAuthCode(config.shared_secret)
});

const csgo = new GlobalOffensive(steamUser);

steamUser.once('loggedOn', function () {
	log.success('logged in', 'steam');
	steamUser.setPersona(SteamUser.EPersonaState.Invisible, config.bot_name || '[SteamSpeak] - BOT');
	steamUser.webLogOn();
	steamUser.once('webSession', function (sessionID, cookies) {
		log.success('Got web session', 'steam');
		community.setCookies(cookies);
	});
	steamUser.gamesPlayed([730]);
});

csgo.on('connectedToGC', function () {
	log.success('Connected to GC', 'csgo');
	loadModules();
});

/**
 * Load plugins
 */
function loadModules(): void {
	getFiles(`${__dirname}/modules/`).then((files) => {
		const jsfiles = flattenArray(files).filter((f) => f.split('.').pop() === 'js');
		jsfiles.forEach((file) => {
			try {
				require(path.resolve(file));
				log.info(`Loaded module ${path.basename(file, '.js')}`, 'steam');
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

export { steamUser, community, csgo };
