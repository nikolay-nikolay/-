<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в ваш аккаунт</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
      <div>
        <label  class="block text-sm font-medium leading-6 text-gray-900">Имя пользователя</label>
        <div class="mt-2">
          <input  v-model="field_login" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
        </div>
        <div class="mt-2">
          <input v-model="field_password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button @click="login()" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Войти</button>
      </div>
    </div>
  </div>
</div>
  </template>


<script>
import { useStore } from '../../stores/store'

export default {
  data () {
    return {
      field_login : "",
      field_password : "",
    }
  },
  setup(){
    const store = useStore();
    return {
      store
    }
  },
  methods: {
    async login(){
        this.store.user = []
        this.store.navigations4[0].items = []
        const data = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: `${this.field_login}`,
            password:`${this.field_password}`,
          }),
          });
        const response = await data.json()
        if (response["status"] === "Вы успешно вошли"){
          
          const data = await fetch("http://localhost:3001/userfind", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: `${this.field_login}`,
            password:`${this.field_password}`,
          }),
          });
          const response = await data.json()
          this.$cookies.set('token', response.token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000 // 24 часа
        });
          const data2 = await fetch("http://localhost:3001/checktoken", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${response.token}`,
          }),
          });
          const response2 = await data2.json()
          this.store.user.push(response2)
        }
        const username = this.store.user?.[0]?.username;
        if (username) {
          this.store.navigations4[0].items = [
                    {
                      link_name: "/",
                      show_name: `Привет ${username} !`,
                      icon: "ProfileIcon",
                    },
                    {
                      link_name: "quit",
                      show_name: `Выйти`,
                      icon: "LogoutIcon",
                    },
          ]
        } else {
          // Обработка случая, когда this.store.user пуст или не существует
          console.log('Username is empty.');
        }
        this.field_login = ""
        this.field_password = ""
}
},

}


</script>
  
  
