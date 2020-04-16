const config = require('../../config/website');
if (!config.enabled) return;
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Define api routes
const apiRoutes = require('./api/routes');

const app = express();
app.use(cors(config.cors.options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../client/dist')));

// Use Api routes
app.use('/api', apiRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

const port = config.port;
app.listen(port);

console.log(`App is listening on port ${port}`);
