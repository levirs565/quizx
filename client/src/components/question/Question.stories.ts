import Question from './question/Question.vue';

export default { title: 'Soal' };

export const standart = () => ({
  components: {
    Question
  },
  data() {
    return {
      question: {
        soal: 'Soal Standar',
        pilihan: ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4']
      }
    };
  },
  template: '<question :question="soal" class="w-full" style="height: 50vh;"></question>'
});
