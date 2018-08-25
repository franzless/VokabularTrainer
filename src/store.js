import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:'',
    words:[],
    listinfo:[]

  },
  mutations: {
    login(state,payload){
      state.login = payload
      
    },
    logout(state){
      state.login = ''
    },
    addWords(state,payload){
      state.words = []
     
      payload.forEach(word=>{
      state.words.push(word)
      })  
       
    },
    listinfo(state,payload){
      state.listinfo = []
          payload.forEach(info=>{
          state.listinfo.push(info)
        })            
    }
    
    },

  
  actions: {
    addWords:(context,payload)=>{
      setTimeout(()=>{
        context.commit('addWords',payload)
      },1000)
    },
    listinfo:(context,payload)=>{
      setTimeout(()=>{
        context.commit('listinfo',payload)
      },1000)
    }

  },
  getters:{
    login: state => {
      return state.login
    },
    getwords: state => {
      return state.words
    },
    getlistinfo: state => {
      return state.listinfo
    },
  }
})
