const log = require('../../../utils/log');
const { convertToMiliseconds } = require('../../../utils/time');
const Cache = require('../../Cache');
const Ts3 = require('../../TeamSpeak');

var loaded = false;

function isAfk(client, data) {
	return (
		client.idleTime > convertToMiliseconds(data.minTime) &&
		(client.outputMuted === 1 || client.away === 1 || client.inputMuted === 1) &&
		client.cid !== data.dest
	);
}

function isNotAfk(client, data) {
	return (
		client.idleTime < convertToMiliseconds(data.minTime) &&
		(client.outputMuted === 0 || client.away === 0 || client.inputMuted === 0) &&
		client.cid === data.dest
	);
}

module.exports.main = async () => {
	const { data } = this.info.config;
	const clients = await Ts3.clientList({ client_type: 0 });
	clients.forEach(async (client) => {
		if (isAfk(client, data)) {
			Cache.set(`afkChecker:${client.databaseId}`, client.cid);
			client.move(data.dest);
			client.poke('You have been moved to an AFK channel!');
			log.info(
				`${client.nickname} (DBID: ${client.databaseId}) has been moved to the afk channel.`,
				'ts3'
			);
		} else if (isNotAfk(client, data)) {
			const cid = await Cache.get(`afkChecker:${client.databaseId}`);
			if (cid !== undefined) {
				client.move(cid);
				Cache.del(`afkChecker:${client.databaseId}`);
				client.poke('You have been moved back to your channel!');
				log.info(
					`${client.nickname} (DBID: ${client.databaseId}) has been moved back to previous channel.`,
					'ts3'
				);
			}
		}
	});
};

module.exports.load = async () => {
	const { interval } = this.info.config;
	loaded = setInterval(async () => {
		this.main();
	}, convertToMiliseconds(interval));
};

module.exports.unload = () => {
	clearInterval(loaded);
};

module.exports.clientdisconnect = async (ev) => {
	const { client } = ev;
	if (client.type !== 1) {
		Cache.del(`afkChecker:${client.databaseId}`);
	}
};

module.exports.info = {
	name: 'afkChecker',
	desc: 'Moves client to desired channel if AFK.',
	config: {
		enabled: true,
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
