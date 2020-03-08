const express = require('express');
const path = require('path');

const TeamSpeakClient = require('./core/TeamSpeak');
const Database = require('./core/Database');
const Cache = require('./core/Cache');


const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
const { cache } = new Cache();
const { teamSpeakClient } = new TeamSpeakClient(cache);
const { database } = new Database();
