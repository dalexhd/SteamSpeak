import { TeamSpeakClient } from 'ts3-nodejs-library';

declare module 'express' {
	interface Request {
		client: TeamSpeakClient | undefined;
		token: string;
		role: string;
	}
}
