import router from '@/router';
import jwt from '../../http/requests/auth/jwt/index';

export default {
  // JWT
  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.email, payload.userDetails.password)
        .then((response) => {
          // If there's user data in response
          if (response.data.userData) {
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/');

            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);

            // Update user details
            commit('UPDATE_USER_INFO', response.data.userData, { root: true });

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  registerUserJWT({ commit }, payload) {
    const { displayName, email, password, confirmPassword } = payload.userDetails;

    return new Promise((resolve, reject) => {
      // Check confirm password
      if (password !== confirmPassword) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(displayName, email, password)
        .then((response) => {
          // Redirect User
          router.push(router.currentRoute.query.to || '/');

          // Update data in localStorage
          localStorage.setItem('accessToken', response.data.accessToken);
          commit('UPDATE_USER_INFO', response.data.userData, { root: true });

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise((resolve) => {
      jwt.refreshToken().then((response) => {
        resolve(response);
      });
    });
  }
};
