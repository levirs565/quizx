<template>
  <div class="container mx-auto py-4">
    <h1 class="title" v-text="paket.name"></h1>
    <p class="subtext">{{ paket.soalList.length }} Soal</p>
    <hr class="hr">

    <template v-if="$store.state.loggedIn">
      <router-link :to="`/permainan/config?id=${paket_id}`" class="button primary">
        <font-awesome icon="play"></font-awesome>Mainkan
      </router-link>

      <div class="h-8"></div>
    </template>

    <div class="flex h-full">
      <ul class="w-1/2 pr-4">
        <li v-for="soal in paket.soalList" :key="soal.id" class="list-item">
          <router-link :to="`/soal/${paket_id}/${soal.id}`">
            <p class="text truncate" v-text="`${soal.id + 1}. ${soal.soal}`"></p>
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
