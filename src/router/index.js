import Vue from 'vue'
import Router from 'vue-router'
import routes from './route';

Vue.use(Router)

export default new Router({
  //mode: 'history', //完整路径模式
  mode: 'hash' ,// #隔开
  routes: routes
})
