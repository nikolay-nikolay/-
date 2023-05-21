<template>
    <div>
        <p class="card__header" >{{text_info}}</p>
    </div>
</template>

<script>
import { useStore } from '@/stores/store'

export default {
    components: {

  },
    data() {
        return {
          text_info : ""
        }
    },
    setup(){
    const store = useStore();
    return {
      store
    }
  },
    methods: {

    },
    async mounted() {
      if (this.store.user.length > 0  && this.store.user[0].status_auth === 'Вы успешно вошли'){
        this.$cookies.remove('token');
        this.text_info = `Вы вышли из аккаунта ${this.store.user[0].username}`
        this.store.user = []
      }
      else{
        this.text_info = `Вы еще не вошли в аккаунт :D`
      }
    },

};
</script>

