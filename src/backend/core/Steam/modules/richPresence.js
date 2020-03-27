const { community, steamUser, csgo } = require('../../Steam');
const Ts3 = require('../../TeamSpeak');

steamUser.getAppRichPresenceLocalization(730, 'spanish').then(function (data) {});

// Called when a Steam User change has been made.
module.exports.EventSteamUser = (sid, data) => {
  // var steamId = sid.getSteamID64();
  Ts3.serverGroupRename(9, data.rich_presence_string);
};

module.exports.info = {
  name: 'richPresence',
  desc: 'Load rich presence module.',
  config: {
    enabled: true
  }
};
