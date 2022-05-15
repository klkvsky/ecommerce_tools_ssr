<script setup>
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
// import BigCard from "../components/bigCard.vue";
import SmallCard from "../components/smallCard.vue";

import { ref, onMounted, computed, watch } from "vue";

import { createRouter } from "../router/index.js";
import { useRoute } from "vue-router";

import { db } from "../firebase";

import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  addDoc,
} from "firebase/firestore";

let documentSnapshots = ref();

const route = useRoute();
const router = createRouter();
let pageIndex = ref(1);

const started = onMounted(() => {
  if (route.query.page) {
    console.log(route.query.page);
    pageIndex.value = parseInt(route.query.page);
  }

  getData();
});

async function getData(value) {
  document
    .getElementById("catalogStart")
    .scrollIntoView({ behavior: "smooth" });

  // const lastVisible =
  //   documentSnapshots.value.docs[documentSnapshots.value.docs.length - 1];

  // Construct a new query starting at this document,
  // get the next 25 cities.
  const next = query(
    collection(db, "items"),
    orderBy("categoryId"),
    startAfter(50 * pageIndex.value),
    limit(50)
  );

  if (value == "next") {
    pageIndex.value++;
  } else {
    pageIndex.value--;
  }

  documentSnapshots.value = await getDocs(next);

  router.push({ path: route.fullPath, query: { page: pageIndex.value } });
}

// import testXML from "../assets/xmltojson.json";

// let sortOption = ref(false);
// let sortingOption = ref("По названию");

// watch(sortingOption, (newQuestion, oldQuestion) => {
//   sortedItems.value;
//   sortOption.value = false;
// });

// let sortedItems = computed(() => {
//   if (sortingOption.value === "По цене ⬆") {
//     testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
//       return parseInt(x.price) > parseInt(y.price);
//     });
//     return testXML.yml_catalog.shop.offers.offer;
//   } else if (sortingOption.value === "По цене ⬇") {
//     testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
//       return parseInt(x.price) < parseInt(y.price);
//     });
//   } else if (sortingOption.value === "По названию") {
//     testXML.yml_catalog.shop.offers.offer.sort((x, y) => {
//       return x.name > y.name;
//     });
//     return testXML.yml_catalog.shop.offers.offer;
//   }
// });
</script>

<template>
  <Navbar />
  <h1
    class="mx-4 mt-4 lg:mx-8 xl:mx-14 mb-4 text-2xl font-bold"
    id="catalogStart"
  >
    Каталог
  </h1>
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
    <!--  -->
    <!-- <div class="relative w-full">
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
    </div> -->
  </div>
  <div
    class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:mx-8 xl:mx-10 gap-6 py-6 px-4"
    v-if="documentSnapshots"
  >
    <SmallCard
      v-for="item in documentSnapshots.docs"
      :key="item.id"
      :id="item.data().vendorCode"
      :img="item.data().picture"
      :title="item.data().name"
      :price="item.data().price"
    />
  </div>

  <div class="flex flex-col items-center">
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        pageIndex * 50
      }}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{{
        pageIndex * 50 + 50
      }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        2700 / 50
      }}</span>
      Entries
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="getData('prev')"
      >
        <svg
          class="mr-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Prev
      </button>
      <button
        class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="getData('next')"
      >
        Next
        <svg
          class="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>

  <FooterComponent />
</template>
