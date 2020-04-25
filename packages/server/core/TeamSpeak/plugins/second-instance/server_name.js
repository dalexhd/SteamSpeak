const Ts3 = require('../../../TeamSpeak');
const { convertToMiliseconds } = require('../../../../utils/time');
const log = require('../../../../utils/log');
const moment = require('moment');

var loaded = false;

module.exports.main = async () => {
	const { data } = this.info.config;
	let info = await Ts3.serverInfo();
	let edited_name = {
		'[ONLINE]': data.showQueryClients
			? info.virtualserver_clientsonline
			: info.virtualserver_clientsonline - info.virtualserver_queryclientsonline,
		'[MAX_CLIENTS]': info.virtualserver_maxclients,
		'[DATE]': moment().format(data.format),
		'[%]': Math.round(
			((data.showQueryClients
				? info.virtualserver_clientsonline
				: info.virtualserver_clientsonline - info.virtualserver_queryclientsonline) /
				info.virtualserver_maxclients) *
				100
		)
	};
	let name = data.serverName;
	for (var key in edited_name) {
		if (!edited_name.hasOwnProperty(key)) continue;
		name = name.replace(key, edited_name[key]);
	}
	Ts3.serverEdit({
		virtualserver_name: name
	})
		.then(() => {
			log.info(`${this.info.name} to: ${name}`, 'ts3');
		})
		.catch((err) => {
			log.error(`${this.info.name} error: ${err}`, 'ts3');
		});
};

module.exports.load = async () => {
	const { interval } = this.info.config;
	this.main();
	loaded = setInterval(async () => {
		this.main();
	}, convertToMiliseconds(interval));
};

module.exports.clientconnect = async (ev) => {
	const { client } = ev;
	if (client.type !== 1) {
		this.main();
	}
};

module.exports.clientdisconnect = async (ev) => {
	const { client } = ev;
	if (client.type !== 1) {
		this.main();
	}
};

module.exports.unload = () => {
	clearInterval(loaded);
};

module.exports.info = {
	name: 'Server name',
	description:
		'This plugin allows you to provide useful information to your server clients by changing the server name.',
	config: {
		enabled: true,
		data: {
			showQueryClients: false,
			serverName: 'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]',
			format: 'DD-MM-YYYY HH:mm'
		},
		interval: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 1,
			seconds: 0
		}
	}
};
