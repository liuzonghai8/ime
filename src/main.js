import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import Axios from 'axios';
//import '@fortawesome/fontawesome-free/css/all.css'


Vue.config.productionTip = false
Vue.prototype.$axios2 = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
