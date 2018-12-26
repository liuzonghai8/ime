<template>
  <v-card>
    <!-- <v-layout align-center justify-center> -->
    <v-toolbar dense dark color="primary" class="text-xs-center">
      <v-toolbar-title>{{editMark ? '修改' : '新增'}}故障咨询记录</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout wrap>
          <v-flex xs12>
            <v-textarea
              box
              label="问题描述"
              auto-grow
              v-model="consultrecord.problemDescription"
              rows="1"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field label="咨询单位*" v-model="consultrecord.consultDepartment" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm2/>
          <v-flex xs12 sm5>
            <v-text-field label="咨询人*" v-model="consultrecord.Consultant" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm5>
            <v-select
              :items="['怡化','日立','NDT3020','NDT3260','NCR25','NCR35']"
              label="品牌机型*"
              v-model="consultrecord.brandModel"
              required
            ></v-select>
            <!-- <v-text-field label="品牌机型*" v-model="consultrecord.brandModel" required></v-text-field> -->
          </v-flex>
          <v-flex xs12 sm2/>
          <v-flex xs12 sm5>
            <v-select
              :items="['Linux', 'Windows跨平台', 'Windows非跨平台']"
              label="系统平台*"
              v-model="consultrecord.systemPlatform"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              box
              label="处理方法"
              auto-grow
              v-model="consultrecord.processingMethod"
              rows="1"
            ></v-textarea>
          </v-flex>
          <!-- 日期选择 -->
          <v-flex xs12 sm3>
            <v-menu
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="consultrecord.consultDate"
                label="咨询日期"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="consultrecord.consultDate" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm1/>
          <v-flex xs12 sm3>
            <v-text-field label="记录日期*" :value="date" readonly></v-text-field>
          </v-flex>
          <v-flex xs12 sm1/>
          <v-flex xs12 sm3>
            <v-text-field label="记录人" value="当前用户" readonly></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
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
      consultrecord: {
        problemDescription: "",
        systemPlatform: "",
        brandModel: "",
        consultDepartment: "",
        Consultant: "",
        consultDate: "",
        processingMethod: "",
        recordDate: "",
        recorder: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false

      //   nameRules: [
      //     v => !!v || "用户名不能为空",
      //     v => v.length <= 20 || "用户名太长"
      //   ],
      //   passwordRules: [
      //     v => !!v || "密码不能为空",
      //     v => v.length <= 20 || "用户名太长"
      //   ],
      //   sexRules: [v => !!v || "必须选择"],
      //   statusRules: [v => !!v || "必须选择"],
      //   phoneRules: [
      //     v => !!v || "手机号码不能为空",
      //     v => v.length == 11 || "手机号码位数不对"
      //   ]
    };
  },
  watch: {
    // 深度 watcher模式
    oldData: {
      handler: function(val) {
        if (val) {
          this.consultrecord = Object.deepCopy(val);
          console.log(this.consultrecord);
        } else {
          this.consultrecord = {
            problemDescription: "",
            systemPlatform: "",
            brandModel: "",
            consultDepartment: "",
            Consultant: "",
            consultDate: "",
            processingMethod: "",
            recordDate: this.date,
            recorder: ""
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
    initData() {
      (this.problemDescription = ""),
        (this.systemPlatform = ""),
        (this.brandModel = ""),
        (this.consultDepartment = ""),
        (this.Consultant = ""),
        (this.consultDate = ""),
        (this.processingMethod = ""),
        (this.recordDate = this.date),
        (this.recorder = "当前登录用户");
    },
    handleclose() {
      this.$refs.form.reset;
      this.initData();
      this.$emit("show");
    },
    handleAddItem() {
      if (this.$refs.form.validate()) {
        //this.$emit("addItem", this.consultrecord);
        // 定义一个请求参数对象，通过解构表达式来获取brand中的属性
        // const { categories, letter, ...params } = this.brand;
        // 数据库中只要保存分类的id即可，因此我们对categories的值进行处理,只保留id，并转为字符串
        //params.cids = categories.map(c => c.id).join(",");
        // 将字母都处理为大写
        //params.letter = letter.toUpperCase();
        // 将数据提交到后台
        // this.$http.post('/item/brand', this.$qs.stringify(params))
        this.consultrecord.recordDate = this.date;
        console.log(this.consultrecord);
        this.$axios({
          method: this.isEdit ? "put" : "post",
          url: "/consult/consult",
          data: this.consultrecord //this.$qs.stringify(this.consultrecord)
        })
          .then(() => {
            // 关闭窗口
            this.$emit("show");
            this.$message.success("保存成功！");
          })
          .catch(() => {
            this.$message.error("保存失败！");
          });
      }
    }
  }
};
</script>
