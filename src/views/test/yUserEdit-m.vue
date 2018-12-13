<template>
  <v-form ref="userform" v-model="valid">
    <!-- <v-text-field></v-text-field>
    <v-toolbar dense dark color="primary" class="text-xs-center">
      <v-toolbar-title>{{editMark ? '修改' : '新增'}}用户</v-toolbar-title>
    </v-toolbar>
    -->
    <v-flex xs12>
      <v-text-field label="用户名*" required v-model="userItem.name"></v-text-field>
    </v-flex>
    <v-flex xs12 v-if="isEdit">
      <v-text-field label="密码*" type="password" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm5>
      <v-select :items="['男', '女']" label="性别*" required v-model="userItem.sex"></v-select>
    </v-flex>
    <v-flex xs12 sm2/>
    <v-flex xs12 sm5>
      <v-select :items="['启动', '禁用']" label="状态*" required v-model="userItem.status"></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field label="手机号码*" v-model="userItem.phone" required></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        :items="['管理员', '库管员', 'Coding', 'Basejump']"
        label="分配角色"
        multiple
      ></v-autocomplete>
    </v-flex>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal darken-1" flat @click="handleclose">
        <v-icon>close</v-icon>放弃
      </v-btn>
      <v-btn color="teal darken-1" flat @click="handleAddUser">
        <v-icon>check</v-icon>提交
      </v-btn>
    </v-card-actions>-->
    <v-layout class="my-4" row>
      <v-spacer/>
      <v-btn color="teal darken-1" flat @click="handleAddUser">
        <v-icon>check</v-icon>提交
      </v-btn>
      <v-btn color="teal darken-1" flat @click="handleclose">
        <v-icon>close</v-icon>放弃
      </v-btn>
    </v-layout>
  </v-form>
</template>
<script>
export default {
  props: {
    editMark: {
      type: Boolean,
      requied: true
    },
    user: {
      type: Object,
      default() {
        return {
          name: "fff",
          sex: "ddd",
          status: "dd",
          phone: "ddd"
        };
      }
    }
  },
  data() {
    return {
      valid: ""
    };
  },
  watch: {},
  computed: {
    userItem() {
      return this.user;
    }
  },
  methods: {
    handleclose() {
      this.$emit("show");
    },
    handleAddUser() {
      console.log(this.userItem);
      this.$emit("addUser", this.userItem);
    }
  }
};
</script>
