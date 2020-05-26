/**
 * @file packages/server/database.js
 */
export default {
	host: 'localhost',
	port: 27017,
	srv: false,
	user: '',
	password: '',
	database: 'steam_speak',
	opts: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
};
