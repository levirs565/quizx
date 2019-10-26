import { configure } from '@storybook/vue';
import Vue from 'vue';
import '../src/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faExclamation,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCheck, faTimes, faExclamation, faBars);

Vue.component('font-awesome', FontAwesomeIcon);

configure(require.context('../src', true, /\.stories\.js$/), module);
