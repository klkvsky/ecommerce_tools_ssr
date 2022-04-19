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
  <div class="max-w-sm group bg-white rounded-lg shadow-md dark:bg-gray-700">
    <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
    <router-link :to="{ name: 'Item', params: { id: props.id } }">
      <img
        :src="checkForImage()"
        class="rounded-t-lg w-full h-40 xl:h-52 object-contain dark:bg-white bg-white-500 p-4"
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
            class="text-white opacity-0 group-hover:opacity-100 transition-all duration-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="
              store.addToStore({
                Image: props.img,
                Name: title,
                Quantity: '1',
                Price: price,
              })
            "
          >
            Купить
          </button>

          <button
            class="border-2 w-8 h-8 grid place-items-center rounded-lg transition-all duration-200"
            :class="[
              isFavorite
                ? 'bg-red-500 fill-white border-red-500'
                : 'border-blue-500 hover:bg-blue-500 fill-blue-500 hover:fill-white',
            ]"
            @click="isFavorite = !isFavorite"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
