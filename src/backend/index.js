const express = require('express');
const path = require('path');
const log = require('./utils/log.js');
const TeamSpeakClient = require('./core/teamspeak.js');
const Database = require('./core/database.js');

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

const { teamSpeakClient } = new TeamSpeakClient();
const { database } = new Database();

teamSpeakClient.on('clientconnect', (ev) => {
  const { client } = ev;
  if (client.type !== 1) {
    log.info(`${client.nickname} has joined the TeamSpeak3 server.`, 'ts3');
  }
});

teamSpeakClient.on('clientdisconnect', (ev) => {
  const { client } = ev;
  if (client.type !== 1) {
    log.info(`${client.nickname} has left the TeamSpeak3 server.`, 'ts3');
  }
});
