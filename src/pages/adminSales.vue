<script setup>
import { ref, onMounted, computed, watch } from "vue";
import SmallCard from "../components/smallCard.vue";

import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";

let salesHistory = ref([]);
async function catalogUpdate() {
  const q = query(collection(db, "history"));
  await onSnapshot(q, (snapshot) => {
    salesHistory.value = [];
    snapshot.forEach((doc) => {
      salesHistory.value.push(doc.data());
    });
  });
}

// new Date().toLocaleTimeString

catalogUpdate();
</script>

<template>
  <div class="flex flex-col w-full h-screen overflow-scroll no-scrollbar bg-gray-100 dark:bg-slate-900 p-4 rounded-2xl">
    <h1 class="font-bold text-3xl pt-4">Продажи</h1>
    <div class="grid grid-cols-1 gap-5 my-6">
      <article
        class="md:gap-8 md:grid md:grid-cols-4 border sm:p-8  dark:border-gray-700 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 w-full"
        v-for="item in salesHistory" :id="item.time">
        <div>
          <div class="flex flex-col sticky top-0">

          <div class="flex items-center mb-6 space-x-4">
            <div class="space-y-1 font-medium text-xl dark:text-white">
              <p>{{ item.name }}</p>
              <!-- <div
                class="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                United States
              </div> -->
            </div>
          </div>
          <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clip-rule="evenodd"></path>
              </svg>{{ item.email }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"></path>
              </svg>{{ item.phone }}
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                </path>
              </svg>{{ item.delivery }}
            </li>
            <li class="flex items-center" v-if="item.adress">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                </path>
              </svg>{{ item.adress }}
            </li>
          </ul>
          </div>
        </div>
        <div class="col-span-3 mt-6 md:mt-0">
          <div class="flex items-start mb-5">
            <div class="pr-4">
              <footer>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Заказ оформлен:
                  <time>
                    {{ new Date(item.time).toLocaleTimeString() }} -
                    {{ new Date(item.time).toLocaleDateString() }}
                  </time>
                </p>
              </footer>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                Общая сумма заказа: {{ item.total }} ₽
              </h4>
            </div>
          </div>
          <p class="mb-2 font-light text-gray-500 dark:text-gray-400">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4 sm:pt-6 first:pt-0" v-for="product in item.items" :key="product">
              <div class="flex items-center justify-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded object-contain" :src="product.Image" alt="Neil image" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 max-w-sm dark:text-white">
                    {{ product.Name }}
                  </p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 max-w-sm dark:text-white">
                    Количество:
                    {{ product.Quantity }}
                  </p>
                </div>
                <div
                  class="inline-flex items-center justify-end gap-1 text-base font-semibold text-gray-900 dark:text-white w-20">
                  {{ product.Price }}

                  <span> ₽ </span>
                </div>
              </div>
            </li>
          </ul>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
