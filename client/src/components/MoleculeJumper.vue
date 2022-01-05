<template>
  <v-card>
    <v-card-text class="jumper">
      <v-btn
        v-for="(color, index) in buttons"
        :key="index"
        @click="jumpClick(index)"
        :color="color"
        depressed
        tile
      >
        {{ index + 1 }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["buttons"],
  methods: {
    jumpClick(id) {
      this.$emit("click", id);
    },
  },
};
</script>

<style>
.jumper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
}
</style>
