const express = require('express');
const path = require('path');

require('./core/TeamSpeak');
require('./core/Database');
// require('./core/Steam');

// Define api routes
const apiRoutes = require('./api/routes');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Use Api routes
app.use('/api', apiRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
