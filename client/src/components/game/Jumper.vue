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

<script>
export default {
  props: ["buttons"],
  methods: {
    jumpClick(id) {
      this.$emit("click", id);
    },
  },
  emits: ["click"],
};
</script>

<style>
.jumper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
