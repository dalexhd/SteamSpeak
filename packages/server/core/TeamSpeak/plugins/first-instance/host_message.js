const Ts3 = require('../../../TeamSpeak');
const { convertToMiliseconds } = require('../../../../utils/time');
const log = require('../../../../utils/log');
const moment = require('moment');

var loaded = false;

module.exports.main = async () => {
	const { data } = this.info.config;
	let info = await Ts3.serverInfo();
	let replacements = {
		'[SERVER_ONLINE]': data.showQueryClients
			? info.virtualserver_clientsonline
			: info.virtualserver_clientsonline - info.virtualserver_queryclientsonline,
		'[SERVER_MAX_CLIENTS]': info.virtualserver_maxclients,
		'[DATE]': moment().format(data.format),
		'[%]': Math.round(
			((data.showQueryClients
				? info.virtualserver_clientsonline
				: info.virtualserver_clientsonline - info.virtualserver_queryclientsonline) /
				info.virtualserver_maxclients) *
				100
		)
	};
	let message = data.hostMessage;
	for (var key in replacements) {
		if (!replacements.hasOwnProperty(key)) continue;
		message = message.replace(key, replacements[key]);
	}
	Ts3.serverEdit({
		virtualserver_hostmessage: message
	}).catch((err) => {
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
	name: 'Host message',
	desc: 'Change server name.',
	config: {
		enabled: true,
		data: {
			showQueryClients: false,
			hostMessage: `
			Wellcome to [b]my server[/b]![b][color=orange][SERVER_ONLINE]/[SERVER_MAX_CLIENTS][/color][/b] users online!
			[b][url=https://git.io/JfLyF][color=orange]Visit github[/color][/url][/b]`
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
