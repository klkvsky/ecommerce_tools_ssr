// import { createApp } from "vue";
// import App from "./App.vue";

// import "../src/index.css"; // Tailwind.css

// import router from "./router/index.js"; //Vue Router

// import { createPinia } from "pinia"; // Pinia

// // import { plugin, defaultConfig } from "@formkit/vue"; // Formkit
// // import { ru, en } from "@formkit/i18n"; //FormKit.js Locales

// const app = createApp(App);

// app.use(router); // Vue Router

// // app.use(
// //   plugin,
// //   defaultConfig({
// //     locales: { ru, en },
// //     locale: "ru",
// //     config: {
// //       rootClasses(sectionKey, node) {
// //         // this is an incomplete theme for demonstration purposes
// //         const type = node.props.type;
// //         // create a classConfig object that contains either strings or functions
// //         // that return strings. We'll loop over the output later to create our
// //         // class objects of keys with boolean values.
// //         const classConfig = {
// //           outer: "mb-1 text-black dark:text-white", // string values apply to everything
// //           legend: "block mb-1 font-bold text-sm",
// //           label() {
// //             // functions that return strings allow you to diff on types
// //             if (
// //               type === "text" ||
// //               type === "email" ||
// //               type === "password" ||
// //               type == "number" ||
// //               type === "textarea"
// //             ) {
// //               return "block my-1";
// //             }
// //             if (type === "radio") {
// //               return "text-sm text-gray-600  mt-0.5 cursor-pointer dark:text-white";
// //             }
// //           },
// //           options() {
// //             if (type === "radio") {
// //               return "grid grid-cols-2 gap-2 mt-2";
// //             }
// //           },
// //           input() {
// //             if (
// //               type === "text" ||
// //               type === "email" ||
// //               type === "password" ||
// //               type == "number"
// //             ) {
// //               return "w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border bg-gray-50 rounded-lg focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-800";
// //             }
// //             if (type == "textarea") {
// //               return "w-full p-3 text-base text-gray-700 placeholder-gray-400 border bg-gray-50 rounded-lg focus:shadow-outline dark:bg-slate-800 dark:text-white dark:border-slate-800";
// //             }
// //             if (type === "radio") {
// //               return "mr-2";
// //             }
// //             if (type === "checkbox") {
// //               return "";
// //             }
// //           },
// //           wrapper() {
// //             if (type === "radio") {
// //               return "flex flex-row flex-grow";
// //             }
// //             if (type === "checkbox") {
// //               return "flex flex-row gap-2 cursor-pointer items-center mb-2";
// //             }
// //           },
// //           help: "text-xs text-black bg-gray-100 mt-2 w-max py-1 px-2 rounded-md dark:bg-slate-800 dark:text-gray-300",
// //           message: "text-red-500 mt-2 text-xs",
// //         };

// //         // helper function to created class object from strings
// //         function createClassObject(classesArray) {
// //           const classList = {};
// //           if (typeof classesArray !== "string") return classList;
// //           classesArray.split(" ").forEach((className) => {
// //             classList[className] = true;
// //           });
// //           return classList;
// //         }

// //         const target = classConfig[sectionKey];
// //         // return a class objects from strings and return them for each
// //         // section key defined by inputs in FormKit
// //         if (typeof target === "string") {
// //           return createClassObject(target);
// //         } else if (typeof target === "function") {
// //           return createClassObject(target());
// //         }

// //         return {}; // if no matches return an empty object
// //       },
// //     },
// //   })
// // );

// app.use(createPinia()); // Pinia

// app.mount("#app");

import App from "./App.vue";
import { createSSRApp } from "vue";
// import router from "./router/index.js"; //Vue Router
import "../src/index.css"; // Tailwind.css
import { createRouter } from "./router";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue"; // Formkit
import { ru, en } from "@formkit/i18n"; //FormKit.js Locales

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App);
  // app.use(router); // Vue Router
  const router = createRouter();
  app.use(router);
  const pinia = createPinia();
  app.use(pinia);
  app.use(
    plugin,
    defaultConfig({
      locales: { ru, en },
      locale: "ru",
      config: {
        rootClasses(sectionKey, node) {
          // this is an incomplete theme for demonstration purposes
          const type = node.props.type;
          // create a classConfig object that contains either strings or functions
          // that return strings. We'll loop over the output later to create our
          // class objects of keys with boolean values.
          const classConfig = {
            outer: "mb-1 text-black dark:text-white", // string values apply to everything
            legend: "block mb-1 font-bold text-sm",
            label() {
              // functions that return strings allow you to diff on types
              if (
                type === "text" ||
                type === "email" ||
                type === "password" ||
                type == "number" ||
                type === "textarea"
              ) {
                return "block my-1";
              }
              if (type === "radio") {
                return "text-sm cursor-pointer dark:text-white";
              }
            },
            options() {
              if (type === "radio") {
                return "grid grid-cols-2 gap-2 mt-2";
              }
            },
            input() {
              if (
                type === "text" ||
                type === "email" ||
                type === "password" ||
                type == "number"
              ) {
                return "w-full h-10 px-3 text-base text-gray-700 placeholder-gray-400 border bg-gray-50 rounded-lg focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-800";
              }
              if (type == "textarea") {
                return "w-full p-3 text-base text-gray-700 placeholder-gray-400 border bg-gray-50 rounded-lg focus:shadow-outline dark:bg-slate-800 dark:text-white dark:border-slate-800";
              }
              if (type === "radio") {
                return "mr-2";
              }
              if (type === "checkbox") {
                return "";
              }
            },
            wrapper() {
              if (type === "radio") {
                return "flex flex-row flex-grow";
              }
              if (type === "checkbox") {
                return "flex flex-row gap-2 cursor-pointer items-center mb-2";
              }
            },
            help: "text-xs text-black bg-gray-100 mt-2 w-max py-1 px-2 rounded-md dark:bg-slate-800 dark:text-gray-300",
            message: "text-red-500 mt-2 text-xs",
          };

          // helper function to created class object from strings
          function createClassObject(classesArray) {
            const classList = {};
            if (typeof classesArray !== "string") return classList;
            classesArray.split(" ").forEach((className) => {
              classList[className] = true;
            });
            return classList;
          }

          const target = classConfig[sectionKey];
          // return a class objects from strings and return them for each
          // section key defined by inputs in FormKit
          if (typeof target === "string") {
            return createClassObject(target);
          } else if (typeof target === "function") {
            return createClassObject(target());
          }

          return {}; // if no matches return an empty object
        },
      },
    })
  );
  return { app, router, pinia };
}
