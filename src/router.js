import Vue from 'vue'
import Router from 'vue-router'
import runtest from '@/components/runtest'
import newtest from '@/components/newTest'
import addWords from '@/components/addWords'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'addwords',
      component: addWords
    },
    {
      path: '/test',
      name: 'test',
      component: runtest
    },
    {
      path: '/newtest',
      name: 'newtest',
      component: newtest
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
          
    {
      path: '/home',
      name: 'home',
      component: home
    },

    
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      
    
  ]
})
