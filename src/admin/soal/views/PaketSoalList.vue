<template>
  <div class="box container">
    <div class="top-0 bg-white list-item sticky flex flex-row justify-end">
      <button class="button primary" @click="showNewPaket">Paket Baru</button>
    </div>
    <ul class="bg-white">
      <li v-for="paket in paketList" :key="paket.id" class="list-item">
        <router-link :to="`/admin/soal/${paket.id}`">
          <p class="text" v-text="paket.name"></p>
          <p class="subtext">{{ paket.soalCount }} Soal</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { AdminSoal } from "@/api";
import ModalNewPaket from "../components/ModalNewPaket";
import showModal from "@/admin/modal/bus";

export default {
  data() {
    return {
      paketList: []
    };
  },
  methods: {
    refresh() {
      AdminSoal.getPaketList().then(data => {
        this.paketList = data.list;
      });
    },
    showNewPaket() {
      showModal(ModalNewPaket, {}, this.newPaket);
    },
    newPaket(name) {
      AdminSoal.newPaket({ name }).then(this.refresh);
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style>
</style>
