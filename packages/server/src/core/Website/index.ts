import config from '@config/website';
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import log from '@utils/log';

// Define api routes
import apiRoutes from './api/routes';
import generatorRoutes from './generator/routes';

const app = express();
app.use(cors(config.cors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Check if the application has been already build.
if (!fs.existsSync(path.join(__dirname, '../../../../client/dist/index.html'))) {
	log.error(`Cannot stat website production build. Check: https://bit.ly/2yzXhsD`, 'website');
	process.exit(1);
}

app.use(express.static(path.join(__dirname, '../../../../client/dist')));
// Use Api routes
app.use('/api', apiRoutes);

// Use svg generator routes
app.use('/generator', generatorRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../../../client/dist/index.html'));
});

const port = config.port;
app.listen(port);

console.info(`Website is UP: ${config.hostname || 'localhost'}`);
