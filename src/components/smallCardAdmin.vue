<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
const store = useCartStore();
let props = defineProps(["price", "id", "title", "img"]);
let isFavorite = ref(false);

function checkForImage() {
  if (Array.isArray(props.img)) {
    return props.img[0];
  } else {
    return props.img;
  }
}
let isLoaded = ref(false);
function onImgLoad() {
  isLoaded.value = true;
}
</script>

<template>
  <div
    class="max-w-sm group border dark:border-gray-700 shadow-lg rounded-2xl bg-white dark:bg-gray-900 w-full"
  >
    <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
    <router-link :to="{ name: 'Item', params: { id: props.id } }">
      <img
        :src="checkForImage()"
        class="rounded-t-lg w-full h-40 xl:h-52 object-contain p-4 bg-white "
        alt="product image"
        @load="onImgLoad"
        v-show="isLoaded"
      />
      <div
        class="rounded-t-lg w-full h-40 xl:h-52 object-contain dark:bg-white bg-white-500 grid place-items-center"
        v-show="!isLoaded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="fill-blue-500"
        >
          <path
            d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v3h20V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-8v2z"
          ></path>
        </svg>
      </div>
    </router-link>
    <div class="px-3 pb-3 mt-2">
      <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
      <router-link :to="{ name: 'Item', params: { id: props.id } }">
        <h5
          class="text-sm font-medium tracking-tight text-gray-900 dark:text-white truncate"
        >
          {{ title }}
        </h5>
      </router-link>
      <div
        class="grid grid-rows-2 xl:flex xl:flex-col xl:justify-start xl:items-start gap-2 mt-2"
      >
        <span class="text-lg font-bold text-gray-900 dark:text-white"
          >{{ price }} ₽</span
        >
        <div class="flex items-center justify-between w-full gap-4">
          <button
            class="text-white opacity-0 w-full group-hover:opacity-100 transition-all duration-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
