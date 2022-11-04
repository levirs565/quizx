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
          :modelValue="question.type"
          :items="questionTypes"
          item-value="value"
          item-title="name"
          @update:modelValue="changeType"
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
        v-if="question.type == 'multiple-choice'"
        @click="addChoice"
        class="d-flex justify-end"
      >
        <v-btn>Add Choice</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import TextEditor from "@/components/tiptap/TextEditor.vue";
import QuestionAnswer from "@/components/question/QuestionAnswer.vue";
import TextEditorToolbar from "@/components/tiptap/TextEditorToolbar.vue";

export default {
  props: {
    isNewQuestion: Boolean,
    question: Object,
    index: Number,
  },
  components: {
    TextEditor,
    QuestionAnswer,
    TextEditorToolbar,
  },
  data() {
    return {
      activeEditor: null,
      questionTypes: [
        {
          value: "multiple-choice",
          name: "Multiple Choice",
        },
        {
          value: "short-text",
          name: "Short Text",
        },
        { value: "number", name: "Number" },
        { value: "math", name: "Math" },
      ],
      toolbarTop: "0px",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.toolbarTop =
        this.$refs.toolbar.$el.getBoundingClientRect().height + 16 + "px";
    });
  },
  methods: {
    onEditorFocus(editor) {
      this.activeEditor = editor;
    },
    oneEditorBlur(editor, event) {
      const relatedElement = event.relatedTarget;
      if (relatedElement) {
        const toolbar = this.$refs.editorToolbar.$el;
        if (relatedElement.parentElement == toolbar) return;
      }

      if (this.activeEditor == editor) this.activeEditor = null;
    },
    addChoice() {
      this.question.choices.push("");
    },
    removeChoice(index) {
      this.question.choices.splice(index, 1);
    },
    onChoiceInput(index, value) {
      this.question.choices[index] = value;
    },
    changeType(type) {
      let newQuestion = {
        id: this.question.id,
        question: this.question.question,
        type,
      };
      if (type == "multiple-choice") {
        newQuestion = {
          ...newQuestion,
          choices: ["", "", "", ""],
          answer: 0,
        };
      } else if (type == "short-text") {
        newQuestion = {
          ...newQuestion,
          answer: "",
        };
      } else if (type == "number") {
        newQuestion = {
          ...newQuestion,
          answer: 0,
        };
      } else if (type == "math") {
        newQuestion = {
          ...newQuestion,
          answer: "",
        };
      }
      this.$emit("update:question", newQuestion);
    },
  },
};
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
