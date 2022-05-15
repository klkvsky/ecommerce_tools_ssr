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

let newNews = ref({});

async function addNewNews() {
  const historyRef = await addDoc(collection(db, "news"), {
    time: Date.now(),
    title: newNews.value.title,
    text: newNews.value.text,
    link: newNews.value.link,
  });
  newNews.value = {};
}

async function deleteNews(value) {
  await deleteDoc(doc(db, "news", value));
}

let news = ref([]);
async function newsUpdate() {
  const q = query(collection(db, "news"));
  await onSnapshot(q, (snapshot) => {
    news.value = [];
    snapshot.forEach((doc) => {
      news.value.push(doc);
    });
  });
}

// getCategory();
newsUpdate();
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
          v-model="newNews"
          submit-label="Добавить"
          :submit-attrs="{
            inputClass:
              'text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          }"
          @submit="addNewNews"
        >
          <!-- <h1 class="text-lg font-medium pb-4">Добавить новую акцию</h1> -->
          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="text"
              name="title"
              label="Название"
              placeholder="Акция Номер 1"
              validation="required"
            />
            <FormKit
              type="text"
              name="link"
              label="Ссылка"
              placeholder="Ссылка на товар или новость"
              validation="required"
            />
          </div>
          <FormKit
            type="text"
            name="text"
            label="Текст"
            placeholder="Описание акции"
            validation="required"
          />
        </FormKit>
      </div>
      <div
        class="grid grid-cols-1 gap-6 border sm:p-8 dark:border-gray-700 shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 w-full"
        v-if="news"
      >
        <div
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative group"
          v-for="item in news"
          :key="item.id"
        >
          <button
            class="bg-red-500 h-10 w-10 rounded-lg absolute -top-4 -right-4 z-20 grid place-items-center opacity-0 scale-75 group-hover:opacity-100 hover:scale-105 transition-all"
            @click="deleteNews(item.id)"
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

          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ item.data().title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ item.data().text }}
          </p>
          <a
            href="#"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Перейти по ссылке
            <svg
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
