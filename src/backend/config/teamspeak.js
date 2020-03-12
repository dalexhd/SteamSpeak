const teamspeak = {
  ip: '127.0.0.1',
  query_port: 10022,
  port: 9987,
  login: 'serveradmin',
  password: 'SteamSpeak',
  name: 'SteamSpeak',
  server_id: 1,
  channel_id: 1,
  debug: true,
};

const plugins = {
  afkChecker: {
    enabled: true,
    config: {
      dest: 1,
      goBack: true,
      dest: 2,
      minTime: {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 5,
      },
      interval: {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 5,
      },
    },
  },
};

module.exports = {
  teamspeak,
  plugins,
};
