<template>
  <div class="quiz-information leading-none">
    <c-icon>person</c-icon>
    <span class="text-caption">{{ userId }}</span>
    <c-icon class="ml-2">quiz</c-icon>
    <span class="text-caption">{{ questionCount }} Questions</span>
  </div>
</template>
<script>
export default {
  props: {
    userId: String,
    questionCount: Number,
  },
};
</script>
<style scoped>
.quiz-information >>> span {
  @apply leading-4 align-middle;
}

.quiz-information >>> .material-icons {
  @apply text-base leading-none mr-2;
}
</style>
