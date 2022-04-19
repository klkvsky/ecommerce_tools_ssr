<script setup>
import { useCartStore } from "../stores/cart";
const store = useCartStore();
let props = defineProps(["price", "id", "title", "img"]);
const isFavorite = true;
</script>

<template>
  <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800">
    <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
    <router-link :to="{ name: 'Item', params: { id: 'fQmnKH7AUPqNlBmSaEmY' } }">
      <img
        :src="props.img"
        class="rounded-t-lg w-full h-72 object-contain dark:bg-white"
        alt="product image"
      />
    </router-link>
    <div class="px-5 pb-5 mt-4 xl:grid xl:grid-rows-2">
      <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
      <router-link
        :to="{ name: 'Item', params: { id: 'fQmnKH7AUPqNlBmSaEmY' } }"
      >
        <h5
          class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </router-link>
      <div class="flex justify-between items-center mt-4">
        <span class="text-3xl font-bold text-gray-900 dark:text-white"
          >{{ price }} ₽</span
        >
        <button
          href="#"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="
            store.addToStore({
              Name: 'New Item',
              Quantity: '1',
              Price: '15000',
            })
          "
        >
          Купить
        </button>
      </div>
    </div>
  </div>
</template>
