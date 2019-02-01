<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="text-center">系统登录</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    v-model.trim="username"
                    :rules="nameRules"
                    label="用户名"
                    type="text"
                  ></v-text-field>
                  <!--  placeholder="admin" -->
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    v-model.trim="password"
                    :rules="passwordRules"
                    label="密码"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (e1 = !e1)"
                    :type="e1 ? 'text' : 'password'"
                    placeholder="123456"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-spacer/> -->
                <v-btn style="width:100%;" color="primary" @click="handleLogin">登录</v-btn>
                <!-- <v-spacer/> -->
              </v-card-actions>
              <v-card-text>
                <span>请使用火狐、360、google、edge、IE11浏览器</span>
                <br>
                <span>不支持IE9、IE10等老版本的浏览器</span>
              </v-card-text>
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
    nameRules: [
      v => !!v || "用户名不能为空",
      v => v.length <= 10 || "用户名太长"
    ],
    password: "",
    passwordRules: [
      v => !!v || "密码不能为空",
      v => v.length >= 6 || "密码长度必须大于6"
    ],
    dialog: false,
    e1: false,
    message: "用户名和密码不能为空"
  }),
  methods: {
    handleLogin() {
      this.$store
        .dispatch("LoginByUsername", this.username, this.password)
        .then(() => {
          this.$router.push({ path: "/" }); //登录成功之后重定向到首页
        })
        .catch(err => {
          this.$message.error(err); //登录失败提示错误
        });

      // this.$router.push("/");
      // //Todo 从后台获取判断
      // if (this.username === "admin" && this.password === "123456") {
      //   this.$router.push("/");
      // } else {
      //   this.message = "用户名或密码错误";
      //   this.dialog = true;
      //   return false;
      // }
    }
  }
};
</script>



