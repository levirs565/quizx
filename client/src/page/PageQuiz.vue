<template>
  <resource-wrapper :state="state" @reload="updateQuiz">
    <template v-slot:toolbar>
      <v-toolbar-title>Quiz</v-toolbar-title>
    </template>
    <template #toolbarAppend>
      <v-btn
        v-if="user && user.id == quiz?.userId"
        icon
        :to="`/quiz/${quiz_id}/edit`"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <quiz-summary :quiz="quiz!">
      <v-card-actions>
        <v-dialog v-if="user" max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="primary" v-bind="props"> Play </v-btn>
          </template>

          <template v-slot="{ isActive }">
            <dialog-play-quiz
              :play-function="play"
              @close="isActive.value = false"
              @played="played"
            ></dialog-play-quiz>
          </template>
        </v-dialog>
      </v-card-actions>
    </quiz-summary>

    <p class="text-h6 my-4">Questions</p>

    <v-row dense>
      <v-col
        cols="12"
        v-for="(question, index) in quiz?.questions"
        :key="question.id"
      >
        <question
          :index="index"
          :question="question"
          :answerState="answerResults[question.id!]"
        >
          <v-card-actions v-if="!isAnswerEmpty(question.answer)">
            <v-btn
              @click="checkAnswer(question.id!, question.answer!)"
              color="primary"
              >Check Answer
            </v-btn>
          </v-card-actions>
        </question>
      </v-col>
    </v-row>
  </resource-wrapper>
</template>

<script lang="ts" setup>
import Question from "@/components/question/Question.vue";
import { quizApi, gameApi } from "@/api";
import QuizSummary from "@/components/quiz/QuizSummary.vue";
import DialogPlayQuiz from "@/dialog/DialogPlayQuiz.vue";
import { isAnswerEmpty } from "@/utils";
import ResourceWrapper from "@/components/resource/ResourceWrapper.vue";
import useAuthStore from "@/store/auth";
import {
  GamePreference,
  GameSummary,
  QuestionAnswer,
  QuestionState,
} from "@quizx/shared";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useResourceState } from "@/components/resource/helper";

export interface Props {
  quiz_id: string;
}

const props = defineProps<Props>();

const { user } = useAuthStore();
const router = useRouter();

const {
  resource: quiz,
  load: updateQuiz,
  state,
} = useResourceState(() => quizApi.getQuiz(props.quiz_id));
const answerResults = ref<Record<string, QuestionState>>({});

const checkAnswer = async (questionId: string, answer: QuestionAnswer) => {
  const result = await quizApi.checkQuestionAnswer(
    props.quiz_id,
    questionId,
    answer
  );
  answerResults.value[questionId] = result.correct
    ? QuestionState.Correct
    : QuestionState.Incorrect;
};

const play = (preference: GamePreference) =>
  gameApi.playGame(props.quiz_id, preference);
const played = (game: GameSummary) => {
  router.push(`/game/${game.id}/board`);
};

onMounted(updateQuiz);

watch(() => props.quiz_id, updateQuiz);
</script>

<style></style>
