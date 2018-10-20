import Vue from 'vue'
import Router from 'vue-router'
import runtest from '@/components/Wörterbuch/runtest'
import newtest from '@/components/Wörterbuch/newTest'
import addWords from '@/components/Wörterbuch/addWords'
import login from '@/components/Wörterbuch/login'
import home from '@/components/Wörterbuch/home2'
import Words from '@/components/Wörterbuch/words'
import explore from '@/components/Wörterbuch/explore'
import register from '@/components/Wörterbuch/register'
import neuefrage from '@/components/Fragenkatalog/neueFrage'
import fragenkatalog from '@/components/Fragenkatalog/Fragenkatalog'
import fragentest from '@/components/Fragenkatalog/test'

import firebase from 'firebase'
import db from './db/firebaseinit'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'addwords',
      component: addWords,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: runtest,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/newtest',
      name: 'newtest',
      component: newtest,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      
    },
          
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: explore,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/register/:token',
      name: 'register',
      component: register,
      meta:{
        requiresGuest:true
      }
      
    },
    {
      path: '/neuefrage',
      name: 'neuefrage',
      component: neuefrage,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/fragenkatalog',
      name: 'fragenkatalog',
      component: fragenkatalog,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/KatalogTest',
      name: 'Katalogtest',
      component: fragentest,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/testing',
      name: 'testing',
      component: fragenkatalog,
      
    },

    
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      
    
  ]
});

router.beforeEach((to, from, next)=>{
  //Check for requiredAuth guard
  if(to.matched.some(record=>record.meta.requiresAuth)){
    //Check if NOT logged in
    if(!firebase.auth().currentUser){
      //Go to Login
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //Proceed to route
      next()
    }
  } else if(to.matched.some(record=>record.meta.requiresGuest)){
    //Check if  logged in    
    var data =''
     function token(){
       db.collection("tokens").doc(to.params.token).get().then(
        query=>{
         data = query.data()  
          if(query.exists){
            return true
          }else{
            
            return false}
        }
      ).then((res)=>{
        
        if(res===false){
      
          next({
            path:'/login',
            query:{
              redirect: to.fullPath
            }
          })
        }else{
          var today = Math.floor(Date.now() / 1000)
                   
            if(today < data.validUntil.seconds){
              next()
            }else{
              next({
                path:'/login',
                query:{
                  redirect: to.fullPath
                }
              })  
            }  
          
          
        } 

      })
     }
     console.log(token()) 
   
  } else{
    next()}
})
//Nav Guards
export default router;