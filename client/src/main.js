import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "v-click-outside";
import "@/style.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import "@toast-ui/editor/dist/toastui-editor.css";

Vue.use(vClickOutside);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
