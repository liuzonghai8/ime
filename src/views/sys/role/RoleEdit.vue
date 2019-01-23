<template>
  <v-form v-model="valid" ref="myForm">
    <v-text-field prepend-icon="person" label="请输入角色名*" v-model="newData.name" required></v-text-field>
    <v-text-field prepend-icon="person" label="请输入角色代码*" v-model.trim="newData.code" required></v-text-field>
    <v-textarea
      prepend-icon="person"
      box
      label="请输入该角色的描述"
      auto-grow
      v-model.trim="newData.description"
      rows="1"
    ></v-textarea>
    <v-radio-group
      prepend-icon="person"
      v-model.trim="newData.enableTag"
      :mandatory="false"
      row
      label="请选择是否启用"
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
      valid: true,
      newData: {
        name: "",
        code: "",
        description: "",
        enableTag: ""
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
    oldData: {
      deep: true,
      handler: function(val) {
        console.log(val);
        if (val) {
          console.log(val);
          this.newData = Object.assign(val);
          console.log(this.newData);
        } else {
          this.initData();
        }
      }
    }
  },
  mounted() {
    console.log(this.oldData);
  },
  computed: {},
  methods: {
    initData() {
      (this.newData.name = ""),
        (this.newData.code = ""),
        (this.newData.description = ""),
        (this.newData.enableTag = "");
      //this.menus = []
    },
    clear() {
      // 重置表单
      this.$refs.myForm.reset();
    },
    submit() {
      // if (this.$refs.form.validate()) {
      // 定义一个请求参数对象，通过解构表达式来获取brand中的属性
      console.log(this.newData);
      const params = this.$qs.stringify(this.newData);
      console.log(params);
      this.$axios({
        method: this.editMark ? "put" : "post",
        url: "/upms/sys/role",
        data: params
      })
        .then(() => {
          // 关闭窗口
          this.$emit("show");
          // this.$message.success("保存成功！");
          console.log("保存成功");
        })
        .catch(() => {
          console.log(params);
          console.log("保存失败");
        });
    }
    //}
  }
};
</script>
