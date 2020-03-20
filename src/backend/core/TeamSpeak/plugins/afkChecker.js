const log = require('../../../utils/log');
const { config } = require('../../../config/teamspeak').plugins.afkChecker;
const { convertToMiliseconds } = require('../../../utils/time');

const afkChecker = (ts3, cache) => {
  setInterval(async () => {
    const clients = await ts3.clientList({ client_type: 0 });
    clients.forEach(async (client) => {
      if (
        client.idleTime > convertToMiliseconds(config.minTime)
        && (client.outputMuted === 1 || client.away === 1)
        && client.cid !== config.dest
      ) {
        cache.set(`afkChecker:${client.databaseId}`, client.cid);
        client.move(config.dest);
        client.poke('You have been moved to an AFK channel!');
        log.info(
          `${client.nickname} (DBID: ${client.databaseId}) has been moved to the afk channel.`,
          'ts3',
        );
      } else if (
        client.idleTime < convertToMiliseconds(config.minTime)
        && (client.outputMuted === 0 || client.away === 0)
        && client.cid === config.dest
      ) {
        const cid = cache.get(`afkChecker:${client.databaseId}`);
        if (cid !== undefined) {
          client.move(cid);
          cache.del(`afkChecker:${client.databaseId}`);
          log.info(
            `${client.nickname} (DBID: ${client.databaseId}) has been moved back to previous channel.`,
            'ts3',
          );
        }
      }
    });
  }, convertToMiliseconds(config.interval));
};

const listenEvents = (ts3, cache) => {
  ts3.on('clientdisconnect', (ev) => {
    const { client } = ev;
    if (client.type !== 1) {
      cache.del(`afkChecker:${client.databaseId}`);
    }
  });
};

const enable = (client, cache) => {
  afkChecker(client, cache);
  listenEvents(client, cache);
};

module.exports = {
  afkChecker,
  enable,
};
