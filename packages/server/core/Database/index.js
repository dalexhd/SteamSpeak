const mongoose = require('mongoose');
const log = require('../../utils/log.js');
const config = require('../../config/database.js');

const url = buildURI();
let Database;

function buildURI() {
	if (config.user && config.password) {
		return `mongodb://${config.user}:${config.password}@${config.host}:${config.port}`;
	}
	log.warn('Connecting to database without credentials.', 'database');
	return `mongodb://${config.host}:${config.port}/${config.database}`;
}

mongoose
	.connect(
		url,
		config.opts || { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((db) => {
		Database = db;
		log.success('Connected to the database!', 'database');
	})
	.catch((err) => {
		log.error(err.message, 'database');
		process.exit(1);
	});

module.exports = Database;
