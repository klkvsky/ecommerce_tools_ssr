<script setup>
import { ref, onMounted } from "vue";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
import { useCartStore } from "../stores/cart";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
import "../../node_modules/swiper/swiper.min.css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import { useRoute } from "vue-router";

import testXML from "../assets/xmltojson.json";

const route = useRoute();
let modules = [Navigation, Pagination, A11y];
const store = useCartStore();

let isFavorite = ref(false);

let itemInfo = ref({});

function selectItem() {
  Object.keys(testXML.yml_catalog.shop.offers.offer).forEach((item) => {
    if (
      testXML.yml_catalog.shop.offers.offer[item].vendorCode === route.params.id
    )
      itemInfo = testXML.yml_catalog.shop.offers.offer[item];
  });
  // console.log(itemInfo);
}

let multipleImages = ref(false);

function checkForImage() {
  if (Array.isArray(itemInfo.picture)) {
    multipleImages.value = true;
    return itemInfo.picture[0];
  } else {
    return itemInfo.picture;
  }
}

const started = onMounted(() => {
  document.getElementById("vendorCode").scrollIntoView({ behavior: "smooth" });
});

selectItem();

// async function getData() {
//   const docRef = doc(db, "catalog", route.params.id);
//   const docSnap = await getDoc(docRef);
//   itemInfo.value = docSnap.data();
// }
// onMounted(() => {
//   getData();
// });
</script>

<template>
  <Navbar />
  <div class="xl:grid xl:grid-cols-3 xl:mx-6 xl:gap-6">
    <div class="lg:w-full lg:col-span-2">
      <div class="sticky top-20">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-if="!multipleImages">
            <img
              class="w-full grid place-items-center object-contain lg:h-96 bg-white p-10 shadow-2xl rounded-lg text-center mt-4 mix-blend-multiply"
              :src="checkForImage()"
            />
          </swiper-slide>
          <swiper-slide v-else v-for="img in itemInfo.picture" :key="img">
            <img
              class="w-full grid place-items-center object-contain lg:h-96 bg-white p-10 shadow-2xl rounded-lg text-center mt-4 mix-blend-multiply"
              :src="img"
            />
          </swiper-slide>
        </swiper>
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg mt-6">
          <h1 class="font-semibold text-xl">Описание</h1>
          <p class="mt-2 text-base">
            {{ itemInfo.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-4">
      <div class="flex flex-col items-start justify-start gap-1 px-1">
        <!-- <p class="text-sm font-light">Код товара: {{ itemInfo.id }}</p> -->
        <p class="text-sm font-light" id="vendorCode">Код товара: {{ itemInfo.vendorCode }}</p>

        <h1 class="text-xl lg:text-xl lg:max-w-sm font-semibold">
          {{ itemInfo.name }}
        </h1>
      </div>
      <div
        class="w-full max-w-sm lg:max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 sticky top-20"
      >
        <div class="z-50 flex flex-col items-start px-4 py-4">
          <div class="flex flex-row w-full justify-between items-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
              {{ itemInfo.price }} ₽
            </h1>

            <button
              class="border-2 w-8 h-8 grid place-items-center rounded-lg transition-all duration-200"
              :class="[
                isFavorite
                  ? 'bg-red-500 fill-white border-red-500'
                  : 'border-blue-500 hover:bg-blue-500 fill-blue-500 hover:fill-white',
              ]"
              @click="isFavorite = !isFavorite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex flex-row w-full gap-2 mt-4 lg:mt-6">
            <a
              href="#"
              class="inline-flex w-full justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >В корзину</a
            >
            <a
              href="#"
              class="inline-flex w-full items-center justify-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
              >Быстрый заказ</a
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start justify-start gap-2 w-full">
        <div
          class="flex items-center py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline flex-shrink-0 mr-2 w-6 h-6 fill-gray-700 dark:fill-gray-200"
          >
            <path
              d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            ></path>
          </svg>
          <div>
            Самовывоз:
            <span class="font-medium">Сегодня</span> из 1 магазина
          </div>
        </div>
        <div
          class="flex items-center py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline flex-shrink-0 mr-2 w-6 h-6 fill-gray-700 dark:fill-gray-200"
          >
            <path
              d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.49 3.49 0 0 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19zm10 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
            ></path>
          </svg>
          <div>
            Доставка:
            <span class="font-medium">Завтра</span> 200 ₽
          </div>
        </div>
      </div>

      <!--  -->
      <div
        class="w-full text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <p
          href="#"
          class="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          v-for="spec in itemInfo.param"
          :key="spec"
        >
          {{ spec }}
        </p>
        <!-- <button
        class="block font-semibold py-3 px-4 w-full text-white bg-blue-700 rounded-b-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600"
      >
        Все характеристики
      </button> -->
      </div>
    </div>
  </div>

  <div
    class="mx-4 mt-4 flex flex-col lg:grid lg:grid-cols-3 items-start justify-start gap-4"
    v-if="itemInfo"
  >
    <div class="flex flex-col items-start justify-start gap-4 lg:hidden">
      <div class="flex flex-col items-start justify-start gap-1 px-1">
        <!-- <p class="text-sm font-light">Код товара: {{ itemInfo.id }}</p> -->
        <p class="text-sm font-light">Код товара: {{ itemInfo.vendorCode }}</p>

        <h1 class="text-xl font-semibold">
          {{ itemInfo.name }}
        </h1>
      </div>

      <div
        class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 sticky top-20"
      >
        <div class="z-50 flex flex-col items-start px-4 py-4">
          <div class="flex flex-row w-full justify-between items-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
              {{ itemInfo.price }} ₽
            </h1>

            <button
              class="border-2 border-blue-500 w-8 h-8 grid place-items-center rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="fill-blue-500"
              >
                <path
                  d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex flex-row w-full gap-2 mt-4 lg:mt-6">
            <a
              href="#"
              class="inline-flex w-full justify-center items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >В корзину</a
            >
            <a
              href="#"
              class="inline-flex w-full items-center justify-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
              >Быстрый заказ</a
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-start justify-start gap-2 w-full">
        <div
          class="flex items-center py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline flex-shrink-0 mr-2 w-6 h-6 fill-gray-700 dark:fill-gray-200"
          >
            <path
              d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            ></path>
          </svg>
          <div>
            Самовывоз:
            <span class="font-medium">Сегодня</span> из 1 магазина
          </div>
        </div>
        <div
          class="flex items-center py-2 px-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline flex-shrink-0 mr-2 w-6 h-6 fill-gray-700 dark:fill-gray-200"
          >
            <path
              d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.49 3.49 0 0 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19zm10 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
            ></path>
          </svg>
          <div>
            Доставка:
            <span class="font-medium">Завтра</span> 200 ₽
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<style lang="scss">
.swiper-button-next,
.swiper-button-prev {
  background-color: #000 !important;
  width: 35px;
  height: 35px;
  top: 91%;
  z-index: 20;

  border-radius: 100%;
  color: #fff !important;

  &:focus {
    outline: none;
  }

  &::after {
    font-size: 1rem;
  }
}

.swiper-button-next {
  right: 30px;
}
.swiper-button-prev {
  left: 30px;
}

.swiper-pagination-bullet-active {
  background-color: #000;
}
</style>
