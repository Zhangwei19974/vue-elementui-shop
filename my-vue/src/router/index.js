import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import '../assets/css/global.css'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: Login
    // }
    {path:"/",redirect:"/login"},
    {path:"/login",component:Login},
    {path:"/home",component:()=>import("@/components/Home.vue")}
  ]
})
