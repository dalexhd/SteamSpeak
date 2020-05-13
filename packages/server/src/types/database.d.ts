import { Document } from 'mongoose';

declare global {
	interface VerifiedClientDocument extends Document {
		uid: string;
		dbid: number;
		steamId: string;
		groupId: any;
		groupNumber: any;
	}
}
