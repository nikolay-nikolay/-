<template>
	<div class="relative mx-auto w-full inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2" >
	 
		<div class="shadow p-4 rounded-lg bg-white">
		  <div class="flex justify-center relative rounded-lg overflow-hidden h-52">
			<div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
			  <div class="absolute inset-0 bg-black opacity-10">
				sdsds
			  </div>
			</div>
  
			<span class="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
			  {{ test.questions.length }} Вопрос(-ов)
			</span>
		  </div>
  
		  <div class="mt-4">
			<h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" :title="test.title">
			  {{ test.title }}
			</h2>
			<p class="mt-2 text-sm text-gray-800 line-clamp-1" :title="test.description">
			  {{ test.description }}
			</p>
		  </div>
  
		  <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
			<!-- <p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
			  <svg class="h-5 w-5 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> </svg> 
			  <span class="mt-2 xl:mt-0">
				{{ test.rating }}
			  </span>
			</p>
			<p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
			  <svg class="h-5 w-5 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 6 12 12 16 14" /></svg>
			  <span class="mt-2 xl:mt-0">
				{{ test.timeLimit }}
			  </span>
			</p> -->
			<p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800" >
			  <svg class="h-5 w-5 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg>
			  <span class="mt-2 xl:mt-0">
				{{ test.countViewed }}
			  </span> 
			</p>
			<p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
			  <svg class="h-5 w-5 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
			  <span class="mt-2 xl:mt-0">
				{{ test.countSolved }}
			  </span>
			</p>
		  </div>
			
		  <router-link :to="`/test/${test.id}`">
		  <div class="grid grid-cols-1 mt-8">
			  <button>Пройти тест</button>
		  </div>
		  </router-link>
		  <router-link :to="`/redaction/${test.id}`" v-if="store.user.length > 0 && store.user[0].status === true">
		  <div class="grid grid-cols-1 mt-8">
			  <button>Редактировать тест</button>
		  </div>
		</router-link>
		<router-link :to="`/delete/${test.id}`" v-if="store.user.length > 0 && store.user[0].status === true">
		  <div class="grid grid-cols-1 mt-8">
			  <button>Удалить тест</button>
		  </div>
		</router-link>


		</div>
	</div>
  </template>
  
  <script>
	  import { useStore } from '@/stores/store'
	  export default {
	  props: {
		  test: {
			  required: false,
		  },
		  image: {
			  type: String,
			  required: true,
		  },
		  name: {
			  type: String,
			  required: true,
		  },
		//   id: {
		// 	  type: String,
		// 	  required: true,
		//   },
	  },
	  setup(){
    const store = useStore();
    return {
      store
    }
  },
  methods: {

  }
  };
  </script>
  
  <style scoped>
  .card__container {
	  @apply w-full max-w-[20rem] bg-white rounded-lg shadow dark:bg-gray-800
  }
  
  .card__header {
	  @apply mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white
  }
  
  .card__action {
	  @apply  sm:text-xs  lg:text-xs flex-nowrap w-full justify-between inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
  }
  </style>