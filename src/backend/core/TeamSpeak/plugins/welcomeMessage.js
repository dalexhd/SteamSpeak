module.exports.clientconnect = async (ev, ts3) => {
  const { client } = ev;
  if (client.type !== 1) {
    const { data } = this.info.config;
    if (data.type === 'poke') {
      ts3.clientPoke(client.clid, data.message);
    } else if (data.type === 'private') {
      ts3.sendTextMessage(client.clid, 1, data.message);
    }
  }
};

module.exports.info = {
  name: 'welcomeMessage',
  desc: 'Send welcome message when joining server.',
  config: {
    enabled: true,
    data: {
      type: 'poke',
      message: 'Hello :-)'
    }
  }
};
