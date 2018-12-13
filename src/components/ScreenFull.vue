 <template>
  <v-tooltip bottom>
    <!-- <v-btn slot="activator" icon @click="handleScreen(screen)">
      <v-icon
        v-text="screen?'fas fa-compress':'fas fa-expand-arrows-alt'"
      ></v-icon>
    </v-btn> -->
    <v-btn>hell</v-btn>
    <span v-text="screen?'退出全屏':'全屏'"></span>
  </v-tooltip>
  <!--  :color="teme ? 'secondary' : 'primary'" -->
</template>

 <script>
import { fullscreenToggel } from "@/util/util";
export default {
  props: {
    teme: Boolean
  },
  data() {
    return {
      screes: false // 是否全屏
    };
  },
  methods: {
    handleScreen(param) {
      this.screen = !this.screen;
      fullscreenToggel(param);
    }
  }
};
</script>
 
 <style>
</style>