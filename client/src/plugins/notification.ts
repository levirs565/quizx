import useNotificationStore, { Notification } from "@/store/notification";
import { Plugin } from "vue";

export default {
  install(app, options) {
    app.config.globalProperties.showNotification = function (
      notification: Notification
    ) {
      const store = useNotificationStore();
      store.notification = notification;
    };
  },
} as Plugin;

declare module "vue" {
  interface NotificationPluginProperties {
    showNotification(notification: Notification): void;
  }
}
