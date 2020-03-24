export default {
  SET_EMAIL_SEARCH_QUERY(state, query) {
    state.mailSearchQuery = query;
  },
  SET_MAILS(state, mails) {
    state.mails = mails;
  },
  SET_TAGS(state, tags) {
    state.mailTags = tags;
  },
  SET_META(state, meta) {
    state.meta = meta;
  },
  UPDATE_MAIL_FILTER(state, filterName) {
    state.mail_filter = filterName;
  },
  UPDATE_LABELS(state, payload) {
    payload.mails.forEach((mailId) => {
      const mailIndex = state.mails.findIndex((mail) => mail.id === mailId);
      const index = state.mails[mailIndex].labels.indexOf(payload.label);

      if (index === -1) state.mails[mailIndex].labels.push(payload.label);
      else state.mails[mailIndex].labels.splice(index, 1);
    });
  },
  SET_LABELS(state, payload) {
    state.mails.find((mail) => mail.id === payload.mailId).labels = payload.labels;
  },
  SET_UNREAD(state, payload) {
    payload.emailIds.forEach((mailId) => {
      const mailIndex = state.mails.findIndex((mail) => mail.id === mailId);
      if (mailIndex !== -1) state.mails[mailIndex].unread = payload.unreadFlag;
    });
  },

  MOVE_MAILS_TO(state, payload) {
    payload.emailIds.forEach((mailId) => {
      const mailIndex = state.mails.findIndex((mail) => mail.id === mailId);

      // Update draft meta
      // If moving from draft mailFolder decrease draft meta by removing mailId
      if (state.mails[mailIndex].mailFolder === 'draft') {
        state.meta.draftMails.splice(
          state.meta.draftMails.findIndex((i) => i === mailId),
          1
        );
      }
      // Else increase by pushing mailId
      if (payload.to === 'draft') {
        state.meta.draftMails.push(mailId);
      }

      state.mails[mailIndex].mailFolder = payload.to;
    });
  },

  TOGGLE_IS_MAIL_STARRED(state, payload) {
    state.mails.find((mail) => mail.id === payload.mailId).isStarred = payload.value;
  },

  // If your process of fetching is different than ours. Please update action and mutation
  // Maybe this mutation is redundant for you. Feel free to remove it.
  UPDATE_UNREAD_META(state, payload) {
    // Loop over email meta
    for (const folder in state.meta.unreadMails.folder) {
      // If folder is same as current filter
      if (folder === state.mail_filter) {
        if (payload.unreadFlag) {
          // If unread flag is true - increase count
          payload.emailIds.forEach((mailId) => {
            if (state.meta.unreadMails.folder[folder].indexOf(mailId) === -1)
              state.meta.unreadMails.folder[folder].push(mailId);
          });
        } else {
          // else reduce unread mails count
          payload.emailIds.forEach((mailId) => {
            const mailIdIndex = state.meta.unreadMails.folder[folder].indexOf(mailId);
            if (mailIdIndex !== -1) state.meta.unreadMails.folder[folder].splice(mailIdIndex, 1);
          });
        }
      }
    }
  },
  UPDATE_UNREAD_META_ON_MOVE(state, payload) {
    // Updating Draft meta is handled by "MOVE_MAILS_TO" mutation

    payload.emailIds.forEach((mailId) => {
      const mail = state.mails.find((mail) => mail.id === mailId);

      if (mail.unread) {
        const cf_unread_mails = state.meta.unreadMails.folder[state.mail_filter];
        if (cf_unread_mails) {
          cf_unread_mails.splice(cf_unread_mails.indexOf(mailId), 1);
        }
        if (state.meta.unreadMails.folder[payload.to])
          state.meta.unreadMails.folder[payload.to].push(mailId);
      }
    });
  }
};
