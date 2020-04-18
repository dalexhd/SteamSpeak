import router from '@/router';
import jwt from '../../http/requests/auth';

export default {
	find() {
		return new Promise((resolve, reject) => {
			jwt
				.find()
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
		const { dbid } = payload;
		return new Promise((resolve, reject) => {
			jwt
				.send(dbid)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	login({ commit }, payload) {
		const { token, dbid } = payload;
		return new Promise((resolve, reject) => {
			jwt
				.login(dbid, token)
				.then((response) => {
					// Set accessToken
					localStorage.setItem('accessToken', response.data.accessToken);

					localStorage.setItem('loggedIn', true);

					// Update user details
					commit('UPDATE_USER_INFO', response.data.userData, { root: true });

					// Set bearer token in axios
					commit('SET_BEARER', response.data.accessToken);

					// Navigate User to homepage
					router.push({
						name: 'admin:home'
					});
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	me({ commit }) {
		return new Promise((resolve, reject) => {
			jwt
				.me()
				.then((response) => {
					// Update user details
					commit('UPDATE_USER_INFO', response.data.userData, { root: true });

					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	getAcessToken() {
		return new Promise((resolve) => {
			jwt.getAcessToken().then((response) => {
				resolve(response);
			});
		});
	},
	logout() {
		if (localStorage.getItem('accessToken')) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('userInfo');
			localStorage.setItem('loggedIn', false);
			router.push({
				name: 'login'
			});
		}
	},
	// eslint-disable-next-line no-unused-vars
	fetchAccessToken({ commit }, payload) {
		return new Promise((resolve, reject) => {
			jwt
				.refreshToken(payload)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};
