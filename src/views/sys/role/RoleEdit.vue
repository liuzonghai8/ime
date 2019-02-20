<template>
  <v-form v-model="valid" ref="roleFrom">
    <v-text-field
      prepend-icon="person"
      label="请输入角色名*"
      v-model.trim="newData.name"
      required
      clearable
      validate-on-blur
      :rules="nameRules"
      counter
    ></v-text-field>
    <v-text-field
      prepend-icon="person"
      label="请输入角色代码*"
      v-model.trim="newData.code"
      required
      validate-on-blur
      :rules="nameRules"
    ></v-text-field>
    <v-textarea
      prepend-icon="person"
      box
      label="请输入该角色的描述"
      auto-grow
      v-model.trim="newData.description"
      validate-on-blur
      rows="1"
      :rules="nameRules"
    ></v-textarea>
    <v-radio-group
      prepend-icon="person"
      v-model.trim="newData.enableTag"
      :mandatory="false"
      row
      label="请选择是否启用"
      :rules="statusRules"
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
  name: "role-from",
  props: {
    editMark: {
      type: Boolean,
      requied: true
    },
    roleId: {
      type: Number
    }
  },
  data () {
    return {
      valid: true,// 表单校验结果标记
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
      statusRules: [v => !!v || "必须选择"],
    };
  },
  watch: {
    // 深度 watcher模式
    roleId: {
      handler: function (val) {
        if (val) {
          //console.log(val)
          //根据Id从服务器查询角色
          this.loadRole()
        } else {
          this.initData();
          // console.log("ddd")
        }
      },
      deep: true,
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    initData () {
      (this.newData.name = ""),
        (this.newData.code = ""),
        (this.newData.description = ""),
        (this.newData.enableTag = "");
    },
    clear () {
      // 重置表单
      this.$refs.roleFrom.reset();
    },
    submit () {
      if (this.$refs.roleFrom.validate()) {
        this.$axios({
          method: this.editMark ? "put" : "post",
          url: "/upms/sys/role",
          data: this.$qs.stringify(this.newData)
        })
          .then(() => {
            //新清空表单
            this.initData();
            // 关闭窗口
            this.$emit("show");
            // this.$message.success("保存成功！");
            console.log("保存成功");
          })
          .catch(() => {
            console.log("保存失败");
          });
      }
    },
    //从服务器查询角色
    loadRole () {
      this.$axios("/upms/sys/role/" + this.roleId)
        .then((resp) => {
          this.newData = resp.data
        })
    }
  }
};
</script>
