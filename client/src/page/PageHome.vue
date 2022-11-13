<template>
  <resource-wrapper :state="state" @reload="loadList">
    <template v-slot:toolbar>
      <v-toolbar-title>Explore Quiz</v-toolbar-title>
    </template>
    <v-row dense>
      <v-col cols="12" v-for="quiz in quizList" :key="quiz.id">
        <quiz-summary-card :to="`quiz/${quiz.id}`" :quiz="quiz" />
      </v-col>
    </v-row>
  </resource-wrapper>
</template>

<script>
import { quizApi } from "@/api";
import QuizSummaryCard from "@/components/quiz/QuizSummaryCard.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";

export default {
  components: {
    QuizSummaryCard,
    ResourceWrapper,
  },
  data() {
    return {
      quizList: [],
      state: null,
    };
  },
  methods: {
    loadList() {
      updateResourceStateByPromise(
        quizApi.getQuizList().then((val) => {
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
