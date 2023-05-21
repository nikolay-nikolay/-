import { createRouter , createWebHistory } from 'vue-router';
import Index from "./assets/components/index.vue"
import Login from "./assets/components/login.vue"
import Registration from "./assets/components/registration.vue"
import Getadmin from "./assets/components/getadmin.vue"
import Quit from "./assets/components/quit.vue"


const router = createRouter({
    history : createWebHistory(),
    routes : 
    [   
        {path: '/', component: Index},
        {path: '/login' , component: Login},
        {path: '/registration' , component: Registration},
        {path: '/getadmin' , component: Getadmin},
        {path: '/quit' , component: Quit}
    ]
})

export default router