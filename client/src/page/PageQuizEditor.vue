<template>
  <resource-wrapper :state="state" class="has-fab" @reload="refresh">
    <template v-slot:toolbar>
      <v-toolbar-title>Quiz Editor</v-toolbar-title>
      <v-spacer />
    </template>
    <template #toolbarAppend>
      <v-btn icon @click="saveQuiz">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-dialog max-width="300px">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <dialog-delete-quiz
            :delete-function="deleteFunction"
            @close="isActive.value = false"
            @deleted="deleted"
          />
        </template>
      </v-dialog>
    </template>

    <quiz-summary :quiz="quiz!" editor> </quiz-summary>

    <p class="text-h6 my-4">Questions</p>

    <v-row>
      <v-col
        cols="12"
        v-for="(question, index) in quiz?.questions"
        :key="question.id"
      >
        <question-view :index="index" :question="question" :editable="false">
          <v-card-actions>
            <v-spacer />
            <v-btn
              variant="outlined"
              color="error"
              @click="deleteQuestion(index)"
            >
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
            <v-btn variant="outlined" @click="editQuestion(index)">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-actions>
        </question-view>
      </v-col>

      <v-col>
        <v-btn color="primary" @click="newQuestion"> Add Question </v-btn>
      </v-col>

      <v-dialog fullscreen hide-overlay v-model="isEditDialogShow" scrollable>
        <dialog-question-editor
          ref="questionEditor"
          @close="isEditDialogShow = false"
          @apply="applyEditQuestion"
        ></dialog-question-editor>
      </v-dialog>
    </v-row>
  </resource-wrapper>
</template>

<script lang="ts" setup>
import { mediaApi, quizApi } from "@/api";
import QuizSummary from "@/components/quiz/QuizSummary.vue";
import ResourceWrapper from "@/components/resource/ResourceWrapper.vue";
import QuestionView from "@/components/question/Question.vue";
import DialogQuestionEditor from "@/dialog/DialogQuestionEditor.vue";
import DialogDeleteQuiz from "@/dialog/DialogDeleteQuiz.vue";
import clone from "just-clone";
import { nextTick, onMounted, provide, ref, watch } from "vue";
import { MultipleChoiceQuestion, Question, Quiz } from "@quizx/shared";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/store/notification";
import { uploadFunctionInjectionKey } from "@/dialog/DialogSelectImage.vue";
import { useResourceState } from "@/components/resource/helper";

export interface Props {
  quiz_id: string;
}

const router = useRouter();
const notification = useNotificationStore();

const props = defineProps<Props>();

const {
  resource: quiz,
  load: refresh,
  state,
} = useResourceState(() => quizApi.getQuizForEditor(props.quiz_id));
const isEditDialogShow = ref(false);
const questionEditor = ref<InstanceType<typeof DialogQuestionEditor>>();

const deleteFunction = () => quizApi.deleteQuiz(props.quiz_id);
const deleted = () => {
  router.replace("/quiz");
};
const editQuestion = (index: number) => {
  const question = quiz.value!.questions[index];
  const editableQuestion = Object.assign(
    Object.create(Object.getPrototypeOf(question)),
    clone(question)
  );

  isEditDialogShow.value = true;
  nextTick(() =>
    questionEditor.value!.changeState(index, false, editableQuestion)
  );
};
const applyEditQuestion = (
  index: number | undefined,
  isNew: boolean,
  question: Question
) => {
  if (!isNew) quiz.value!.questions[index!] = question!;
  else quiz.value!.questions.push(question!);
};
const newQuestion = () => {
  const question = new MultipleChoiceQuestion();
  (question.id = "new-" + Math.random().toString(36).substring(2)),
    (question.question = "");
  question.choices = ["", "", "", ""];
  question.answer = 0;

  isEditDialogShow.value = true;
  nextTick(() => questionEditor.value!.changeState(undefined, true, question));
};
const saveQuiz = async () => {
  try {
    const result = await quizApi.saveQuiz(props.quiz_id, quiz.value!);
    const newIdsMap = result.newQuestionsId;
    for (const question of quiz.value!.questions) {
      if (question.id! in newIdsMap) {
        question.id = newIdsMap[question.id!];
      }
    }
    notification.addNotification("Quiz saved", "success");
  } catch (e) {
    console.error(e);
    notification.addNotification("Cannot save quiz", "error");
  }
};
const deleteQuestion = (index: number) => {
  quiz.value!.questions.splice(index, 1);
};
provide(
  uploadFunctionInjectionKey,
  async (file: File) => await (await mediaApi.upload(props.quiz_id, file)).path
);

onMounted(refresh);
watch(() => props.quiz_id, refresh);
</script>
