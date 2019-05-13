<template>
  <transition name="fade" appear>
    <div class="notification" :class="['is-' + level]" v-show="isShow">
      <button class="delete" @click="close"></button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: ["level"],
  data() {
    return {
      isShow: false,
      timeout: 0
    };
  },
  methods: {
    close() {
      this.$emit("close", this);
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
      this.timeout = setTimeout(
        function(that) {
          that.$el.remove();
        },
        300,
        this
      );
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
