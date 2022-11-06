<template>
  <Story title="MathField">
    <Variant title="Input Field" :init-state="initState">
      <template #default="{ state }">
        <MathFieldInput v-model="state.text" virtual-keyboard-mode="manual" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>

    <Variant title="Readonly Input Field" :init-state="initState">
      <template #default="{ state }">
        <MathFieldInput v-model="state.text" :readonly="true" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>

    <Variant title="Base Input" :init-state="initState">
      <template #default="{ state }">
        <MathFieldBase v-model="state.text" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import MathFieldInput from "./MathFieldInput.vue";
import MathFieldBase from "./MathFieldBase.vue";

function initState() {
  return {
    text: "x^2 + y^2 = r^2",
  };
}
</script>
