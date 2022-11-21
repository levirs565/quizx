<template>
  <v-card-text class="jumper">
    <v-btn
      v-for="(color, index) in buttons"
      :key="index"
      @click="jumpClick(index)"
      :color="color"
      depressed
      tile
      small
    >
      {{ index + 1 }}
    </v-btn>
  </v-card-text>
</template>

<script lang="ts" setup>
export interface Props {
  buttons: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "click", index: number): void;
}>();

const jumpClick = (index: number) => {
  emit("click", index);
};
</script>

<style>
.jumper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
