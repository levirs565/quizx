<template>
  <form class="box form" @submit.prevent="$emit('submit', paketName)">
    <p class="title">Ubah Nama Paket</p>
    <hr class="hr">

    <div class="field">
      <label>Nama Paket</label>
      <input class="input" type="text" v-model="paketName">
    </div>

    <input
      class="button primary submit"
      type="submit"
      value="Ubah"
      :disabled="paketName.length == 0"
    >
  </form>
</template>

<script>
export default {
  props: {
    currentName: String
  },
  data() {
    return {
      paketName: this.currentName
    };
  }
};
</script>

<style>
</style>
