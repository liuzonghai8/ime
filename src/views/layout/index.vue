<template>
  <v-app :dark="dark">
    <Sider :dark="dark" :drawer="drawer" :navMenus="muenusItems"></Sider>
    <Header :dark="dark"  :drawer="drawer"  v-on:changeDrawer="changeDrawer" v-on:changeTheme="changeTheme"></Header>
    <Content></Content>
    <Footer :dark="dark" ></Footer>
  </v-app>
</template>
<script>
import Sider from "./Sider";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import menus from "../../router/meus.js";
export default {
  data() {
    return {
      dark: false, //控制主题色
      drawer: true //左侧导航是否隐藏
    };
  },
  components: {
    Sider,
    Header,
    Content,
    Footer
  },
  computed: {
    muenusItems() {
      return menus;
    }
  },
  //    watch: {},
  //   created() {
  //     menus.forEach(m => {
  //       const p1 = m.path.slice(1);
  //       this.menuMap[p1] = { name: m.title };
  //       m.items.forEach(i => {
  //         this.menuMap[p1][i.path.slice(1)] = i.title;
  //       });
  //     });
  //   },

  methods: {
    changeTheme() {
      this.dark = !this.dark;
    },
    changeDrawer() {
      this.drawer = !this.drawer;
    }
  }
};

// const mueusdata={}
</script>
<style scoped>
.box {
  width: 90%;
}
</style>