<template>
  <resource-wrapper :state="state" @reload="loadList">
    <template v-slot:toolbar>
      <v-toolbar-title>Explore Quiz</v-toolbar-title>
    </template>
    <v-row dense>
      <v-col cols="12" v-for="quiz in list" :key="quiz.id">
        <quiz-summary-card :to="`quiz/${quiz.id}`" :quiz="quiz" />
      </v-col>
    </v-row>
  </resource-wrapper>
</template>

<script lang="ts" setup>
import { quizApi } from "@/api";
import QuizSummaryCard from "@/components/quiz/QuizSummaryCard.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
  ResourceState,
} from "@/components/resource/ResourceWrapper.vue";
import { QuizSummary } from "@quizx/shared";
import { onMounted, ref } from "vue";

const list = ref<QuizSummary[]>([]);
const state = ref<ResourceState>();

const loadList = () => {
  updateResourceStateByPromise(
    quizApi.getQuizList().then((newList) => {
      list.value = newList;
    }),
    (newState) => {
      state.value = newState;
    }
  );
};

onMounted(() => {
  loadList()
})
</script>

<style></style>
