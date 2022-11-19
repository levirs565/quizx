<template>
  <v-card>
    <v-card-title>Play Game</v-card-title>
    <v-card-text>
      <v-switch
        v-model="basePreference.shuffleQuestions"
        label="Shuffle Questions"
      />
      <v-select
        v-model="mode"
        :items="modeList"
        item-value="index"
        item-title="text"
        label="Mode"
        variant="outlined"
        hide-details
      />
      <template v-if="mode == 0">
        <v-switch label="Limit Exam Time" v-model="exam.timeLimit.enabled" />
        <duration-input
          label="Exam Time Limit"
          v-show="exam.timeLimit.enabled"
          v-model="exam.timeLimit.second"
        />
      </template>
      <template v-if="mode == 1">
        <v-switch
          label="Limit Question Time"
          v-model="flashCard.questionTimeLimit.enabled"
        />
        <duration-input
          label="Question Time Limit"
          v-show="flashCard.questionTimeLimit.enabled"
          v-model="flashCard.questionTimeLimit.second"
        />
        <v-switch
          label="Limit Retry Count"
          v-model="flashCard.retryCountLimit.enabled"
        />
        <v-text-field
          label="Retry Count Limit"
          type="number"
          v-show="flashCard.retryCountLimit.enabled"
          v-model.number="flashCard.retryCountLimit.count"
          variant="outlined"
          hide-details
        />
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="submit">Play Now</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import { gameApi } from "@/api";
import DurationInput from "@/components/DurationInput.vue";
import {
  ExamGamePreference,
  FlashCardGamePreference,
  GamePreference,
  GameSummary,
} from "@quizx/shared";
import { ref } from "vue";

export interface Props {
  playFunction: (preference: GamePreference) => Promise<GameSummary>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "played", game: GameSummary): void;
}>();

const modeList = [
  {
    type: ExamGamePreference,
    text: "Exam",
  },
  {
    type: FlashCardGamePreference,
    text: "Flash Card",
  },
].map((item, index) => ({
  index,
  ...item,
}));

const mode = ref(0);
const exam = ref({
  timeLimit: {
    enabled: false,
    second: 20 * 60,
  },
});

const flashCard = ref({
  retryCountLimit: {
    enabled: false,
    count: 5,
  },
  questionTimeLimit: {
    enabled: false,
    second: 1 * 60,
  },
});

const basePreference = ref({
  shuffleQuestions: false,
});

const createPreferenceObject = () => {
  const type = modeList[mode.value].type;
  return new type();
};

const submit = async () => {
  const preference = createPreferenceObject();
  preference.shuffleQuestions = basePreference.value.shuffleQuestions;
  if (preference instanceof ExamGamePreference) {
    if (exam.value.timeLimit.enabled) {
      preference.examTimeSecond = exam.value.timeLimit.second;
    }
  } else if (preference instanceof FlashCardGamePreference) {
    if (flashCard.value.retryCountLimit.enabled) {
      preference.retryCount = flashCard.value.retryCountLimit.count;
    }

    if (flashCard.value.questionTimeLimit.enabled) {
      preference.questionTimeSecond = flashCard.value.questionTimeLimit.second;
    }
  }
  const game = await props.playFunction(preference);
  emit("close");
  emit("played", game);
};
</script>
