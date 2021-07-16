import GameResult from './GameResult.vue';

export default { title: 'Permainan Result' };

export const standar = () => ({
  components: {
    GameResult
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
  template: '<game-result :results="results"></game-result>'
});
