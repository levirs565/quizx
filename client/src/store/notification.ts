import { defineStore } from "pinia";

export interface Notification {
  id: number;
  text: string;
  color: string;
}
interface State {
  notificationQueue: Notification[];
  currentNotification?: Notification;
  timeoutId: number;
  idCounter: number;
}

export const notificationDuration = 2000;
export const notificationDelayDuration = 250;

export const useNotificationStore = defineStore("notification", {
  state: (): State => ({
    currentNotification: undefined,
    notificationQueue: [],
    timeoutId: 0,
    idCounter: 0,
  }),
  actions: {
    addNotification(text: string, color: string) {
      this.notificationQueue.push({ id: this.idCounter, text, color });
      this.idCounter++;

      if (!this.currentNotification) {
        this.showNextNotification();
      }
    },

    showNextNotification() {
      if (this.notificationQueue.length == 0) {
        this.currentNotification = undefined;
        return;
      }

      this.currentNotification = this.notificationQueue.shift();

      this.timeoutId = setTimeout(() => {
        this.showNextNotification();
      }, notificationDuration + notificationDelayDuration) as unknown as number;
    },
  },
});

export function notifiableFunction(
  fn: () => Promise<void>,
  success: string | null,
  errorPrefix: string | null
) {
  return async () => {
    const store = useNotificationStore()
    try {
      await fn();
      if (success) store.addNotification(success, "success");
    } catch (err: any) {
      store.addNotification(
        `${errorPrefix}: ${err.message ? err.message : "Uknown error"}`,
        "error"
      );
    }
  };
}
