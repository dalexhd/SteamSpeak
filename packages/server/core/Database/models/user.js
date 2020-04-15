const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	uuid: {
		type: String,
		index: true,
		unique: true
	},
	dbid: Number,
	steamid: Number
});

module.exports = mongoose.model('users', UserSchema);
