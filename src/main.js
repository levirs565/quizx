import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faExclamation
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import notification from './plugin/notification';

library.add(faCheck, faTimes, faExclamation);

Vue.component('font-awesome', FontAwesomeIcon);
Vue.use(notification);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
