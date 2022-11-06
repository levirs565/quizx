<template>
  <div class="TextViewer text-body-1 text--primary" v-html="renderedHTML" />
</template>
<script lang="ts" setup>
import "mathlive/dist/mathlive-static.css";
import { convertLatexToMarkup } from "mathlive";
import { computed, toRefs } from "vue";

const props = defineProps({
  modelValue: String,
});

const { modelValue } = toRefs(props);

const renderedHTML = computed(() => {
  const element = document.createElement("div");
  element.innerHTML = modelValue?.value ? modelValue?.value : "";

  // TODO: <math> is deprecated
  element.querySelectorAll("math-inline,math,math-block").forEach((element) => {
    const src = element.getAttribute("src");
    let mathstyle: "textstyle" | "displaystyle" = "textstyle";
    if (element.tagName.toLowerCase() == "math-block")
      mathstyle = "displaystyle";

    const inner = convertLatexToMarkup(src ? src : "", { mathstyle });
    element.innerHTML = inner;
  });

  return element.innerHTML;
});
</script>
<style>
math-block {
  display: block;
}
</style>
