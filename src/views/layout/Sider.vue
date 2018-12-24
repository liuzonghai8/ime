<template>
   <!-- 导航栏 fixed  permanent-->
    <!-- enable-resize-watcher 自动调整是否关闭右侧栏 -->
    <v-navigation-drawer
      :dark="dark"
      class="blue lighten-3"
      :mini-variant.sync="miniNav"
      v-model="drawer"
      fixed
      width="200"
      app
    >
      <v-toolbar flat class="transparent"  :color="dark ? 'secondary' : 'primary'">
        <v-list class="pa-0" dense>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!-- 公司LOGO -->
              <img src="../../assets/1.jpeg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{title}}</v-list-tile-title>
            </v-list-tile-content>
            <!-- 缩小箭头 -->
            <v-list-tile-action>
              <v-btn icon @click.stop="miniNav = !miniNav">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider/>
      <!-- 菜单 -->
      <v-list class="pa-0 ma-0" dense>
        <v-list-group
          v-for="item in navMenus"
           v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <!-- 一级菜单 scoped slot="activator" -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- 二级菜单 -->
          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="item.path + subItem.path"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    props:{
        dark: Boolean,
        drawer: Boolean,
        navMenus:{
            teyp: Object
        } 
    },
    data(){
        return{
            miniNav: false,// 左侧导航是否收起
            title: "后台管理系统",

        }
    },
    computed:{
        
    }

}
</script>

