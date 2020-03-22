const log = require('../../../utils/log');
const { convertToMiliseconds } = require('../../../utils/time');
var loaded = false;

module.exports.load = async (ts3, cache) => {
  const { data, interval } = this.info.config;
  loaded = setInterval(async () => {
    const clients = await ts3.clientList({ client_type: 0 });
    clients.forEach(async (client) => {
      if (
        client.idleTime > convertToMiliseconds(data.minTime) &&
        (client.outputMuted === 1 || client.away === 1) &&
        client.cid !== data.dest
      ) {
        cache.set(`afkChecker:${client.databaseId}`, client.cid);
        client.move(data.dest);
        client.poke('You have been moved to an AFK channel!');
        log.info(
          `${client.nickname} (DBID: ${client.databaseId}) has been moved to the afk channel.`,
          'ts3'
        );
      } else if (
        client.idleTime < convertToMiliseconds(data.minTime) &&
        (client.outputMuted === 0 || client.away === 0) &&
        client.cid === data.dest
      ) {
        const cid = cache.get(`afkChecker:${client.databaseId}`);
        if (cid !== undefined) {
          client.move(cid);
          cache.del(`afkChecker:${client.databaseId}`);
          log.info(
            `${client.nickname} (DBID: ${client.databaseId}) has been moved back to previous channel.`,
            'ts3'
          );
        }
      }
    });
  }, convertToMiliseconds(interval));
};

module.exports.unload = () => {
  clearInterval(loaded);
};

module.exports.clientdisconnect = async (ev, ts3, cache) => {
  const { client } = ev;
  if (client.type !== 1) {
    cache.del(`afkChecker:${client.databaseId}`);
  }
};

module.exports.info = {
  name: 'afkChecker',
  desc: 'Moves client to desired channel if AFK.',
  config: {
    enabled: false,
    data: {
      goBack: true,
      dest: 2,
      minTime: {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 5
      }
    },
    interval: {
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 5
    }
  }
};
