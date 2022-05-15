<script setup>
import { ref, onMounted, computed, watch } from "vue";
import SmallCardAdmin from "../components/smallCardAdmin.vue";

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

import testXML from "../assets/xmltojson.json";

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

async function getData() {
  document
    .getElementById("adminItemsStart")
    .scrollIntoView({ behavior: "smooth" });

  // const lastVisible =
  //   documentSnapshots.value.docs[documentSnapshots.value.docs.length - 1];

  // Construct a new query starting at this document,
  // get the next 25 cities.
  const next = query(
    collection(db, "items"),
    orderBy("categoryId"),
    startAfter(28 * pageIndex.value),
    limit(28)
  );

  documentSnapshots.value = await getDocs(next);
  pageIndex.value++;

  router.push({ path: route.fullPath, query: { page: pageIndex.value } });
}

// let sortOption = ref(false);
// let sortOption2 = ref(false);
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

let vendors = ref([
  "DEXX",
  "ЗУБР",
  "STAYER",
  "СИБИН",
  "GENERAL FITTINGS",
  "KRAFTOOL",
  "MIRAX",
  "GRINDA",
  "Rapid",
  "STEHER",
  "URAGAN",
  "Запчасти для эл-инстр.",
]);

function addNewCatalog() {
  // testXML.yml_catalog.shop.offers.offer.forEach((element) => newItem(element));
  vendors.value.forEach((element) => newItem(element));
}

async function newItem(el) {
  console.log("item " + el);
  const docRef = await addDoc(collection(db, "vendors"), {
    vendor: el,
  });
}

// addNewCatalog();
</script>

<template>
  <div
    class="flex flex-col w-full h-screen overflow-scroll no-scrollbar bg-gray-100 dark:bg-slate-900 p-4 rounded-2xl"
  >
    <h1 class="font-bold text-3xl pt-4" id="adminItemsStart">Товары</h1>
    <div class="flex justify-center items-center w-full my-4">
      <label
        for="dropzone-file"
        class="flex flex-col justify-center items-center w-full h-34 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col justify-center items-center pt-5 pb-6">
          <svg
            class="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Нажмите для загрузки</span> или
            перетащите файлы сюда
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">JSON, XML, YML</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
    </div>
    <!-- <div class="flex flex-row gap-4 items-center">
      <div class="relative w-36">
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
          class="z-10 rounded-lg w-full text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 absolute top-12 left-0"
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
      <div class="relative w-64">
        <button
          @click="sortOption2 = !sortOption2"
          class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Категория
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
          class="z-10 rounded-lg w-full text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 absolute top-12 left-0 h-96 overflow-scroll"
          :class="[sortOption2 ? 'visible' : 'hidden']"
        >
          <ul class="py-1">
            <li
              v-for="category in testXML.yml_catalog.shop.categories.category"
              :id="category"
            >
              <button
                class="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left"
                @click="(sortingOption = category), (sortOption2 = false)"
              >
                {{ category }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <div
      class="grid grid-cols-4 text-xl text-black gap-4 my-6"
      v-if="documentSnapshots"
    >
      <SmallCardAdmin
        v-for="item in documentSnapshots.docs"
        :key="item.id"
        :id="item.data().vendorCode"
        :img="item.data().picture"
        :title="item.data().name"
        :price="item.data().price"
      />
    </div>

    <button @click="getData()" class="btn-primary w-11/12 mx-auto mb-10">
      Дальше
    </button>
  </div>
</template>
