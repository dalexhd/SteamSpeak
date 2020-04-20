const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerifiedClientSchema = new Schema({
	uid: {
		type: String,
		index: true,
		unique: true
	},
	dbid: Number,
	steamId: {
		type: String,
		unique: true
	},
	groupId: Number,
	groupNumber: Number
});

module.exports = mongoose.model('verified-client', VerifiedClientSchema);
