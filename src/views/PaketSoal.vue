<template>
  <div class="container mx-auto py-4">
    <h1 class="text-2xl font-medium" v-text="paket.name"></h1>
    <p class="text-gray-700 text-lg">{{ paket.soalList.length }} Soal</p>
    <hr class="border-solid border-b border-gray-500">

    <button class="button primary">
      <font-awesome icon="play" class="mr-2"></font-awesome>Mainkan
    </button>

    <div class="h-8"></div>

    <div class="flex h-full">
      <ul class="w-1/2 pr-4">
        <li
          v-for="soal in paket.soalList"
          :key="soal.id"
          class="px-4 py-2 border-solid border-b border-gray-300 hover:bg-gray-300"
        >
          <router-link :to="`/soal/${paket_id}/${soal.id}`">
            <p class="text-lg truncate" v-text="`${soal.id + 1}. ${soal.soal}`"></p>
          </router-link>
        </li>
      </ul>
      <router-view class="w-1/2 pl-4 h-full"></router-view>
    </div>
  </div>
</template>

<script>
import { Soal } from "../api.js";

export default {
  props: {
    paket_id: String
  },
  data() {
    return {
      paket: {
        name: "undefined",
        soalList: []
      }
    };
  },
  mounted() {
    this.updatePaket();
  },
  watch: {
    paket_id() {
      this.updatePaket();
    }
  },
  methods: {
    updatePaket() {
      Soal.getPaket(this.paket_id).then(val => {
        this.paket = val;
      });
    }
  }
};
</script>

<style>
</style>
