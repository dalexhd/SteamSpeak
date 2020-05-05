/* eslint-disable no-undef */

import { TeamSpeak } from 'ts3-nodejs-library';
import config from '@config/teamspeak';

const instance = process.env.INSTANCE;

const Ts3 = new TeamSpeak(instance ? Object.assign(config, config.instances[instance]) : config);

describe('TeamSpeak3', () => {
	afterAll(async () => {
		await Ts3.quit();
	});
	describe('Conection', () => {
		it('Check if we have connection...', async () => {
			const data = await Ts3.whoami();
			expect(data).not.toBe(null);
		});
		it('should verify parameters of #hostInfo()', async () => {
			const data = await Ts3.hostInfo();
			expect(data).not.toBe(null);
		});
	});
	describe('Commands', () => {
		it('should verify parameters of #serverGroupClientList()', async () => {
			const data = Ts3.serverGroupClientList(1);
			expect(data).not.toBe(null);
		});
		it('should verify parameters of #sendTextMessage()', async () => {
			const data = await Ts3.sendTextMessage(10, 2, 'Test message');
			expect(data).not.toBe(null);
		});
	});
});
