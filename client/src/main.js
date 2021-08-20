import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "v-click-outside";
import "@/style.css";
import CButton from "@/components/CButton.vue";
import CIcon from "@/components/CIcon.vue";
import CIconButton from "@/components/CIconButton.vue";

Vue.component("c-button", CButton);
Vue.component("c-icon", CIcon);
Vue.component("c-icon-button", CIconButton);
Vue.use(vClickOutside);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
