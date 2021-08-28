<template>
  <div class="quiz-information leading-none">
    <b-icon size="is-small" icon="account" />
    <span class="text-caption">{{ userId }}</span>
    <b-icon size="is-small" icon="help-box" class="ml-2" />
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

.quiz-information >>> .icon {
  @apply mr-2;
}
</style>
