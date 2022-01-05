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
        <question-editor
          :index="index"
          :question="question"
          @update:question="$set(quiz.questions, index, $event)"
          @delete="deleteQuestion"
          :selectImageFunction="selectImage"
        />
      </v-col>

      <v-col>
        <v-btn color="primary" @click="newQuestion"> Add Question </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="isSelectImageDialogShow" max-width="500px">
      <dialog-select-image
        :quizId="quiz.id"
        @cancel="callImageSelectCancelled"
        @imageSelected="callImageSelected"
      />
    </v-dialog>
  </resource-wrapper>
</template>

<script>
import { Quiz } from "@/api";
import QuizSummary from "../components/QuizSummary.vue";
import DialogSelectImage from "../components/DialogSelectImage.vue";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/ResourceWrapper.vue";
import QuestionEditor from "../components/QuestionEditor.vue";

export default {
  props: {
    quiz_id: String,
  },
  components: {
    QuizSummary,
    DialogSelectImage,
    ResourceWrapper,
    QuestionEditor,
  },
  data() {
    return {
      quiz: {},
      isSelectImageDialogShow: false,
      isDeleteDialogShow: false,
      onImageSelected: null,
      onImageSelectCancelled: null,
      state: null,
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
    newQuestion() {
      this.quiz.questions.push({
        id: "new-" + Math.random().toString(36).substr(2),
        type: "multiple-choice",
        question: "",
        choices: ["", "", "", ""],
        answer: 0,
      });
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
    selectImage() {
      return new Promise((resolve) => {
        const unbindEvent = () => {
          this.onImageSelected = null;
          this.onImageSelectCancelled = null;
        };
        this.onImageSelected = (result) => {
          resolve(result);

          unbindEvent();
        };
        this.onImageSelectCancelled = unbindEvent;
        this.isSelectImageDialogShow = true;
      });
    },
    callImageSelected(result) {
      this.isSelectImageDialogShow = false;
      this.onImageSelected(result);
    },
    callImageSelectCancelled() {
      this.isSelectImageDialogShow = false;
      this.onImageSelectCancelled();
    },
  },
  watch: {
    quiz_id() {
      this.refresh();
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
