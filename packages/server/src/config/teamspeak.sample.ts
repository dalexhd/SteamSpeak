export default {
	host: '127.0.0.1',
	queryport: 10022,
	serverport: 9987,
	protocol: 'ssh',
	username: 'serveradmin',
	password: 'SteamSpeak',
	nickname: 'SteamSpeak',
	server_id: 1,
	channel_id: 123,
	debug: false,
	instances: {
		'first-instance': {
			nickname: 'SteamSpeak #1',
			channel_id: 0,
			enabled: true
		},
		'second-instance': {
			nickname: 'SteamSpeak #2',
			channel_id: 0,
			enabled: true
		}
	}
};
