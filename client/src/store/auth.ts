import { userApi } from "@/api";
import { defineStore } from "pinia";

interface State {
  user: any;
}

export default defineStore("auth", {
  state: (): State => ({
    user: undefined,
  }),
  actions: {
    updateUser() {
      return userApi.state().then((result) => {
        this.user = result.user;
      });
    },
    logout() {
      userApi.logout().then(() => {
        this.updateUser();
      });
    },
  },
});
