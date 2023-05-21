<template>
<div class="card p-6" v-if="store.user.length > 0 && store.user[0].status === true">
        <div class="mb-6">
          <label 
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Никнейм</label
          >
          <input
            v-model="login"
            type="text"
            id="large-input"
            class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:gray-900 focus:border-gray-900 text-black dark:border-gray-600 dark:placeholder-gray-400 dark:focus:gray-900 dark:focus:border-gray-900"
          />
        </div>
        <div class="mb-6">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Наличие прав</label
          >
          <input
            v-model="bool"
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:gray-900 focus:border-gray-900 block w-full p-2.5 text-black dark:border-gray-600 dark:placeholder-gray-400 dark:focus:gray-900 dark:focus:border-gray-900"
          />
        </div>
        <button @click="redactionAdmin" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:gray-900 focus:border-gray-900 block w-full p-2.5 text-black dark:border-gray-600 dark:placeholder-gray-400 dark:focus:gray-900 dark:focus:border-gray-900">Выдать</button>
</div>
<div v-else>
      <p class="card__header">Похоже вы не являетесь администратором :(</p>
</div>
</template>


<script>
  import { useStore } from '@/stores/store'

  export default {
    data() {
      return {
        login : "",
        bool : "",
        
      };
    },
    setup(){
    const store = useStore();
    return {
      store
    }
  },
    methods: {
      async redactionAdmin() {
        const data = await fetch(`http://localhost:3001/editadmin/${this.login}/${this.bool}`)
        let response = await data.json()
        this.login = ""
        this.bool = ""
        if (this.store.user[0].login === this.login){
          this.store.user = []
        }
      },
    },
  };
  </script>