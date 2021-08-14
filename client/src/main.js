import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faTimes,
  faExclamation,
  faBars,
  faPlay,
  faUser,
  faQuestionCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vClickOutside from "v-click-outside";
import "@/style.css";
import CButton from "@/components/CButton.vue";
import CIcon from "@/components/CIcon.vue";
import CIconButton from "@/components/CIconButton.vue";

library.add(
  faCheck,
  faTimes,
  faExclamation,
  faBars,
  faPlay,
  faUser,
  faQuestionCircle,
  faEdit,
  faTrash
);

Vue.component("font-awesome", FontAwesomeIcon);
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
