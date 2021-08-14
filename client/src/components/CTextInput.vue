<template>
  <textarea v-if="multiLine" class="text-area" @input="onInput" v-text="value" />
  <input v-else type="text" class="text-area" @input="onInput" :value="value"/> 
</template>

<script>
export default {
  props: {
    multiLine: {
      type: Boolean,
      default: false
    },
    value: String
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>
.text-area {
  @apply border border-gray-500 p-4 h-12;
  @apply font-roboto text-body1 leading-none;
  min-height: theme("spacing.12");
}
</style>
