<template>
  <v-input>
    <v-field v-bind="$attrs">
      <math-live-field
        class="math-field-input px-4 py-2"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        :readonly="readonly"
      />
    </v-field>
  </v-input>
</template>
<script lang="ts" setup>
import MathLiveField from "./MathLiveField.vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = defineProps({
  modelValue: String,
  readonly: {
    type: Boolean,
    default: false,
  },
});
</script>
<style>
.math-field-input {
  flex-grow: 1;
  align-self: center;
  outline: none !important;
}
</style>
