const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const GlobalOffensive = require('globaloffensive');
const log = require('../../utils/log.js');
const config = require('../../config/steam');
const { getFiles } = require('../../utils/files');
const { flatArray } = require('../../utils/array');
const User = require('../Database/models/user');
const path = require('path');
const Ts3 = require('../TeamSpeak');

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
	require('../Steam/modules/richPresence');
});

/**
 * Load plugins
 */
function loadModules() {
	getFiles('./core/Steam/modules/').then((files) => {
		let jsfiles = flatArray(files).filter((f) => f.split('.').pop() === 'js');
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
async function initUsers() {
	let connectedClients = await Ts3.clientList({
		client_type: 0
	});
	let verifiedUsers = await User.find({
		uid: { $in: connectedClients.map((client) => client.uniqueIdentifier) }
	});
	if (verifiedUsers.length > 0) {
		steamUser.getPersonas(verifiedUsers.map((user) => user.steamId));
	}
}

module.exports = {
	steamUser,
	community,
	csgo
};
