<script setup>
import { ref, onMounted } from "vue";
// Firebase
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
// End Firebase

// UI ELEMENTS
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
import CartIcon from "../components/cartIcon.vue";
import BigCard from "../components/bigCard.vue";
import SmallCard from "../components/smallCard.vue";
import NewsCard from "../components/newsCard.vue";
// END UI ELEMENTS

// Swiper
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "../../node_modules/swiper/swiper.min.css";
import "../../node_modules/swiper/swiper-bundle.css";

import testXML from "../assets/xmltojson.json";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
let modules = [Navigation, Pagination, A11y];
// Swiper

// News Posts
let newsPosts = ref([]);
async function newsUpdate() {
  const q = query(collection(db, "news"));
  await onSnapshot(q, (snapshot) => {
    newsPosts.value = [];
    snapshot.forEach((doc) => {
      newsPosts.value.push(doc);
    });
  });
}

// let categories = ref([]);
// async function categoriesUpdate() {
//   categories.value = [];
//   const next = query(
//     collection(db, "categories"),
//     orderBy("category"),
//     startAfter(0),
//     limit(14)
//   );

//   categories.value = await getDocs(next);
// }
let categories = ref([]);
async function categoriesUpdate() {
  categories.value = [];
  const q = query(collection(db, "promoCategories"));
  await onSnapshot(q, (snapshot) => {
    categories.value = [];
    snapshot.forEach((doc) => {
      categories.value.push(doc);
    });
  });
}

// let categories = ref([]);
// async function categoriesUpdate() {
//   const q = query(collection(db, "categories"));
//   await onSnapshot(q, (snapshot) => {
//     categories.value = [];
//     snapshot.forEach((doc) => {
//       categories.value.push(doc);
//     });
//   });
// }

let promos = ref([]);
async function promosUpdate() {
  const q = query(collection(db, "promos"));
  await onSnapshot(q, (snapshot) => {
    promos.value = [];
    snapshot.forEach((doc) => {
      promos.value.push(doc);
    });
  });
}

let catalog = ref([]);
async function catalogUpdate() {
  const q = query(collection(db, "catalog"));
  await onSnapshot(q, (snapshot) => {
    catalog.value = [];
    snapshot.forEach((doc) => {
      catalog.value.push(doc);
    });
  });
}

// new Date().toLocaleTimeString
onMounted(() => {
  newsUpdate();
  catalogUpdate();
  promosUpdate();
  categoriesUpdate();
});
</script>

<template>
  <Navbar />

  <div
    class="flex items-center justify-center bg-gray-200 dark:bg-slate-500 py-2 w-screen text-center dark:text-white text-xs"
  >
    <p>Бесплатная доставка по всей России от 15 000 рублей</p>
  </div>

  <div id="myTable"></div>

  <CartIcon />

  <div class="flex flex-row items-start justify-start gap-6 mt-4 mx-6">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      navigation
      class="max-w-screen-lg lg:max-w-full xl:max-w-screen-lg mt-0"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="promo in promos.slice().reverse()" :key="promo.id">
        <div
          class="max-w-screen-lg lg:max-w-full shadow-xl rounded-lg text-center h-96 pt-52 pb-12 relative"
        >
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
              class="text-xl leading-9 font-bold tracking-tight text-white sm:text-3xl sm:leading-10"
            >
              {{ promo.data().title }}
            </h2>
            <h4 class="font-medium text-white sm:text-base opacity-90">
              {{ promo.data().text }}
            </h4>
            <div class="mt-4 flex justify-center">
              <div class="inline-flex rounded-md bg-white shadow">
                <router-link
                  class="text-gray-700 font-bold py-2 px-6"
                  :to="{ path: promo.data().link }"
                  replace
                >
                  Перейти
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <aside class="hidden xl:flex max-w-screen-sm h-96" aria-label="Sidebar">
      <div class="bg-gray-50 shadow-md rounded-lg dark:bg-gray-900">
        <!--  -->
        <ul class="grid grid-cols-2 gap-3.5 py-3 px-2">
          <li v-for="category in categories" :key="category.id">
            <router-link
              :to="{
                name: 'Category',
                params: { id: category.data().category },
              }"
              class="flex items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <span class="flex-1 ml-3 whitespace-nowrap capitalize truncate">
                {{ category.data().name }}
              </span>
            </router-link>
          </li>
          <li v-for="category in categories" :key="category.id">
            <router-link
              :to="{
                name: 'Category',
                params: { id: category.data().category },
              }"
              class="flex items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <span class="flex-1 ml-3 whitespace-nowrap capitalize truncate">
                {{ category.data().name }}
              </span>
            </router-link>
          </li>
          <li v-for="category in categories" :key="category.id">
            <router-link
              :to="{
                name: 'Category',
                params: { id: category.data().category },
              }"
              class="flex items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <span class="flex-1 ml-3 whitespace-nowrap capitalize truncate">
                {{ category.data().name }}
              </span>
            </router-link>
          </li>
          <li v-for="category in categories.slice(0, 2)" :key="category.id">
            <router-link
              :to="{
                name: 'Category',
                params: { id: category.data().category },
              }"
              class="flex items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <span class="flex-1 ml-3 whitespace-nowrap capitalize truncate">
                {{ category.data().name }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>

  <div
    class="flex flex-col no-scrollbar items-start justify-start mx-4 gap-6 mt-4"
  >
    <aside class="w-full xl:hidden lg:mx-4" aria-label="Sidebar">
      <div class="bg-gray-50 shadow-md rounded-lg dark:bg-gray-900">
        <ul class="grid grid-cols-2 lg:grid-cols-5 gap-4 py-3 px-2">
          <li v-for="category in categories.docs" :key="category.id">
            <router-link
              :to="{ name: 'Category', params: { id: category.id } }"
              class="flex items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <span class="flex-1 ml-3 whitespace-nowrap capitalize">
                {{ category.data().category }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <div class="flex flex-col mx-0 md:mx-4 items-start justify-start gap-4">
      <h1 class="font-semibold text-xl xl:text-2xl xl:my-4">
        Лучшее предложение
      </h1>
      <!-- <BigCard
        v-for="item in catalog"
        :key="item.id"
        :id="item.id"
        :title="item.data().Title"
        :price="item.data().Price"
      /> -->
      <div class="lg:hidden flex flex-col gap-6">
        <BigCard
          v-for="item in testXML.yml_catalog.shop.offers.offer.slice(0, 2)"
          :key="item.vendorCode"
          :id="item.vendorCode"
          :img="item.picture"
          :title="item.name"
          :price="item.price"
        />
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <SmallCard
          v-for="item in testXML.yml_catalog.shop.offers.offer.slice(2, 8)"
          class="xl:hidden"
          :key="item.vendorCode"
          :id="item.vendorCode"
          :img="item.picture"
          :title="item.name"
          :price="item.price"
        />
        <SmallCard
          v-for="item in testXML.yml_catalog.shop.offers.offer.slice(0, 8)"
          class="hidden xl:block"
          :key="item.vendorCode"
          :id="item.vendorCode"
          :img="item.picture"
          :title="item.name"
          :price="item.price"
        />

        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
          class="col-span-2 w-full"
        >
          <swiper-slide>
            <div
              class="h-96 lg:h-full bg-[#DCE0D9] flex flex-col items-center justify-center text-2xl rounded-lg"
            >
              <img
                src="https://nordberg82.ru/image/catalog/logo.png"
                class="w-1/2"
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="h-96 lg:h-full bg-[#DCE0D9] flex flex-col items-center justify-center text-2xl rounded-lg"
            >
              <img
                src="https://nordberg82.ru/image/catalog/logo.png"
                class="w-1/2"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="flex mx-0 mt-4 flex-col items-start justify-start gap-4">
      <h1 class="font-semibold text-xl xl:text-2xl xl:my-4">
        Самые продаваемые
      </h1>
      <div class="grid grid-cols-2 gap-6 lg:grid-cols-4 xl:grid-cols-5">
        <SmallCard
          v-for="item in testXML.yml_catalog.shop.offers.offer.slice(8, 18)"
          :key="item.vendorCode"
          :id="item.vendorCode"
          :img="item.picture"
          :title="item.name"
          :price="item.price"
        />
      </div>
    </div>

    <div
      class="flex flex-col lg:grid lg:grid-cols-3 gap-6 bg-gray-50 lg:bg-white lg:shadow-none shadow-md dark:bg-slate-900 lg:dark:bg-slate-800 rounded-xl p-4 pb-8"
    >
      <div
        class="flex flex-col lg:p-6 lg:rounded-xl dark:bg-slate-900 lg:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="h-12 w-12 text-3xl fill-black dark:fill-gray-200 mb-2"
          viewBox="0 0 25 25"
        >
          <path
            d="M22 5c0-1.654-1.346-3-3-3H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.424c.618-.735 1-1.692 1-2.746V5zm-2 0v2.831c0 1.14-.849 2.112-1.891 2.167L18 10c-1.103 0-2-.897-2-2V4h3c.552 0 1 .449 1 1zM10 4h4v4c0 1.103-.897 2-2 2s-2-.897-2-2V4zM4 5c0-.551.448-1 1-1h3v4c0 1.103-.897 2-2 2l-.109-.003C4.849 9.943 4 8.971 4 7.831V5zm6 14v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.131c.254.067.517.111.787.125A3.988 3.988 0 0 0 9 10.643c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357a3.988 3.988 0 0 0 3.213 1.351c.271-.014.533-.058.787-.125V19h-3z"
          ></path>
        </svg>
        <h1 class="font-semibold text-xl lg:text-2xl">
          Интернет-магазин электроинструмента
        </h1>
        <p class="mt-2 text-sm">
          Наш магазин инструментов представлен такими мировыми брендами, как
          Makita, Bosch, Metabo, DeWalt, Sparky, Kress. Они давно успели
          заработать безупречную репутацию среди профессионалов ремонтных и
          строительных работ! Качество этих марок подтверждают многие
          промышленные гиганты, которые работают с ними уже не один десяток лет.
          Компания «Магазин инструментов» поставляет электроинструмент на
          условиях официального дилера большинства известных фирм-производителей
          техники.
        </p>
      </div>
      <div
        class="flex flex-col lg:p-6 lg:rounded-xl dark:bg-slate-900 lg:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-3xl fill-black dark:fill-gray-200 mb-2"
          viewBox="0 0 25 25"
        >
          <path
            d="M5 8.999c0 1.902.765 3.627 2 4.89V21a.998.998 0 0 0 1.447.895L12 20.118l3.553 1.776a.992.992 0 0 0 .972-.043c.295-.183.475-.504.475-.851v-7.11a6.976 6.976 0 0 0 2-4.891C19 5.14 15.86 2 12 2S5 5.14 5 8.999zm7.447 9.106a1 1 0 0 0-.895 0L9 19.382v-4.067c.911.434 1.926.685 3 .685s2.089-.25 3-.685v4.066l-2.553-1.276zM12 4c2.756 0 5 2.242 5 4.999A5.006 5.006 0 0 1 12 14c-2.757 0-5-2.243-5-5.001A5.005 5.005 0 0 1 12 4z"
          ></path>
        </svg>
        <h1 class="font-semibold text-xl lg:text-2xl">
          Электроинструмент высокого качества
        </h1>
        <p class="mt-2 text-sm">
          Качество этих марок подтверждают многие промышленные гиганты, которые
          работают с ними уже не один десяток лет. Компания «Магазин
          инструментов» поставляет электроинструмент на условиях официального
          дилера большинства известных фирм-производителей техники.
        </p>
      </div>
      <div
        class="flex flex-col lg:p-6 lg:rounded-xl dark:bg-slate-900 lg:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="h-12 w-12 text-3xl fill-black dark:fill-gray-200 mb-2"
          viewBox="0 0 25 25"
        >
          <path
            d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.49 3.49 0 0 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19zm10 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
          ></path>
        </svg>
        <h1 class="font-semibold text-xl lg:text-2xl">
          Интернет-магазин электроинструмента
        </h1>
        <p class="mt-2 text-sm">
          Наш магазин инструментов представлен такими мировыми брендами, как
          Makita, Bosch, Metabo, DeWalt, Sparky, Kress. Они давно успели
          заработать безупречную репутацию среди профессионалов ремонтных и
          строительных работ! Качество этих марок подтверждают многие
          промышленные гиганты, которые работают с ними уже не один десяток лет.
          Компания «Магазин инструментов» поставляет электроинструмент на
          условиях официального дилера большинства известных фирм-производителей
          техники.
        </p>
      </div>
    </div>

    <div class="flex flex-col items-start justify-start gap-4 lg:mx-4">
      <h1 class="font-semibold text-xl">Новости</h1>
      <div
        class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end justify-end"
      >
        <NewsCard v-for="item in newsPosts" :key="item.id" :info="item" />
        <!-- <NewsCard
          v-for="item in newsPosts.slice(0, 2)"
          :key="item.id"
          :title="item.data().Title"
          :content="item.data().Content"
          :id="item.id"
        /> -->

        <router-link
          to="/newsPage"
          class="inline-flex lg:col-start-1 xl:col-start-4 items-center justify-between mt-4 py-2 px-4 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-h-10"
        >
          Посмотреть все новости
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
        </router-link>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style lang="scss">
.swiper-button-next,
.swiper-button-prev {
  background-color: #ffffff;
  width: 35px;
  height: 35px;
  top: 91%;
  z-index: 20;

  border-radius: 100%;
  color: #000000;

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
  background-color: #ffffff;
}
</style>
