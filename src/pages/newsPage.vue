<script setup>
import { ref, onMounted } from "vue";
// Firebase
import { collection, query, onSnapshot } from "firebase/firestore";
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
onMounted(() => {
  newsUpdate();
});
</script>

<template>
  <Navbar />
  <CartIcon />
  <h1 class="mx-4 lg:mx-8 mb-4 text-2xl font-bold">Новости</h1>
  <div class="mx-8 grid grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 lg:mt-4 gap-6">
    <NewsCard
      v-for="item in newsPosts"
      :key="item.id"
      :title="item.data().Title"
      :content="item.data().Content"
      :id="item.id"
    />
    <NewsCard
      v-for="item in newsPosts"
      :key="item.id"
      :title="item.data().Title"
      :content="item.data().Content"
      :id="item.id"
    />
    <NewsCard
      v-for="item in newsPosts"
      :key="item.id"
      :title="item.data().Title"
      :content="item.data().Content"
      :id="item.id"
    />
    <NewsCard
      v-for="item in newsPosts"
      :key="item.id"
      :title="item.data().Title"
      :content="item.data().Content"
      :id="item.id"
    />
    <NewsCard
      v-for="item in newsPosts"
      :key="item.id"
      :title="item.data().Title"
      :content="item.data().Content"
      :id="item.id"
    />
  </div>

  <FooterComponent />
</template>
