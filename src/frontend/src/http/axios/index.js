/* eslint-disable import/prefer-default-export */
// axios
import axios from 'axios';
import store from '@/store/store';

const backend = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
	headers: {
		'Access-Control-Allow-Headers': 'X-CSRF-Token',
		'X-Requested-With': 'XMLHttpRequest'
	}
});

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(acessToken) {
	subscribers = subscribers.filter((callback) => callback(acessToken));
}

function addSubscriber(callback) {
	subscribers.push(callback);
}

backend.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

backend.interceptors.response.use(
	(response) => response,
	(error) => {
		// const { config, response: { status } } = error
		const { config, response } = error;
		const originalRequest = config;

		// if (status === 401) {
		if (response && response.status === 401) {
			if (!isAlreadyFetchingAccessToken) {
				isAlreadyFetchingAccessToken = true;
				store
					.dispatch('auth/fetchAccessToken', config)
					.then((acessToken) => {
						isAlreadyFetchingAccessToken = false;
						onAccessTokenFetched(acessToken);
					})
					.catch(() => {
						store.dispatch('auth/logout');
					});
			}
			const retryOriginalRequest = new Promise((resolve) => {
				addSubscriber((acessToken) => {
					originalRequest.headers.Authorization = `Bearer ${acessToken}`;
					resolve(backend(originalRequest));
				});
			});
			return retryOriginalRequest;
		}
		return Promise.reject(error);
	}
);

export { backend };
