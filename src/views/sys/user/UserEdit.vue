<template>
  <v-form v-model="valid" ref="myForm">
    <v-text-field
      prepend-icon="person"
      label="请输入登陆名*"
      v-model.trim="newData.loginName"
      required
      clearable
      :rules="nameRules"
      validate-on-blur
      counter
    ></v-text-field>
    <v-text-field
      prepend-icon="person"
      label="请输入真实名*"
      v-model.trim="newData.realName"
      required
      :rules="nameRules"
      validate-on-blur
      clearable
      counter
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      label="请输入密码*"
      v-model.trim="newData.password"
      required
      :rules="passwordRules"
      validate-on-blur
      clearable
      counter
    ></v-text-field>
    <!-- 如何设备加条件判断两次的密码是否相同 -->
    <v-text-field
      prepend-icon="lock"
      label="请再次输入密码*"
      v-model.trim="password2"
      required
      clearable
      counter
      validate-on-blur
      :rules="passwordRules"
    ></v-text-field>
    <v-text-field
      prepend-icon="phone"
      label="请输入11位手机号码*"
      v-model.trim="newData.phone"
      required
      clearable
      :rules="phoneRules"
      validate-on-blur
      counter="11"
    ></v-text-field>
    <!-- 单选按钮 TODO 如何设备默认值-->
    <v-radio-group
      row
      label="请选择是否启用"
      v-model.trim="newData.enableTag"
      :mandatory="false"
      required
      :rules="[v => !!v || 'Item is required']"
    >
      <v-radio label="启用" value="0" color="success"></v-radio>
      <v-radio label="禁用" value="1" color="warning"></v-radio>
    </v-radio-group>
    <v-layout class="my-2" row>
      <v-btn @click="clear">重置</v-btn>
      <v-spacer/>
      <v-btn @click="submit" color="primary">提交</v-btn>
    </v-layout>
  </v-form>
</template>
<script>
export default {
  name: "user-from",
  props: {
    editMark: {
      type: Boolean,
      requied: true
    },
    oldData: {
      type: Object
    }
  },
  data() {
    return {
      valid: true, // 表单校验结果标记
      newData: {
        loginName: "",
        realName: "",
        password: "",
        phone: "",
        avatar: "",
        enableTag: ""
      },
      options: [],
      password2: "",
      nameRules: [
        v => !!v || "用户名不能为空",
        v => (v && v.length <= 20) || "用户名太长"
      ],
      passwordRules: [
        v => !!v || "密码不能为空",
        v => (v && v.length <= 20) || "用户名太长"
      ],
      phoneRules: [
        v => !!v || "手机号码不能为空",
        v => (v && v.length == 11) || "手机号码位数不对"
      ]
    };
  },
  watch: {
    // 深度 watcher模式
    oldData: {
      handler: function(val) {
        if (val) {
          this.newData = Object.assign(val);
        } else {
          this.initData();
        }
      },
      deep: true
    }
  },
  //页面加载钩子函数
  mounted() {},
  computed: {},
  methods: {
    initData() {
      (this.newData.loginName = ""),
        (this.newData.realName = ""),
        (this.newData.brandModel = ""),
        (this.newData.password = ""),
        (this.newData.phone = ""),
        (this.newData.avatar = ""),
        (this.newData.enableTag = ""),
        (this.password2 = "");
    },
    clear() {
      // 重置表单
      this.$refs.myForm.reset();
    },
    submit() {
      if (this.$refs.myForm.validate()) {
        // 将数据提交到后台 通过editMark 判断是添加还是修改
        this.$axios({
          method: this.editMark ? "put" : "post",
          url: "/upms/sys/user",
          data: this.$qs.stringify(this.newData)
        })
          .then(() => {
            // 关闭窗口
            this.$emit("show");
            this.$message.success("保存成功！");
            console.log("保存成功");
          })
          .catch(() => {
            this.$message("保存失败");
            console.log("保存失败");
          });
      }
    }
  }
};
</script>
