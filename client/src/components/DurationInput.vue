<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <span class="text-body-1">{{ label }}</span>
    </v-col>
    <v-col cols="6">
      <v-text-field
        type="number"
        suffix="minute"
        variant="outlined"
        hide-details
        min="0"
        v-model.number="minute"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        type="number"
        suffix="second"
        variant="outlined"
        hide-details
        min="0"
        max="59"
        v-model.number="second"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

export interface Props {
  modelValue: number;
  label: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const minute = ref(0);
const second = ref(0);

const updateValue = () => {
  const time = minute.value * 60 + second.value;
  emit("update:modelValue", time);
};

watch(minute, updateValue);
watch(second, updateValue);

watch(
  () => props.modelValue,
  (value) => {
    minute.value = Math.floor(value / 60);
    second.value = Math.floor(value % 60);
  },
  {
    immediate: true,
  }
);
</script>
