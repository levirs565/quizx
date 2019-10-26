<template>
  <div class="flex flex-wrap">
    <button
      v-for="index in total"
      :key="index"
      @click="jumpClick(index)"
      :class="{
        'info': current == index
      }"
      class="button w-12"
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

<style>
</style>
