import { set, toggle } from '@/utils/vuex'

export default {
   // //隐藏菜单的修改方法  基本写法
   // setDrawer (state) {
   //    state.drawer = !state.drawer
   // },
   setDrawer: set('drawer'),
   setImage: set('image'),
   setColor: set('color'),
   setDark: set('dark'),
   //翻转菜单，即隐藏和显示
   toggleDrawer: toggle('drawer'),
   toggleDark: toggle('dark')
}
