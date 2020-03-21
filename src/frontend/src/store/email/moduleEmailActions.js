import axios from '@/axios';

export default {
  setEmailSearchQuery({ commit }, query) {
    commit('SET_EMAIL_SEARCH_QUERY', query);
  },

  // Fetch emails
  fetchEmails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/apps/email/mails', { params: { filter: payload.filter } })
        .then(response => {
          commit('SET_MAILS', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Fetch Tags
  fetchTags({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/apps/email/tags')
        .then(response => {
          commit('SET_TAGS', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Fetch Email Meta
  fetchMeta({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/apps/email/meta')
        .then(response => {
          commit('SET_META', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Move mails to another folder
  moveMailsTo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/email/move-mails', {
          emailIds: payload.emailIds,
          mailFolder: payload.to
        })
        .then(response => {
          commit('MOVE_MAILS_TO', payload);
          commit('UPDATE_UNREAD_META_ON_MOVE', payload);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Update Mails label
  updateLabels({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/email/update-labels', {
          emailIds: payload.mails,
          label: payload.label
        })
        .then(response => {
          commit('UPDATE_LABELS', payload);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  setLabels({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/email/set-labels', {
          mailId: payload.mailId,
          labels: payload.labels
        })
        .then(response => {
          commit('SET_LABELS', payload);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Set mails flag unread to true
  setUnread({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/email/mark-unread', {
          emailIds: payload.emailIds,
          unreadFlag: payload.unreadFlag
        })
        .then(response => {
          commit('SET_UNREAD', payload);

          // Remove this if you are getting meta like us
          // Use your own method to update email meta if you are fetching email meta
          commit('UPDATE_UNREAD_META', payload);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // Toggle isStarred flag in mail
  toggleIsMailStarred({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/email/set-starred', {
          mailId: payload.mailId,
          value: payload.value
        })
        .then(response => {
          commit('TOGGLE_IS_MAIL_STARRED', payload);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
