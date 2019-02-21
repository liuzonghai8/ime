import Vue from 'vue'
// import './plugins/axios'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store'

//导入插件 axios 和 vuetity
import './plugins'
import MyComponent from '@/components/MyComponent'
//import '@fortawesome/fontawesome-free/css/all.css'
// Vue.prototype.$qs = qs;
Vue.use(MyComponent)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
