<template>
  <div class="container mx-auto py-4">
    <h1 class="text-2xl font-medium">Koleksi Soal</h1>
    <hr class="border-solid border-b border-gray-500">
    <ul>
      <li
        v-for="paket in paketList"
        :key="paket.id"
        class="px-4 py-2 border-solid border-b border-gray-300 hover:bg-gray-300"
      >
        <router-link :to="'/soal/' + paket.id">
          <p class="text-lg" v-text="paket.name"></p>
          <p class="text-gray-700">{{ paket.soalCount }} Soal</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Soal } from "../api.js";

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
