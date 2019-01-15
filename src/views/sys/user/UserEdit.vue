<template>
  <v-form v-model="valid" ref="myForm">
    <v-text-field
      prepend-icon="person"
      label="登陆名*"
      v-model.trim="newData.loginName"
      required
      :rules="nameRules"
    ></v-text-field>
    <v-text-field
      prepend-icon="person"
      label="真实名*"
      v-model.trim="newData.realName"
      required
      :rules="nameRules"
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      label="密码*"
      v-model.trim="newData.password"
      required
      :rules="passwordRules"
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      label="确认密码*"
      v-model.trim="password2"
      required
      :rules="passwordRules"
    ></v-text-field>
    <v-text-field
      prepend-icon="phone"
      label="电话号码*"
      v-model.trim="newData.phone"
      required
      :rules="phoneRules"
    ></v-text-field>
    <!-- 单选按钮 -->
    <v-radio-group v-model.trim="newData.enableTag" :mandatory="false" required row label="用户是否启用">
      <v-radio label="启用" value="0" color="success"></v-radio>
      <v-radio label="禁用" value="1" color="warning"></v-radio>
    </v-radio-group>
    <!-- 多选按钮 -->
    <v-select
      v-model="newData.roles"
      :items="options"
      label="请点击选择分配角色"
      item-text="label"
      item-value="value"
      multiple
      small-chips
      persistent-hint
      required
    ></v-select>
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
      valid: false, // 表单校验结果标记
      newData: {
        loginName: "",
        realName: "",
        password: "",
        phone: "",
        avatar: "",
        enableTag: "",
        roles: []
      },
      options: [],
      password2: "",
      nameRules: [
        v => !!v || "用户名不能为空",
        v => v.length <= 20 || "用户名太长"
      ],
      passwordRules: [
        v => !!v || "密码不能为空",
        v => v.length <= 20 || "用户名太长"
      ],
      phoneRules: [
        v => !!v || "手机号码不能为空",
        v => v.length == 11 || "手机号码位数不对"
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
  mounted() {
    this.loadData().then(data => {
      this.options = data;
    });
  },
  computed: {},
  methods: {
    //加载角色选项
    loadData() {
      return new Promise(resolve => {
        this.$axios.get("upms/sys/role/all").then(resp => {
          console.log(resp.data);
          const data = [];
          for (let d of resp.data) {
            const node = {
              value: d.id,
              label: d.name
            };
            if (d.enableTag == 0) {
              data.push(node);
            }
          }
          console.log(data);
          resolve(data);
        });
      });
    },
    // remove(param) {
    //   this.roles = this.roles.filter(o => o.value !== param.value);
    // },
    initData() {
      (this.newData.loginName = ""),
        (this.newData.realName = ""),
        (this.newData.brandModel = ""),
        (this.newData.password = ""),
        (this.newData.phone = ""),
        (this.newData.avatar = ""),
        (this.newData.enableTag = ""),
        (this.password2 = "");
      this.roles = [];
    },
    clear() {
      // 重置表单
      this.$refs.myForm.reset();
      this.roles = [];
    },
    submit() {
      // if (this.$refs.myform.validate()) {
      // 定义一个请求参数对象，通过解构表达式来获取brand中的属性
      // const { categories, letter, ...params } = this.brand;
      // 数据库中只要保存分类的id即可，因此我们对categories的值进行处理,只保留id，并转为字符串
      //params.cids = categories.map(c => c.id).join(",");
      // 将数据提交到后台
      const { roles, ...params } = this.newData;
      //console.log(params2);
      if (!roles.length) {
        params.rids = roles.map(r => r.value).join(",");
      }

      //const params = this.$qs.stringify(params2);
      // console.log("p");
      // console.log(params);

      // const user2 = this.$qs.stringify(this.newData);
      // console.log(user2);
      //const rids = roles.map(r => r.value).join(",");
      //rids = this.$qs.stringify(rids);
      const ps = this.$qs.stringify(params);
      console.log(ps);
      this.$axios({
        method: this.editMark ? "put" : "post",
        url: "/upms/sys/user",
        data: ps
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
