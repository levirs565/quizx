<template>
  <v-card>
    <v-card-title>Delete Quiz?</v-card-title>
    <v-card-text>This action is permanent.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
      <v-btn variant="text" color="error" @click="submit">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
export interface Props {
  deleteFunction: () => Promise<any>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "deleted"): void;
}>();

const submit = async () => {
  await props.deleteFunction();
  emit("close");
  emit("deleted");
};
</script>
