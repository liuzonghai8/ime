<template>
  <v-card>
    <v-form>
      <!-- <v-layout align-center justify-center> -->
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>{{editMark ? '修改' : '新增'}}角色</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field prepend-icon="person" label="角色名*" v-model.trim="newData.name" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field prepend-icon="person" label="角色代码*" v-model.trim="newData.code" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea box label="描述" auto-grow v-model="newData.description" rows="1"></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-radio-group v-model.trim="newData.enableTag" :mandatory="false" row label="是否启用">
              <v-radio label="启用" value="0" color="success"></v-radio>
              <v-radio label="禁用" value="1" color="warning"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" flat @click="handleclose">
          <v-icon>close</v-icon>放弃
        </v-btn>
        <v-btn color="teal darken-1" flat @click="handleAddItem">
          <v-icon>check</v-icon>提交
        </v-btn>
      </v-card-actions>
    </v-form>
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
       // menus:[]
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
      handler: function(val) {
        if (val) {
          this.newData = Object.assign(val);
          console.log(this.newData);
        }else{
          this.initData()
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    initData() {
      (this.newData.name = ""),
        (this.newData.code = ""),
        (this.newData.description = ""),
        (this.newData.enableTag = "")
        //this.menus = []
    },
    handleclose() {
      //this.$refs.form.reset;
      this.initData();
      this.$emit("show");
    },
    handleAddItem() {
      // if (this.$refs.form.validate()) {
      // 定义一个请求参数对象，通过解构表达式来获取brand中的属性
      // const { categories, letter, ...params } = this.brand;
      // 数据库中只要保存分类的id即可，因此我们对categories的值进行处理,只保留id，并转为字符串
      //params.cids = categories.map(c => c.id).join(",");
      // 将数据提交到后台
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
