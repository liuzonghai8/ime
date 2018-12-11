<template>
  <v-app :dark="dark">
    <!-- 导航栏 fixed  permanent-->
    <v-navigation-drawer
      :dark="dark"
      :mini-variant.sync="miniNav"
      v-model="drawer"
      enable-resize-watcher
      fixed
      width="200"
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0" dense>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!-- 公司LOGO -->
              <img src="../assets/1.jpeg">
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
          v-model="item.active"
          v-for="item in items"
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
    <!-- 顶部工具条 -->
    <v-toolbar app>
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer=!drawer "/>
      <!-- 面包肖 -->
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>
        <v-breadcrumbs-item small>{{item2}}</v-breadcrumbs-item>
      </v-breadcrumbs>

      <!-- <v-breadcrumbs :items="items">
        <template slot="item" slot-scope="props">
          <a
            :href="props.item.path"
            :class="[props.item.disabled && 'disabled']"
          >{{ props.item.title }}</a>
        </template>
      </v-breadcrumbs>-->
      <v-spacer/>
      <!-- 搜索 -->
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <!-- 全屏按钮 -->
      <v-tooltip bottom>
        <v-btn slot="activator" icon @click="handleScreen(screen)">
          <v-icon v-text="screen?'fas fa-asterisk':'fas fa-expand'"></v-icon>
        </v-btn>
        <span v-text="screen?'退出全屏':'全屏'"></span>
      </v-tooltip>
      <!-- 切换黑暗主题 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <!-- 头像 -->
      <v-btn icon @click.stop>
        <v-icon>account_box</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- 内容区 -->
    <v-content>
      <div>
        <router-view></router-view>
      </div>
    </v-content>
    <!-- 页脚 -->
    <v-footer app>
      <v-flex text-xs-center xs12>
        &copy;{{ new Date().getFullYear() }}
        <strong>GX-POST</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>
<script>
import menus from "../router/meus.js";
import { fullscreenToggel } from "../util/util";
export default {
  name: "app",
  data() {
    return {
      dark: false,
      drawer: true, //左侧导航是否隐藏
      miniNav: false, // 左侧导航是否收起
      title: "后台管理系统",
      menuMap: {},
      screen: false
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
  watch: {},
  created() {
    menus.forEach(m => {
      const p1 = m.path.slice(1);
      this.menuMap[p1] = { name: m.title };
      m.items.forEach(i => {
        this.menuMap[p1][i.path.slice(1)] = i.title;
      });
    });
  },
  methods: {
    handleScreen(param) {
      this.screen = !this.screen;
      fullscreenToggel(param);
    }
  }
  // },
  // mounted() {
  //   listenfullscreen(this.setScreen);
  // },
};
</script>

<style scoped>
.box {
  width: 90%;
}
</style>
