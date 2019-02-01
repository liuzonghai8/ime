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
              <v-btn icon @click="deletedItem(item.id)">
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
        <v-treeview
          v-model="selectedRoles"
          :items="unPossessRoles"
          selectable
          selected-color="indigo"
        ></v-treeview>
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
      allRoles: [], //所有角色
      possessRoles: [], // 拥有角色
      selectedRoles: [] //选择的角色
    };
  },
  watch: {
    // user: {
    //   handle: function(val) {
    //     console.log("user Watch");
    //     //this.loadRole();
    //   }
    // }
  },
  computed: {
    //计算已拥有角色ID数组
    possessRolesArray() {
      return this.possessRoles.map(r => r.id).join(",");
    },
    unPossessRoles() {
      return this.allRoles.filter(r => !this.possessRolesArray.includes(r.id));
    }
  },
  mounted() {
    this.loadAllRoles();
    // this.loadRole();
    //this.selected = [];
    this.loadRole().then(data => {
      this.possessRoles = data;
      console.log(data);
    });
  },
  methods: {
    // 删除用户和角色关联 .delete("upms/sys/user/role/" + param.id) this.$qs.stringify(pams)
    deletedItem(param) {
      confirm("是否确定删除角色") &&
        this.$axios({
          method: "delete",
          url: "upms/sys/user/role",
          params: {
            uid: this.user.id,
            rid: param
          }
        })
          .then(() => {
            console.log("删除成功");
            this.loadRole();
          })
          .catch(() => {
            console.log("删除失败");
          });
    },
    //给用户分配角色
    submit() {
      console.log(this.selectedRoles);
      const { ...params } = null;
      params.rids = this.selectedRoles.map(r => r).join(","); //将数组转换成对象
      params.uid = this.user.id;
      // this.selectedRoles = []; //清空选择的
      console.log(this.user.id);
      console.log(params.rids);
      this.$axios({
        method: "post",
        url: "/upms/sys/user/role",
        data: this.$qs.stringify(params)
      })
        .then(resp => {
          console.log("保存成功");
          this.loadRole(); // 重新加载已经拥有的角色
          this.selectedRoles = []; //清空选择的
        })
        .catch(() => {
          console.log("保存失败");
        });
    },
    //加载角色选项
    loadAllRoles() {
      this.$axios.get("upms/sys/role/all").then(resp => {
        const data = [];
        //先过滤掉禁用的角色
        for (let d of resp.data) {
          if (d.enableTag == 0) {
            data.push(d);
          }
        }
        this.allRoles = data;
      });
    },
    // loadData() {
    //   return new Promise(resolve => {
    //     this.$axios.get("upms/sys/role/all").then(resp => {
    //       const data = [];
    //       resolve(data);
    //     });
    //   });
    // },
    //加载已有角色
    loadRole() {
      return new Promise(resolve => {
        this.$axios.get("upms/sys/role/user/" + this.user.id).then(resp => {
          console.log(resp);
          resolve(resp.data);
        });
      });

      //   this.$axios.get("upms/sys/role/user/" + this.user.id);
      // }).then(resp => {
      //   console.log(resp.data);
      //   resolve(resp.data);
      // });
      // this.$axios.get("upms/sys/role/user/" + this.user.id).then(resp => {
      //   this.possessRoles = resp.data;
      //   console.log(this.possessRoles);
      // });
    }
  }
};
</script>
