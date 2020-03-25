import axios from '../../../axios/index';
import store from '../../../../store/store';

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
    axios.interceptors.response.use(
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
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  },
  login(email, pwd) {
    return axios.post('/api/auth/login', {
      email,
      password: pwd
    });
  },
  registerUser(name, email, pwd) {
    return axios.post('/api/auth/register', {
      displayName: name,
      email,
      password: pwd
    });
  },
  refreshToken() {
    return axios.post('/api/auth/refresh-token', {
      accessToken: localStorage.getItem('accessToKen')
    });
  }
};
