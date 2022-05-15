<script setup>
import { ref, onMounted, computed, watch } from "vue";

import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

let newPromo = ref({});

async function addNewPromo() {
  const historyRef = await addDoc(collection(db, "promos"), {
    time: Date.now(),
    title: newPromo.value.title,
    text: newPromo.value.text,
    link: newPromo.value.link,
    image: newPromo.value.image,
  });
  newPromo.value = {};
}

async function deletePromo(value) {
  await deleteDoc(doc(db, "promos", value));
}

let promos = ref([]);
async function catalogUpdate() {
  const q = query(collection(db, "promos"));
  await onSnapshot(q, (snapshot) => {
    promos.value = [];
    snapshot.forEach((doc) => {
      promos.value.push(doc);
    });
  });
}

let newCategory = ref({});

async function addNewPromoCategory() {
  const historyRef = await addDoc(collection(db, "promoCategories"), {
    category: newCategory.value.category,
    name: newCategory.value.name,
  });
  newCategory.value = {};
}

async function deletePromoCategory(value) {
  await deleteDoc(doc(db, "promoCategories", value));
}

let promoCategories = ref([]);
async function promoCategoriesUpdate() {
  const q = query(collection(db, "promoCategories"));
  await onSnapshot(q, (snapshot) => {
    promoCategories.value = [];
    snapshot.forEach((doc) => {
      promoCategories.value.push(doc);
    });
  });
}

// getCategory();
catalogUpdate();
promoCategoriesUpdate();
</script>

<template>
  <div
    class="flex flex-col w-full h-screen overflow-scroll no-scrollbar bg-gray-100 dark:bg-slate-900 p-4 rounded-2xl"
  >
    <h1 class="font-bold text-3xl pt-4">Главная</h1>
    <div class="grid grid-cols-1 gap-5 my-6">
      <div
        class="md:gap-8 md:grid md:grid-cols-1 border sm:p-8 dark:border-gray-700 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 w-full"
      >
        <FormKit
          type="form"
          v-model="newPromo"
          submit-label="Добавить"
          :submit-attrs="{
            inputClass:
              'text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          }"
          @submit="addNewPromo"
        >
          <!-- <h1 class="text-lg font-medium pb-4">Добавить новую акцию</h1> -->
          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="text"
              name="title"
              label="Главный текст"
              placeholder="Акция Номер 1"
              validation="required"
            />
            <FormKit
              type="text"
              name="text"
              label="Второй текст"
              placeholder="Описание акции"
              validation="required"
            />
            <FormKit
              type="text"
              name="link"
              label="Ссылка"
              placeholder="Ссылка на товар или новость"
              validation="required"
            />
            <FormKit
              type="text"
              name="image"
              label="Изображение"
              placeholder="Ссылка на изображение"
              validation="required"
            />
          </div>
        </FormKit>
      </div>

      <div
        class="grid grid-cols-3 gap-6 border sm:p-8 dark:border-gray-700 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 w-full"
      >
        <div
          class="max-w-screen-lg lg:max-w-full shadow-xl rounded-lg text-center pt-64 pb-12 relative group"
          v-for="promo in promos"
          :key="promo.id"
        >
          <button
            class="bg-red-500 h-10 w-10 rounded-lg absolute -top-4 -right-4 z-20 grid place-items-center opacity-0 scale-75 group-hover:opacity-100 hover:scale-105 transition-all"
            @click="deletePromo(promo.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viebox="0 0 24 24"
              class="fill-white w-6 h-6"
            >
              <path
                d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
              ></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </button>

          <img
            :src="promo.data().image"
            class="rounded-lg absolute top-0 h-full w-full object-cover left-0 z-0 opacity-90"
          />
          <div
            class="w-full h-full absolute top-0 left-0 opacity-100 z-0 bg-gradient-to-t from-[#000000ad] to-transparent rounded-lg"
          ></div>
          <div
            class="w-full h-full absolute top-0 left-0 opacity-100 z-0 bg-gradient-to-r from-[#000000ad] to-transparent rounded-lg"
          ></div>
          <div class="z-20 relative">
            <h2
              class="text-xl leading-9 font-bold tracking-tight text-white sm:leading-10"
            >
              {{ promo.data().title }}
            </h2>
            <h4 class="font-medium mt-2 mx-4 text-white text-base opacity-90">
              {{ promo.data().text }}
            </h4>
            <div class="mt-4 flex justify-center">
              <div class="inline-flex text-sm rounded-md bg-white shadow">
                <router-link
                  class="text-gray-700 font-bold py-1 px-3"
                  :to="{ path: promo.data().link }"
                  replace
                >
                  Перейти
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="md:gap-8 md:grid md:grid-cols-1 border sm:p-8 dark:border-gray-700 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 w-full"
      >
        <FormKit
          type="form"
          v-model="newCategory"
          submit-label="Добавить"
          :submit-attrs="{
            inputClass:
              'text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          }"
          @submit="addNewPromoCategory"
        >
          <!-- <h1 class="text-lg font-medium pb-4">Добавить новую акцию</h1> -->
          <div class="grid grid-cols-2 gap-6">
            <FormKit
              type="text"
              name="category"
              label="ID Категории"
              validation="required"
            />
            <FormKit
              type="text"
              name="name"
              label="Название категории"
              validation="required"
            />
          </div>
        </FormKit>
      </div>

      <div
        class="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
          >
            Категории
          </h5>
          <a
            href="#"
            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Смотреть все
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 grid grid-cols-3 gap-4">
            <li
              class="py-3 sm:py-4 group"
              v-for="category in promoCategories"
              :key="category.id"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <svg
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path
                      d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    {{ category.data().name }}
                  </p>
                </div>

                <button
                  class="bg-red-500 h-10 w-10 rounded-lg grid place-items-center opacity-0 scale-75 hover:scale-100 group-hover:opacity-100 transition-all"
                  @click="deletePromoCategory(category.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viebox="0 0 24 24"
                    class="fill-white w-6 h-6"
                  >
                    <path
                      d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
                    ></path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
