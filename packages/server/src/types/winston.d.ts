import * as winston from 'winston';

declare module 'winston' {
	export interface Logger {
		success: winston.LeveledLogMethod;
	}
}
