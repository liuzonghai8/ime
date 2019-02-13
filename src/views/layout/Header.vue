<template>
  <v-toolbar app>
    <!-- 显示菜单按钮 -->
    <v-tooltip bottom>
      <v-btn scoped slot="activator" icon @click.stop="toggleDrawer">
        <v-icon v-text="drawer?'format_indent_decrease':'format_indent_increase'" :color="color"></v-icon>
      </v-btn>
      <span v-text="drawer?'隐藏菜单':'显示菜单'"></span>
    </v-tooltip>
    <!-- 面包肖 -->
    <!-- <v-breadcrumbs :items="subMenu">
      <v-icon scoped slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item>{{subMenu[1]}}</v-breadcrumbs-item>

      <v-breadcrumbs-item small>{{subMenu[2]}}</v-breadcrumbs-item>
    </v-breadcrumbs>-->
    <v-breadcrumbs :items="subMenu">
      <template slot="item" slot-scope="props">
        <a :href="props.item.path" :class="[props.item.disabled && 'disabled']">{{ props }}</a>
      </template>
    </v-breadcrumbs>
    <v-spacer/>
    <!-- 搜索 -->
    <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>-->
    <!-- 全屏按钮  compress  expand-->
    <v-tooltip bottom>
      <v-btn scoped slot="activator" icon @click="handleScreen(screen)">
        <v-icon large v-text="screen?'fullscreen_exit':'fullscreen'" :color="color"></v-icon>
      </v-btn>
      <span v-text="screen?'退出全屏':'全屏'"></span>
    </v-tooltip>
    <!-- 切换黑暗主题 -->
    <v-btn icon @click.stop="toggleDark">
      <v-icon medium :color="color">invert_colors</v-icon>
    </v-btn>

    <!-- 消息按钮 -->
    <v-badge overlap>
      <template scoped slot="badge">111</template>
      <v-icon medium :color="color">notifications</v-icon>
    </v-badge>

    <!-- <v-menu open-on-hover top offset-y>
      <v-btn slot="activator" dark icon>
        <v-icon medium>notifications</v-icon>
      </v-btn>
      <v-dadge>ddd</v-dadge> 
      <v-list>
        <v-list-tile>
          <v-list-tile-title>4444</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>-->
    <!-- 头像 -->
    <v-btn icon @click.stop>
      <v-icon>account_box</v-icon>
    </v-btn>
    <v-avatar>
      <img src="@/assets/1.jpeg" alt>
    </v-avatar>
  </v-toolbar>
</template>
<script>
import { fullscreenToggel } from "@/utils/util";
import { mapState, mapMutations } from "vuex";
export default {
  data () {
    return {
      screen: false, // 是否全屏
      menuMap: {}
    };
  },
  componentes: {},
  computed: {
    ...mapState('app', ['color', 'drawer', 'dark']),
    subMenu () {
      // const subpatch = this.$route.path.split("/");
      //如何根据路劲 获取菜单名称
      return this.$route.path.split("/");
    },
    subpatch () {
      return this.$route.path.split("/");
    }
  },
  methods: {
    ...mapMutations('app', [
      'toggleDrawer',
      'toggleDark'
    ]),
    handleScreen (param) {
      this.screen = !this.screen;
      fullscreenToggel(param);
    },
    // handleChangeTheme () {
    //   this.$emit("changeTheme");
    // },
    // handleChangeDrawer () {
    //   this.$emit("changeDrawer");
    // }
  }
};
</script>
