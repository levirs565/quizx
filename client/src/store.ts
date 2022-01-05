import Vue from "vue";
import Vuex from "vuex";
import CoreStore from "@/core/store";
import NotificationStore from "@/store/notification";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core: CoreStore,
    notification: NotificationStore,
  },
});

export default store;
