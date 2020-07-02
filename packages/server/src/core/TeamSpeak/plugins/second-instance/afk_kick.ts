import { Ts3 } from '@core/TeamSpeak';
import { convertToMilliseconds } from '@utils/time';
import log from '@utils/log';
import Cache from '@core/Cache';
import { ClientDisconnectEvent } from 'ts3-nodejs-library';

let loaded: ReturnType<typeof setInterval>;

export const main = async function (): Promise<void> {
	const { data } = info.config;
	const clients = await Ts3.clientList({ clientType: 0 });
	clients.forEach(async (client) => {
		if (client.isAfk(data.interval) && client.cid !== data.dest) {
			client.kickFromServer("You've been kicked out for being afk");
			log.info(`${info.name} (DBID: ${client.databaseId}) has been kicked for being afk.`, {
				type: 'ts3'
			});
		}
	});
};

export const load = async function (): Promise<void> {
	const { interval } = info.config;
	loaded = setInterval(async () => {
		main();
	}, convertToMilliseconds(interval));
};

export const unload = async function (): Promise<void> {
	clearInterval(loaded);
};

export const clientdisconnect = async function (ev: ClientDisconnectEvent): Promise<void> {
	const { client } = ev;
	if (client?.type === 1) {
		Cache.del(`afkChecker:${client.databaseId}`);
	}
};

export const info: CommonPluginConfig = {
	name: 'AFK kick',
	description: 'This plugin allows you to automatically kick afk people after x time.',
	config: {
		enabled: false,
		data: {
			ignoredGroups: [],
			ignoredChannels: [],
			interval: {
				weeks: 0,
				days: 0,
				hours: 0,
				minutes: 30,
				seconds: 0
			}
		},
		interval: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 10
		}
	}
};
