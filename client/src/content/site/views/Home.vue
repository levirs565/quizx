<template>
  <resource-wrapper :state="state" @reload="loadList">
    <h1 class="title">Explore Quiz</h1>

    <ul>
      <router-link
        :to="`/quiz/${quiz.id}`"
        v-for="quiz in quizList"
        :key="quiz.id"
        tag="li"
        v-slot="{ navigate }"
        class="mb-2"
      >
        <quiz-summary-card :quiz="quiz" @click="navigate" />
      </router-link>
    </ul>
  </resource-wrapper>
</template>

<script>
import { Quiz } from "@/api";
import QuizSummaryCard from "../../components/QuizSummaryCard.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/ResourceWrapper.vue";

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
