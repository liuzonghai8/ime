<template>
  <v-app :dark="dark">
    <Sider :dark='dark' :drawer="drawer" :navMenus="muenusItems"></Sider>
    <Header></Header>
    <Context></Context>
    <Footer></Footer>
  </v-app>
</template>
<script>
import Sider from "./Sider";
import Header from "./Header";
import Footer from "./Footer";
import Context from './Context'
import menus from "../../router/meus.js";
export default {
  data() {
    return {
      dark: false, //控制主题色
      drawer: false //左侧导航是否隐藏
    };
  },
  components: {
    Sider,
    Header,
    Context,
    Footer
  },
  computed:{
      muenusItems(){
          return menus;
      }
  }
};
</script>
