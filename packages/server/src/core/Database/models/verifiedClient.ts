import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VerifiedClientSchema = new Schema({
	uid: {
		type: String,
		index: true,
		unique: true
	},
	dbid: String,
	steamId: {
		type: String,
		unique: true
	},
	groupId: String,
	groupNumber: Number
});

export default mongoose.model<VerifiedClientDocument>('verified-client', VerifiedClientSchema);
