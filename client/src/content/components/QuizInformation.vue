<template>
  <div>
    <v-chip class="mr-2" label>
      <v-icon left>mdi-account</v-icon>
      {{ userId }}
    </v-chip>
    <v-chip class="mr-2" label>
      <v-icon left>mdi-help-box</v-icon>
      {{ questionCount }}
    </v-chip>
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
<style scoped></style>
