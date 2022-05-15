import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      email: "",
      password: "",
    };
  },
  actions: {
    addAccount(val, val2) {
      this.email = val;
      this.password = val2;
    },
  },
  getters: {
    cartQuantity(state) {
      return state.email;
    },
  },
});
