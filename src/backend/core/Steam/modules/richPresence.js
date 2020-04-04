const { community, steamUser, csgo } = require('../../Steam');
const Ts3 = require('../../TeamSpeak');
const config = require('../../../config/steam');

steamUser.getAppRichPresenceLocalization(730, config.language).then(function (data) {});

// Called when a Steam User change has been made.
module.exports.EventSteamUser = (sid, data) => {
	// var steamId = sid.getSteamID64();
	Ts3.serverGroupRename(9, data.rich_presence_string);
};

module.exports.info = {
	name: 'richPresence',
	desc: 'Load rich presence module.',
	config: {
		enabled: false
	}
};
