import { Notification } from "@/store/notification";
import Vue, { PluginObject } from "vue";

export default {
  install() {
    Vue.prototype.showNotification = function (
      notification: Partial<Notification>
    ) {
      this.$store.commit("setNotification", notification);
    };
  },
} as PluginObject<void>;

declare module "vue/types/vue" {
  interface Vue {
    showNotification(notification: Partial<Notification>): void;
  }
}
