import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: [],
    };
  },
  actions: {
    addToStore(val) {
      this.cart.push(val);
    },
  },
  getters: {
    isEmptyCart(state) {
      if (state.cart.length < 1) {
        return true;
      } else {
        return false;
      }
    },
    cartQuantity(state) {
      return state.cart.length;
    },
  },
});
