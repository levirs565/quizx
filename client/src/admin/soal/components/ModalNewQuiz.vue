<template>
  <form class="box form" @submit.prevent="$emit('submit', paketName)">
    <p class="title">Paket Baru</p>
    <hr class="hr">

    <div class="field">
      <label>Nama Paket</label>
      <input class="input" type="text" v-model="paketName">
    </div>

    <input
      class="button primary submit"
      type="submit"
      value="Buat"
      :disabled="paketName.length == 0"
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      paketName: ""
    };
  }
};
</script>

<style>
</style>
