const { EventEmitter } = require('events');
const { TeamSpeak } = require('ts3-nodejs-library');
const log = require('../../utils/log.js');
const config = require('../../config/teamspeak.js').teamspeak;
const { getFiles, validatePlugin } = require('../../utils/files');
const { flatArray } = require('../../utils/array');
const path = require('path');
const chokidar = require('chokidar');
const fs = require('fs');

class Ts3 extends EventEmitter {
  /**
   * Construct the Ts3 class.
   */
  constructor(cache, Database) {
    super();
    this.cache = cache;
    this.Database = Database;
    try {
      this.ts = new TeamSpeak({
        protocol: 'ssh',
        host: config.ip,
        queryport: config.query_port,
        serverport: config.port,
        username: config.login,
        password: config.password,
        nickname: config.name,
        antispam: true,
        antispamtimer: 350
      });
      this.ts.plugins = new Map();
    } catch (error) {
      this.ts.emit('error', error);
      return;
    }
    this.initEvents();
  }

  /**
   * On connection ready.
   *
   */
  async onReady() {
    this.ts
      .useBySid(config.server_id)
      .then(() => {
        log.success(`Selected Server Nº ${config.server_id}.`, 'ts3');
        this.ts.whoami().then((info) => {
          if (info.client_channel_id !== config.channel_id) {
            this.ts
              .clientMove(info.client_id, config.channel_id)
              .catch((error) => this.ts.emit('error', error));
          }
        });
      })
      .catch((err) => {
        log.error(err);
      });
    log.success('Connected to the ts3 server', 'ts3');
    this.subscribeEvents();
  }

  /**
   * Initialize event listeners.
   */
  initEvents() {
    this.ts.on('ready', this.onReady.bind(this));
    this.ts.on('timeout', Ts3.onTimeout.bind(this));
    this.ts.on('error', Ts3.bind(this));
    if (config.debug) {
      this.ts.on('debug', Ts3.onDebug);
    }
    this.ts.on('flooding', (time) => console.log('Flood protection activated', time));
  }

  /**
   * On connection ready, subscribe to events of ts3.
   *
   * @param {string} prompt
   */
  subscribeEvents() {
    Promise.all([
      this.ts.registerEvent('server'),
      this.ts.registerEvent('channel', 0),
      this.ts.registerEvent('textserver'),
      this.ts.registerEvent('textchannel'),
      this.ts.registerEvent('textprivate')
    ])
      .then(() => {
        log.success('Subscribed to all Events', 'ts3');
        this.listenEvents();
      })
      .catch((error) => log.error(error));
  }

  /**
   * Listen events
   */
  async listenEvents() {
    this.ts.on('close', () => {
      log.error('Connection has been closed!', 'ts3');
    });
    this.beforeExit();
    this.loadPlugins();
    this.watchPlugins();
  }

  /**
   * Before exit
   */
  beforeExit() {
    process.on('SIGINT', () => {
      this.ts.quit();
      process.exit();
    });
  }

  /**
   * On debug.
   */
  static onDebug(ev) {
    if (ev.type === 'send') {
      log.debug(`>>> ${ev.data}`, 'ts3');
    }
    if (ev.type === 'receive') {
      if (ev.data.startsWith('error')) {
        log.debug(`<<< ${ev.data}`, 'ts3');
      }
      log.debug(`<<< ${ev.data.length}`, 'ts3');
    }
  }

  /**
   * On connection timeout.
   */
  static onTimeout() {
    log.error('timeout', 'ts3');
  }

  /**
   * On error.
   */
  static onError(error) {
    log.error(error, 'ts3');
  }

  /**
   * Load plugins
   */
  loadPlugins() {
    getFiles('./core/TeamSpeak/plugins/')
      .then((files) => {
        let jsfiles = flatArray(files).filter((f) => f.split('.').pop() === 'js');
        jsfiles.forEach((file) => {
          try {
            let plugin = require(path.resolve(file));
            validatePlugin(plugin.info)
              .then(() => {
                if (plugin.info.config.enabled) {
                  if (typeof plugin['load'] !== 'undefined') {
                    plugin.load(this.ts, this.cache);
                  }
                  this.ts.plugins.set(plugin.info.name, plugin);
                  log.info(`Loaded plugin ${plugin.info.name}`, 'ts3');
                }
              })
              .catch((err) => {
                log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, 'ts3');
              });
          } catch (err) {
            log.warn(`Issue loading plugin file ${file}:`, err.stack);
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
        ].forEach((value) => {
          this.ts.on(value, (ev) => {
            this.ts.plugins.forEach((plugin) => {
              if (typeof plugin[value] !== 'undefined') {
                plugin[value](ev, this.ts, this.cache);
              }
            });
          });
        });
      })
      .then(() => {
        this.watchPlugins();
      });
  }

  watchPlugins() {
    chokidar
      .watch('./core/TeamSpeak/plugins/', { ignoreInitial: true })
      .on('all', (event, file) => {
        let fileName = path.basename(file);
        let plugin = fileName.slice(0, -3);
        this.ts.plugins.delete(plugin);
        let cached = require.cache[require.resolve(path.resolve(file))];
        if (typeof cached.exports.unload !== 'undefined') {
          cached.exports.unload();
        }
        delete require.cache[require.resolve(path.resolve(file))];
        if (fs.existsSync(path.resolve(file))) {
          try {
            let plugin = require(path.resolve(file));
            validatePlugin(plugin.info)
              .then(() => {
                if (plugin.info.config.enabled) {
                  if (typeof plugin['load'] !== 'undefined') {
                    plugin.load(this.ts, this.cache);
                  }
                  this.ts.plugins.set(plugin.info.name, plugin);
                  log.info(`Loaded plugin ${plugin.info.name}`, 'ts3');
                } else {
                  if (typeof plugin['unload'] !== 'undefined') {
                    plugin.unload();
                  }
                  log.info(`Unloaded plugin ${plugin.info.name}`, 'ts3');
                }
              })
              .catch((err) => {
                log.error(`Invalid ${plugin.info.name} config: ${err.message}. Skipping`, 'ts3');
              });
          } catch (err) {
            log.warn(`Issue loading plugin file ${fileName}:`, err.stack);
          }
        } else {
          log.info(`Detected removal of plugin ${fileName}, unloading.`);
        }
      });
  }
}

module.exports = Ts3;
