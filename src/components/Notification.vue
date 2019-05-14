<template>
  <transition name="fade" appear>
    <div class="notification" :class="['is-' + level]" v-show="isShow">
      <progress max="100" class="progress" :value="progress"></progress>
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
      progress: 100
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
          that.progress -= 1;
          if (that.progress == 0) {
            clearInterval(that.interval);
            that.hide();
          }
        },
        20,
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
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 0 !important;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  background: transparent;
}

.notification > .progress::-webkit-progress-bar {
  background-color: transparent;
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
