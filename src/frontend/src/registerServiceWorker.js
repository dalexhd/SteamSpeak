import { register } from 'register-service-worker';

export default {
  install(Vue) {
    if (process.env.NODE_ENV === 'production') {
      register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
          console.log(
            'App is being served from cache by a service worker.\n' +
              'For more details, visit https://goo.gl/AFskqB'
          );
        },
        registered() {
          console.log('Service worker has been registered.');
        },
        cached() {
          console.log('Content has been cached for offline use.');
        },
        updatefound() {},
        updated(registration) {
          console.log('New content is available.');
          Vue.toasted.show('Update available', {
            // you can pass a multiple actions as an array of actions
            action: [
              {
                text: 'Refresh',
                // router navigation,
                icon: 'refresh',
                onClick: () => {
                  registration.waiting.postMessage({ action: 'skipWaiting' });
                  window.location.reload();
                }
              }
            ],
            position: 'bottom-center'
          });
        },
        offline() {
          console.log('No internet connection found. App is running in offline mode.');
        },
        error(error) {
          console.error('Error during service worker registration:', error);
        }
      });
    }
  }
};
