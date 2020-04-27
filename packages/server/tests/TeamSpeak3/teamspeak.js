/* eslint-disable no-undef */

const { TeamSpeak } = require('ts3-nodejs-library');
const config = require('../../config/teamspeak');

const ts3 = new TeamSpeak(config);

describe('TeamSpeak3', () => {
	afterAll(async () => {
		await ts3.quit();
	});
	describe('Conection', () => {
		it('Check if we have connection...', async () => {
			const data = await ts3.whoami();
			expect(data).not.toBe(null);
		});
		it('should verify parameters of #hostInfo()', async () => {
			const data = await ts3.hostInfo();
			expect(data).not.toBe(null);
		});
	});
	describe('Commands', () => {
		it('should verify parameters of #serverGroupClientList()', async () => {
			const data = ts3.serverGroupClientList(1);
			expect(data).not.toBe(null);
		});
		it('should verify parameters of #sendTextMessage()', async () => {
			const data = await ts3.sendTextMessage(10, 2, 'Test message');
			expect(data).not.toBe(null);
		});
	});
});
