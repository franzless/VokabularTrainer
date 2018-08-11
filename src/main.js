import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import toolbar from '@/components/navbar'
import words from '@/components/words'


Vue.component('my-words', words)
Vue.component('my-toolbar', toolbar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
