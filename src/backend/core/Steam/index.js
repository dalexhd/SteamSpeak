const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const GlobalOffensive = require('globaloffensive');
const log = require('../../utils/log.js');
const config = require('../../config/steam');
const { getFiles, validatePlugin } = require('../../utils/files');
const { flatArray } = require('../../utils/array');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

var steamUser = new SteamUser({
  language: config.language || 'english'
});
let Plugins = new Map();
steamUser.setOption('promptSteamGuardCode', false);
steamUser.setOption('debug', true);

var community = new SteamCommunity();

steamUser.logOn({
  accountName: config.username, //pvplayers_bot
  password: config.password,
  twoFactorCode: SteamTotp.getAuthCode(config.shared_secret)
});

var csgo = new GlobalOffensive(steamUser);

steamUser.once('loggedOn', function () {
  log.success('logged in', 'steam');
  steamUser.setPersona(SteamUser.EPersonaState.Invisible, config.bot_name);
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
  getFiles('./core/Steam/modules/')
    .then((files) => {
      let jsfiles = flatArray(files).filter((f) => f.split('.').pop() === 'js');
      jsfiles.forEach((file) => {
        try {
          let module = require(path.resolve(file));
          validatePlugin(module.info)
            .then(() => {
              if (module.info.config.enabled) {
                if (typeof module['load'] !== 'undefined') {
                  module.load();
                }
                Plugins.set(module.info.name, module);
                log.info(`Loaded module ${module.info.name}`, 'steam');
              }
            })
            .catch((err) => {
              log.error(`Invalid ${module.info.name} config: ${err.message}. Skipping`, 'steam');
            });
        } catch (err) {
          log.warn(`Issue loading module file ${file}:`, err.stack);
        }
      });
      ['user'].forEach((value) => {
        steamUser.on(value, (...args) => {
          Plugins.forEach((module) => {
            if (typeof module[`EventSteam${_.startCase(value)}`] !== 'undefined') {
              module[`EventSteam${_.startCase(value)}`](...args);
            }
          });
        });
      });
    })
    .then(() => {
      watchModules();
    });
}

function watchModules() {
  chokidar.watch('./core/Steam/modules/', { ignoreInitial: true }).on('all', (event, file) => {
    let fileName = path.basename(file);
    let module = fileName.slice(0, -3);
    Plugins.delete(module);
    let cached = require.cache[require.resolve(path.resolve(file))];
    if (typeof cached.exports.unload !== 'undefined') {
      cached.exports.unload();
    }
    delete require.cache[require.resolve(path.resolve(file))];
    if (fs.existsSync(path.resolve(file))) {
      try {
        let module = require(path.resolve(file));
        validatePlugin(module.info)
          .then(() => {
            if (module.info.config.enabled) {
              if (typeof module['load'] !== 'undefined') {
                module.load();
              }
              Plugins.set(module.info.name, module);
              log.info(`Loaded module ${module.info.name}`, 'steam');
            } else {
              if (typeof module['unload'] !== 'undefined') {
                module.unload();
              }
              log.info(`Unloaded module ${module.info.name}`, 'steam');
            }
          })
          .catch((err) => {
            log.error(`Invalid ${module.info.name} config: ${err.message}. Skipping`, 'steam');
          });
      } catch (err) {
        log.warn(`Issue loading module file ${fileName}:`, err.stack);
      }
    } else {
      log.info(`Detected removal of module ${fileName}, unloading.`);
    }
  });
}

module.exports = {
  steamUser,
  community,
  csgo
};
