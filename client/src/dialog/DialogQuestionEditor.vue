<template>
  <v-card>
    <v-toolbar color="white" class="toolbar" ref="toolbar" elevation="4">
      <v-toolbar-title>{{
        isNewQuestion ? "New Question " : `Question ${index + 1}`
      }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn variant="text" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn variant="text" @click="$emit('apply')">Apply</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text ref="body">
      <text-editor-toolbar
        ref="editorToolbar"
        :editor="activeEditor"
        :stickyTop="toolbarTop"
      ></text-editor-toolbar>

      <text-editor
        v-model="question.question"
        @editorFocus="onEditorFocus"
        @editorBlur="oneEditorBlur"
        :mathVirtualKeyboardContainer="$el"
      />
      <v-row no-gutters>
        <v-spacer />
        <v-select
          :items="questionTypes"
          :model-value="question.constructor.name"
          item-value="value"
          item-title="name"
          filled
          class="my-2"
        />
      </v-row>

      <question-answer
        :question="question"
        v-model:selectedAnswer="question.answer"
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
import { nextTick, onMounted, ref } from "vue";
import { VToolbar } from "vuetify/components/VToolbar";

export interface Props {
  isNewQuestion: boolean;
  question: Question;
  index: number;
}

const props = defineProps<Props>();

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

const activeEditor = ref<Editor>();
const toolbarTop = ref("0px");
const toolbar = ref<InstanceType<typeof VToolbar>>();
const editorToolbar = ref<InstanceType<typeof TextEditorToolbar>>();

onMounted(() => {
  nextTick(() => {
    toolbarTop.value =
      toolbar.value!.$el.getBoundingClientRect().height + 16 + "px";
  });
});

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
const addChoice = () => {
  (props.question as MultipleChoiceQuestion).choices.push("");
};
const removeChoice = (index: number) => {
  (props.question as MultipleChoiceQuestion).choices.splice(index, 1);
};
const onChoiceInput = (index: number, value: string) => {
  (props.question as MultipleChoiceQuestion).choices[index] = value;
};
// const changeType = (type) {
//   let newQuestion = {
//     id: this.question.id,
//     question: this.question.question,
//     type,
//   };
//   if (type == "multiple-choice") {
//     newQuestion = {
//       ...newQuestion,
//       choices: ["", "", "", ""],
//       answer: 0,
//     };
//   } else if (type == "short-text") {
//     newQuestion = {
//       ...newQuestion,
//       answer: "",
//     };
//   } else if (type == "number") {
//     newQuestion = {
//       ...newQuestion,
//       answer: 0,
//     };
//   } else if (type == "math") {
//     newQuestion = {
//       ...newQuestion,
//       answer: "",
//     };
//   }
//   this.$emit("update:question", newQuestion);
// }
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
