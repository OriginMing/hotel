import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import loginIn from "@/view/loginIn";
import main from "@/view/main/main";
import Lists from "@/view/main/Lists";
import Category_Add from "@/view/main/category/Add";
import Show from "@/view/main/category/Show";
import Categoryedit from "@/view/main/category/Categoryedit";
import Changepass from "@/view/main/pass/Changepass";
import Stayhomeadd from "@/view/main/stayhome/Stayhomeadd";
import statyhomeindex from "@/view/main/stayhome/stayhomindex"
import Homestayedit from '@/view/main/stayhome/Homestayedit'

const router = new VueRouter({
    routes: [
        {
            path: '/', component: main, name: 'index',
            meta: {
                auth: true
            },
            children: [
                {
                    path: 'categoryAdd', component: Category_Add, name: 'Category_Add', meta: {
                        title: '添加分类',
                    }
                },
                {
                    path: 'categoryShow', component: Show, name: 'show', meta: {

                        title: '显示分类',
                        auth: true
                    }
                },
                {
                    path: 'categoryedit', component: Categoryedit, name: 'categoryedit', meta: {
                        title: '分类编辑',
                        auth: true
                    }
                },
                {
                    path: 'changepass', component: Changepass, name: 'changepass', meta: {
                        title: '密码修改',
                        auth: true
                    }
                },
               
                {
                    path: 'stayhomeadd', component: Stayhomeadd, name: 'stayhomeadd', meta: {
                        title: '民宿添加',
                        auth: true
                    }
                },
                {
                    path: 'stayhomeindex', component: statyhomeindex, name: 'stayhomeindex', meta: {
                        title: '民宿首页',
                        auth: true
                    }
                },
                {
                    path:'/homestayedit/:id',
                    component: Homestayedit,
                    name:'homestayedit',
                    meta:{auth:true,title:'民宿编辑'},
                  }, 
            ]
        },

        {
            path: '/login', component: loginIn, name: 'loginIn',
            meta: {
                auth: false
            }
        },

        {
            path: '/lists', component: Lists, name: 'lists', meta: {
                auth: true
            },

        },
    
    ]
})

router.beforeEach((to, from, next) => {
    to, from;
    if (to.meta.auth) {
        let token = sessionStorage.getItem('token')
        token = token && token.trim();
        if (token) {
            next();
        } else {
            next({name: 'loginIn', query: {redirect: to.name}})
        }
    } else {
        next();
    }
})
export default router;