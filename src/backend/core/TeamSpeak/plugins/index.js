const { plugins } = require('../../../config/teamspeak');
const afkChecker = require('../plugins/afkChecker');

const loadPlugins = (teamSpeakClient, cache) => {
  if (plugins.afkChecker.enabled) {
    afkChecker.enable(teamSpeakClient, cache);
  }
};

module.exports = {
  loadPlugins,
};
