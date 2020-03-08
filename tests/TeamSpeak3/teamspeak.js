/* global describe beforeEach it */

const { TeamSpeak } = require('ts3-nodejs-library');
const config = require('../../src/backend/config/teamspeak');

const ts3 = new TeamSpeak({
  protocol: 'ssh',
  host: config.ip,
  queryport: config.query_port,
  serverport: config.port,
  username: config.login,
  password: config.password,
  nickname: config.name,
  antispam: true,
  antispamtimer: 350,
});

describe('TeamSpeak3', () => {
  afterAll(async (done) => {
    await ts3.quit();
  });
  describe('Conection', () => {
    it('Check if we have connection...', async (done) => {
      const data = await ts3.whoami();
      expect(data).not.toBe(null);
      done();
    });
    it('should verify parameters of #hostInfo()', async (done) => {
      const data = await ts3.hostInfo();
      expect(data).not.toBe(null);
      done();
    });
  });
  describe('Commands', () => {
    it('should verify parameters of #serverGroupClientList()', async (done) => {
      const data = ts3.serverGroupClientList(1);
      expect(data).not.toBe(null);
      done();
    });
    it('should verify parameters of #sendTextMessage()', async (done) => {
      const data = await ts3.sendTextMessage(10, 2, 'Test message');
      expect(data).not.toBe(null);
      done();
    });
  });
});
