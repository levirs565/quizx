<template>
  <math-field ref="field" @input="emit('update:modelValue', $el.value)" />
</template>
<script lang="ts"></script>
<script lang="ts" setup>
import { MathfieldElement } from "mathlive";
import "mathlive/dist/mathlive-fonts.css";
import { inject, nextTick, onMounted, Ref, ref, unref, watch } from "vue";
import { mathKeyboardContainerInjectionKey } from "./key";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const field = ref<MathfieldElement>();
const keyboardContainer = inject<HTMLElement | Ref<HTMLElement>>(
  mathKeyboardContainerInjectionKey
);

onMounted(() => {
  nextTick(() => {
    field.value!.value = props.modelValue;
    field.value!.setOptions({
      virtualKeyboardMode: "manual",
      virtualKeyboardContainer: unref(keyboardContainer),
      readOnly: props.readonly,
    });
  });
});

watch(
  () => props.modelValue,
  (value) => {
    if (value == field.value?.value) return;

    field.value!.value = value;
  }
);

defineExpose({
  field,
});
</script>
