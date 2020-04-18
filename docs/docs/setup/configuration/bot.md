---
id: bot
title: Bot configuration
---

All the configuration files of SteamSpeak are stored in the `packages/server/config` directory. They are separated into multiple files to make your installation process as delightful as possible.

## Create the configuration files

You may notice that all the configuration files name ends with `.sample.js`. This is to prevent an accidental configuration push to github.

To rename those configuration files, execute the following command in your SteamSpeak directory:

```bash
make config
```

## Edit your configuration files
Navigate to `packages/server/config` directory and modify previusly generated files.

### Cache configuration

```javascript
module.exports = {
  host: '127.0.0.1',
  port: 6379,
  debug: false
};
```

**Options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `host` | `string` | `127.0.0.1` | The host to connect to. |
| `port` | `number` | 6379 | The port of the Redis instance. |
| `debug` | `boolean` | false | Debug redis connection. |

### Database configuration

```javascript
module.exports = {
  host: 'localhost',
  port: '27017',
  user: '',
  password: '',
  database: 'steam_speak',
  opts: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
};
```

**Options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `host` | `string` | `localhost` | The host to connect to. |
| `port` | `number` | `27017` | The port of the MongoDB instance. |
| `user` | `string` | | Username for authentication. |
| `password` | `string` | | Password for authentication. |
| `database` | `string` | `steam_speak` | The name of the database we want to use. |
| `opts` | `object` | `{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }` | Optional options of the connection. |

### Steam configuration

```javascript
module.exports = {
  username: '',
  password: '',
  shared_secret: '',
  bot_name: '',
  language: 'english',
  debug: false
};
```

**Options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `username` | `string` |  | The username of your steam bot. |
| `password` | `string` |  | The password of your steam bot. |
| `shared_secret` | `string` | | The shared secret of your steam bot. |
| `bot_name` | `string` | `[SteamSpeak] - BOT` | The profile name to of the bot. |
| `language` | `string` | `english` | The STEAM rich presence locale. |
| `debug` | `boolean` | `false` | Debug steam connection. |


### TeamSpeak configuration

```javascript
module.exports = {
  ip: '127.0.0.1',
  query_port: 10022,
  port: 9987,
  protocol: 'ssh',
  login: 'serveradmin',
  password: 'SteamSpeak',
  name: 'SteamSpeak',
  server_id: 1,
  channel_id: 1,
  debug: false
};
```

**Options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `ip` | `string` | `127.0.0.1` | The host to connect to. |
| `query_port` | `number` | `raw=10011 ssh=10022` | The queryport to use. |
| `port` | `number` | `9987` | The server to select upon connect. |
| `protocol` | `string` | `raw` | The query protocol to use. (ssh recommended) |
| `login` | `string` | `serveradmin` | The username to login with. |
| `password` | `string` | | The password to use with the login. |
| `name` | `string` | `SteamSpeak` | The nickname to connect with. |
| `server_id` | `number` | `1` | The server id of the server. |
| `channel_id` | `number` | `1` | The channel where the bot stays in. |
| `debug` | `boolean` | `false` | Debug teamspeak connection. |


### Web server configuration

This web server configuration file is located at `src/server/config/website.js`

```javascript
module.exports = {
	port: 3000,
	hostname: 'localhost', //Ex: https://my-website.com (without last slash)
	cors: {
    /**
     * @see https://github.com/expressjs/cors#configuration-options
     */
    origin: ['*'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
	},
	jwt: {
		/**
		 * @see https://randomkeygen.com/
		 */
		secret: 'put a secret key here',
		options: {
			expiresIn: '2h'
		}
	},
	admins: []
};
```

**Options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `port` | `number` | `3000` | The host to connect to. |
| `hostname` | `string` | `localhost` | The queryport to use. |
| `cors` | `object` |  | Cors options. See https://github.com/expressjs/cors#configuration-options |
| `jwt` | `object` |  | JWT options |
| `admins` | `array` |  | Admin uids that should be able to login into the web admin panel. |
