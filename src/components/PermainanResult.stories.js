import PermainanResult from './PermainanResult.vue';

export default { title: 'Permainan Result' };

export const standar = () => ({
  components: {
    PermainanResult
  },
  data() {
    return {
      results: {
        benar: 20,
        salah: 20,
        takDiJawab: 20
      }
    };
  },
  template: '<permainan-result :results="results"></permainan-result>'
});
