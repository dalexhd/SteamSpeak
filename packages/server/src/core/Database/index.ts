import log from '@utils/log';
import mongoose from 'mongoose';
import config from '@config/database';

let Database;

function buildURI(): string {
	if (config.user && config.password) {
		return `mongodb${config.srv ? '+srv' : ''}://${config.user}:${config.password}@${config.host}:${
			config.port
		}`;
	}
	log.warn('Connecting to database without credentials.', 'database');
	return `mongodb://${config.host}:${config.port}/${config.database}`;
}

mongoose
	.connect(
		buildURI(),
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

export default Database;
