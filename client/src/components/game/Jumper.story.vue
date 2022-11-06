<script lang="ts" setup>
import Jumper from "./Jumper.vue";
const buttons = new Array(20).fill("success");
</script>

<template>
  <Story>
    <jumper :buttons="buttons"></jumper>
  </Story>
</template>
