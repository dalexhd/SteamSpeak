const chalk = require('chalk');
const moment = require('moment');
const _ = require('lodash');

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
			let color;
			switch (type.toLowerCase()) {
				case 'steam':
					color = 'red';
					break;
				case 'ts3':
					color = 'blue';
					break;
				case 'csgo':
					color = 'magenta';
					break;
				case 'database':
					color = 'grey';
					break;
				case 'cache':
					color = 'yellow';
					break;
				case 'website':
					color = 'gray';
					break;
				default:
					'reset';
					break;
			}
			let instance = '';
			if (process.env.INSTANCE)
				instance = chalk.bgGreen.black(`[${_.startCase(process.env.INSTANCE)}]`);
			prefix = chalk.cyan(
				`[${this.time()}]${chalk[color].bold(
					` ${instance}[${type.charAt(0).toUpperCase()}${type.slice(1)}]`
				)}`
			);
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
	 * Print a info log message with a timestamp.
	 *
	 * @param {string} log
	 */
	info(log, type = false) {
		this.print(log, 'gray', type);
	},

	/**
	 * Print a verbose log message with a timestamp.
	 *
	 * @param {string} log
	 */
	verbose(log, type = false) {
		this.info(log, type);
	},

	/**
	 * Print a debuglog message with a timestamp.
	 *
	 * @param {string} log
	 */
	debug(log, type = false) {
		this.print(log, 'cyan', type);
	},

	/**
	 * Print a log warning message with a timestamp.
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
	}
};

module.exports = Log;
