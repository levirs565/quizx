import Vue from 'vue';
import Vuex from 'vuex';
import { User } from './api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: undefined
  },
  mutations: {
    login(state, username) {
      state.loggedIn = username;
    }
  },
  actions: {
    updateLogin(context) {
      User.state().then(result => {
        context.commit('login', result.user);
      });
    }
  }
});

export default store;
