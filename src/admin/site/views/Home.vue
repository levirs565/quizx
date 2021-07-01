<template>
  <div>
    <h1 class="title mb-8">Beranda Admin</h1>
    <hr class="hr">
    <router-link tag="div" class="button info box" to="/admin/soal">
      <font-awesome icon="question-circle" size="4x"></font-awesome>
      <span>Kelola Soal</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.button.box {
  @apply shadow-md inline-block w-64 p-6;
}

.button.box > svg {
  @apply block mx-auto mb-4;
}

.button.box > span {
  @apply block text-center uppercase font-normal;
}
</style>
