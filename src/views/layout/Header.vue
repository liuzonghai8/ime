<template>
  <v-toolbar app>
    <!-- 隐藏左侧菜单的按钮-->
    <!-- <v-toolbar-side-icon @click.stop="handleChangeDrawer "/> 
    "drawer?'fas fa-arrow-to-left':'fas fa-angle-double-right'"
    -->
    <v-tooltip bottom>
      <v-btn scoped slot="activator" icon @click.stop="handleChangeDrawer">
        <v-icon large
          v-text="drawer?'format_indent_decrease':'format_indent_increase'"
          :color="dark ? 'secondary' : 'primary'"
        ></v-icon>
      </v-btn>
      <span v-text="drawer?'隐藏菜单':'显示菜单'"></span>
    </v-tooltip>
    <!-- 面包肖 -->
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item>{{subMenu[1]}}</v-breadcrumbs-item>

      <v-breadcrumbs-item small>{{subMenu[2]}}</v-breadcrumbs-item>
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
    <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>-->
    <!-- 全屏按钮  compress  expand-->
    <v-tooltip bottom>
      <v-btn slot="activator" icon @click="handleScreen(screen)">
        <v-icon x-large
          v-text="screen?'fullscreen_exit':'fullscreen'"
          :color="dark ? 'secondary' : 'primary'"
        ></v-icon>
      </v-btn>
      <span v-text="screen?'退出全屏':'全屏'"></span>
    </v-tooltip>
    <!-- 切换黑暗主题 -->
    <v-btn icon @click.stop="handleChangeTheme">
      <v-icon large :color="dark ? 'secondary' : 'primary'">invert_colors</v-icon>
    </v-btn>
    <!-- 头像 -->
    <v-btn icon @click.stop>
      <v-icon>account_box</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
import { fullscreenToggel } from "@/util/util";
export default {
  props: {
    drawer: Boolean,
    dark: Boolean
  },
  data() {
    return {
      screen: false, // 是否全屏
      menuMap: {}
    };
  },
  componentes:{
  },
  computed: {
    subMenu() {
      // const subpatch = this.$route.path.split("/");
      //如何根据路劲 获取菜单名称
      return this.$route.path.split("/");
    },
    subpatch() {
      return this.$route.path.split("/");
    }
  },
  methods: {
    handleScreen(param) {
      this.screen = !this.screen;
      fullscreenToggel(param);
    },
    handleChangeTheme() {
      this.$emit("changeTheme");
    },
    handleChangeDrawer() {
      this.$emit("changeDrawer");
    }
  }
};
</script>
