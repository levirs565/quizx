<template>
  <div class="flex flex-col">
    <h1 class="title">Pengelola Soal</h1>
    <hr class="hr">
    <div class="box container list">
      <div class="list-toolbox list-item">
        <button class="button primary" @click="showNewPaket">Paket Baru</button>
      </div>
      <ul>
        <router-link
          v-for="paket in paketList"
          :key="paket.id"
          class="list-item"
          :to="`/admin/soal/${paket.id}`"
          tag="li"
        >
          <p class="text" v-text="paket.name"></p>
          <p class="subtext">{{ paket.soalCount }} Soal</p>
        </router-link>
      </ul>
    </div>
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

<style src="../styles/list.css" scoped>
</style>
