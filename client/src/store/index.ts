import Vue from "vue";
import Vuex from "vuex";
import AuthStore from "@/store/auth";
import NotificationStore from "@/store/notification";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: AuthStore,
    notification: NotificationStore,
  },
});

export default store;
