import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from './plugins/vuetify'

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  store
}).$mount("#app");
