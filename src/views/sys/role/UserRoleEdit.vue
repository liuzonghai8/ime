<template>
  <div>
    <v-layout>拥有角色：
      <div v-for="(role, key) in roledata" :key="key">
        <v-chip close color="success" text-color="white">{{role}}</v-chip>
      </div>
    </v-layout>
    <v-divider color="red"></v-divider>
    <v-layout>未拥有角色：
      <div v-for="(role, key) in allRoles" :key="key">
        <v-checkbox :label="role.name" :value="role"></v-checkbox>
      </div>
      <br>
      <v-btn>添加</v-btn>
    </v-layout>
  </div>
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
      roledata: ["role1", "role2"],
      roles2: ["role3", "role4"],
      allRoles: [],
      selectRoles: []
    };
  },
  mounted() {
    // this.loadData().then(data => {
    //   this.allRoles = data;
    // });
    this.loadRole().then(data => {
      this.selectRoles = data;
    });
  },
  methods: {
    //加载角色选项
    loadData() {
      return new Promise(resolve => {
        this.$axios.get("upms/sys/role/all").then(resp => {
          const data = [];
          for (let d of resp.data) {
            if (d.enableTag == 0) {
              data.push(d);
            }
          }
          // console.log(data);
          resolve(data);
        });
      });
    },

    loadRole() {
      return new Promise(resolve => {
        console.log(this.user.id);
        this.$axios.get("upms/sys/role/user/" + this.user.id).then(resp => {
          console.log(resp.data);
          const data = [];
          for (let d of resp.data) {
            if (d.enableTag == 0) {
              data.push(d);
            }
          }
          // console.log(data);
          resolve(data);
        });
      });
    }
  }
};
</script>
