import Vue from 'vue';
import Vuex from 'vuex';
import CoreStore from '@/core/store';
import ContentStore from '@/content/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core: CoreStore,
    content: ContentStore
  }
});

export default store;
