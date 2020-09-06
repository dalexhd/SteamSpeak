import { Ts3 } from '@core/TeamSpeak';
import { convertToMilliseconds } from '@utils/time';
import log from '@utils/log';
import moment from 'moment';
import { ClientDisconnectEvent, ClientConnectEvent } from 'ts3-nodejs-library';

let loaded: ReturnType<typeof setInterval>;

export const main = async function (): Promise<void> {
	const { data } = info.config;
	const serverInfo = await Ts3.serverInfo();
	const edited_name = {
		'[ONLINE]': data.showQueryClients
			? serverInfo.virtualserverClientsonline
			: serverInfo.virtualserverClientsonline - serverInfo.virtualserverQueryclientsonline,
		'[MAX_CLIENTS]': serverInfo.virtualserverMaxclients,
		'[DATE]': moment().format(data.format),
		'[%]': Math.round(
			((data.showQueryClients
				? serverInfo.virtualserverClientsonline
				: serverInfo.virtualserverClientsonline - serverInfo.virtualserverQueryclientsonline) /
				serverInfo.virtualserverMaxclients) *
				100
		)
	};
	let name = data.serverName;
	for (const key in edited_name) {
		if (!edited_name.hasOwnProperty(key)) continue;
		name = name.replace(key, edited_name[key]);
	}
	Ts3.serverEdit({
		virtualserverName: name
	})
		.then(() => {
			log.info(`${info.name} to: ${name}`, { type: 'ts3' });
		})
		.catch((err) => {
			log.error(`${info.name} error: ${err}`, { type: 'ts3' });
		});
};

export const load = async function (): Promise<void> {
	const { interval } = info.config;
	main();
	loaded = setInterval(async () => {
		main();
	}, convertToMilliseconds(interval));
};

export const clientconnect = async function (ev: ClientConnectEvent): Promise<void> {
	const { client } = ev;
	if (client.type === 0) {
		main();
	}
};

export const clientdisconnect = async function (ev: ClientDisconnectEvent): Promise<void> {
	const { client } = ev;
	if (client?.type === 0) {
		main();
	}
};

export const unload = function (): void {
	clearInterval(loaded);
};

export const info: CommonPluginConfig = {
	name: 'Server Name',
	description:
		'This plugin allows you to provide useful information to your server clients by changing the server name.',
	config: {
		enabled: false,
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
