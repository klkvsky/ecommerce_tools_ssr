<script setup>
let props = defineProps(["info"]);
</script>

<template>
  <div
    class="p-6 max-w-sm xl:flex xl:flex-col xl:props.infos-start xl:justify-between bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-900 dark:border-gray-700"
  >
    <div>
      <a href="#">
        <h5
          class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ props.info.data().title }}
        </h5>
      </a>
      <p
        class="mb-4 text-sm font-normal max-h-44 pb-10 overflow-hidden text-gray-700 dark:text-gray-400"
      >
        {{ props.info.data().text }}
      </p>
    </div>
    <router-link
      :to="{ name: 'NewsItem', params: { id: props.info.id } }"
      class="inline-flex props.infos-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Читать дальше
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
</template>
