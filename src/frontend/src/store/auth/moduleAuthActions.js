import jwt from '../../http/requests/auth/jwt/index';

import firebase from 'firebase/app';
import 'firebase/auth';
import router from '@/router';

export default {
  loginAttempt({ dispatch }, payload) {
    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    };

    // If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {
      // Change firebase Persistence
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)

        // If success try to login
        .then(() => {
          dispatch('login', newPayload);
        })

        // If error notify
        .catch(err => {
          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation();

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    } else {
      // Try to login
      dispatch('login', newPayload);
    }
  },
  login({ commit, state, dispatch }, payload) {
    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      // Close animation if passed as payload
      if (payload.closeAnimation) payload.closeAnimation();

      return payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
    }

    // Try to sigin
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)

      .then(
        result => {
          // Set FLAG username update required for updating username
          let isUsernameUpdateRequired = false;

          // if username is provided and updateUsername FLAG is true
          // set local username update FLAG to true
          // try to update username
          if (payload.updateUsername && payload.userDetails.displayName) {
            isUsernameUpdateRequired = true;

            dispatch('updateUsername', {
              user: result.user,
              username: payload.userDetails.displayName,
              notify: payload.notify,
              isReloadRequired: true
            });
          }

          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation();

          // if username update is not required
          // just reload the page to get fresh data
          // set new user data in localstorage
          if (!isUsernameUpdateRequired) {
            router.push(router.currentRoute.query.to || '/');
            commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
          }
        },
        err => {
          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation();

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        }
      );
  },

  // Google Login
  loginWithGoogle({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      return payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  // Facebook Login
  loginWithFacebook({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.FacebookAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  // Twitter Login
  loginWithTwitter({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.TwitterAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  // Github Login
  loginWithGithub({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.GithubAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },
  registerUser({ dispatch }, payload) {
    // create user using firebase
    return firebase
      .auth()
      .createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
      .then(
        () => {
          payload.notify({
            title: 'Account Created',
            text: 'You are successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          });

          const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify,
            updateUsername: true
          };
          dispatch('login', newPayload);
        },
        error => {
          payload.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        }
      );
  },
  updateUsername({ commit }, payload) {
    return payload.user
      .updateProfile({
        displayName: payload.displayName
      })
      .then(() => {
        // If username update is success
        // update in localstorage
        const newUserData = { ...payload.user.providerData[0] };
        newUserData.displayName = payload.displayName;
        commit('UPDATE_USER_INFO', newUserData, { root: true });

        // If reload is required to get fresh data after update
        // Reload current page
        if (payload.isReloadRequired) {
          router.push(router.currentRoute.query.to || '/');
        }
      })
      .catch(err => {
        payload.notify({
          time: 8800,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  // JWT
  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
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
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUserJWT({ commit }, payload) {
    const { displayName, email, password, confirmPassword } = payload.userDetails;

    return new Promise((resolve, reject) => {
      // Check confirm password
      if (password !== confirmPassword) {
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(displayName, email, password)
        .then(response => {
          // Redirect User
          router.push(router.currentRoute.query.to || '/');

          // Update data in localStorage
          localStorage.setItem('accessToken', response.data.accessToken);
          commit('UPDATE_USER_INFO', response.data.userData, { root: true });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt.refreshToken().then(response => {
        resolve(response);
      });
    });
  }
};
