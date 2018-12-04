<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title>系统登录</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" label="用户名" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    v-model="password"
                    label="密码"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'text' : 'password'"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-spacer/>
                <v-btn
                  style="width:100%;margin-bottom:30px;"
                  color="primary"
                  @click="handleLogin"
                >登录</v-btn>
                <v-spacer/>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="300px">
      <!-- <v-alert icon="warning" color="error" :value="true">{{message}}</v-alert> -->
      <v-card>
        <v-card-title class="error">错误信息提示</v-card-title>
        <v-card-text>{{message}}</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    dialog: false,
    e1: false,
    message: "用户名和密码不能为空"
  }),
  methods: {
    handleLogin() {
      // if (!this.username) {
      //   this.message = "用户名不能为空！";
      //   this.dialog = true;
      //   return false;
      // }
      // if (!this.password) {
      //   this.message = "密码不能为空！";
      //   this.dialog = true;
      //   return false;
      // }
      this.$router.push("/");
      //Todo 从后台获取判断
      if (this.username === "admin" && this.password === "123456") {
        this.$router.push("/");
      } else {
        this.message = "用户名或密码错误";
        this.dialog = true;
        return false;
      }
    }
  }
};
</script>


