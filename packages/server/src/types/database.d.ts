import { Document } from 'mongoose';

declare global {
	interface VerifiedClientDocument extends Document {
		uid: string;
		dbid: string;
		steamId: string;
		groupId?: any;
		groupNumber?: any;
	}
}
