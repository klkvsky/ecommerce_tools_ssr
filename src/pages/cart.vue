<script setup>
import { ref, onMounted } from "vue";

import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";

import { useCartStore } from "../stores/cart.js";
const store = useCartStore();

let totalPrice = ref(0);

function totalPriceFunction() {
  totalPrice.value = 0;
  store.cart.forEach((item) => (totalPrice.value += parseInt(item.Price)));
}

onMounted(() => {
  totalPriceFunction();
});

function deleteItem(item) {
  store.cart.splice(store.cart.indexOf(item), 1);
  totalPriceFunction();
}

let pay = function () {
  var widget = new cp.CloudPayments();
  widget.pay(
    "auth", // или 'charge'
    {
      //options
      publicId: "test_api_00000000000000000000001", //id из личного кабинета
      description: "Оплата товаров в example.com", //назначение
      amount: totalPrice.value, //сумма
      currency: "RUB", //валюта
      accountId: "user@example.com", //идентификатор плательщика (необязательно)
      invoiceId: "1234567", //номер заказа  (необязательно)
      email: "user@example.com", //email плательщика (необязательно)
      skin: "mini", //дизайн виджета (необязательно)
      data: {
        myProp: "myProp value",
      },
    },
    {
      onSuccess: function (options) {
        // success
        //действие при успешной оплате
      },
      onFail: function (reason, options) {
        // fail
        //действие при неуспешной оплате
      },
      onComplete: function (paymentResult, options) {
        //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        //например вызов вашей аналитики Facebook Pixel
      },
    }
  );
};
</script>

<template>
  <Navbar />
  <div v-if="store.cart.length" class="lg:max-w-screen-md">
    <h1 class="mx-4 my-4 font-semibold text-3xl">Корзина</h1>
    <div
      v-for="item in store.cart"
      :key="item"
      class="mx-4 bg-white shadow-md dark:bg-slate-700 p-4 rounded-lg mb-4 flex flex-row items-start justify-between"
    >
      <div class="flex flex-row items-start justify-start gap-4 h-full">
        <img
          :src="item.Image"
          class="w-16 h-16 rounded-md object-contain dark:bg-white"
          alt="product image"
        />
        <div class="flex flex-col items-start h-full">
          <h1 class="text-lg -mt-0.5 font-medium">{{ item.Name }}</h1>
          <span class="mt-3.5">
            Количество:
            {{ item.Quantity }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-end h-full min-w-max">
        <span class="font-semibold"> {{ item.Price }} ₽ </span>

        <button
          @click="deleteItem(item)"
          class="w-8 h-8 bg-red-500 rounded-md grid place-items-center mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="fill-white"
          >
            <path
              d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
            ></path>
            <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div
      class="flex flex-col mx-4 bg-gray-100 dark:bg-slate-600 px-4 py-2 rounded-lg"
    >
      <div class="flex flex-row justify-between items-center">
        <span class="font-medium text-md">Сумма:</span>
        <span class="font-bold"> {{ totalPrice }} ₽ </span>
      </div>
    </div>

    <div class="m-4">
      <button
        @click="pay()"
        class="text-white text-lg w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Оформить заказ
      </button>
    </div>
  </div>

  <div v-else class="mx-4 h-96 flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-4 lg:max-w-sm">Корзина пуста!</h1>
    <router-link
      to="/"
      class="text-white text-lg w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:max-w-sm"
    >
      Продолжите покупки
    </router-link>
  </div>

  <FooterComponent />
</template>
