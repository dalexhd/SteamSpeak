import { Ts3 } from '@core/TeamSpeak';
import { convertToMilliseconds } from '@utils/time';
import log from '@utils/log';
import moment from 'moment';

let loaded: ReturnType<typeof setInterval>;

export const main = async function (): Promise<void> {
	const { data } = this.info.config;
	const info = await Ts3.serverInfo();
	const edited_name = {
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
	for (const key in edited_name) {
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

export const load = async function (): Promise<void> {
	const { interval } = this.info.config;
	this.main();
	loaded = setInterval(async () => {
		this.main();
	}, convertToMilliseconds(interval));
};

export const clientconnect = async function (ev): Promise<void> {
	const { client } = ev;
	if (client.type !== 1) {
		this.main();
	}
};

export const clientdisconnect = async function (ev): Promise<void> {
	const { client } = ev;
	if (client.type !== 1) {
		this.main();
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
