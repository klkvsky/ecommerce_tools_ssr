<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
import BigCard from "../components/bigCard.vue";
import SmallCard from "../components/smallCard.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let sortOption = ref(false);

let sortingOption = ref("По названию");

let fakeItems = ref([]);
async function getItems() {
  await fetch(`https://fakestoreapi.com/products/category/${route.params.id}`)
    .then((res) => res.json())
    .then((json) => (fakeItems.value = json));
}

watch(sortingOption, (newQuestion, oldQuestion) => {
  sortedItems.value;
  sortOption.value = false;
});

const sortedItems = computed(() => {
  if (sortingOption.value === "По цене ⬆") {
    fakeItems.value.sort((x, y) => {
      return parseInt(x.price) > parseInt(y.price);
    });
    return fakeItems;
  } else if (sortingOption.value === "По цене ⬇") {
    fakeItems.value.sort((x, y) => {
      return parseInt(x.price) < parseInt(y.price);
    });
  } else if (sortingOption.value === "По названию") {
    fakeItems.value.sort((x, y) => {
      return x.title > y.title;
    });
    return fakeItems;
  }
});

onMounted(() => {
  getItems();
});
</script>

<template>
  <Navbar />
  <h1 class="mx-4 lg:mx-8 mb-4 text-2xl font-medium">
    Категория: <span class="font-bold capitalize"> {{ route.params.id }} </span>
  </h1>
  <div class="flex flex-row gap-4 w-screen items-center justify-start lg:mx-4 pl-4">
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
    <div class="relative">
      <button
        @click="sortOption = !sortOption"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        class="z-10 rounded-lg w-max text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-12 left-0"
        :class="[sortOption ? 'visible' : 'hidden']"
      >
        <ul class="py-1">
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По названию'"
            >
              По названию
            </button>
          </li>
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По цене ⬆'"
            >
              По цене ⬆
            </button>
          </li>
          <li>
            <button
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="sortingOption = 'По цене ⬇'"
            >
              По цене ⬇
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:mx-4 py-6 px-4 min-h-screen">
    <SmallCard
      v-for="item in fakeItems"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.image"
    />
  </div>

  <FooterComponent />
</template>
