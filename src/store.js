import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:'',
    

  },
  mutations: {
    login(state,payload){
      state.login = payload
      
    },
    logout(state){
      state.login = ''
    }
    

    },

  
  actions: {


  },
  getters:{
    login: state => {
      return state.login
    },
  }
})
