const Ts3 = require('../../../TeamSpeak');
const log = require('../../../../utils/log');
const { convertToMiliseconds } = require('../../../../utils/time');
const Cache = require('../../../Cache');

var loaded = false;

module.exports.main = async () => {
	const { data } = this.info.config;
	const clients = await Ts3.clientList({ client_type: 0 });
	clients.forEach(async (client) => {
		if (client.isAfk(data.minTime) && client.cid !== data.dest) {
			client.kickFromServer("You've been kicked out for being afk");
			log.info(
				`${this.info.name} (DBID: ${client.databaseId}) has been kicked for being afk.`,
				'ts3'
			);
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
	name: 'AFK move',
	desc: 'Kick client if if AFK.',
	config: {
		enabled: false,
		data: {
			ignoredGroups: [],
			ignoredChannels: [],
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
