import { Ts3 } from '@core/TeamSpeak';
import { convertToMiliseconds } from '@utils/time';
import log from '@utils/log';

let loaded: ReturnType<typeof setInterval>;

export const main = async function (): Promise<void> {
	const { data } = info.config;
	const serverInfo = await Ts3.serverInfo();
	const replacements = {
		'[PING]': serverInfo.virtualserver_total_ping,
		'[PACKETLOSS]': serverInfo.virtualserver_total_packetloss_total,
		'[CHANNELS]': serverInfo.virtualserver_channelsonline,
		'[UPLOAD]': serverInfo.virtualserver_total_bytes_uploaded,
		'[DOWNLOAD]': serverInfo.virtualserver_total_bytes_downloaded
	};
	data.forEach((channel) => {
		let name = channel.name;
		for (const key in replacements) {
			if (!replacements.hasOwnProperty(key)) continue;
			name = name.replace(key, replacements[key]);
		}
		Ts3.channelEdit(channel.channelId, {
			channel_name: name
		})
			.then(() => {
				log.info(`${info.name} ch[id: ${channel.channelId}] to: ${name}`, 'ts3');
			})
			.catch((err) => {
				if (err.id === 771) return;
				log.error(`${info.name} ch[id: ${channel.channelId}] error: ${err}`, 'ts3');
			});
	});
};

export const load = async function (): Promise<void> {
	const { interval } = info.config;
	main();
	loaded = setInterval(async () => {
		main();
	}, convertToMiliseconds(interval));
};

export const unload = function (): void {
	clearInterval(loaded);
};

export const info: CommonPluginConfig = {
	name: 'Multi function',
	description:
		'This plugin allows you to display relevant server information on the configured channels.',
	config: {
		enabled: true,
		data: [
			{
				enabled: '5atrue',
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
				channelId: 16,
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
