import auth0 from 'auth0-js';
import EventEmitter from 'events';
import authConfig from '@/../auth_config.json';

import store from '@/store/store';

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn';

const tokenExpiryKey = 'tokenExpiry';
const loginEvent = 'loginEvent';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin + process.env.BASE_URL}callback`,
  clientID: authConfig.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
});

class AuthService extends EventEmitter {
  idToken = null;

  profile = null;

  tokenExpiry = null;

  // Starts the user login flow
  // eslint-disable-next-line class-methods-use-this
  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          alert(`${err.error}. Detailed error can be found in console.`);
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    localStorage.setItem(tokenExpiryKey, this.tokenExpiry);
    localStorage.setItem(localStorageKey, 'true');

    store.commit('UPDATE_USER_INFO', {
      displayName: this.profile.name,
      email: this.profile.email,
      photoURL: this.profile.picture,
      providerId: this.profile.sub.substr(0, this.profile.sub.indexOf('|')),
      uid: this.profile.sub
    });

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    // reject can be used as parameter in promise for using reject
    return new Promise((resolve) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        // return reject("Not logged in");
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          // reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(tokenExpiryKey);
    localStorage.removeItem('userInfo');

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: window.location.origin + process.env.BASE_URL
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  // eslint-disable-next-line class-methods-use-this
  isAuthenticated() {
    return (
      new Date(Date.now()) < new Date(localStorage.getItem(tokenExpiryKey)) &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }
}

export default new AuthService();
