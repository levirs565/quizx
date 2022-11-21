<template>
  <v-lazy min-height="200px">
    <v-card>
      <v-card-title class="text-overline"
        >Question {{ index + 1 }}</v-card-title
      >
      <v-card-text>
        <text-viewer :model-value="question.question" />

        <question-answer-view
          :question="question"
          :editable="editable"
          :message="message"
          v-model:selectedAnswer="question.answer"
        >
          <template v-slot:choice="{ choice, indexChar }">
            <span class="mr-2 text--primary">{{ indexChar }}.</span>
            <text-viewer :model-value="choice" />
          </template>
        </question-answer-view>

        <slot name="content" />
      </v-card-text>

      <slot></slot>
    </v-card>
  </v-lazy>
</template>
<script lang="ts" setup>
import TextViewer from "@/components/tiptap/TextViewer.vue";
import { Question, QuestionAnswer, QuestionState } from "@quizx/shared";
import { computed, onMounted, watch } from "vue";
import QuestionAnswerView, { Message } from "./QuestionAnswer.vue";

export interface Props {
  question: Question;
  index: number;
  editable?: boolean;
  answerState?: QuestionState;
}

export interface AnswerChangedEvent {
  index: number;
  id: string;
  answer?: QuestionAnswer;
}

const props = withDefaults(defineProps<Props>(), {
  editable: true,
});
const emit = defineEmits<{
  (e: "answerChanged", event: AnswerChangedEvent): void;
}>();

const message = computed<Message>(() => {
  const baseText = "Your answer is ";

  switch (props.answerState) {
    case QuestionState.Correct:
      return {
        text: `${baseText} correct`,
      };
    case QuestionState.Incorrect:
      return {
        error: `${baseText} wrong`,
      };
    case QuestionState.Unanswered:
      return {
        text: "Unanswered",
      };
    default:
      return {};
  }
});

watch(
  () => props.question.answer,
  (value) => {
    emit("answerChanged", {
      index: props.index,
      id: props.question.id!,
      answer: value,
    });
  }
);
</script>

<style scoped></style>
