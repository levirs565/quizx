<template>
  <v-card v-if="question">
    <v-toolbar color="white" class="toolbar" ref="toolbar" elevation="4">
      <v-toolbar-title>{{
        isNewQuestion ? "New Question " : `Question ${index! + 1}`
      }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
        <v-btn variant="text" @click="apply">Apply</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text ref="body">
      <text-editor-toolbar
        ref="editorToolbar"
        :editor="activeEditor"
        :stickyTop="toolbarTop"
      ></text-editor-toolbar>

      <text-editor
        v-model="question!.question"
        @editorFocus="onEditorFocus"
        @editorBlur="oneEditorBlur"
        :mathVirtualKeyboardContainer="$el"
      />
      <v-row no-gutters>
        <v-spacer />
        <v-select
          :items="questionTypes"
          :model-value="question!.constructor.name"
          @update:model-value="changeType"
          item-value="value"
          item-title="name"
          filled
          class="my-2"
        />
      </v-row>

      <question-answer
        :question="question!"
        v-model:selectedAnswer="question!.answer"
        editable
        :mathVirtualKeyboardContainer="$el"
      >
        <template v-slot:afterChoice="{ choice, index, indexChar }">
          <span class="mr-2 text--primary">{{ indexChar }}.</span>
          <text-editor
            :modelValue="choice"
            @update:modelValue="onChoiceInput(index, $event)"
            class="flex-grow-1 mb-2"
            @editorFocus="onEditorFocus"
            @editorBlur="oneEditorBlur"
            :mathVirtualKeyboardContainer="$el"
          />
          <v-btn icon class="ml-2" @click="removeChoice(index)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </question-answer>

      <div
        v-if="question instanceof MultipleChoiceQuestion"
        @click="addChoice"
        class="d-flex justify-end"
      >
        <v-btn>Add Choice</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import TextEditor from "@/components/tiptap/TextEditor.vue";
import QuestionAnswer from "@/components/question/QuestionAnswer.vue";
import TextEditorToolbar from "@/components/tiptap/TextEditorToolbar.vue";
import {
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  Question,
  ShortTextQuestion,
} from "@quizx/shared";
import { Editor } from "@tiptap/vue-3";
import { computed, nextTick, onMounted, ref } from "vue";
import { VToolbar } from "vuetify/components/VToolbar";

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "apply",
    index: number | undefined,
    isNew: boolean,
    question: Question
  ): void;
}>();

const question = ref<Question>();
const index = ref<number>();
const isNewQuestion = ref(false);

const activeEditor = ref<Editor>();
const toolbar = ref<InstanceType<typeof VToolbar>>();
const editorToolbar = ref<InstanceType<typeof TextEditorToolbar>>();

const toolbarTop = computed(() =>
  toolbar.value
    ? toolbar.value.$el.getBoundingClientRect().height + 16 + "px"
    : "0px"
);

const changeState = (
  newIndex: number | undefined,
  newIsNew: boolean,
  newQuestion: Question
) => {
  question.value = newQuestion;
  index.value = newIndex ? newIndex : 0;
  isNewQuestion.value = newIsNew;
};

const questionTypes = [
  {
    type: MultipleChoiceQuestion,
    name: "Multiple Choice",
  },
  {
    type: ShortTextQuestion,
    name: "Short Text",
  },
  { type: NumberQuestion, name: "Number" },
  { type: MathQuestion, name: "Math" },
].map((item) => ({
  value: item.type.name,
  ...item,
}));

const apply = () => {
  emit("apply", index.value, isNewQuestion.value, question.value!);
  emit("close");
};

const onEditorFocus = (editor: Editor) => {
  activeEditor.value = editor;
};
const oneEditorBlur = (editor: Editor, event: FocusEvent) => {
  const relatedElement = event.relatedTarget as HTMLElement | null;
  if (relatedElement) {
    const toolbar = editorToolbar.value!.$el;
    if (relatedElement.parentElement == toolbar) return;
  }

  if (activeEditor.value == editor) activeEditor.value = undefined;
};

const getMultipleChoiceQuestion = () =>
  question.value as MultipleChoiceQuestion;
const addChoice = () => {
  getMultipleChoiceQuestion().choices.push("");
};
const removeChoice = (index: number) => {
  getMultipleChoiceQuestion().choices.splice(index, 1);
};
const onChoiceInput = (index: number, value: string) => {
  getMultipleChoiceQuestion().choices[index] = value;
};
const changeType = (type: string) => {
  const typeIndex = questionTypes.findIndex((item) => item.value == type);
  const typeConstructor = questionTypes[typeIndex].type;

  const newQuestion: Question = new typeConstructor();
  newQuestion.id = question.value!.id;
  newQuestion.question = question.value!.question;

  if (newQuestion instanceof MultipleChoiceQuestion) {
    newQuestion.choices = ["", "", "", ""];
    newQuestion.answer = 0;
  } else if (newQuestion instanceof ShortTextQuestion) {
    newQuestion.answer = "";
  } else if (newQuestion instanceof NumberQuestion) {
    newQuestion.answer = 0;
  } else if (newQuestion instanceof MathQuestion) {
    newQuestion.answer = "";
  }
  question.value = newQuestion;
};

defineExpose({
  changeState,
});
</script>

<style scoped>
.choice-editor {
  width: 100%;
}
.toolbar {
  position: sticky;
  top: 0px;
  z-index: 999;
}
</style>
