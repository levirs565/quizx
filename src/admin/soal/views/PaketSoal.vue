<template>
  <div class="flex flex-col">
    <h1 class="title">
      {{ paket.name }}
      <font-awesome icon="edit" class="ml-2 cursor-pointer" @click="showEditPaket"></font-awesome>
    </h1>
    <hr class="hr">
    <div class="box container">
      <div class="list">
        <div class="list-toolbox list-item">
          <button class="button danger mr-2" @click="deletePaket">Hapus</button>
          <router-link tag="button" class="button primary" :to="`${paketURI}/new`">Soal Baru</router-link>
        </div>
        <ul>
          <router-link
            v-for="soal in paket.soalList"
            :key="soal.id"
            class="list-item"
            :to="`${paketURI}/${soal.id}`"
            tag="li"
          >
            <p class="text truncate" v-text="`${soal.id + 1}. ${soal.soal}`"></p>
          </router-link>
        </ul>
      </div>
      <router-view class="ml-2 border-l border-gray-300 pl-2" @change="refresh"></router-view>
    </div>
  </div>
</template>

<script>
import { AdminSoal } from "@/api";
import ModalEditPaket from "../components/ModalEditPaket";
import showModal from "@/admin/modal/bus";

export default {
  props: {
    paket_id: String
  },
  data() {
    return {
      paket: {}
    };
  },
  methods: {
    refresh() {
      AdminSoal.getPaket(this.paket_id).then(val => {
        this.paket = val;
      });
    },
    deletePaket() {
      AdminSoal.removePaket(this.paket_id).then(() => {
        this.$router.replace("/admin/soal");
      });
    },
    showEditPaket() {
      showModal(ModalEditPaket, { currentName: this.paket.name }, this.editPaket )
    },
    editPaket(name) {
      AdminSoal.editPaket(this.paket_id, { name }).then(val => {
        this.paket = val;
      })
    }
  },
  computed: {
    paketURI() {
      return `/admin/soal/${this.paket.id}`;
    }
  },
  watch: {
    paket_id() {
      this.refresh();
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style src="../styles/list.css" scoped>
</style>
<style lang="postcss" scoped>
.container {
  @apply flex;
}

.container > * {
  @apply flex-grow;
  min-width: calc(50% - 1rem);
}
</style>
