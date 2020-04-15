// eslint-disable-next-line import/named
import { backend } from '@/http/axios';
import axios from 'axios';

export default {
	find() {
		return backend.post('/auth/find');
	},
	send(dbid) {
		return backend.post('/auth/send', {
			dbid
		});
	},
	login(dbid, token) {
		return backend.post('/auth/login', {
			dbid,
			token
		});
	},
	me() {
		return backend.get('/auth/me');
	},
	getAcessToken() {
		return new Promise((resolve) => {
			resolve(localStorage.getItem('accessToken'));
		});
	},
	refreshToken(config) {
		// Here we use axios because if we use backend interface we will have a infinite loop.
		return axios.post('/auth/refresh-token', {}, config);
	}
};
