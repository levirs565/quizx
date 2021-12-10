<template>
  <resource-wrapper :state="state" class="has-fab" @reload="loadList">
    <h1 class="title">My Quiz</h1>

    <ul>
      <router-link
        :to="`/quiz/${quiz.id}`"
        v-for="quiz in quizList"
        :key="quiz.id"
        tag="li"
        v-slot="{ navigate }"
        class="block"
      >
        <quiz-summary-card :quiz="quiz" @click="navigate" />
      </router-link>
    </ul>

    <b-button
      type="is-primary"
      class="is-fab"
      icon-right="plus"
      @click="showCreateQuiz"
    />

    <b-modal
      v-model="isCreateDialogShow"
      has-modal-card
      trap-focus
      :can-cancel="['escape', 'outside']"
      custom-class="dialog"
    >
      <template #default="props">
        <dialog-create-quiz @close="props.close" @create="createQuiz" />
      </template>
    </b-modal>
  </resource-wrapper>
</template>

<script>
import { Quiz } from "@/api";
import QuizSummaryCard from "@/content/components/QuizSummaryCard.vue";
import DialogCreateQuiz from "../components/DialogCreateQuiz.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/ResourceWrapper.vue";

export default {
  components: {
    QuizSummaryCard,
    DialogCreateQuiz,
    ResourceWrapper,
  },
  data() {
    return {
      quizList: [],
      isCreateDialogShow: false,
      state: null,
    };
  },
  methods: {
    showCreateQuiz() {
      this.isCreateDialogShow = true;
    },
    async createQuiz(quiz) {
      try {
        const quizResult = await Quiz.createQuiz(quiz);
        this.$router.push(`/quiz/${quizResult.id}`);
      } catch (e) {
        console.error(e);
        let message = "Cannot create Quiz: ";
        if (e.message) message += " " + e.message;
        this.$buefy.toast.open({
          message: message,
          type: "is-danger",
        });
      }
    },
    loadList() {
      // TODO: Only show current user quiz
      updateResourceStateByPromise(
        Quiz.getQuizList().then((val) => {
          this.quizList = val.list;
        }),
        (state) => {
          this.state = state;
        }
      );
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>

<style></style>
