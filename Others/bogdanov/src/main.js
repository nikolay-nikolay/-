import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
// import '@/assets/css/tailwind.css'
import './index.css'
import VueCookies from 'vue-cookies';

// import './assets/main.css'

createApp(App).use(router).use(createPinia()).use(VueCookies).mount('#app')

