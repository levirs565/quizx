import Question from "./Question.vue";

export default { title: "Soal" };

export const standart = () => ({
  components: {
    Question,
  },
  data() {
    return {
      question: {
        type: "multiple-choice",
        question: "Soal Standar",
        choices: ["Pilihan 1", "Pilihan 2", "Pilihan 3", "Pilihan 4"],
      },
    };
  },
  template:
    '<question :question="question" class="w-full" style="height: 50vh;"></question>',
});
