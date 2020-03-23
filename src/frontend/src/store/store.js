import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// import moduleTodo from './todo/moduleTodo.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
// import moduleEmail from './email/moduleEmail.js'
import moduleAuth from './auth/moduleAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    // todo: moduleTodo,
    // calendar: moduleCalendar,
    // chat: moduleChat,
    // email: moduleEmail,
    auth: moduleAuth
  },
  strict: process.env.NODE_ENV !== 'production'
});
