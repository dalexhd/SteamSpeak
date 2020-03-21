export default {
  SET_USERS(state, users) {
    state.users = users;
  },
  REMOVE_RECORD(state, itemId) {
    const userIndex = state.users.findIndex(u => u.id === itemId);
    state.users.splice(userIndex, 1);
  }
};
