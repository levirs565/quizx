<template>
  <div class="container mx-auto py-4">
    <h1 class="text-2xl font-medium">Koleksi Soal</h1>
    <hr class="border-solid border-b border-gray-500">
    <ul>
      <li
        v-for="collection in collectionList"
        :key="collection.id"
        class="px-4 py-2 border-solid border-b border-gray-300 hover:bg-gray-300"
      >
        <router-link :to="'/soal/' + collection.id">
          <p class="text-lg" v-text="collection.name"></p>
          <p class="text-gray-700">{{ collection.soalCount }} Soal</p>
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
      collectionList: []
    };
  },

  mounted() {
    Soal.getCollectionList().then(val => {
      this.collectionList = val.list;
    });
  }
};
</script>

<style>
</style>
