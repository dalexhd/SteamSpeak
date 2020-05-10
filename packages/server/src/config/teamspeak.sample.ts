export default {
	host: '127.0.0.1',
	queryport: 10011,
	serverport: 9987,
	protocol: 'raw',
	username: 'serveradmin',
	password: 'SteamSpeak',
	nickname: 'SteamSpeak',
	server_id: 1,
	channel_id: 1,
	debug: false,
	instances: {
		'first-instance': {
			nickname: 'SteamSpeak #1',
			channel_id: 1,
			enabled: true
		},
		'second-instance': {
			nickname: 'SteamSpeak #2',
			channel_id: 1,
			enabled: true
		}
	}
};
