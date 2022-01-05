<template>
  <resource-wrapper :state="state" class="has-fab" @reload="loadList">
    <template v-slot:toolbar>
      <v-toolbar-title>My Quiz</v-toolbar-title>
    </template>

    <v-row dense>
      <v-col cols="12" v-for="quiz in quizList" :key="quiz.id">
        <quiz-summary-card :quiz="quiz" :to="`/quiz/${quiz.id}`" />
      </v-col>
    </v-row>

    <v-dialog max-width="600px" v-model="isCreateDialogShow">
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
            fixed
            fab
            bottom
            right
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

      <dialog-create-quiz
        @close="isCreateDialogShow = false"
        @create="createQuiz"
      />
    </v-dialog>
  </resource-wrapper>
</template>

<script>
import { Quiz } from "@/api";
import QuizSummaryCard from "@/components/QuizSummaryCard.vue";
import DialogCreateQuiz from "@/dialog/DialogCreateQuiz.vue";
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
        this.showNotification({
          text: message,
          color: "error",
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
