import { Module } from "vuex";

export interface Notification {
  text: String;
  color: String;
}
interface NotificationStoreState {
  notification?: Notification;
}

export default {
  state: {
    notification: undefined,
  },
  mutations: {
    setNotification(state, notification) {
      state.notification = notification;
    },
  },
} as Module<NotificationStoreState, void>;
