import {defineStore} from 'pinia';


export const useStore = defineStore('featch', {
    state: () => {
        return {
            user : [],
            navigations: [
                {
                  // name: "Тесты",
                  // items: [
                  //   {
                  //     link_name: "popular",
                  //     show_name: "Популярное",
                  //     icon: "PopularIcon",
                  //   },
                    
                  // ],
                },
                
              ],
              navigations2: [
                {
                  name: "Вход",
                  items: [
                    {
                      link_name: "login",
                      show_name: "Войти",
                      icon: "LoginIcon",
                    },
                    {
                      link_name: "registration",
                      show_name: "Зарегестрироваться",
                      icon: "LogoutIcon",
                    },
                  ],
                },
                
              ],
              navigations3: [
                {
                  name: "Админам",
                  items: [
                    {
                      link_name: "getadmin",
                      show_name: "Выдать админку",
                      icon: "AdminAddIcon",
                    },
                  ],
                },
                
              ],
              navigations4: [
                {
                  name: "Пользователь",
                  items: [
                    
                  ],
                },
                
              ],
        }
    },
    actions: {
    }
}); 