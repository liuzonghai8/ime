<template>
  <v-card class="px-2">
    <!-- 搜索条 -->
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleadd">新增用户</v-btn>
      <!-- <v-btn small color="error" @click="batchDeleteUser">批量删除</v-btn> -->
      <v-spacer/>
      <v-flex xs5>
        <v-text-field v-model.lazy="search" append-icon="search" label="输入关键字搜索" hide-details></v-text-field>
      </v-flex>
    </v-card-title>
    <v-divider/>
    <!-- 数据表格 -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="datas"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"
      item-key="id"
      select-all
      class="elevation-2"
      rows-per-page-text="每页行数："
      :rows-per-page-items="pagesnum"
      no-data-text="无数据"
    >
      <!--  -->
      <template slot="items" slot-scope="props">
        <!-- <tr @click="props.expanded = !props.expanded"> -->
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.loginName }}</td>
        <td class="text-xs-center">{{ props.item.realName }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">{{ props.item.enableTag ==0 ? "启用" :"禁用" }}</td>
        <td class="text-xs-center">
          <v-btn icon @click="handleEdit(props.item.id)">
            <v-icon color="teal darken-1">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItem(props.item)">
            <v-icon color="deep-orange accent-4">delete</v-icon>
          </v-btn>
          <v-btn fab dark small color="teal" @click="handleRole(props.item)">角色</v-btn>
        </td>
        <!-- </tr> -->
      </template>
      <!-- <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>角色 {{props.item.id}}</v-card-text>
        </v-card>
      </template>-->
    </v-data-table>
    <!-- 新增列表 弹框模式 v-on:addUser="addUserItem(user)"  v-if="dialogShow"-->
    <v-dialog v-model="dialogShow" max-width="500px" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{editMark ? '修改' : '新增'}}用户</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-2" style="height:600px">
          <UserEdit :editMark="editMark" :userId="userId" v-on:show="closeDialog"/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 分配角色对话框 -->
    <v-dialog v-model="dialogShow2" max-width="600px" persistent scrollable v-if="dialogShow2">
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>给{{this.user.loginName}} 用户分配角色</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-2">
          <UserRole :user="user"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import UserEdit from "./UserEdit";
import UserRole from "./UserRole";
export default {
  props: {
    dark: Boolean
  },
  data () {
    return {
      search: "", //搜索关键字
      selected: [], //选择的条目
      total: 20, //总条数
      datas: [], //数据集合
      // oldData: {}, //旧的数据
      loading: true, //加载进度条
      pagination: {}, //监听变化
      dialogShow: false, //显示new 对话框
      dialogShow2: false, //显示 add role对话框
      editMark: false, //编辑标记
      userId: 0,
      user: {},
      pagesnum: [
        10,
        20,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      //数据表头,
      headers: [
        {
          text: "登陆用户名",
          value: "login_name"
        },
        {
          text: "真名",
          align: "center",
          value: "real_name"
        },
        { text: "电话", align: "center", value: "phone" },
        { text: "状态", align: "center", value: "enable_tag", sortable: false },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  components: {
    UserEdit,
    UserRole
  },
  //计算属性：
  computed: {},

  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    pagination: {
      deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
      handler () {
        // 变化后的回调函数，这里我们再次调用getDataFromServer即可
        this.getDataFromServer();
      }
    },
    // 监视搜索字段
    search: {
      handler () {
        this.getDataFromServer();
      }
    }
  },
  //页面加载是钩子函数
  mounted () {
    this.getDataFromServer();
  },

  methods: {
    //数据初始化

    initData () {
      this.dialogShow = false;
      this.dialogShow2 = false;
      this.editMark = false;
      // this.roleMark = false;
      // this.userMark = false;
      //this.oldData = {};
      this.userId = 0;
      this.getDataFromServer();
    },
    //关闭对话框
    closeDialog () {
      this.initData();
    },
    //user添加按钮事件
    handleadd () {
      this.editMark = false;
      this.dialogShow = true;
      this.dialogShow2 = false;
    },
    //编辑用户按钮事件
    handleEdit (params) {
      //this.oldData = params;
      this.userId = params;
      this.editMark = true;
      this.dialogShow = true;
      this.dialogShow2 = false;
      //console.log(params);
    },
    //分配角色按钮
    handleRole (params) {
      this.editMark = false;
      this.dialogShow2 = true;
      this.dialogShow = false;
      this.user = params;
    },

    //批量删除用户
    deleteItems () {
      //this.getTest();
    },
    //删除一个用户
    deleteItem (params) {
      //根据ID删除一条记录
      const id = params.id;
      console.log(id),
        confirm("是否确定删除用户") &&
        this.$axios.delete("upms/sys/user/" + id).then(() => {
          console.log("删除成功");
          this.getDataFromServer();
        });
    },
    //从后台获取数据
    getDataFromServer () {
      this.$axios
        .get("upms/sys/user/page", {
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
          this.datas = resp.data.list;
          this.total = resp.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        });
    }
  }
}
</script>



