<template>
  <div class="permainan-result">
    <p>Hasil Permainan</p>
    <p>Benar: {{ results.benar }}</p>
    <p>Salah: {{ results.salah }}</p>
    <p>Tidak di jawab: {{ results.takDiJawab }}</p>
  </div>
</template>

<script>
export default {
  props: ["results"]
};
</script>

<style>
</style>
