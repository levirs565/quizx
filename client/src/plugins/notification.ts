import { useNotificationStore, Notification } from "@/store/notification";
import { Plugin } from "vue";

export default {
  install(app, options) {
    app.config.globalProperties.showNotification = function (
      text: string,
      color: string
    ) {
      const store = useNotificationStore();
      store.addNotification(text, color);
    };
  },
} as Plugin;

declare module "vue" {
  interface NotificationPluginProperties {
    showNotification(notification: Notification): void;
  }
}
