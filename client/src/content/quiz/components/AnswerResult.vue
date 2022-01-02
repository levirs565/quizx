<template>
  <span
    v-if="result"
    class="text-body-1"
    :class="result.correct ? 'success--text' : 'error--text'"
  >
    Jawaban anda
    {{ result.correct ? "benar" : "salah coba lagi." }}
  </span>
</template>
<script>
export default {
  props: {
    result: Object,
  },
};
</script>
