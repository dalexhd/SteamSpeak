const {
  EventEmitter,
} = require('events');
const { TeamSpeak } = require('ts3-nodejs-library');

const { loadPlugins } = require('./plugins');
const log = require('../../utils/log.js');
const config = require('../../config/teamspeak.js');

/* !fix Problema al renombrar los nombres...
Parece que los nombres o algo no cuadrán con la cache que esta bien.
*/
class Ts3 extends EventEmitter {
  /**
   * Construct the Ts3 class.
   *
   * @class cache
   */
  constructor(cache) {
    super();
    try {
      this.cache = cache;
      this.teamSpeakClient = new TeamSpeak({
        protocol: 'ssh',
        host: config.teamspeak.ip,
        queryport: config.teamspeak.query_port,
        serverport: config.teamspeak.port,
        username: config.teamspeak.login,
        password: config.teamspeak.password,
        nickname: config.teamspeak.name,
        antispam: true,
        antispamtimer: 350,
      });
    } catch (error) {
      this.emit('connection_error', error);
      return;
    }
    this.initEvents();
  }

  /**
   * On connection ready.
   *
   */
  async onReady() {
    this.teamSpeakClient.useBySid(config.teamspeak.server_id).catch((error) => this.emit('error', error));
    this.teamSpeakClient.whoami().then((info) => {
      if (info.client_channel_id !== config.teamspeak.channel_id) {
        this.teamSpeakClient.clientMove(parseInt(info.client_id, 10), parseInt(config.teamspeak.channel_id, 10)).catch((error) => this.emit('error', error));
      }
    });
    log.success('Connected to the ts3 server', 'ts3');
    this.subscribeEvents();
    loadPlugins(this.teamSpeakClient, this.cache);
  }


  /**
   * Initialize event listeners.
   */
  initEvents() {
    this.teamSpeakClient.on('ready', this.onReady.bind(this));
    this.teamSpeakClient.on('timeout', Ts3.onTimeout.bind(this));
    this.teamSpeakClient.on('close', Ts3.onClose);
    this.teamSpeakClient.on('error', Ts3.onError);
    if (config.teamspeak.debug) {
      this.teamSpeakClient.on('debug', Ts3.onDebug);
    }
    this.teamSpeakClient.on('flooding', (time) => console.log('Flood protection activated', time));
  }

  /**
   * On connection ready, subscribe to events of ts3.
   *
   * @param {string} prompt
   */
  subscribeEvents() {
    Promise.all([
      this.teamSpeakClient.registerEvent('server'),
      this.teamSpeakClient.registerEvent('channel', 0),
      this.teamSpeakClient.registerEvent('textserver'),
      this.teamSpeakClient.registerEvent('textchannel'),
      this.teamSpeakClient.registerEvent('textprivate'),
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
    this.teamSpeakClient.on('error', (e) => {
      console.log('Error', e.message);
    });
    this.teamSpeakClient.on('close', (e) => {
      log.error('Connection has been closed!', 'ts3');
      process.exit();
    });
    this.beforeExit();
  }

  /**
   * Before exit
   */
  beforeExit() {
    process.on('exit', () => this.teamSpeakClient.quit());
    process.on('SIGINT', () => this.teamSpeakClient.quit());
    process.on('SIGUSR1', () => this.teamSpeakClient.quit());
    process.on('SIGUSR2', () => this.teamSpeakClient.quit());
    process.on('uncaughtException', () => this.teamSpeakClient.quit());
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
