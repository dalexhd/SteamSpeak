// import contacts from '@/views/apps/chat/contacts'

export default {
  chatDataOfUser: state => id =>
    state.chats[Object.keys(state.chats).find(key => Number(key) === id)],
  chatContacts: (state, getters) => {
    const chatContacts = state.chatContacts.filter(contact => {
      contact.displayName.toLowerCase().includes(state.chatSearchQuery.toLowerCase());
    });

    chatContacts.sort((x, y) => {
      const timeX = getters.chatLastMessaged(x.uid).time;
      const timeY = getters.chatLastMessaged(y.uid).time;
      return new Date(timeY) - new Date(timeX);
    });

    return chatContacts.sort((x, y) => {
      const chatDataX = getters.chatDataOfUser(x.uid);
      const chatDataY = getters.chatDataOfUser(y.uid);
      if (chatDataX && chatDataY) return chatDataY.isPinned - chatDataX.isPinned;
      return 0;
    });
  },
  contacts: state =>
    state.contacts.filter(contact =>
      contact.displayName.toLowerCase().includes(state.chatSearchQuery.toLowerCase())
    ),
  contact: state => contactId => state.contacts.find(contact => contact.uid === contactId),
  chats: state => state.chats,
  chatUser: (state, getters, rootState) => id =>
    state.contacts.find(contact => contact.uid === id) || rootState.AppActiveUser,

  chatLastMessaged: (state, getters) => id => {
    if (getters.chatDataOfUser(id)) return getters.chatDataOfUser(id).msg.slice(-1)[0];
    return false;
  },
  chatUnseenMessages: (state, getters) => id => {
    let unseenMsg = 0;
    const chatData = getters.chatDataOfUser(id);
    if (chatData) {
      chatData.msg.map(msg => {
        if (!msg.isSeen && !msg.isSent) unseenMsg++;
      });
    }
    return unseenMsg;
  }
};
