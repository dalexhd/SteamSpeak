import EventEmitter from 'events';

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn';

const tokenExpiryKey = 'tokenExpiry';

class AuthService extends EventEmitter {
	idToken = null;

	profile = null;

	tokenExpiry = null;

	// eslint-disable-next-line class-methods-use-this
	isAuthenticated() {
		return (
			new Date(Date.now()) < new Date(localStorage.getItem(tokenExpiryKey)) &&
			localStorage.getItem(localStorageKey) === 'true'
		);
	}
}

export default new AuthService();
