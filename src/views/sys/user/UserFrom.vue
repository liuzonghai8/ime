<template>
  <v-card>
    <!-- <v-form ref="form" v-model="valid" > -->
      <v-toolbar dense dark color="primary" class="text-xs-center">
        <v-toolbar-title>{{isEdit ? '修改' : '新增'}}用户</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="用户名*" required v-model="user.name"></v-text-field>
            </v-flex>
            <v-flex xs12 v-if="isEdit">
              <v-text-field label="密码*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm5>
               <v-select
                  :items="['男', '女']"
                  label="性别*"
                  required
                  v-model="user.sex"
                ></v-select>
            </v-flex>
            <v-flex xs12 sm2/>
             <v-flex xs12 sm5>
               <v-select
                  :items="['启动', '禁用']"
                  label="状态*"
                  required
                  v-model="user.status"
                ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="手机号码*" v-model="user.phone" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                :items="['管理员', '库管员', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="分配角色"
                multiple
              ></v-autocomplete>
            </v-flex>
          </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" flat @click="handleclose">
          <v-icon>close</v-icon>放弃
        </v-btn>
        <v-btn color="teal darken-1" flat @click="handleclose">
          <v-icon>update</v-icon>提交
        </v-btn>
      </v-card-actions>
    <!-- </v-form> -->
  </v-card>
</template>
<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      requied: true
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      valid: ""
    };
  },
  watch: {
  },
  methods: {
    handleclose() {
      this.$emit("show");
    }
  }
};
</script>
