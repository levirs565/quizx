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

    <v-dialog max-width="600px">
      <template v-slot:activator="{ props }">
        <v-fab-transition>
          <v-btn fixed fab bottom right color="primary" v-bind="props">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

      <template v-slot:default="{ isActive }">
        <dialog-create-quiz
          @close="isActive.value = false"
          @created="quizCreated"
        />
      </template>
    </v-dialog>
  </resource-wrapper>
</template>

<script lang="ts" setup>
import { quizApi } from "@/api";
import QuizSummaryCard from "@/components/quiz/QuizSummaryCard.vue";
import DialogCreateQuiz from "@/dialog/DialogCreateQuiz.vue";
import ResourceWrapper, {
  ResourceState,
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";
import { CreateQuizResult, QuizSummary } from "@quizx/shared";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const quizList = ref<QuizSummary[]>();
const state = ref<ResourceState>();

const quizCreated = (quizResult: CreateQuizResult) => {
  router.push(`/quiz/${quizResult.id}`);
};
const loadList = () => {
  // TODO: Only show current user quiz
  updateResourceStateByPromise(
    quizApi.getQuizList().then((newList) => {
      quizList.value = newList;
    }),
    (newState) => {
      state.value = newState;
    }
  );
};
onMounted(loadList);
</script>

<style></style>
