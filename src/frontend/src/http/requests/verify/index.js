// eslint-disable-next-line import/named
import { backend } from '@/http/axios';

export default {
	check(secret) {
		return backend.post(`/verify/check`, {
			secret
		});
	},
	send(dbid, secret) {
		return backend.post(`/verify/send`, {
			dbid,
			secret
		});
	},
	login(token, dbid, secret) {
		return backend.post(`/verify/login`, {
			token,
			dbid,
			secret
		});
	}
};
