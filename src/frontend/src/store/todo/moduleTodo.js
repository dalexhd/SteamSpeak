import state from './moduleTodoState';
import mutations from './moduleTodoMutations';
import actions from './moduleTodoActions';
import getters from './moduleTodoGetters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
