<template>
  <div class="jumper buttons columns">
    <button
      v-for="index in total"
      :key="index"
      @click="jumpClick(index)"
      :class="{
        'is-info is-selected': current == index
      }"
      class="button column is-2 is-radiusless is-inline-flex"
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
.jumper {
  text-align: left;
}
</style>
