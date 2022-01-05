import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";
import notification from "./plugins/notification";

Vue.use(notification);

Vue.filter("selectOneUpper", function (value: string) {
  return value.charAt(0).toUpperCase();
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  store,
}).$mount("#app");
