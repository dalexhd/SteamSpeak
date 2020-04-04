/* eslint-disable import/prefer-default-export */
// axios
import axios from 'axios';

const backend = axios.create({
	baseURL: '/api',
	headers: {
		'Access-Control-Allow-Headers': 'X-CSRF-Token',
		'X-Requested-With': 'XMLHttpRequest'
	}
});

export { backend };
