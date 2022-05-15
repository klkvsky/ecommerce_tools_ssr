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
  onSnapshot,
  endBefore,
  addDoc,
  endAt,
  where,
} from "firebase/firestore";

let documentSnapshots = ref([]);
let nextDocuments = ref([]);
let sortOption = ref(false);
let pickedVendor = ref("");

const route = useRoute();
const router = createRouter();
let pageIndex = ref(1);

const started = onMounted(() => {
  if (route.query.page) {
    console.log(route.query.page);
    pageIndex.value = parseInt(route.query.page);
  }
});

async function changeVendor(value) {
  if (pickedVendor.value == value) {
    pickedVendor.value = "";
    const next = query(
      collection(db, "items"),
      orderBy("price"),
      startAfter(0),
      limit(52)
    );
    documentSnapshots.value = await getDocs(next);
  } else {
    pickedVendor.value = value;

    const next = query(
      collection(db, "items"),
      orderBy("price"),
      where("vendor", "==", pickedVendor.value),
      startAfter(0),
      limit(52)
    );
    documentSnapshots.value = await getDocs(next);
  }

  document
    .getElementById("catalogStart")
    .scrollIntoView({ behavior: "smooth" });
}

async function firstData() {
  const first = query(collection(db, "items"), orderBy("price"), limit(52));
  const newItems = await getDocs(first);
  documentSnapshots.value = newItems;
}

async function prevData() {
  const firstVisible = documentSnapshots.value.docs[0];
  router.push({ path: route.fullPath, query: { page: pageIndex.value } });
  pageIndex.value--;

  document
    .getElementById("catalogStart")
    .scrollIntoView({ behavior: "smooth" });

  const prev = ref(null);

  if (pickedVendor.value != "") {
    prev.value = query(
      collection(db, "items"),
      orderBy("price"),
      where("vendor", "==", pickedVendor.value),
      startAfter(0),
      limit(52)
    );
  } else {
    prev.value = query(
      collection(db, "items"),
      orderBy("price"),
      startAfter(0),
      limit(52)
    );
  }
  documentSnapshots.value = await getDocs(prev.value);
}

async function nextData() {
  const lastVisible =
    documentSnapshots.value.docs[documentSnapshots.value.docs.length - 1];
  pageIndex.value++;
  // console.log("last", lastVisible);

  // console.log(documentSnapshots.value.docs);
  // documentSnapshots.value = [];

  router.push({ path: route.fullPath, query: { page: pageIndex.value } });

  document
    .getElementById("catalogStart")
    .scrollIntoView({ behavior: "smooth" });

  const next = ref(null);

  if (pickedVendor.value != "") {
    next.value = query(
      collection(db, "items"),
      orderBy("price"),
      where("vendor", "==", pickedVendor.value),
      startAfter(lastVisible),
      limit(52)
    );
  } else {
    next.value = query(
      collection(db, "items"),
      orderBy("price"),
      startAfter(lastVisible),
      limit(52)
    );
  }
  documentSnapshots.value = await getDocs(next.value);
}

let vendors = ref([]);
async function vendorsUpdate() {
  const q = query(collection(db, "vendors"));
  await onSnapshot(q, (snapshot) => {
    vendors.value = [];
    snapshot.forEach((doc) => {
      vendors.value.push(doc);
    });
  });
}

firstData();
vendorsUpdate();

// async function getData(value) {
//   documentSnapshots.value = [];
//   if (value === "next") {
//     pageIndex.value++;
//   } else if (value === "prev") {
//     pageIndex.value--;
//   }

//   document
//     .getElementById("catalogStart")
//     .scrollIntoView({ behavior: "smooth" });

//   console.log(value, pageIndex.value);
//   const citiesRef = collection(db, "items");
//   const next = query(
//     citiesRef,
//     where("vendor", "==", "KRAFTOOL"),
//     orderBy("price"),
//     startAfter(50 * pageIndex.value),
//     limit(50)
//   );

//   documentSnapshots.value = await getDocs(next);

//   router.push({ path: route.fullPath, query: { page: pageIndex.value } });
// }
</script>

<template>
  <Navbar />
  <div class="flex flex-row items-start justify-start">
    <aside class="w-64 my-4 sticky top-20 ml-10 -mr-20" aria-label="Sidebar">
      <div
        class="overflow-y-auto px-3 rounded-lg dark:bg-gray-800 flex flex-row flex-wrap gap-2"
      >
        <div
          href="#"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white w-full dark:hover:bg-gray-700"
        >
          <svg
            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
          <span class="flex-1 ml-3 whitespace-nowrap">Призводители</span>
        </div>

        <div
          class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
        >
          <div
            href="#"
            aria-current="true"
            :class="[
              vendor.data().vendor == pickedVendor
                ? 'block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600'
                : 'block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white',
            ]"
            v-for="vendor in vendors.slice().reverse()"
            :key="vendor.id"
            @click="changeVendor(vendor.data().vendor)"
          >
            {{ vendor.data().vendor }}
          </div>
        </div>

        <!-- <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              <span
                class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >Pro</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                ></path>
                <path
                  d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span
                class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >3</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
            </a>
          </li>
        </ul> -->
        <!-- <ul
          class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="gem"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                ></path>
              </svg>
              <span class="ml-4">Upgrade to Pro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Documentation</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                ></path>
              </svg>
              <span class="ml-3">Components</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Help</span>
            </a>
          </li>
        </ul> -->
      </div>
    </aside>
    <div class="flex flex-col w-10/12 mx-auto ml-20">
      <h1 class="mt-4 ml-4 mb-4 text-2xl font-bold" id="catalogStart">
        Каталог
      </h1>
      <div
        class="gap-4 w-full items-center justify-start pl-4 grid grid-cols-2 lg:grid-cols-8"
      >
        <div class="relative w-full">
          <button
            @click="sortOption = !sortOption"
            class="text-white w-max bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 py-6 px-4"
        v-if="documentSnapshots"
      >
        <SmallCard
          v-for="item in documentSnapshots.docs"
          :key="item.id"
          :id="item.data().vendorCode"
          :img="item.data().picture"
          :title="item.data().name"
          :price="item.data().price"
          :vendorCode="item.data().vendorCode"
        />
      </div>

      <div class="flex flex-col items-center">
        <!-- <span class="text-sm text-gray-700 dark:text-gray-400">
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
    </span> -->
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
            @click="prevData()"
            :disabled="pageIndex == 0 || pageIndex == -1 || pageIndex == -2"
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
            В начало
          </button>
          <button
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="nextData()"
          >
            Еще
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
    </div>
  </div>

  <FooterComponent />
</template>
