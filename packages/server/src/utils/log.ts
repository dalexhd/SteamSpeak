import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
const { combine, colorize, timestamp, printf, simple, json } = format;
import { upperFirst, startCase } from 'lodash';

export default winston.createLogger({
	defaultMeta: {
		instance: process.env?.INSTANCE ? startCase(process.env.INSTANCE) : undefined
	},
	transports: [
		new winston.transports.Console({
			format: combine(
				colorize({
					colors: {
						error: 'red',
						warn: 'yellow',
						info: 'blue',
						verbose: 'cyan',
						debug: 'blue',
						silly: 'rainbow',
						success: 'green'
					},
					message: true
				}),
				simple(),
				timestamp({ format: 'YYYY-MM-DD HH:MM:ss' }),
				printf(({ message, timestamp, ...meta }) => {
					return `${timestamp}${
						process.env?.INSTANCE ? ` [${startCase(process.env.INSTANCE)}]` : ''
					} [${upperFirst(meta.type)}] ${message}`;
				})
			)
		}),
		new winston.transports.DailyRotateFile({
			filename: 'logs/%DATE%.log',
			datePattern: 'YYYY-MM-DD-HH',
			maxSize: '10m',
			maxFiles: '14d',
			format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json())
		})
	],
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		verbose: 4,
		debug: 5,
		silly: 6,
		success: 7
	},
	level: 'success'
});
