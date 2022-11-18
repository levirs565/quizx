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
const emit = defineEmits<{
  (e: "close"): void;
  (e: "delete"): void;
}>();

const submit = () => {
  emit("delete");
  emit("close");
};
</script>
