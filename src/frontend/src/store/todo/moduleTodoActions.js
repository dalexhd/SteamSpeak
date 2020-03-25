import axios from '@/axios';

export default {
  setTodoSearchQuery({ commit }, query) {
    commit('SET_TODO_SEARCH_QUERY', query);
  },
  fetchTasks({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/apps/todo/tasks', { params: { filter: payload.filter } })
        .then((response) => {
          commit('SET_TASKS', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchTags({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/apps/todo/tags')
        .then((response) => {
          commit('SET_TAGS', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addTask({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/apps/todo/tasks/', { task })
        .then((response) => {
          commit('ADD_TASK', Object.assign(task, { id: response.data.id }));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateTask({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/apps/todo/task/${task.id}`, { task })
        .then((response) => {
          commit('UPDATE_TASK', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};
