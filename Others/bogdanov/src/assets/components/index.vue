<template>
    <div>
        <p class="card__header">Главная</p>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-3 gap-2">
        </div>
    </div>
  </template>
  
  <script>
  import { useStore } from '@/stores/store'


  export default {
    components: {
    },
    setup(){
    const store = useStore();
    return {
      store
    }
  },
    data () {
      return {
      }
    },
    async mounted () {
    }
  }
  
  </script>
  
  <style scoped>
  .card__header {
    @apply mb-2 text-2xl font-bold text-black
  }
  
  </style>