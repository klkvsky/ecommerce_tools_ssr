<script setup>
import { watch, ref } from "vue";
import { useCartStore } from "../stores/cart.js";
const store = useCartStore();
</script>

<template>
  <router-link
    to="/cart"
    class="fixed bottom-4 right-4 w-11 h-11 bg-blue-500 rounded-xl shadow-xl  z-20 transition-all duration-500 lg:hidden"
    :class="[
      store.isEmptyCart
        ? 'opacity-0 translate-x-20'
        : 'translate-x-0 opacity-100',
    ]"
  >
    <div class="relative w-full h-full grid place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        class="fill-white -ml-0.5"
      >
        <path
          d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"
        ></path>
        <circle cx="10.5" cy="19.5" r="1.5"></circle>
        <circle cx="17.5" cy="19.5" r="1.5"></circle>
      </svg>
      <div
        class="grid place-items-center w-5 h-5 bg-blue-900 text-white shadow-md rounded-full absolute -top-1.5 -right-1.5 text-xs font-semibold"
      >
        {{ store.cartQuantity }}
      </div>
    </div>
  </router-link>
</template>
