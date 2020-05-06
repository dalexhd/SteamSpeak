import { Ts3 } from '@core/TeamSpeak';
import { convertToMiliseconds } from '@utils/time';
import log from '@utils/log';
import Cache from '@core/Cache';

const loaded: Array<ReturnType<typeof setInterval>> = [];

export const main = async function (channel): Promise<void> {
	if (channel.enabled) {
		let key = parseInt((await Cache.get(`changeChannel:${channel.channelId}`)) || '0');
		Ts3.channelEdit(channel.channelId, channel.changes[key])
			.then(async () => {
				log.info(
					`${info.name} ch[id: ${channel.channelId}] to: ${channel.changes[key].channel_name}`,
					'ts3'
				);
				await Cache.set(
					`changeChannel:${channel.channelId}`,
					channel.changes.length - 1 == key ? 0 : ++key
				);
			})
			.catch((err) => {
				if (err.id === 771) {
					return Cache.set(
						`changeChannel:${channel.channelId}`,
						channel.changes.length - 1 == key ? 0 : ++key
					);
				}
				log.error(`${info.name} ch[id: ${channel.channelId}] error: ${err}`, 'ts3');
			});
	}
};

export const load = async function (): Promise<void> {
	const { data } = info.config;
	try {
		if (data.length > 0) {
			data.forEach(async (channel) => {
				if (channel.enabled) {
					main(channel);
					loaded[channel.channelId] = setInterval(async () => {
						main(channel);
					}, convertToMiliseconds(channel.interval));
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const unload = function (): void {
	loaded.forEach((load) => {
		clearInterval(load);
	});
};

export const info: UncommonPluginConfig = {
	name: 'Change channel',
	description: 'This plugin allows you to change multiple channels name at diferent interval.',
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
