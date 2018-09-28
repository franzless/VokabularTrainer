import Vue from 'vue'
import Router from 'vue-router'
import runtest from '@/components/runtest'
import newtest from '@/components/newTest'
import addWords from '@/components/addWords'
import login from '@/components/login'
import home from '@/components/home2'
import Words from '@/components/words'
import explore from '@/components/explore'
import register from '@/components/register'
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