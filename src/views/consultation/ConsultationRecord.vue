<template>
  <v-card>
    <!-- 搜索条 -->
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleadd">新增咨询记录</v-btn>
      <!-- <v-btn small color="error" @click="batchDeleteUser">批量删除</v-btn> -->
      <v-spacer/>
      <v-flex xs5>
        <v-text-field v-model.lazy="search" append-icon="search" label="输入关键字搜索" hide-details></v-text-field>
      </v-flex>
    </v-card-title>
    <v-divider/>
    <!-- 数据表格 -->
    <v-flex md12>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="datas"
        :pagination.sync="pagination"
        :total-items="total"
        :loading="loading"
        class="elevation-1"
        rows-per-page-text="每页行数："
        no-data-text="无数据"
      >
        <template slot="items" slot-scope="props">
          <!-- <td class="text-xs-center">
          <v-checkbox v-model="props.selected"></v-checkbox>
           <td class="text-xs-center">{{ props.item.processingMethod }}</td>
          </td>-->
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-center">{{ props.item.consultDate }}</td>
            <td class="text-xs-center">{{ props.item.problemDescription }}</td>
            <td class="text-xs-center">{{ props.item.consultDepartment }}</td>
            <!-- <td class="text-xs-center">{{ props.item.processingMethod }}</td>
        <td class="text-xs-center">{{ props.item.brandModel }}</td>
        <td class="text-xs-center">{{ props.item.systemPlatform }}</td>
        <td class="text-xs-center">{{ props.item.consultDepartment }}</td>
            <td class="text-xs-center">{{ props.item.recorder }}</td>-->
            <td class="text-xs-center">
              <v-btn icon @click="handleEdit(props.item)">
                <v-icon color="teal darken-1">edit</v-icon>
              </v-btn>
              <v-btn icon @click="deleteItem(props.item)">
                <v-icon color="deep-orange accent-4">delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat color="#B3E5FC">
            <v-flex xs12>
              <v-textarea
                label="处理方法："
                v-model="props.item.processingMethod"
                auto-grow
                rows="1"
                readonly
              ></v-textarea>
            </v-flex>
            <tr>
              <td>机型品牌：</td>
              <td class="text-xs-center">{{ props.item.brandModel }}</td>
              <td>系统平台：</td>
              <td class="text-xs-center">{{ props.item.systemPlatform }}</td>
              <td>记录人：</td>
              <td class="text-xs-center">{{ props.item.recorder }}</td>
            </tr>
            <v-flex row>
              <v-flex xs12 sm4>机型品牌：
                <v-label v-text="props.item.brandModel"/>
              </v-flex>
              <v-flex sm4>
                系统平台：
                <label v-text="props.item.systemPlatform"/>
              </v-flex>
              <v-flex sm4>记录人：
                <v-label v-text="props.item.recorder"/>
              </v-flex>
            </v-flex>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
    <!-- 新增列表 弹框模式 v-on:addUser="addUserItem(user)" -->
    <v-dialog v-model="dialogShow" max-width="500px" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{editMark ? '修改' : '新增'}}故障咨询记录</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-2" style="height:600px">
          <ConsultationRecordEdit :editMark="editMark" :oldData="oldData" v-on:show="closeDialog"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import ConsultationRecordEdit from "./ConsultationRecordEdit";
export default {
  props: {
    dark: Boolean
  },
  data() {
    return {
      search: "", //搜索关键字
      selected: [], //选择的条目
      total: 20, //总条数
      datas: [], //数据集合
      oldData: {}, //旧的数据
      loading: true, //加载进度条
      pagination: {}, //监听变化
      dialogShow: false, //显示对话框
      editMark: false, //编辑标记
      //数据表头,
      headers: [
        {
          text: "咨询日期",
          align: "center",
          value: "consult_date",
          sortable: false
        },
        {
          text: "故障问题描述",
          align: "center",
          value: "problem_description"
        },
        // },
        // {
        //   text: "处理方法",
        //   align: "center",
        //   sortable: false,
        //   value: "processingMethod"
        // },
        { text: "咨询单位", align: "center", value: "consult_department" },
        // {
        //   text: "系统平台",
        //   align: "center",
        //   value: "systemPlatform"
        // },
        // {
        //   text: "品牌机型",
        //   align: "center",
        //   value: "brandModel"
        // },
        // { text: "记录人", align: "center", value: "recorder" },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  components: {
    ConsultationRecordEdit
  },
  //计算属性：
  computed: {},

  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    pagination: {
      deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
      handler() {
        // 变化后的回调函数，这里我们再次调用getDataFromServer即可
        this.getDataFromServer();
      }
    },
    // 监视搜索字段
    search: {
      handler() {
        this.getDataFromServer();
      }
    }
  },
  //页面加载是钩子函数
  mounted() {
    this.getDataFromServer();
  },

  methods: {
    //数据初始化
    initData() {
      this.dialogShow = false;
      this.editMark = false;
      this.getDataFromServer();
    },
    //关闭对话框
    closeDialog() {
      this.initData();
    },
    //添加按钮事件
    handleadd() {
      (this.oldData = {}), (this.dialogShow = true);
    },
    //编辑用户按钮事件
    handleEdit(params) {
      this.oldData = params;
      this.editMark = true;
      this.dialogShow = true;
    },

    //批量删除用户
    deleteItems() {
      //this.getTest();
    },
    //删除一个用户
    deleteItem(params) {
      //根据ID删除一条记录
      const id = params.id;
      console.log(id);
      this.$axios.delete("consult/consult/" + id).then(() => {
        console.log("删除成功");
        this.getDataFromServer();
      });
    },
    //从后台获取数据
    getDataFromServer() {
      this.$axios
        .get("consult/consult/page", {
          params: {
            key: this.search, // 搜索条件
            page: this.pagination.page, // 当前页
            rows: this.pagination.rowsPerPage, // 每页大小
            sortBy: this.pagination.sortBy, // 排序字段
            desc: this.pagination.descending // 是否降序
          }
        })
        .then(resp => {
          // 成功后获取处理
          // console.log(resp);
          this.datas = resp.data.data.list;
          this.total = resp.data.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        });
    }
  }
};
</script>



