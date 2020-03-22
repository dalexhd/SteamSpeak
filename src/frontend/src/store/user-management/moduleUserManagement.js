import state from './moduleUserManagementState';
import mutations from './moduleUserManagementMutations';
import actions from './moduleUserManagementActions';
import getters from './moduleUserManagementGetters';

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
