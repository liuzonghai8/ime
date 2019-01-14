import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Axios from 'axios';
import qs from 'qs'
//import '@fortawesome/fontawesome-free/css/all.css'
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
Vue.prototype.$axios2 = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
