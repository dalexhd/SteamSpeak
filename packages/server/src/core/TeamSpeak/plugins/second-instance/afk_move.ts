import { Ts3 } from '@core/TeamSpeak';
import { convertToMilliseconds } from '@utils/time';
import log from '@utils/log';
import Cache from '@core/Cache';

let loaded: ReturnType<typeof setInterval>;

export const main = async function (): Promise<void> {
	const { data } = info.config;
	const clients = await Ts3.clientList({ client_type: 0 });
	clients.forEach(async (client) => {
		if (client.isAfk(data.minTime) && client.cid !== data.dest) {
			Cache.set(`afkChecker:${client.databaseId}`, client.cid);
			client
				.move(data.dest)
				.then(() => {
					client.poke('You have been moved to an AFK channel!');
					log.info(
						`${info.name} (DBID: ${client.databaseId}) has been moved to the afk channel.`,
						'ts3'
					);
				})
				.catch((err) => {
					log.error(`${info.name} ch[id: ${data.dest}] error: ${err}`, 'ts3');
				});
		} else if (!client.isAfk(data.minTime) && client.cid === data.dest) {
			const cid = (await Cache.get(`afkChecker:${client.databaseId}`)) as string;
			if (cid !== undefined) {
				client.move(parseInt(cid));
				Cache.del(`afkChecker:${client.databaseId}`);
				client.poke('You have been moved back to your channel!');
				log.info(
					`${info.name} (DBID: ${client.databaseId}) has been moved back to previous channel.`,
					'ts3'
				);
			}
		}
	});
};

export const load = async function (): Promise<void> {
	const { interval } = info.config;
	loaded = setInterval(async () => {
		main();
	}, convertToMilliseconds(interval));
};

export const unload = function (): void {
	clearInterval(loaded);
};

export const clientdisconnect = async function (ev): Promise<void> {
	const { client } = ev;
	if (client.type !== 1) {
		Cache.del(`afkChecker:${client.databaseId}`);
	}
};

export const info: CommonPluginConfig = {
	name: 'AFK move',
	description:
		'This plugin allows you to automatically move afk people after x time to your desired channel.',
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
