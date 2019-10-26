import Jumper from './Jumper.vue';

export default { title: 'Jumper' };

export const standar = () => ({
  components: {
    Jumper
  },
  template: '<jumper :total="50" :value="25"></jumper>'
});
