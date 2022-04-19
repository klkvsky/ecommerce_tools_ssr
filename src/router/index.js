// import { createRouter, createWebHistory } from "vue-router";

// import Home from "../pages/home.vue";
// import Catalog from "../pages/catalog.vue";
// import NewsPage from "../pages/newsPage.vue";
// import Item from "../pages/item.vue";
// import NewsItem from "../pages/newsItem.vue";
// import Cart from "../pages/cart.vue";
// import Category from "../pages/category.vue";

// const routes = [
//   { path: "/", name: "Home", component: Home },
//   { path: "/catalog", name: "Catalog", component: Catalog },
//   { path: "/newspage", name: "NewsPage", component: NewsPage },
//   { path: "/cart", name: "Cart", component: Cart },
//   { path: "/item/:id", name: "Item", component: Item },
//   { path: "/news/:id", name: "NewsItem", component: NewsItem },
//   { path: "/category/:id", name: "Category", component: Category },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import Home from "../pages/home.vue";
import Catalog from "../pages/catalog.vue";
import NewsPage from "../pages/newsPage.vue";
import Item from "../pages/item.vue";
import NewsItem from "../pages/newsItem.vue";
import Cart from "../pages/cart.vue";
import Category from "../pages/category.vue";

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("../pages/*.vue");

// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
//   return {
//     path: name === "/home" ? "/" : name,
//     component: pages[path], // () => import('./pages/*.vue')
//   };
// });

const routes = [
  ...Object.keys(pages).map((path) => {
    const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
    return {
      path: name === "/home" ? "/" : name,
      component: pages[path], // () => import('./pages/*.vue')
    };
  }),
  { path: "/item/:id", name: "Item", component: Item },
  { path: "/news/:id", name: "NewsItem", component: NewsItem },
  { path: "/category/:id", name: "Category", component: Category },
];

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
