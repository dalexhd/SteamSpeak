const Ts3 = require('../../TeamSpeak');
const { convertToMiliseconds } = require('../../../utils/time');
const log = require('../../../utils/log');

var loaded = false;

module.exports.main = async () => {
	const { data } = this.info.config;
	let info = await Ts3.serverInfo();
	let channels = await Ts3.channelList();
	let replacements = {
		'[PING]': info.virtualserver_total_ping,
		'[PACKETLOSS]': info.virtualserver_total_packetloss_total,
		'[CHANNELS]': info.virtualserver_channelsonline,
		'[UPLOAD]': info.virtualserver_total_bytes_uploaded,
		'[DOWNLOAD]': info.virtualserver_total_bytes_downloaded
	};
	data.forEach((channel) => {
		let name = channel.name;
		for (var key in replacements) {
			if (!replacements.hasOwnProperty(key)) continue;
			name = name.replace(key, replacements[key]);
		}
		if (channels.find((c) => c.cid === channel.channelId && c.name !== name)) {
			Ts3.channelEdit(channel.channelId, {
				channel_name: name
			});
			log.info(`multiFunction - ch[id: ${channel.channelId}] to: ${name}`, 'ts3');
		}
	});
};

module.exports.load = async () => {
	const { interval } = this.info.config;
	this.main();
	loaded = setInterval(async () => {
		this.main();
	}, convertToMiliseconds(interval));
};

module.exports.unload = () => {
	clearInterval(loaded);
};

module.exports.info = {
	name: 'multiFunction',
	desc: 'Multiple funcitons to show server related data.',
	config: {
		enabled: true,
		data: [
			{
				enabled: true,
				channelId: 18,
				name: '» Server ping: [PING]ms'
			},
			{
				enabled: true,
				channelId: 21,
				name: '» Server packet loss: [PACKETLOSS]%'
			},
			{
				enabled: true,
				channelId: 19,
				name: '» Channels count: [CHANNELS]'
			},
			{
				enabled: true,
				channelId: 24,
				name: '» Bytes uploaded: [UPLOAD]'
			},
			{
				enabled: true,
				channelId: 25,
				name: '» Bytes downloaded: [DOWNLOAD]'
			}
		],
		interval: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 5
		}
	}
};
