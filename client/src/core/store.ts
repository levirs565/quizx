import { User } from '@/api';
import { Module } from "vuex";

interface CoreStoreState {
  user: any
}

export default {
  state: {
    user: undefined
  },
  mutations: {
    setUser(state, user: any) {
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
} as Module<CoreStoreState, void>
