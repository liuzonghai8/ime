<template>
  <a-app :dark="dark">
    <!-- 导航栏 -->
    <v-navigation-drawer
      :dark="dark"
      :mini-variant.sync="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      hide-overlay
      stateless
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!-- 公司LOGO -->
              <img src="../assets/1.jpeg">
              <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{title}}</v-list-tile-title>
            </v-list-tile-content>
            <!-- 缩小箭头 -->
            <v-list-tile-action>
              <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <!-- 菜单 -->
      <v-list class="pt-0" dense>
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <!-- 一级菜单 -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <!-- <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>-->
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
    <!-- 顶部工具条 -->
    <v-toolbar app dark :color="dark ? 'secondary' : 'primary'">
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer=!drawer "/>
      <v-spacer/>
      <!-- 切换黑暗主题 -->
      <v-flex xs1>
        <v-switch :label="dark ? '暗黑' : '明亮'" v-model="dark" color="dark" hide-details/>
      </v-flex>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click.stop>
        <v-icon>account_box</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- 内容区 -->
    <v-content>
      <v-container>
        <!-- 导航 -->
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>
          <v-breadcrumbs-item>{{item2}}</v-breadcrumbs-item>
        </v-breadcrumbs>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- 页脚 -->
    <v-footer app>
      <v-flex text-xs-center xs12>
        &copy;{{ new Date().getFullYear() }}
        <strong>GX-POST</strong>
      </v-flex>
    </v-footer>
  </a-app>
</template>
<script>
import menus from "../router/meus.js";
export default {
 // name: 'App',
  data() {
    return {
      dark: false,
      drawer: true, //左侧导航是否隐藏
      miniVariant: false, // 左侧导航是否收起
      title: "后台管理系统",
      menuMap: {}
    };
  },
  computed: {
    items() {
      return menus;
    },
    item1() {
      const arr = this.$route.path.split("/");
      return this.menuMap[arr[1]].name;
    },
    item2() {
      const arr = this.$route.path.split("/");
      return this.menuMap[arr[1]][arr[2]];
    } 
  },
   name: 'App',
    watch: {},
  created() {
    menus.forEach(m => {
      const p1 = m.path.slice(1);
      this.menuMap[p1] = { name: m.title };
      m.items.forEach(i => {
        this.menuMap[p1][i.path.slice(1)] = i.title;
      });
    });
  }
};
</script>

<style scoped>
.box {
  width: 90%;
}
</style>
