<template>
  <resource-wrapper :state="state" class="has-fab" @reload="refresh">
    <template v-slot:toolbar>
      <v-toolbar-title>Quiz Editor</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="saveQuiz">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-dialog max-width="300px" v-model="isDeleteDialogShow">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>Delete Quiz?</v-card-title>
          <v-card-text>This action is permanent.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="isDeleteDialogShow = false">Cancel</v-btn>
            <v-btn text color="error" @click="deleteQuiz">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <quiz-summary :quiz="quiz" editor> </quiz-summary>

    <p class="text-h6 my-4">Questions</p>

    <v-row>
      <v-col
        cols="12"
        v-for="(question, index) in quiz.questions"
        :key="question.id"
      >
        <question
          :index="index"
          :question="question"
          :initialAnswer="question.answer"
          :editable="false"
        >
          <v-card-actions>
            <v-spacer />
            <v-btn outlined color="error" @click="deleteQuestion(index)">
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
            <v-btn outlined @click="editQuestion(index)">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-actions>
        </question>
      </v-col>

      <v-col>
        <v-btn color="primary" @click="newQuestion"> Add Question </v-btn>
      </v-col>

      <v-dialog fullscreen hide-overlay v-model="editDialogState.isShow">
        <dialog-question-editor
          :question="editDialogState.question"
          :index="editDialogState.questionIndex"
          :isNewQuestion="editDialogState.isNew"
          @cancel="cancelEditQuestion"
          @apply="applyEditQuestion"
        ></dialog-question-editor>
      </v-dialog>
    </v-row>
  </resource-wrapper>
</template>

<script>
import { Quiz } from "@/api";
import QuizSummary from "@/components/quiz/QuizSummary.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";
import Question from "@/components/question/Question.vue";
import DialogQuestionEditor from "@/dialog/DialogQuestionEditor.vue";
import clone from "just-clone";

export default {
  props: {
    quiz_id: String,
  },
  components: {
    QuizSummary,
    ResourceWrapper,
    Question,
    DialogQuestionEditor,
  },
  data() {
    return {
      quiz: {},
      isDeleteDialogShow: false,
      editDialogState: {
        isShow: false,
        isNew: false,
        question: null,
        questionIndex: 0,
      },
      state: null,
      activeEditor: null,
    };
  },
  methods: {
    refresh() {
      updateResourceStateByPromise(
        Quiz.getQuizForEditor(this.quiz_id).then((quiz) => {
          if (quiz) this.quiz = quiz;
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    deleteQuiz() {
      Quiz.deleteQuiz(this.quiz_id).then(() => {
        this.$router.replace("/quiz");
      });
    },
    editQuestion(index) {
      this.editDialogState.isNew = false;
      this.editDialogState.questionIndex = index;
      this.editDialogState.question = clone(this.quiz.questions[index]);
      this.editDialogState.isShow = true;
    },
    cancelEditQuestion() {
      this.editDialogState.isShow = false;
    },
    applyEditQuestion() {
      this.editDialogState.isShow = false;
      if (!this.editDialogState.isNew)
        this.$set(
          this.quiz.questions,
          this.editDialogState.questionIndex,
          this.editDialogState.question
        );
      else this.quiz.questions.push(this.editDialogState.question);
    },
    newQuestion() {
      this.editDialogState.isNew = true;
      this.editDialogState.questionIndex = 0;
      this.editDialogState.question = {
        id: "new-" + Math.random().toString(36).substr(2),
        type: "multiple-choice",
        question: "",
        choices: ["", "", "", ""],
        answer: 0,
      };
      this.editDialogState.isShow = true;
    },
    async saveQuiz() {
      try {
        const result = await Quiz.saveQuiz(this.quiz_id, this.quiz);
        const newIdsMap = result.newQuestionsId;
        for (const question of this.quiz.questions) {
          if (question.id in newIdsMap) {
            question.id = newIdsMap[question.id];
          }
        }
        this.showNotification({
          text: "Quiz saved",
          color: "success",
        });
      } catch (e) {
        console.error(e);
        this.showNotification({
          text: "Cannot save quiz",
          color: "error",
        });
      }
    },
    async deleteQuestion(index) {
      this.$delete(this.quiz.questions, index);
    },
  },
  watch: {
    quiz_id() {
      this.refresh();
    },
  },
  computed: {
    toolbarTop() {
      return this.$vuetify.application.top + "px";
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
