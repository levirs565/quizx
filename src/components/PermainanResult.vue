<template>
  <div class="permainan-result columns is-mobile is-multiline is-centered">
    <p class="column is-full tleft" style="padding-left: 0;">Hasil Permainan</p>
    <template v-for="(item, index) in items ">
      <p class="column is-10 tleft is-paddingless" :class="[item.color]" :key="index + 'a'">
        <font-awesome :icon="item.icon"></font-awesome>
        &nbsp;{{ item.prop }}
      </p>
      <p
        class="column is-2 tright is-paddingless"
        :class="[item.color]"
        :key="index + 'b'"
      >{{ item.val }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: ["results"],
  computed: {
    items() {
      return [
        {
          prop: "Benar",
          val: this.results.benar,
          color: "has-text-success",
          icon: "check"
        },
        {
          prop: "Salah",
          val: this.results.salah,
          color: "has-text-danger",
          icon: "times"
        },
        {
          prop: "Tidak Di Jawab",
          val: this.results.takDiJawab,
          color: "has-text-warning",
          icon: "exclamation"
        }
      ];
    }
  }
};
</script>

<style>
.tleft {
  text-align: left;
}

.tright {
  text-align: right;
}

.svg-inline--fa {
  width: 1em !important;
}
</style>
