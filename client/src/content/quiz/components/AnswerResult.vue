<template>
  <span
    v-if="result"
    class="ml-4 text-body2"
    :class="result.correct ? 'text-green-600' : 'text-red-600'"
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
