import { TeamSpeak, TeamSpeakClient } from 'ts3-nodejs-library';
import config from '@config/teamspeak';
import '@utils/string';
import '@utils/teamspeak';
import log from '@utils/log';

const instance = process.env.INSTANCE;

const Ts3 = new TeamSpeak(instance ? Object.assign(config, config.instances[instance]) : config);
let initialized = false;

initEvents();

/**
 * Init events
 */
function initEvents(): void {
	Ts3.on('ready', onReady);
	Ts3.on('error', (err) => log.error(err.message, 'ts3'));
	Ts3.on('flooding', (err) => console.log('Flood protection activated', err.message));
	if (config.debug) {
		Ts3.on('debug', (ev) => {
			const { type, data } = ev;
			if (type === 'send') log.debug(`>>> ${data}`, 'ts3');
			if (type === 'receive') {
				if (data.startsWith('error')) log.debug(`<<< ${data}`, 'ts3');
				log.debug(`<<< ${data.length}`, 'ts3');
			}
		});
	}
}

/**
 * On connection ready
 */
function onReady(): void {
	if (!initialized) {
		const { server_id, channel_id } = config;
		Promise.all([
			Ts3.useBySid(server_id.toString() || '1'),
			Ts3.whoami().then(async (info) => {
				config.channel_id !== 1 && Ts3.clientMove(info.clientId, channel_id.toString());
				Ts3.bot = (await Ts3.getClientById(info.clientId)) as TeamSpeakClient;
			})
		])
			.then(() => {
				listenEvents();
			})
			.catch((err) => {
				log.error(err, 'ts3');
			});
		initialized = true;
	}
}

/**
 * Listen events
 */
function listenEvents(): void {
	Ts3.on('close', async () => {
		log.error('disconnected, trying to reconnect...', 'ts3');
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		Ts3.reconnect().catch(() => {});
		log.success('reconnected!', 'ts3');
	});
	beforeExit();
	instance ? Promise.all([Ts3.loadPlugins(), Ts3.watchPlugins()]) : Ts3.loadInstances();
}

/**
 * Before exit
 */
function beforeExit(): void {
	process.on('SIGINT', () => {
		Ts3.quit();
		process.exit(1);
	});
}

export { Ts3, TeamSpeakClient };
