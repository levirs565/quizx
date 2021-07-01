import Navigation from './Navigation.vue';
import router from '@/router';

export default { title: 'Navigation' };

export const standar = () => ({
  components: {
    Navigation
  },
  template: '<navigation></navigation>',
  router
});
