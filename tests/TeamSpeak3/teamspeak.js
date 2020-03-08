/* global describe beforeEach it */

const { TeamSpeak } = require('ts3-nodejs-library');
const config = require('../../src/backend/config/teamspeak');

describe('TeamSpeak3', () => {
  let ts3 = null;

  beforeEach(async (done) => {
    ts3 = new TeamSpeak({
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
    done();
  });
  afterAll(async (done) => {
    done();
  });
  describe('Steam', () => {
    it('Can connect to the server', async (done) => {
      const data = await ts3.whoami();
      expect(data).not.toBe(null);
      done();
    });
  });
});
