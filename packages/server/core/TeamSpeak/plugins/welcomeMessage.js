const Ts3 = require('../../TeamSpeak');

module.exports.clientconnect = async (ev) => {
	const { client } = ev;
	if (client.type !== 1) {
		const { data } = this.info.config;
		if (data.type === 'poke') {
			Ts3.clientPoke(client.clid, data.message);
		} else if (data.type === 'private') {
			Ts3.sendTextMessage(client.clid, 1, data.message);
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
