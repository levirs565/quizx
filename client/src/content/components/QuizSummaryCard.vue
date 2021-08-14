<template>
  <div
    class="card h-16 py-0 flex flex-row flex-wrap items-center content-center font-roboto quiz-summary-card cursor-pointer"
    @click="$emit('click', $event)"
  >
    <p class="text-body1  w-full">{{ quiz.title }}</p>
    <c-icon>person</c-icon>
    <span class="text-caption">{{ quiz.userId }}</span>
    <c-icon class="ml-2">quiz</c-icon>
    <span class="text-caption">{{ quiz.questionCount }} Questions</span>
  </div>
</template>

<script>
export default {
  props: {
    quiz: Object,
  },
};
</script>

<style scoped>
.quiz-summary-card >>> * {
  @apply leading-none;
}

.quiz-summary-card >>> .material-icons {
  @apply text-base leading-none mr-2;
}
</style>
