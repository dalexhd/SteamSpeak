import axios from '@/axios';

export default {
  addItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/data-list/products/', { item })
        .then((response) => {
          commit('ADD_ITEM', Object.assign(item, { id: response.data.id }));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchDataListItems({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/data-list/products')
        .then((response) => {
          commit('SET_PRODUCTS', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // fetchEventLabels({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get("/api/apps/calendar/labels")
  //       .then((response) => {
  //         commit('SET_LABELS', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  updateItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/data-list/products/${item.id}`, { item })
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  removeItem({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/data-list/products/${itemId}`)
        .then((response) => {
          commit('REMOVE_ITEM', itemId);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // eventDragged({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload: payload})
  //       .then((response) => {

  //         // Convert Date String to Date Object
  //         let event = response.data
  //         event.startDate = new Date(event.startDate)
  //         event.endDate = new Date(event.endDate)

  //         commit('UPDATE_EVENT', event)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
};
