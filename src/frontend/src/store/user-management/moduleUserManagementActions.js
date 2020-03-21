import axios from '@/axios';

export default {
  // addItem({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     axios.post("/api/data-list/products/", {item: item})
  //       .then((response) => {
  //         commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/user-management/users')
        .then(response => {
          commit('SET_USERS', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchUser(context, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/user-management/users/${userId}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeRecord({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/user-management/users/${userId}`)
        .then(response => {
          commit('REMOVE_RECORD', userId);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
