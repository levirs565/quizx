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
<script lang="ts" setup>
export interface Props {
  userId: string;
  questionCount: number;
}
const props = defineProps<Props>();
</script>
<style scoped></style>
