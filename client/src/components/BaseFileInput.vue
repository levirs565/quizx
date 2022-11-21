<template>
  <div @dragover.prevent @drop.prevent="addDropFile">
    <p class="text-body-1 text--primary">
      Upload file by dropping file here or click input below
    </p>
    <v-file-input
      filled
      :label="label"
      :accept="accept"
      :prepend-icon="icon"
      v-model="files"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

export interface Props {
  accept: string;
  icon: string;
  label: string;
  modelValue?: File;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: File): void;
}>();

const files = computed({
  get: () => {
    const result = [];
    if (props.modelValue) result.push(props.modelValue);
    return result;
  },
  set: (val: File[]) => {
    emit("update:modelValue", val[0]);
  },
});

const addDropFile = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0];

  if (file) emit("update:modelValue", file);
};
</script>
