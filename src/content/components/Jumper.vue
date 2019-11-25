<template>
  <div class="jumper">
    <button
      v-for="index in total"
      :key="index"
      @click="jumpClick(index)"
      :class="{
        'info': current == index
      }"
      class="button"
    >{{ index }}</button>
  </div>
</template>

<script>
export default {
  props: ["total", "value"],
  data() {
    return {
      current: this.value
    };
  },
  methods: {
    jumpClick(id) {
      this.current = id;
      this.$emit("input", this.current);
    }
  },
  watch: {
    value() {
      this.current = this.value;
    }
  }
};
</script>

<style scoped>
.jumper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
}
</style>
