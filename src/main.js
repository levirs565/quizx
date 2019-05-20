import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faExclamation,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import notification from './plugin/notification';
import '@/style.css';

library.add(faCheck, faTimes, faExclamation, faBars);

Vue.component('font-awesome', FontAwesomeIcon);
Vue.use(notification);

Vue.use({
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        let that = this;
        this.catchError = function(error) {
          console.log(error);
          that.notification.push(error.toString(), 'danger');
        };
      }
    });
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
