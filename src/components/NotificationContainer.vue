<template>
  <div class="notification-container"></div>
</template>

<script>
import Notification from "./Notification.vue";
import Vue from "vue";

export default {
  data() {
    return {
      NotificationClass: Vue.extend(Notification)
    };
  },
  methods: {
    addNotification(content, level) {
      var instance = new this.NotificationClass({
        propsData: {
          level: level
        }
      });
      instance.$slots.default = content;
      instance.$on("close", this.childClose);
      instance.$mount();
      this.$el.prepend(instance.$el);
      instance.show();
    },
    childClose(node) {
      node.hide();
    }
  }
};
</script>

<style>
</style>
