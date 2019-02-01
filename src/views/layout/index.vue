<template>
  <v-app app>
    <Sider/>
    <Header/>
    <Content/>
    <Footer/>
    <!-- <Filter/> -->
  </v-app>
</template>
<script>
import Sider from "./Sider";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
//import Filter from './Filter'
export default {
  components: {
    Sider,
    Header,
    Content,
    Footer
  }

}

// const mueusdata={}
</script>
<style scoped>
.box {
  width: 90%;
}
</style>