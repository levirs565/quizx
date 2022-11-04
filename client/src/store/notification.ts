import { defineStore } from "pinia";

export interface Notification {
  text: String;
  color: String;
}
interface State {
  notification?: Notification;
}

export default defineStore("notification", {
  state: (): State => ({
    notification: undefined,
  }),
});
