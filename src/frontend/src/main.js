import Vue from 'vue';
import Toasted from 'vue-toasted';
import Push from 'push.js';
import App from './App.vue';

import './lib/SteamSpeakCss';

import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Toasted);

if (!Push.Permission.has()) {
  Push.Permission.request(() => {
    Push.create('SteamSpeak!', {
      body: 'Web notifications enabled!',
      icon: '/img/icons/apple-touch-icon-76x76.png',
      timeout: 5000,
      onClick() {
        window.focus();
        this.close();
      },
    });
  });
}

window.App = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
