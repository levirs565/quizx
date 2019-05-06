<template>
  <div class="jumper">
    <button
      v-for="index in total"
      :key="index"
      @click="jumpClick(index)"
      :class="{
        'small': true,
        'selected': current == index
      }"
    >{{ index }}</button>
  </div>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      current: 1
    };
  },
  methods: {
    jumpClick(id) {
      this.current = id;
    }
  }
};
</script>

<style>
</style>
