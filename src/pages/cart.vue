<script setup>
import { ref, onMounted, watch } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";

import { useCartStore } from "../stores/cart.js";
import { useAccountStore } from "../stores/account.js";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const store = useCartStore();
const account = useAccountStore();

let totalPrice = ref(0);
let totalQnt = ref(0);
let formData = ref({});
let checkPref = ref(false);
const submitted = ref(false);

const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000));
  submitted.value = true;
};

function totalPriceFunction() {
  totalPrice.value = 0;
  totalQnt.value = 0;
  store.cart.forEach(
    (item) => (totalPrice.value += parseInt(item.Price) * item.Quantity)
  );
  store.cart.forEach((item) => (totalQnt.value += parseInt(item.Quantity)));
}

onMounted(() => {
  totalPriceFunction();
});

function deleteItem(item) {
  store.cart.splice(store.cart.indexOf(item), 1);
  totalPriceFunction();
}

var chars =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 20;
var password = ref("");

function passwordGet() {
  password.value = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password.value += chars.substring(randomNumber, randomNumber + 1);
  }
  return password.value;
}

let userUID = ref("");
async function succesFunction() {
  createUserWithEmailAndPassword(auth, formData.value.email, passwordGet())
    .then((userCredential) => {
      const user = userCredential.user;
      userUID.value = user.uid;
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const usersRef = await addDoc(collection(db, "users"), {
    registeredAt: new Date(),
    email: formData.value.email,
    UID: userUID.value,
  });

  account.addAccount(formData.value.email, password.value);

  if (formData.value.delivery == "Самовывоз") {
    try {
      const historyRef = await addDoc(collection(db, "history"), {
        time: Date.now(),
        email: formData.value.email,
        user: userUID.value,
        items: store.cart,
        total: totalPrice.value,
        name: formData.value.name,
        phone: formData.value.number,
        delivery: formData.value.delivery,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const historyRef = await addDoc(collection(db, "history"), {
        time: Date.now(),
        email: formData.value.email,
        user: userUID.value,
        items: store.cart,
        total: totalPrice.value,
        name: formData.value.name,
        phone: formData.value.number,
        delivery: formData.value.delivery,
        adress: formData.value.adress,
      });
    } catch (error) {
      console.log(error);
    }
  }
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
        console.log(options);
        succesFunction();
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
  <div
    class="flex flex-row items-start justify-start gap-10 mx-10 mt-6"
    v-if="store.cart.length"
  >
    <div class="lg:max-w-screen-lg lg:mx-auto flex-2">
      <div
        class="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h5
            class="text-3xl font-bold leading-none text-gray-900 dark:text-white"
          >
            Корзина
          </h5>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li
              class="py-3 sm:py-4 sm:pt-6 first:pt-0"
              v-for="item in store.cart"
              :key="item"
            >
              <div class="flex items-center justify-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded object-contain"
                    :src="item.Image"
                    alt="Neil image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 max-w-sm dark:text-white"
                  >
                    {{ item.Name }}
                  </p>
                </div>
                <div class="text-sm -mt-6">
                  <FormKit
                    type="number"
                    label="Количество:"
                    name="temperature"
                    step="1"
                    v-model="item.Quantity"
                    min="1"
                    @click="totalPriceFunction()"
                  />
                </div>
                <div
                  class="inline-flex items-center justify-end gap-1 text-base font-semibold text-gray-900 dark:text-white w-20"
                >
                  {{ item.Price }}

                  <span> ₽ </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="p-4 w-full rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-4 relative"
        :class="[submitted ? '-z-10' : 'z-10']"
      >
        <FormKit
          type="form"
          v-model="formData"
          submit-label="Подтвердить"
          :form-class="submitted ? 'opacity-0' : 'opacity-100'"
          :submit-attrs="{
            inputClass:
              'text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          }"
          @submit="submitHandler"
        >
          <FormKit
            type="text"
            name="name"
            label="Ваше Ф.И.О."
            placeholder="Олег Сбербанк"
            validation="required"
          />
          <FormKit
            type="text"
            name="email"
            label="Ваша почта"
            placeholder="sberbank@yandex.ru"
            validation="required|email"
          />
          <FormKit
            type="text"
            name="number"
            label="Контактный телефон"
            placeholder="+7999-99-99"
            validation="required"
          />
          <FormKit
            name="delivery"
            type="radio"
            label="Доставка"
            :value="'Самовывоз'"
            :options="['Самовывоз', 'Курьером']"
            validation="required"
          />
          <FormKit
            v-if="formData.delivery == 'Курьером'"
            type="text"
            name="adress"
            label="Ваш Адрес"
            validation="required"
          />
        </FormKit>

        <div
          class="grid place-items-center absolute top-0 left-0 w-full h-full bg-white -z-10"
          :class="[submitted ? 'opacity-100' : 'opacity-0']"
        >
          <div class="flex flex-col gap-4 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="fill-green-500 w-44 h-44"
            >
              <path
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
              ></path>
              <path
                d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"
              ></path>
            </svg>
            <h1 class="text-xl font-medium text-green-500">
              Ваши данные успешно заполнены
            </h1>
          </div>
        </div>
        <!-- <div
          class="flex flex-row items-start justify-start mt-6 w-full "
          v-if="delivery == 'Самовывоз'"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.1310769163474!2d55.9402786160447!3d54.72490918029114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d93a5bf02eea93%3A0x611f79eed3f66b7!2sTsentr%20Povysheniya%20Kvalifikatsii%20I%20Perepodgotovki%20Spetsialistov%2C%20Ugatu%2C%20Ufimskiy%20Gosudarstvennyy%20Aviatsionnyy%20Tekhnicheskiy%20Universitet!5e0!3m2!1sen!2sru!4v1652537427964!5m2!1sen!2sru"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            class="rounded-lg w-80 h-80"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <h5
            class="text-base flex flex-row items-center justify-between leading-none text-gray-900 dark:text-white mb-4"
          >
            Ежедневно 10:00-21:00 г. Уфа (Республика Башкортостан), проспект
            Октября, д. 24
          </h5>
        </div> -->

        <!-- <div>
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Доставка</label
          >
          <fieldset>
            <legend class="sr-only">Доставка</legend>

            <div class="flex items-center mb-4">
              <input
                id="country-option-1"
                type="radio"
                name="countries"
                value="USA"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked
              />
              <label
                for="country-option-1"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Самовывоз
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="country-option-2"
                type="radio"
                name="countries"
                value="Germany"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="country-option-2"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Почтой
              </label>
            </div>
          </fieldset>
        </div> -->
      </div>
    </div>

    <div
      class="p-4 w-11/12 flex-1 mx-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 sticky top-20"
      :class="[submitted ? 'z-10 opacity-100' : '-z-10 opacity-50']"
    >
      <div
        class="text-2xl flex flex-row items-center justify-between font-bold leading-none text-gray-900 dark:text-white mb-4"
      >
        <h5>Итого:</h5>
        <h5>{{ totalPrice }} ₽</h5>
      </div>
      <div
        class="text-lg flex flex-row items-center justify-between font-medium leading-none text-gray-500 dark:text-white mb-4"
      >
        <h5>Количество:</h5>
        <h5>{{ totalQnt }} шт.</h5>
      </div>
      <div
        class="text-lg flex flex-row items-center justify-between font-medium leading-none text-gray-500 dark:text-white mb-4"
      >
        <h5>Доставка:</h5>
        <h5>{{ formData.delivery }}</h5>
      </div>
      <h5
        class="text-base flex flex-row items-center justify-between leading-none text-gray-900 dark:text-white mb-4"
        v-if="formData.delivery == 'Самовывоз'"
      >
        Ежедневно 10:00-21:00 г. Уфа (Республика Башкортостан), проспект
        Октября, д. 24
      </h5>
      <h5
        class="text-base flex flex-row items-center justify-between leading-none text-gray-900 dark:text-white mb-4"
        v-if="formData.delivery == 'Курьером'"
      >
        {{ formData.adress }}
      </h5>

      <button
        @click="pay()"
        type="submit"
        class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        :disabled="!checkPref"
      >
        Оформить заказ
      </button>
      <button
        @click="succesFunction()"
        type="submit"
        class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full rounded-xl text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        :disabled="!checkPref"
      >
        Оформить заказ
      </button>

      <div class="flex items-start mt-3">
        <FormKit
          v-model="checkPref"
          type="checkbox"
          label="Я соглашаюсь с правами"
          name="terms"
          validation="accepted"
          validation-visibility="dirty"
        />
      </div>
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
