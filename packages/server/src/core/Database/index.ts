import log from '@utils/log';
import mongoose from 'mongoose';
import config from '@config/database';

mongoose
	.connect(
		config.uri || 'mongodb://localhost:27017/steam_speak',
		config.opts || { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		log.success('Connected to the database!', 'database');
	})
	.catch((err) => {
		log.error(err.message, 'database');
		process.exit(1);
	});

export default mongoose.connection;
