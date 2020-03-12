const {
  EventEmitter,
} = require('events');
const { TeamSpeak } = require('ts3-nodejs-library');

const { loadPlugins } = require('./plugins');
const log = require('../../utils/log.js');
const config = require('../../config/teamspeak.js').teamspeak;

class Ts3 extends EventEmitter {
  /**
   * Construct the Ts3 class.
   */
  constructor() {
    super();
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
        antispamtimer: 350,
      });
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
    this.ts.useBySid(config.server_id)
      .then(() => {
        log.success(`Selected Server Nº ${config.server_id}.`, 'ts3');
        this.ts.whoami().then((info) => {
          if (info.client_channel_id !== config.channel_id) {
            this.ts.clientMove(info.client_id, config.channel_id).catch((error) => this.ts.emit('error', error));
          }
        });
      }).catch((err) => {
        log.error(err);
      });
    log.success('Connected to the ts3 server', 'ts3');
    this.subscribeEvents();
    loadPlugins(this.ts, this.cache);
  }


  /**
   * Initialize event listeners.
   */
  initEvents() {
    this.ts.on('ready', this.onReady.bind(this));
    this.ts.on('timeout', Ts3.onTimeout.bind(this));
    this.ts.on('close', Ts3.onClose);
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
      this.ts.registerEvent('textprivate'),
    ])
      .then(() => {
        log.success('Subscribed to all Events', 'ts3');
        this.listenEvents();
      }).catch((error) => log.error(error));
  }

  /**
   * Listen events
   */
  async listenEvents() {
    this.ts.on('close', (e) => {
      log.error('Connection has been closed!', 'ts3');
      process.exit();
    });
    this.beforeExit();
  }

  /**
   * Before exit
   */
  beforeExit() {
    process.on('exit', () => this.ts.quit());
    process.on('SIGINT', () => this.ts.quit());
    process.on('SIGUSR1', () => this.ts.quit());
    process.on('SIGUSR2', () => this.ts.quit());
    process.on('uncaughtException', () => this.ts.quit());
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
   * On connection closed.
   */
  static onClose() {
    log.error('close', 'ts3');
  }

  /**
   * On error.
   */
  static onError(error) {
    log.error(error, 'ts3');
  }
}

module.exports = Ts3;
