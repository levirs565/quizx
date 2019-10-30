import Soal from './Soal.vue';

export default { title: 'Soal' };

export const standar = () => ({
  components: {
    Soal
  },
  data() {
    return {
      soal: {
        soal: 'Soal Standar',
        pilihan: ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4']
      }
    };
  },
  template: '<soal :soal="soal" class="w-full" style="height: 50vh;"></soal>'
});
