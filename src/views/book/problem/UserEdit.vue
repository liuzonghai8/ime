<template>
  <v-card>
    <!-- <v-layout align-center justify-center> -->
    <v-toolbar dense dark color="primary" class="text-xs-center">
      <v-toolbar-title>{{editMark ? '修改' : '新增'}}用户</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <!-- <v-from > -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="用户名*" v-model="user.name " :rules="nameRules" required></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="!editMark">
            <v-text-field
              label="密码*"
              type="password"
              v-model="user.password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-flex>
          <!-- <v-layout row> -->
          <v-flex xs12 sm5>
            <v-select :items="['男', '女']" label="性别*" v-model="user.sex" :rules="sexRules" required></v-select>
          </v-flex>
          <v-flex xs12 sm2/>
          <v-flex xs12 sm5>
            <v-select
              :items="['启动', '禁用']"
              label="状态*"
              v-model="user.status"
              :rules="statusRules"
              required
            ></v-select>
          </v-flex>
          <!-- </v-layout> -->
          <v-flex xs12>
            <v-text-field label="手机号码*" v-model="user.phone" :rules="phoneRules" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              :items="['管理员', '库管员',  'Writing', 'Coding', 'Basejump']"
              label="分配角色"
              multiple
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-form>
      <!-- </v-from> -->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal darken-1" flat @click="handleclose">
        <v-icon>close</v-icon>放弃
      </v-btn>
      <v-btn color="teal darken-1" flat @click="handleAddUser">
        <v-icon>check</v-icon>提交
      </v-btn>
    </v-card-actions>

    <!-- </v-layout> -->
  </v-card>
</template>
<script>
export default {
  props: {
    editMark: {
      type: Boolean,
      requied: true
    },
    oldUser: {
      type: Object
    }
  },
  data() {
    return {
      valid: true,
      user: {
        name: "",
        password: "",
        sex: "",
        status: "",
        phone: "",
        roles: []
      },
      nameRules: [
        v => !!v || "用户名不能为空",
        v => v.length <= 20 || "用户名太长"
      ],
      passwordRules: [
        v => !!v || "密码不能为空",
        v => v.length <= 20 || "用户名太长"
      ],
      sexRules: [v => !!v || "必须选择"],
      statusRules: [v => !!v || "必须选择"],
      phoneRules: [
        v => !!v || "手机号码不能为空",
        v => v.length == 11 || "手机号码位数不对"
      ]
    };
  },
  watch: {
    // 深度 watcher模式
    oldUser: {
      handler: function (val) {
        if (val) {
        console.log(val)
          console.log(Object.deepCopy(val))
        } else {
          this.user = {
            name: "",
            password: "",
            sex: "",
            status: "",
            phone: "",
            roles: []
          };
        }
      },
      deep: true
    }
  },
  computed: {
    // userItem() {
    //   return this.user;
    // }
  },
  methods: {
    handleclose() {
      this.$refs.form.reset
      this.$emit("show");
    },
    handleAddUser() {
      if (this.$refs.form.validate()) {
        console.log(this.user);
        this.$emit("addUser", this.user);
      }
    }
  }
};
</script>
