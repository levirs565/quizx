import { User } from "@/api";
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
      return User.state().then((result) => {
        this.user = result.user;
      });
    },
    logout() {
      User.logout().then(() => {
        this.updateUser();
      });
    },
  },
});
