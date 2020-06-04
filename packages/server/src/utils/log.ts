import chalk from 'chalk';
import moment from 'moment';
import { startCase } from 'lodash';

const Log = {
	/**
	 * @returns string
	 */
	time(): string {
		const date = moment();
		return date.format('DD-MM-YYYY HH:mm:ss.SSS');
	},

	/**
	 * Print into the console pretty logs.
	 * @param log The string you want to log
	 * @param color Output color
	 * @param type Optional type
	 */
	print(log: string, color: string, type?: string): void {
		let prefix;
		if (type) {
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
					color = 'reset';
					break;
			}
			let instance = '';
			if (process.env.INSTANCE) instance = chalk.black(`[${startCase(process.env.INSTANCE)}]`);
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
			message = chalk.hex(color)(message);
		}
		console.log(`${prefix} ${message}`);
	},

	/**
	 * Print a info log message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	info(log: string, type?: string): void {
		this.print(log, '#0099CC', type);
	},

	/**
	 * Print a verbose log message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	verbose(log: string, type?: string): void {
		this.info(log, type);
	},

	/**
	 * Print a debuglog message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	debug(log: string, type?: string): void {
		this.print(log, '#00FFFF', type);
	},

	/**
	 * Print a log warning message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	warn(log: string, type?: string): void {
		this.print(`⚠️ ${log}`, '#FF8800', type);
	},

	/**
	 * Print an error log message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	error(log: string, type?: string): void {
		this.print(`❌ ${log}`, '#CC0000', type);
	},

	/**
	 * Print a success log message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	success(log: string, type?: string): void {
		this.print(log, '#28A745', type);
	},

	/**
	 * Print a event log message with a timestamp.
	 * @param {string} log
	 * @param {string} type Optional type
	 */
	event(log: string, type?: string): void {
		this.print(log, '#FF00FF', type);
	}
};

export default Log;
