<template>
  <transition name="fade" appear>
    <div class="notification" :class="['is-' + level]" v-show="isShow">
      <progress max="100" class="progress is-danger" :value="progress"></progress>
      <button class="delete" @click="close"></button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from "timers";
export default {
  props: ["level"],
  data() {
    return {
      isShow: false,
      timeout: 0,
      interval: 0,
      progress: 0
    };
  },
  methods: {
    close() {
      this.$emit("close", this);
    },
    show() {
      this.isShow = true;
      this.interval = setInterval(
        function(that) {
          that.progress += 1;
          if (that.progress == 100) {
            clearInterval(that.interval);
            that.hide();
          }
        },
        15,
        this
      );
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
.notification > .progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
