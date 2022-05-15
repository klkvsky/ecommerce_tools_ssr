<script setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

let email = ref("");
let password = ref("");
let errorMessage = ref("");

let user = ref(null);

async function signIn() {
  try {
    console.log("trying");
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("finished");
  } catch (error) {
    errorMessage = error.message;
  }
}

function checkForUser() {
  auth.onAuthStateChanged((firebaseUser) => (user.value = firebaseUser));
}

checkForUser();
</script>

<template>
  <div class="bg-red-500 p-4 m-4" v-if="!user">
    <form @submit.prevent="signIn()">
      <input type="text" v-model="email" />
      <input type="text" v-model="password" />
      <button type="submit">Отправить</button>
    </form>
  </div>
  <div class="p-4 h-screen overflow-hidden flex flex-row gap-10" v-else>
    <div
      class="mx-4 flex flex-col text-black dark:text-white w-screen lg:w-96 lg:mr-auto"
    >
      <h1 class="font-bold text-3xl pt-4">Меню</h1>
      <!-- <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/analytics"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9H13V4.069A8.008 8.008 0 0 1 19.931 11zM4 12c0-4.072 3.061-7.436 7-7.931V12a.996.996 0 0 0 .111.438c.015.03.022.063.041.093l4.202 6.723A7.949 7.949 0 0 1 12 20c-4.411 0-8-3.589-8-8zm13.052 6.196L13.805 13h6.126a7.992 7.992 0 0 1-2.879 5.196z"
          ></path>
        </svg>
        Аналитика
      </router-link> -->

      <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/items?page=1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path
            d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM4 8h16v4h-3v-2h-2v2H9v-2H7v2H4V8zm0 11v-5h3v2h2v-2h6v2h2v-2h3.001v5H4z"
          ></path>
        </svg>

        Товары
      </router-link>

      <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/preference"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path
            d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"
          ></path>
        </svg>
        Главная
      </router-link>

      <!-- <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/users"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl"
        >
          <path
            d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"
          ></path>
          <path
            d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z"
          ></path>
        </svg>
        Пользователи
      </router-link> -->

      <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/sales"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path
            d="M21.999 8a.997.997 0 0 0-.143-.515L19.147 2.97A2.01 2.01 0 0 0 17.433 2H6.565c-.698 0-1.355.372-1.714.971L2.142 7.485A.997.997 0 0 0 1.999 8c0 1.005.386 1.914 1 2.618V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-5h4v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9.382c.614-.704 1-1.613 1-2.618zm-2.016.251A2.002 2.002 0 0 1 17.999 10c-1.103 0-2-.897-2-2 0-.068-.025-.128-.039-.192l.02-.004L15.219 4h2.214l2.55 4.251zm-9.977-.186L10.818 4h2.361l.813 4.065C13.957 9.138 13.079 10 11.999 10s-1.958-.862-1.993-1.935zM6.565 4h2.214l-.76 3.804.02.004c-.015.064-.04.124-.04.192 0 1.103-.897 2-2 2a2.002 2.002 0 0 1-1.984-1.749L6.565 4zm3.434 12h-4v-3h4v3z"
          ></path>
        </svg>
        Продажи
      </router-link>

      <router-link
        class="mn-option dark:bg-slate-900 dark:text-white"
        to="/admin/news"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path
            d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"
          ></path>
          <path
            d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z"
          ></path>
        </svg>
        Новости
      </router-link>

      <button
        class="mn-option dark:bg-slate-900 dark:text-white"
        @click="auth.signOut"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-black w-10 h-10 bg-yellow-300 p-2 rounded-xl shadow-sm shadow-yellow-300"
        >
          <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
          <path
            d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"
          ></path>
        </svg>

        Выйти
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>
