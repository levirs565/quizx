import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./style.scss"
import "@mdi/font/css/materialdesignicons.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
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
