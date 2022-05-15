<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart.js";
import testXML from "../assets/xmltojson.json";
import miniCard from "../components/miniCard.vue";

const store = useCartStore();
let mobileNavToggle = ref(false);
let searchActive = ref(false);
let searchQuery = ref("");
let searchOutput = ref([]);

const filteredList = computed(() => {
  return testXML.yml_catalog.shop.offers.offer.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
</script>

<template>
  <nav
    class="bg-white border-gray-200 py-4 px-4 xl:px-8 md:px-8 dark:bg-slate-800 sticky top-0 z-10 shadow-sm w-screen"
  >
    <div class="flex flex-wrap justify-between items-center mx-auto">
      <div
        v-if="searchActive"
        class="bg-neutral-50 shadow-lg py-4 px-2 rounded-lg fixed top-16 right-12 h-1/2 overflow-scroll"
      >
        <div class="w-72 flex flex-col gap-4">
          <miniCard
            v-for="item in filteredList.slice(0, 20)"
            :key="item.vendorCode"
            :id="item.vendorCode"
            :img="item.picture"
            :title="item.name"
            :price="item.price"
          />
        </div>
      </div>
      <router-link to="/" class="flex items-center">
        <!-- <img
          src="/docs/images/logo.svg"
          class="mr-3 h-6 sm:h-10"
          alt="Klkvsky Logo"
        /> -->
        <span class="self-center text-xl font-semibold dark:text-white"
          >Klkvsky
        </span>
      </router-link>

      <div class="flex md:order-2">
        <div class="hidden relative mr-3 md:mr-0 md:block">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            @keydown.enter="filteredList.value"
            @focus="searchActive = true"
            @blur="searchActive = false"
            id="email-adress-icon"
            class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Поиск..."
          />
        </div>
        <button
          @click="mobileNavToggle = !mobileNavToggle"
          type="button"
          class="inline-flex items-center p-2 gap-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="font-semibold">Меню</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div
        class="justify-between transition-all duration-500 -ml-4 lg:ml-0 bg-white dark:bg-slate-800 md:py-0 items-center fixed w-full md:flex md:w-auto md:order-1 md:opacity-100 md:top-0 md:relative dark:shadow-gray-900 shadow-2xl"
        :class="[
          mobileNavToggle ? 'top-16 opacity-100' : '-top-full opacity-0',
        ]"
      >
        <ul
          class="flex flex-col md:flex-row md:items-center md:space-x-8 md:mt-0 md:text-sm md:font-medium divide-gray-200 dark:divide-gray-700 divide-y xl:divide-y-0"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 pr-4 pl-4 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
            >
              Главная
            </router-link>
          </li>
          <li>
            <router-link
              to="/catalog"
              class="block py-2 pr-4 pl-4 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
            >
              Каталог
            </router-link>
          </li>
          <li>
            <router-link
              to="/newspage"
              class="block py-2 pr-4 pl-4 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
              >Новости</router-link
            >
          </li>
          <li>
            <button
              disabled
              class="block py-2 pr-4 pl-4 text-gray-400 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Оплата
            </button>
          </li>
          <li>
            <button
              disabled
              class="block py-2 pr-4 pl-4 text-gray-400 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white darkк:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
            >
              Доставка
            </button>
          </li>
          <li>
            <button
              disabled
              class="block py-2 pr-4 pl-4 text-gray-400 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              О компании
            </button>
          </li>
          <li>
            <button
              disabled
              class="block py-2 pr-4 pl-4 text-gray-400 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Контакты
            </button>
          </li>
          <li>
            <router-link
              to="/cart"
              class="block py-2 pr-4 pl-4 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer lg:flex lg:flex-row lg:gap-1"
            >
              Корзина

              <div
                class="relative w-full h-full lg:grid place-items-center hidden"
                :class="[store.isEmptyCart ? 'opacity-0' : 'opacity-100']"
              >
                <div
                  class="grid place-items-center w-5 h-5 bg-blue-500 dark:bg-blue-800 text-white shadow rounded-full text-xs font-semibold"
                >
                  {{ store.cartQuantity }}
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              to="/cart"
              class="block py-2 pr-4 pl-4 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer lg:flex lg:flex-row lg:gap-1"
            >
              Личный Кабинет
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
