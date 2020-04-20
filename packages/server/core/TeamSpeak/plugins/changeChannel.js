const Ts3 = require('../../TeamSpeak');
const { convertToMiliseconds } = require('../../../utils/time');
const log = require('../../../utils/log');
const Cache = require('../../Cache');

var loaded = [];

module.exports.main = async (channel) => {
	if (channel.enabled) {
		let key = (await Cache.get(`changeChannel:${channel.channelId}`)) || 0;
		Ts3.channelEdit(channel.channelId, channel.changes[key])
			.then(async () => {
				log.info(
					`changeChannel - ch[id: ${channel.channelId}] to: ${channel.changes[key].channel_name}`,
					'ts3'
				);
				await Cache.set(
					`changeChannel:${channel.channelId}`,
					channel.changes.length - 1 == key ? 0 : ++key
				);
			})
			.catch((err) => {
				log.error(`changeChannel - ch[id: ${channel.channelId}] Plugin error: ${err}`, 'ts3');
			});
	}
};

module.exports.load = async () => {
	const { data } = this.info.config;
	if (data.length > 0) {
		data.forEach(async (channel) => {
			if (channel.enabled) {
				this.main(channel);
				loaded[channel.channelId] = setInterval(async () => {
					this.main(channel);
				}, convertToMiliseconds(channel.interval));
			}
		});
	}
};

module.exports.unload = () => {
	loaded.forEach((load) => {
		clearInterval(load);
	});
	loaded = [];
};

module.exports.info = {
	name: 'changeChannel',
	desc: 'Change channels.',
	config: {
		enabled: true,
		data: [
			{
				enabled: true,
				channelId: 118,
				changes: [
					{
						channel_name: '[cspacer]Wellcome',
						channel_description: 'Wellcome'
					},
					{
						channel_name: '[cspacer]to',
						channel_description: 'to'
					},
					{
						channel_name: '[cspacer]SteamSpeak',
						channel_description: 'SteamSpeak'
					}
				],
				interval: {
					weeks: 0,
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 3
				}
			}
		]
	}
};
