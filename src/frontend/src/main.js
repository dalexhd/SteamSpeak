import Vue from 'vue';
import Vuesax from 'vuesax';

// Clipboard
import VueClipboard from 'vue-clipboard2';

// Tour
import VueTour from 'vue-tour';

// VeeValidate
import VeeValidate from 'vee-validate';

// Toasted
import Toasted from 'vue-toasted';

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps';

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';

import Push from 'push.js';
import App from './App.vue';

// Vuesax Component Framework
import 'material-icons/iconfont/material-icons.css'; // Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax

// axios
import axios from './axios';

// API Calls
import './http/requests';

// Theme Configurations
import '../themeConfig';

// Firebase
import '@/firebase/firebaseConfig';

// Auth0 Plugin
import AuthPlugin from './plugins/auth';

// ACL
import acl from './acl/acl';

// Globally Registered Components
import './globalComponents';

// Register service provider
import ServiceWorkerPlugin from './registerServiceWorker';

// Styles: SCSS
import './assets/scss/_style.scss';

// Tailwind
import '@/assets/css/main.css';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';

// i18n
import i18n from './i18n/i18n';

// Admin Filters
import './filters/filters';

// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// PushJS
Vue.use(Vuesax);
Vue.prototype.$http = axios;
Vue.use(AuthPlugin);
Vue.use(Toasted);
Vue.use(ServiceWorkerPlugin);
Vue.use(VueClipboard);
Vue.use(VueTour);
require('vue-tour/dist/vue-tour.css');

Vue.use(VeeValidate, {
  i18n
});
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'AIzaSyB4DDathvvwuwlwnUu7F4Sow3oU22y5T1Y',
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
});
Vue.use(VueHammer);

// Feather font icon
require('./assets/css/iconfont.css');

// Flags icons
require('./assets/css/flags.css');

// Loader
require('./assets/css/loader.css');

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

if (!Push.Permission.has()) {
  Push.Permission.request(() => {
    Push.create('SteamSpeak!', {
      body: 'Web notifications enabled!',
      icon: '/img/icons/apple-touch-icon-76x76.png',
      timeout: 5000,
      onClick() {
        window.focus();
        this.close();
      }
    });
  });
}

new Vue({
  router,
  store,
  i18n,
  acl,
  render: (h) => h(App)
}).$mount('#app');
