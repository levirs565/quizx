<template>
  <div class="box container">
    <h1 class="title">Koleksi Soal</h1>
    <hr class="hr" />
    <ul>
      <router-link
        v-for="paket in paketList"
        :key="paket.id"
        tag="li"
        :to="`/soal/${paket.id}`"
        class="list-item"
      >
        <p class="text" v-text="paket.name"></p>
        <p class="subtext">{{ paket.soalCount }} Soal</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Soal } from "@/api.js";

export default {
  data() {
    return {
      paketList: []
    };
  },

  mounted() {
    Soal.getPaketList().then(val => {
      this.paketList = val.list;
    });
  }
};
</script>

<style>
</style>
