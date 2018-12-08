import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '../assets/1.css'
import '@fortawesome/fontawesome-free/css/all.css'
//import colors from 'vuetify/es5/util/colors'
//import 'vuetify/src/stylus/bootstrap.styl'

// 选择导入的主题

Vue.use(Vuetify, {
 iconfont: 'fa',
 
 //'md' || 'mdi' || 'fa' || 'fa4',
 // iconfont: 'mdi',
  //// 'md' || 'mdi' || 'fa' || 'fa4'
  // 设置具体的颜色
  //一种颜色
  // theme: {
  //   primary: '#3f51b5',
  //   secondary: '#b0bec5',
  //   accent: '#8c9eff',
  //   error: '#b71c1c'
  // }
  // //另一种颜色
  theme:{
    primary: '#009688',//'#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
  //定义的材料颜色
  // theme: {
  //   primary: color.purple,
  //   secondary: colors.grey.darken1,
  //   accent: colors.shades.black,
  //   error: colors.red.accent3
  // }
})
