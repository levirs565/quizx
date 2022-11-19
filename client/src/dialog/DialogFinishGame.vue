<template>
  <v-card>
    <v-card-title>Finish Game?</v-card-title>
    <v-card-text>Make sure all questions are answered correctly.</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
      <v-btn variant="text" color="error" @click="submit">Finish</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
export const finishFunctionInjectionKey = Symbol("finishFunctionKey");
</script>
<script lang="ts" setup>
import { inject } from "vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "finished"): void;
}>();
const finishFunction = inject<() => Promise<any>>(finishFunctionInjectionKey);

const submit = async () => {
  await finishFunction!();

  emit("close");
  emit("finished");
};
</script>
