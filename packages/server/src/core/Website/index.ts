import config from '@config/website';
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import bodyParser from 'body-parser';

// Define api routes
import apiRoutes from './api/routes';

const app = express();
app.use(cors(config.cors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../../client/dist')));

// Use Api routes
app.use('/api', apiRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../../../client/dist/index.html'));
});

const port = config.port;
app.listen(port);

console.info(`Website is UP: ${config.hostname || 'localhost'}`);
