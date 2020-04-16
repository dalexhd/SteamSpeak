const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	uid: {
		type: String,
		index: true,
		unique: true
	},
	dbid: Number,
	steamId: Number,
	groupId: Number,
	groupNumber: Number
});

module.exports = mongoose.model('users', UserSchema);
