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
          :create="create"
          :import-markdown="importMarkdown"
          @close="isActive.value = false"
          @created="created"
        />
      </template>
    </v-dialog>
  </resource-wrapper>
</template>

<script lang="ts" setup>
import { quizApi } from "@/api";
import QuizSummaryCard from "@/components/quiz/QuizSummaryCard.vue";
import DialogCreateQuiz from "@/dialog/DialogCreateQuiz.vue";
import ResourceWrapper from "@/components/resource/ResourceWrapper.vue";
import {
  CreateQuizParameters,
  CreateQuizResult,
  QuizSummary,
} from "@quizx/shared";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useResourceState } from "@/components/resource/helper";

const router = useRouter();

const {
  load: loadList,
  resource: quizList,
  state,
} = useResourceState(() => quizApi.getQuizList());

const create = (param: CreateQuizParameters) => quizApi.createQuiz(param);
const importMarkdown = (file: File) => quizApi.importMarkdown(file);
const created = (quizResult: CreateQuizResult) => {
  router.push(`/quiz/${quizResult.id}`);
};
onMounted(loadList);
</script>

<style></style>
