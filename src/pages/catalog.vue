<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue";
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
import BigCard from "../components/bigCard.vue";
import SmallCard from "../components/smallCard.vue";

import testXML from "../assets/xmltojson.json";

let sortOption = ref(false);
let sortingOption = ref("По названию");

watch(sortingOption, (newQuestion, oldQuestion) => {
  sortedItems.value;
  sortOption.value = false;
});

let sortedItems = computed(() => {
  if (sortingOption.value === "По цене ⬆") {
    testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
      return parseInt(x.price) > parseInt(y.price);
    });
    return testXML.yml_catalog.shop.offers.offer;
  } else if (sortingOption.value === "По цене ⬇") {
    testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
      return parseInt(x.price) < parseInt(y.price);
    });
  } else if (sortingOption.value === "По названию") {
    testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
      return x.name > y.name;
    });
    return testXML.yml_catalog.shop.offers.offer;
  }
});
</script>

<template>
  <Navbar />
  <h1 class="mx-4 mt-4 lg:mx-8 xl:mx-14 mb-4 text-2xl font-bold">Каталог</h1>
  <div
    class="gap-4 w-screen items-center justify-start pl-4 lg:mx-4 xl:px-10 xl:pr-24 grid grid-cols-2 lg:grid-cols-8"
  >
    <!-- <div class="relative">
      <button
        @click="colorOption = !colorOption"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Производитель
        <svg
          class="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        class="z-10 rounded-lg w-max text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-12 left-0"
        :class="[colorOption ? 'visible' : 'hidden']"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </button>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="relative w-full">
      <button
        @click="sortOption = !sortOption"
        class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Сортировка
        <svg
          class="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        class="z-10 rounded-lg w-full text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-12 left-0"
        :class="[sortOption ? 'visible' : 'hidden']"
      >
        <ul class="py-1">
          <li>
            <button
              class="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По названию'"
            >
              По названию
            </button>
          </li>
          <li>
            <button
              class="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По цене ⬆'"
            >
              По цене ⬆
            </button>
          </li>
          <li>
            <button
              class="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По цене ⬇'"
            >
              По цене ⬇
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:mx-8 xl:mx-10 gap-6 py-6 px-4"
  >
    <SmallCard
      v-for="item in testXML.yml_catalog.shop.offers.offer.slice(0, 100)"
      :key="item.vendorCode"
      :id="item.vendorCode"
      :img="item.picture"
      :title="item.name"
      :price="item.price"
    />
  </div>
</template>
