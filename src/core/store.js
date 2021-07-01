import { User } from '@/api.js';

export default {
  state: {
    user: undefined
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    updateUser({ commit }) {
      return User.state().then(result => {
        commit('setUser', result.user);
      });
    },
    logout({ dispatch }) {
      User.logout().then(() => {
        dispatch('updateUser');
      });
    }
  }
};
