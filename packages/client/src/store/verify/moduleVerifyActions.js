import verify from '../../http/requests/verify';

export default {
	// eslint-disable-next-line no-unused-vars
	check({ commit }, payload) {
		const { secret } = payload;
		return new Promise((resolve, reject) => {
			verify
				.check(secret)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// eslint-disable-next-line no-unused-vars
	send({ commit }, payload) {
		const { dbid, secret } = payload;
		return new Promise((resolve, reject) => {
			verify
				.send(dbid, secret)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// eslint-disable-next-line no-unused-vars
	login({ commit }, payload) {
		const { token, dbid, secret } = payload;
		return new Promise((resolve, reject) => {
			verify
				.login(token, dbid, secret)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};
