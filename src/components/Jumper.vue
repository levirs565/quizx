<template>
  <div class="jumper">
    <button
      v-for="index in total"
      :key="index"
      @click="jumpClick(index)"
      :class="{
        'small': true,
        'selected': value == index
      }"
    >{{ index }}</button>
  </div>
</template>

<script>
export default {
  props: ["total", 'default'],
  data() {
    return {
      value: this.default
    };
  },
  methods: {
    jumpClick(id) {
      this.value = id;
      this.$emit('input', this.value);
    }
  }
};
</script>

<style>
</style>
