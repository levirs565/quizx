<template>
  <v-card>
    <v-card-title v-if="!editor">{{ quiz.title }}</v-card-title>
    <v-card-title v-else>
      <v-text-field variant="filled" v-model="quiz.title" hide-details="auto" />
    </v-card-title>
    <v-card-text>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questions.length"
      ></quiz-information>
      <v-combobox
        v-if="editor"
        v-model="quiz.tags"
        label="Tags"
        chips
        multiple
        hint="Enter to add tag"
        variant="outlined"
        class="mt-4"
        append-icon=""
      />
      <v-chip-group v-else column class="mt-1">
        <v-chip v-for="tag in quiz.tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-card-text>
    <slot></slot>
  </v-card>
</template>
<script>
import QuizInformation from "@/components/quiz/QuizInformation.vue";

export default {
  components: {
    QuizInformation,
  },
  props: {
    quiz: Object,
    editor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped></style>
