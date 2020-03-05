const {
  EventEmitter,
} = require('events');
const { TeamSpeak } = require('ts3-nodejs-library');
const log = require('../utils/log.js');
const config = require('../config/teamspeak.js');

/* !fix Problema al renombrar los nombres...
Parece que los nombres o algo no cuadrán con la cache que esta bien.
*/
class Ts3 extends EventEmitter {
  /**
   * Construct the Ts3 class.
   *
   * @param {string} host
   * @param {number} port
   * @param {number} serverID
   */
  constructor() {
    super();
    try {
      this.teamSpeakClient = new TeamSpeak({
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
      this.emit('connection_error', error);
      return;
    }
    this.serverID = config.server_id;
    this.channelID = config.channel_id;

    this.initEvents();
  }

  /**
   * On connection ready.
   *
   * @param {string} prompt
   */
  async onReady(prompt) {
    this.teamSpeakClient.useBySid(this.serverID).catch((error) => this.emit('error', error));
    this.teamSpeakClient.whoami().then((info) => {
      if (info.client_channel_id !== this.channelID) {
        this.teamSpeakClient.clientMove(parseInt(info.client_id), parseInt(this.channelID)).catch((error) => this.emit('error', error));
      }
    });
    log.success('Connected to the ts3 server', 'ts3');
    this.subscribeEvents();
  }

  /**
   * Initialize event listeners.
   */
  initEvents() {
    this.teamSpeakClient.on('ready', this.onReady.bind(this));
    this.teamSpeakClient.on('timeout', this.onTimeout.bind(this));
    this.teamSpeakClient.on('close', this.onClose.bind(this));
    this.teamSpeakClient.on('error', this.onError.bind(this));
    // this.teamSpeakClient.on('debug', this.onDebug.bind(this));
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
   * On connection timeout.
   */
  async listenEvents() {
    const self = this;
    const { ts3 } = this;
    this.teamSpeakClient.on('error', (e) => {
      console.log('Error', e.message);
    });
    this.teamSpeakClient.on('close', (e) => {
      console.log('Connection has been closed!', e);
      process.exit(1);
    });
  }

  /**
   * On debug.
   */
  onDebug(ev) {
    const debug = require('debug')('ts3');
    if (ev.type === 'send') {
      log.debug(`>>> ${ev.data}`, 'ts3');
    }
    if (ev.type === 'receive') {
      if (ev.data.startsWith('error')) {
        `<<< ${ev.data.length}`;
        log.debug(`<<< ${ev.data}`, 'ts3');
      }
      log.debug(`<<< ${ev.data.length}`, 'ts3');
    }
  }

  /**
   * On connection timeout.
   */
  onTimeout() {
    console.log('timeout');
  }

  /**
   * On connection closed.
   */
  onClose() {
    console.log('close');
  }

  /**
   * On error.
   */
  onError(error) {
    console.log('error', error);
  }
}

module.exports = Ts3;
