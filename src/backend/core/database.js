const {
  EventEmitter,
} = require('events');
const mysql = require('mysql');
const log = require('../utils/log.js');
const config = require('../config/database.js');

/* !fix Problema al renombrar los nombres...
Parece que los nombres o algo no cuadrán con la cache que esta bien.
*/
class Database extends EventEmitter {
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
      this.database = mysql.createConnection({
        host: config.ip,
        user: config.user,
        password: config.database.password,
        database: config.database,
        debug: config.debug,
      });
    } catch (error) {
      this.emit('connection_error', error);
    }
    setInterval(() => {
      database.query('SELECT 1');
      log.debug('Sent query to prevent disconnect ^^');
    }, 600000);
  }
}

module.exports = Database;
