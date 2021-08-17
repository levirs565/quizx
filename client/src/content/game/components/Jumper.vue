<template>
  <div class="jumper">
    <c-button
      v-for="(type, index) in buttons"
      :key="index"
      @click="jumpClick(index)"
      :type="type"
      class="button no-margin"
    >
      {{ index + 1 }}
    </c-button>
  </div>
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

<style scoped>
.jumper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
}
</style>
