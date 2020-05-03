import Redis from 'ioredis';
import config from '@config/cache';
import log from '@utils/log';
import Events from '@core/Events';
const Cache = new Redis(config.port || 6379, config.host || '127.0.0.1');
const Pub = new Redis(config.port || 6379, config.host || '127.0.0.1');

const EVENT_SET = '__keyevent@0__:set';
const EVENT_EXPIRED = '__keyevent@0__:expired';
const EVENT_DEL = '__keyevent@0__:del';

Cache.on('ready', function () {
	log.success('Connected to redis.', 'cache');
});

Cache.on('error', function (error) {
	log.error(`Error while connecting to redis. ${error.message}`, 'cache');
	process.exit(1);
});

Pub.config('set', 'notify-keyspace-events', 'KEA');

Pub.on('message', async (channel, key, paylaod) => {
	let value = await Cache.get(key);
	switch (channel) {
		case EVENT_SET:
			if (!key.includes('shadow:')) Cache.set(`shadow:${key}`, paylaod);
			if (config.debug) log.info(`Key "${key}" set!`, 'cache');
			break;
		case EVENT_EXPIRED:
			value = await Cache.get(`shadow:${key}`);
			if (value) {
				Events.emit(`${key.split(':')[0]}Expired`, value);
				if (config.debug) log.info(`shadow:${key}`, 'cache');
			}
			if (config.debug) log.info(`Key "${key}" expired!`, 'cache');
			break;
		case EVENT_DEL:
			if (!key.includes('shadow:')) Cache.del(`shadow:${key}`);
			if (config.debug) log.info(`Key "${key}" deleted!`, 'cache');
			break;
	}
});

Pub.subscribe(EVENT_SET, EVENT_EXPIRED, EVENT_DEL);

export default Cache;
