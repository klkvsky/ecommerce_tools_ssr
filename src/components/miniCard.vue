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
  <router-link
    :to="{ name: 'Item', params: { id: props.id } }"
    class="group w-72 bg-white rounded-lg shadow-md flex flex-row justify-start gap-4 items-center dark:bg-gray-700"
  >
    <div class="px-3 pb-3 mt-2 w-72">
      <!-- <router-link :to="{ name: 'Item', params: { id: props.id } }"> -->
      <h5
        class="text-sm font-medium tracking-tight text-gray-900 dark:text-white truncate"
      >
        {{ title }}
      </h5>

      <div
        class="grid grid-rows-2 xl:flex xl:flex-col xl:justify-start xl:items-start gap-2 mt-2"
      >
        <span class="text-lg font-bold text-gray-900 dark:text-white"
          >{{ price }} ₽</span
        >
      </div>
    </div>
  </router-link>
</template>
