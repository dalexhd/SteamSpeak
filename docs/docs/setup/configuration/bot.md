---
id: bot
title: Bot configuration
---

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import Alert from '@site/src/components/Alert';
import Tabs from '@theme/Tabs';
import Field from '@site/src/components/Field';
import Fields from '@site/src/components/Fields';
import Steps from '@site/src/components/Steps';

Here you will find a complete guide to configure your SteamSpeak bot. Follow the steps below, and you'll get it running in less than 20 minutes. 🚀

## Initial configuration folder structure

All the configuration files of SteamSpeak are stored in the `packages/server/src/config` directory. They are separated into multiple files to make your installation process as delightful as possible.
```
📦packages
 ┗ 📂server
 ┃ ┣ 📂node_modules
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ 📜cache.sample.ts
 ┃ ┃ ┃ ┣ 📜database.sample.ts
 ┃ ┃ ┃ ┣ 📜language.sample.ts
 ┃ ┃ ┃ ┣ 📜steam.sample.ts
 ┃ ┃ ┃ ┣ 📜teamspeak.sample.ts
 ┃ ┃ ┃ ┣ 📜website.sample.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂core
 ┃ ┃ ┣ 📂locales
 ┃ ┃ ┣ 📂tests
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┗ 📂utils
 ┃ ┗ ...
 ┗ ...
 ```

## Create the configuration files

You may notice that all the configuration files name ends with `.sample.js`. This is to prevent an accidental configuration push to GitHub.

To rename those configuration files, execute the following command in your SteamSpeak directory:

<CodeBlock className="language-bash" path="~/SteamSpeak">
  make config
</CodeBlock>
<CodeExplanation>
  <ol>
    <li>Create <b>packages/server/src/config/old.config</b> directory if it's not created yet.</li>
    <li>Create a restoration point by coping old non <b>*.sample.ts</b> files to <b>packages/server/src/config/old.config</b> directory.</li>
    <li>Copy <b>*.sample.ts</b> to <b>packages/server/src/config</b>, but removing that <b>.sample</b> file name part.</li>
  </ol>
</CodeExplanation>

This command will generate these new files/directories inside `packages/server/src/config` directory.

```
📦packages
 ┗ 📂server
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ + 📂old.config
 ┃ ┃ ┃ ┣ + 📜cache.ts
 ┃ ┃ ┃ ┣ + 📜database.ts
 ┃ ┃ ┃ ┣ + 📜language.ts
 ┃ ┃ ┃ ┣ + 📜steam.ts
 ┃ ┃ ┃ ┣ + 📜teamspeak.ts
 ┃ ┃ ┃ ┣ + 📜website.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┗ ...
 ┃ ┗ ...
 ┗ ...
 ```

## Edit your configuration files

<Alert type="warning" closable="true">

**Do not share any of the following configuration files to anyone.** Someone can literally break your TeamSpeak/Steam hard work in less than 1 minute.

</Alert>

Navigate to `packages/server/config` directory and modify previusly generated files.

<Steps headingDepth={3}>
<Tabs
  block
  className="rounded"
  defaultValue="cache"
  values={[
    { label: `Cache`, value: 'cache' },
    { label: 'Database', value: 'database' },
    { label: 'Language', value: 'language' },
    { label: 'Steam', value: 'steam' },
    { label: 'TeamSpeak', value: 'teamspeak' },
    { label: 'Website', value: 'website' }
  ]}
>
<TabItem value="cache">

<Alert type="info">

SteamSpeak uses **Redis** as caching solution. Follow  <a href="https://www.digitalocean.com/community/tutorial_collections/how-to-install-and-secure-redis" target="_blank" rel="noopener noreferrer">this tutorial</a> to get it working on your server.

</Alert>

```typescript title=&sim;/SteamSpeak/packages/server/src/config/cache.ts
export default {
	host: '127.0.0.1',
	port: 6379,
	debug: false
};
```

<Fields filters={true}>
<Field
  defaultValue={"127.0.0.1"}
  enumValues={null}
  examples={["127.0.0.1", "172.26.0.1", "192.168.1.22", "217.127.3.11"]}
  groups={[]}
  name={"host"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
>

#### host
The host to connect to.
</Field>
<Field
  defaultValue={6379}
  enumValues={null}
  examples={[6379, 4452]}
  groups={[]}
  name={"port"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"number"}
  unit={null}
  warnings={[]}
>

#### port
The port of the Redis instance.
</Field>
<Field
  defaultValue={false}
  enumValues={null}
  examples={[false, true]}
  groups={[]}
  name={"debug"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"boolean"}
  unit={null}
  warnings={[]}
>

#### debug
Debug redis connection.
</Field>
</Fields>
</TabItem>
<TabItem value="database">

<Alert type="info">

SteamSpeak uses **MongoDB** as database solution. Follow  <a href="https://www.digitalocean.com/community/tutorial_collections/33" target="_blank" rel="noopener noreferrer">this tutorial</a> to get it working on your server.

</Alert>


```typescript title=&sim;/SteamSpeak/packages/server/src/config/database.ts
export default {
	host: 'localhost',
	port: 27017,
	srv: false,
	user: '',
	password: '',
	database: 'steam_speak',
	opts: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
};
```

<Fields filters={true}>
<Field
  defaultValue={"localhost"}
  enumValues={null}
  examples={["localhost", "127.0.0.1", "172.26.0.1", "192.168.1.22", "217.127.3.11"]}
  groups={[]}
  name={"host"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### host
The host to connect to.
</Field>
<Field
  defaultValue={27017}
  enumValues={null}
  examples={[27017, 4452]}
  groups={[]}
  name={"port"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"number"}
  unit={null}
  warnings={[]}
>

#### port
The port of the MongoDB instance.
</Field>
<Field
  defaultValue={false}
  enumValues={null}
  examples={[false, true]}
  groups={[]}
  name={"srv"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"boolean"}
  link={["Mongoosejs documentation", "https://docs.mongodb.com/manual/reference/connection-string/#dns-seedlist-connection-format"]}
  unit={null}
  warnings={[]}
  >

#### srv
Use tsl (or the equivalent ssl) connection.
</Field>
<Field
  enumValues={null}
  examples={["admin", "root"]}
  groups={[]}
  name={"user"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
>

#### user
Username for authentication.
</Field>
<Field
  enumValues={null}
  examples={["1234", "admin", "abc123"]}
  groups={[]}
  name={"password"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
>

#### password
Password for authentication.
</Field>
<Field
  defaultValue={"steam_speak"}
  enumValues={null}
  examples={["steam_speak", "steamspeak"]}
  groups={[]}
  name={"database"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
>

#### database
The name of the database we want to use.
</Field>
<Field
  defaultValue={{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }}
  enumValues={null}
  examples={null}
  groups={[]}
  name={"opts"}
  relevantWhen={null}
  required={false}
  type={"object"}
  link={["Mongoosejs documentation", "https://mongoosejs.com/docs/connections.html#options"]}
  unit={null}
  warnings={[]}
>

#### opts
Optional options of the connection.
</Field>
</Fields>
</TabItem>
<TabItem value="language">

```typescript title=&sim;/SteamSpeak/packages/server/src/config/language.ts
export default 'en';
```

<Fields>
<Field
  defaultValue={"en"}
  enumValues={null}
  examples={["en", "es"]}
  groups={[]}
  name={"language"}
  relevantWhen={null}
  required={true}
  type={"string"}
  link={false}
  unit={null}
  warnings={[]}
>

#### language
Optional options of the connection.
</Field>
</Fields>
</TabItem>
<TabItem value="steam">

```typescript title=&sim;/SteamSpeak/packages/server/src/config/steam.ts
export default {
	username: '',
	password: '',
	shared_secret: '',
	bot_name: '[SteamSpeak] - BOT',
	language: 'english',
	debug: false
};
```

<Fields filters={true}>
<Field
  enumValues={null}
  examples={["bot123"]}
  groups={[]}
  name={"username"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[{text: "This is not the bot name"}]}
  link={["You can grab your username at the top of this page", "https://store.steampowered.com/account/"]}
  >

#### username
The username of your steam bot.
</Field>
<Field
  enumValues={null}
  examples={["1234", "admin", "abc123"]}
  groups={[]}
  name={"password"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### password
The password of your steam bot.
</Field>
<Field
  enumValues={null}
  examples={null}
  groups={[]}
  name={"shared_secret"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### shared_secret

<Alert type="info">

Follow [this tutorial][docs.getting-started.2fa] if you don't know how to find your shared secret.

</Alert>

The shared secret of your steam bot.
</Field>
<Field
  defaultValue={"[SteamSpeak] - BOT"}
  enumValues={null}
  examples={["Clan - Bot", "[BOT] PvPlayers", "BOT gaming.pl"]}
  groups={[]}
  name={"bot_name"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### bot_name
The profile name to of the bot.
</Field>
<Field
  defaultValue={"english"}
  enumValues={null}
  examples={["english", "spanish"]}
  groups={[]}
  name={"language"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### language
The STEAM rich presence locale.
</Field>
<Field
  defaultValue={false}
  enumValues={null}
  examples={[true, false]}
  groups={[]}
  name={"debug"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"boolean"}
  unit={null}
  warnings={[]}
  >

#### debug
Debug steam connection.
</Field>
</Fields>
</TabItem>
<TabItem value="teamspeak">

```typescript title=&sim;/SteamSpeak/packages/server/src/config/teamspeak.ts
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
```

<Fields filters={true}>
<Field
  defaultValue={"127.0.0.1"}
  enumValues={null}
  examples={["127.0.0.1", "172.26.0.1", "192.168.1.22", "217.127.3.11"]}
  groups={[]}
  name={"host"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### host
The host to connect to.
</Field>
<Field
  defaultValue={10011}
  enumValues={null}
  examples={[10011, 10022]}
  groups={[]}
  name={"queryport"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"number"}
  unit={null}
  warnings={[]}
  >

#### queryport
The queryport to use.
</Field>
<Field
  defaultValue={9987}
  enumValues={null}
  examples={[9987, 9988]}
  groups={[]}
  name={"serverport"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"number"}
  unit={null}
  warnings={[]}
  >

#### serverport
The serverport to use.
</Field>
<Field
  defaultValue={"raw"}
  enumValues={null}
  examples={["raw", "ssh"]}
  groups={[]}
  name={"protocol"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### protocol
The query protocol to use. (ssh recommended)
</Field>
<Field
  defaultValue={"serveradmin"}
  enumValues={null}
  examples={["serveradmin", "admin", "admin", "root"]}
  groups={[]}
  name={"username"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### username
The username to login with.
</Field>
<Field
  enumValues={null}
  examples={["1234", "admin", "abc123"]}
  groups={[]}
  name={"password"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### password
The password to use with the login.
</Field>
<Field
  defaultValue={"SteamSpeak"}
  enumValues={null}
  examples={["Clan - Bot", "[BOT] PvPlayers", "BOT gaming.pl"]}
  groups={[]}
  name={"nickname"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### nickname
The nickname to connect with.
</Field>
<Field
  defaultValue={1}
  enumValues={null}
  examples={[1, 2, 10]}
  groups={[]}
  name={"server_id"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"number"}
  unit={null}
  warnings={[]}
  >

#### server_id
The server id of the server.
</Field>
<Field
  defaultValue={1}
  enumValues={null}
  examples={[1, 2, 10]}
  groups={[]}
  name={"channel_id"}
  path={null}
  relevantWhen={null}
  required={false}
  type={"number"}
  unit={null}
  warnings={[]}
  >

#### channel_id
The channel where the bot stays in.
</Field>
<Field
  defaultValue={false}
  enumValues={null}
  examples={[false, true]}
  groups={[]}
  name={"debug"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"boolean"}
  unit={null}
  warnings={[]}
  >

#### debug
The channel where the bot stays in.
</Field>
<Field
  enumValues={null}
  groups={[]}
  name={"instances"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"object"}
  unit={null}
  warnings={[]}
  >

#### instances
Multiple instances definition.
</Field>
</Fields>
</TabItem>
<TabItem value="website">

```typescript title=&sim;/SteamSpeak/packages/server/src/config/website.ts
export default {
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
	admins: [''] //Array of admin uids that should be ablo to login into the web admin panel.
};
```
<Fields>

<Field
  defaultValue={3000}
  enumValues={null}
  examples={[3000, 3001]}
  groups={[]}
  name={"port"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"number"}
  unit={null}
  warnings={[]}
>

#### port
The port of the Redis instance.
</Field>
<Field
  defaultValue={"localhost"}
  enumValues={null}
  examples={["https://my-website.com", "https://my-website.com/panel", "172.26.0.1", "192.168.1.22", "217.127.3.11"]}
  groups={[]}
  name={"host"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
>

#### hostname
The host to connect to.
</Field>
<Field
  enumValues={null}
  examples={null}
  groups={[]}
  name={"cors"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"object"}
  unit={null}
  warnings={[]}
  link={["Cors options", "https://github.com/expressjs/cors#configuration-options"]}
>

#### cors
Cors options.
</Field>
<Field
  enumValues={null}
  examples={null}
  groups={[]}
  name={"jwt"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"object"}
  unit={null}
  warnings={[]}
  link={["JWT options", "https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback"]}
>

#### jwt
JWT options.
</Field>
<Field
  defaultValue={['']}
  enumValues={null}
  examples={[['zLNrbjWLI6+aNx39EjUPqRdmJCw='], ['deM1jU25eo9Jb2z3vkyG77IRjdk=', 'f6CWPSyV8Ot+JtkVKB4MUJCmRnw=']]}
  groups={[]}
  name={"admins"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"array"}
  unit={null}
  warnings={[]}
>

#### admins
Admin uids that should be able to login into the web admin panel.
</Field>
</Fields>
</TabItem>
</Tabs>
</Steps>

[docs.getting-started.2fa]: /SteamSpeak/guides/getting-started/enable-steam-two-factor-authentication/
