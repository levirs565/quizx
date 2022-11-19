<template>
  <Story title="MathField">
    <Variant title="Input Field" :init-state="initState">
      <template #default="{ state }">
        <VMathLiveField v-model="state.text" virtual-keyboard-mode="manual" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>

    <Variant title="Readonly Input Field" :init-state="initState">
      <template #default="{ state }">
        <VMathLiveField v-model="state.text" :readonly="true" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>

    <Variant title="Base Input" :init-state="initState">
      <template #default="{ state }">
        <MathLiveField v-model="state.text" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="LaTeX" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import MathLiveField from "./MathLiveField.vue";
import VMathLiveField from "./VMathLiveField.vue";

function initState() {
  return {
    text: "x^2 + y^2 = r^2",
  };
}
</script>
