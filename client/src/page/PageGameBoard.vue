<template>
  <v-app>
    <base-app-bar :isLoading="state && state.isLoading">
      <v-toolbar-title>Game</v-toolbar-title>
    </base-app-bar>
    <resource-main-container :state="state" @reload="updateState">
      <exam-game-board
        v-if="game?.data instanceof ExamGameData"
        :game="game"
        @finish="finish"
        @finished="finished"
        @answerChanged="answerChanged"
      />
      <flash-card-game-board
        v-else-if="game?.data instanceof FlashCardGameData"
        :game="game"
        @finished="finished"
        @answerChanged="answerChanged"
        @submitAnswer="submitAnswer"
      />
    </resource-main-container>
  </v-app>
</template>

<script lang="ts" setup>
import { gameApi } from "@/api";
import {
  ResourceState,
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";
import BaseAppBar from "@/components/BaseAppBar.vue";
import ResourceMainContainer from "@/components/resource/ResourceMainContainer.vue";
import ExamGameBoard from "@/components/game/ExamGameBoard.vue";
import FlashCardGameBoard from "@/components/game/FlashCardGameBoard.vue";
import {
  ExamGameData,
  FlashCardGameData,
  Game,
  QuestionAnswer,
} from "@quizx/shared";
import { onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { AnswerChangedEvent } from "@/components/question/Question.vue";
import { finishFunctionInjectionKey } from "@/dialog/DialogFinishGame.vue";

export interface Props {
  game_id: string;
}

const props = defineProps<Props>();

const router = useRouter();

const game = ref<Game>();
const state = ref<ResourceState>();

const answerChanged = (event: AnswerChangedEvent) => {
  let answer: QuestionAnswer | null = event.answer;
  if (answer == "") answer = null;
  gameApi.putAnswer(props.game_id, event.id, answer);
};
const submitAnswer = (index: number, questionId: string) => {
  gameApi.submitAnswer(props.game_id, questionId).then((result) => {
    if (!(game.value?.data instanceof FlashCardGameData)) return;

    game.value!.data.currentQuestionIndex = result.currentQuestionIndex;
    game.value!.data.currentQuestionRetryCount =
      result.currentQuestionRetryCount;
    game.value!.data.currentQuestionMaxTime = result.currentQuestionMaxTime;

    if (game.value!.questionsState!.length == index) {
      game.value!.questionsState!.push(result.state);
    } else {
      game.value!.questionsState![index] = result.state;
    }
  });
};
const updateState = () => {
  updateResourceStateByPromise(
    gameApi.getGame(props.game_id).then((newGame) => {
      game.value = newGame;
    }),
    (newState) => {
      state.value = newState;
    }
  );
};

const _finish = () => gameApi.finishGame(props.game_id);

const finish = async () => {
  await _finish();
  finished();
};

provide(finishFunctionInjectionKey, _finish);
const finished = () => {
  router.replace(`/game/${props.game_id}/`);
};

onMounted(updateState);
</script>

<style scoped></style>
