import store from '@/store/store';
// eslint-disable-next-line import/named
import { backend } from '@/http/axios';

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(acessToken) {
  subscribers = subscribers.filter((callback) => callback(acessToken));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default {
  init() {
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
            store.dispatch('auth/fetchAccessToken').then((acessToken) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(acessToken);
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
  },
  login(email, pwd) {
    return backend.post('/auth/login', {
      email,
      password: pwd
    });
  },
  registerUser(name, email, pwd) {
    return backend.post('/auth/register', {
      displayName: name,
      email,
      password: pwd
    });
  },
  refreshToken() {
    return backend.post('/auth/refresh-token', {
      accessToken: localStorage.getItem('accessToKen')
    });
  }
};
