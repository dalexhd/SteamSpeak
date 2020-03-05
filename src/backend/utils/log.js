const chalk = require('chalk');
const moment = require('moment');

class Log {
  /**
     * Returns timestamp string.
     *
     * @returns {string}
     */
  static time() {
    const date = new moment();

    return date.format('DD-MM-YYYY HH:mm:ss.SSS');
  }

  /**
     * Print a log message with a customizable color.
     *
     * @param {string} log
     * @param {string} color
     */
  static print(log, color, type = false) {
    if (type != false) {
      switch (type.toLowerCase()) {
        case 'steam':
          var prefix = chalk.cyan(`[${this.time()}]${chalk.red.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        case 'ts3':
          var prefix = chalk.cyan(`[${this.time()}]${chalk.blue.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        case 'csgo':
          var prefix = chalk.cyan(`[${this.time()}]${chalk.magenta.bold(` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`)}`);
          break;
        default:
          var prefix = chalk.cyan(`[${this.time()}]` + ` [${type.charAt(0).toUpperCase()}${type.slice(1)}]`);
          break;
      }
    } else {
      var prefix = chalk.cyan(`[${this.time()}]`);
    }
    let message = log;

    if (color) { message = chalk[color](message); }

    console.log(`${prefix} ${message}`);
  }

  /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
  static info(log, type = false) {
    this.print(log, 'gray', type);
  }

  /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
  static debug(log, type = false) {
    this.print(log, 'yellow', type);
  }

  /**
     * Print an error log message with a timestamp.
     *
     * @param {string} log
     */
  static error(log, type = false) {
    this.print(log, 'red', type);
  }

  /**
     * Print a success log message with a timestamp.
     *
     * @param {string} log
     */
  static success(log, type = false) {
    this.print(log, 'green', type);
  }

  /**
     * Print a event log message with a timestamp.
     *
     * @param {string} log
     */
  static event(log, type = false) {
    this.print(log, 'magenta', type);
  }
}

module.exports = Log;
