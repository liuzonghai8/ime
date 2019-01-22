<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 md5>
        <v-card-title>
          <span class="title font-weight-light">已有角色</span>
        </v-card-title>
        <v-list>
          <template v-for="(item, index) in possessRoles">
            <v-list-tile :key="index">
              <v-chip color="success" text-color="white">{{item.name}}</v-chip>
              <v-btn icon @click="deletedItem(item)">
                <v-icon color="deep-orange accent-4">close</v-icon>
              </v-btn>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-spacer/>
      <v-flex xs12 md5>
        <v-card-title>
          <span class="title font-weight-light">待选角色</span>
        </v-card-title>

        <v-list>
          <template v-for="(item, index) in allRoles">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-checkbox v-model="roles" :label="item.name" :value="item"></v-checkbox>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-layout class="my-2" row>
          <v-spacer/>
          <v-btn @click="submit" color="primary">添加</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      requied: true
    }
  },
  data() {
    return {
      allRoles: [],
      possessRoles: [],
      roles: [],
      sware: 0
    };
  },
  watch: {
    sware: {
      deep: true,
      handler() {
        this.initData();
      }
    }
    // user: {
    //   deep: true,
    //   handler() {
    //     this.initData();
    //   }
    // }
  },
  computed: {
    unselected() {
      return this.allRoles.filter(r => !this.possessRoles.includes(r));
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loadData();
      this.loadRole();
    },
    // 删除用户和角色关联 .delete("upms/sys/user/role/" + param.id) this.$qs.stringify(pams)
    deletedItem(param) {
      console.log(param.id);
      console.log(this.user.id);
      const { ...pams } = null;
      pams.uid = this.user.id;
      pams.rid = param.id;
      confirm("是否确定删除用户") &&
        this.$axios({
          method: "delete",
          url: "upms/sys/user/role",
          params: this.$qs.stringify(pams)
        }).then(() => {
          //sware = sware - 1;
          console.log("删除成功");
          this.initData();
        });
    },
    //给用户分配角色
    submit() {
      const { ...params } = null;
      params.rids = this.roles.map(r => r.id).join(",");
      params.uid = this.user.id;
      this.$axios({
        method: "post",
        url: "/upms/sys/user/role",
        data: this.$qs.stringify(params)
      })
        .then(resp => {
          console.log("保存成功");
          this.initData();
        })
        .catch(() => {
          console.log("保存失败");
        });
    },
    //加载角色选项
    loadData() {
      this.$axios.get("upms/sys/role/all").then(resp => {
        const data = [];
        for (let d of resp.data) {
          if (d.enableTag == 0) {
            data.push(d);
          }
        }
        this.allRoles = data;
      });
    },
    //加载已有角色
    loadRole() {
      this.$axios.get("upms/sys/role/user/" + this.user.id).then(resp => {
        this.possessRoles = resp.data;
      });
    }
  }
};
</script>
