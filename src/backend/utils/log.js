const chalk = require('chalk');
const moment = require('moment');

const Log = {
  /**
    * Returns timestamp string.
    *
    * @returns {string}
    */
  time() {
    const date = new moment();
    return date.format('DD-MM-YYYY HH:mm:ss.SSS');
  },

  /**
  * Print a log message with a customizable color.
  *
  * @param {string} log
  * @param {string} color
  */
  print(log, color, type = false) {
    let prefix;
    if (type !== false) {
      switch (type.toLowerCase()) {
        case 'steam':
          prefix = chalk.cyan(`[${this.time()}]${chalk.red.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        case 'ts3':
          prefix = chalk.cyan(`[${this.time()}]${chalk.blue.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        case 'csgo':
          prefix = chalk.cyan(`[${this.time()}]${chalk.magenta.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        default:
          prefix = chalk.cyan(`[${this.time()}]` + ` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`);
          break;
      }
    } else {
      prefix = chalk.cyan(`[${this.time()}]`);
    }
    let message = log;

    if (color) {
      message = chalk[color](message);
    }
    console.log(`${prefix} ${message}`);
  },

  /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
  info(log, type = false) {
    this.print(log, 'gray', type);
  },

  /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
  debug(log, type = false) {
    this.print(log, 'cyan', type);
  },


  /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
  warn(log, type = false) {
    this.print(log, 'yellow', type);
  },

  /**
     * Print an error log message with a timestamp.
     *
     * @param {string} log
     */
  error(log, type = false) {
    this.print(log, 'red', type);
  },

  /**
    * Print a success log message with a timestamp.
    *
    * @param {string} log
    */
  success(log, type = false) {
    this.print(log, 'green', type);
  },

  /**
    * Print a event log message with a timestamp.
    *
    * @param {string} log
    */
  event(log, type = false) {
    this.print(log, 'magenta', type);
  },
};

module.exports = Log;
