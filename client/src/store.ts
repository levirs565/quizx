import Vue from 'vue';
import Vuex from 'vuex';
import CoreStore from '@/core/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core: CoreStore,
  }
});

export default store;
