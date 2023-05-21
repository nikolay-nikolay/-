<template>
  <div>
<!-- start navbar -->
<div
class="xs:fixed xs:w-full xs:top-0 xs:z-20 sm:fixed sm:w-full sm:top-0 sm:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300"
>
<!-- logo -->
<div  class="flex-none w-56 flex flex-row items-center justify-between">
  <router-link :to="`/`" class="flex">
    <strong class="capitalize ml-1 flex-1">Авторизация</strong>
  </router-link>

  <button
    id="sliderBtn"
    @click="sideBarToggle"
    class="flex-none text-right text-gray-900 hidden sm:block"
  >
    <menu-icon />
  </button>
</div>
</div>
<!-- end navbar -->

<!-- strat wrapper -->
<div class="h-screen flex flex-row flex-wrap">
<!-- start sidebar -->
<div
  id="sideBar"
  ref="sidebar"
  class="xs:-ml-64 xs:fixed xs:top-0 xs:z-30 xs:h-screen xs:shadow-xl relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 sm:-ml-64 sm:fixed sm:top-0 sm:z-30 sm:h-screen sm:shadow-xl animated faster"
>
  <!-- sidebar content -->
  <div class="flex flex-col">
    <!-- sidebar toggle -->
    <div class="text-right hidden sm:block mb-4">
      <button id="sideBarHideBtn" @click="sideBarToggle">
        <svg
          class="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
    <!-- end sidebar toggle -->
    <!-- <div v-for="(nav, index) in store.navigations" :key="index" style="list-style-type: none;">
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">
        {{ nav.name }}

      </p>

      <router-link
        v-for="item in nav.items"
        :key="item.link_name"
        :to="`/${item.link_name}`"
        class="category__link"
      >
        <i class="category__link-icon"><component :is="item.icon" /></i>
        {{ item.show_name }}
      </router-link>
    </div> -->
    <div v-for="(nav, index) in store.navigations2" :key="index" style="list-style-type: none;"  >
      <!-- v-if="user[0].status" -->
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">
        {{ nav.name }}
        {{ key }}

      </p>
      <router-link 
        v-for="item in nav.items"
        :key="item.link_name"
        :to="`/${item.link_name}`"
        class="category__link"
      >
        <i class="category__link-icon"><component :is="item.icon" /></i>
        {{ item.show_name }}
        <!-- <li v-for="user in users" :key="user.id">{{ user.name }}</li> -->
      </router-link>
    </div>
    <div v-for="(nav, index) in store.navigations3" :key="index" style="list-style-type: none;" v-if="store.user.length > 0 && store.user[0].status === true">
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">
        {{ nav.name }}

      </p>

      <router-link
        v-for="item in nav.items"
        :key="item.link_name"
        :to="`/${item.link_name}`"
        class="category__link"
      >
        <i class="category__link-icon"><component :is="item.icon" /></i>
        {{ item.show_name }}
      </router-link>
    </div>
    <div v-for="(nav, index) in store.navigations4" :key="index" style="list-style-type: none;" v-if="store.user.length > 0  && store.user[0].status_auth === 'Вы успешно вошли' ">
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">
        {{ nav.name }}

      </p>

      <router-link
        v-for="item in nav.items"
        :key="item.link_name"
        :to="`/${item.link_name}`"
        class="category__link"
      >
        <i class="category__link-icon"><component :is="item.icon" /></i>
        {{ item.show_name }}
      </router-link>
    </div>

    <!-- end link -->
  </div>
  <!-- end sidebar content -->
</div>
<!-- end sidebar -->

<!-- strat content -->
<div class="bg-gray-100 flex-1 p-6 sm:mt-16"><RouterView></RouterView></div>
<!-- end content -->
</div>
<!-- end wrapper -->
</div>
</template>

<script>
import { useStore } from '@/stores/store'
import PopularIcon from "../src/assets/components/icons/PopularIcon.vue";
import NewIcon from "../src/assets/components/icons/NewIcon.vue";
import MenuIcon from "../src/assets/components/icons/MenuIcon.vue";
import LoginIcon from "../src/assets/components/icons/LoginIcon.vue";
import LogoutIcon from "../src/assets/components/icons/LogoutIcon.vue";
import CreateIcon from "../src/assets/components/icons/CreateIcon.vue";
import ProfileIcon from "../src/assets/components/icons/ProfileIcon.vue";
import AdminAddIcon from "../src/assets/components/icons/AdminAddIcon.vue";

export default {
  components: {
    PopularIcon,
    NewIcon,
    MenuIcon,
    LoginIcon,
    LogoutIcon,
    CreateIcon,
    ProfileIcon,
    AdminAddIcon
  },
  setup(){
    const store = useStore();
    return {
      store
    }
  },
  data() {
  return {

  };
},
methods: {
  sideBarToggle() {
      const sideBar = this.$refs.sidebar;

      if (sideBar.classList.contains("sm:-ml-64")) {
        sideBar.classList.replace("sm:-ml-64", "sm:ml-0");
        sideBar.classList.remove("sm:slideOutLeft");
        sideBar.classList.add("sm:slideInLeft");
        return;
      }

      if (sideBar.classList.contains("sm:ml-0", "slideInLeft")) {
        sideBar.classList.remove("sm:slideInLeft");
        sideBar.classList.add("sm:slideOutLeft");
        sideBar.classList.replace("sm:ml-0", "sm:-ml-64");
      }
    },
  
},
async created() {
  this.store.navigations4[0].items = []
  let token = this.$cookies.get('token');
  if (token != ""){
    this.store.user = []
    const data = await fetch("http://localhost:3001/checktoken", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
          }),
          });
  const response = await data.json()
  this.store.user.push(response)
  this.store.navigations4[0].items = [
                    {
                      link_name: "/",
                      show_name: `Привет ${this.store.user[0].username} !`,
                      icon: "ProfileIcon",
                    },
                    {
                      link_name: "quit",
                      show_name: `Выйти`,
                      icon: "LogoutIcon",
                    },
                  ]
  }

}
}
</script>


<style>
a.text:active, /* активная/посещенная ссылка */
a.text:hover,  /* при наведении */
a.text {
  text-decoration: none;
  color: #666;
}
a{
  text-decoration: none;
  color: #666;
  
}
a:hover{
  text-decoration: none;
  color: #666;
}
.color{
  color: #fff;
}
.category__link {
  @apply flex items-center mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500;
}

.category__link-icon {
  @apply mr-1;
}
</style>



