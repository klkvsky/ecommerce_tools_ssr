<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/navbar.vue";
import FooterComponent from "../components/footer.vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
const route = useRoute();
const store = useCartStore();

let itemInfo = ref({});

async function getData() {
  const docRef = doc(db, "news", route.params.id);
  const docSnap = await getDoc(docRef);
  itemInfo.value = docSnap.data();
}
onMounted(() => {
  getData();
});
</script>

<template>
  <Navbar />
  <div
    class="mx-4 mt-4 bg-gray-50 dark:bg-slate-900 dark:text-white p-4 rounded-lg flex flex-col items-start justify-start gap-4"
    v-if="itemInfo"
  >
    <h1 class="text-2xl font-semibold">
      {{ itemInfo.Title }}
    </h1>

    <p>
      {{ itemInfo.Content }}
    </p>
  </div>

  <FooterComponent />
</template>
