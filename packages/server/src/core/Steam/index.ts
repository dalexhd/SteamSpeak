import SteamTotp from 'steam-totp';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import log from '@utils/log';
import '@utils/steam';
import config from '@config/steam';
import VerifiedClient from '@core/Database/models/verifiedClient';
import { Ts3 } from '@core/TeamSpeak';

const steamUser = new SteamUser({
	language: config.language || 'english'
});

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
	const { Online } = SteamUser.EPersonaState;
	steamUser.setPersona(Online, config.bot_name || '[SteamSpeak] - BOT');
	steamUser.webLogOn();
	steamUser.once('webSession', function (sessionID, cookies) {
		log.success('Got web session', 'steam');
		community.setCookies(cookies);
	});
	Promise.all([steamUser.loadGames(), steamUser.watchGames(), steamUser.loadModules()]).then(() => {
		initUsers();
	});
});

steamUser.on('error', function (err) {
	log.error(`Logon error: ${err.message}`, 'steam');
});

steamUser.on('disconnected', function (eresult, msg) {
	log.error(`Disconnected from steam: [eresult: ${eresult}] ${msg}`, 'steam');
});

if (config.debug) {
	steamUser.on('debug', function (message) {
		log.debug(message, 'steam');
	});
}

/**
 * Load initial users.
 */
async function initUsers(): Promise<void> {
	const connectedClients = await Ts3.clientList({
		clientType: 0
	});
	const verifiedUsers = await VerifiedClient.find({
		uid: { $in: connectedClients.map((client) => client.uniqueIdentifier) }
	});
	if (verifiedUsers.length > 0) {
		steamUser.getPersonas(verifiedUsers.map((user) => user.steamId));
	}
}

export { steamUser, community };
