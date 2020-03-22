import state from './moduleDataListState';
import mutations from './moduleDataListMutations';
import actions from './moduleDataListActions';
import getters from './moduleDataListGetters';

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
