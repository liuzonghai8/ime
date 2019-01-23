<template>
  <v-card class="px-2">
    <!-- 搜索条 -->
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleadd">新增角色</v-btn>
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
      class="elevation-1"
      rows-per-page-text="每页行数："
    >
      <template slot="items" slot-scope="props">
        <!-- <td class="text-xs-center">
          <v-checkbox v-model="props.selected"></v-checkbox>
           <td class="text-xs-center">{{ props.item.processingMethod }}</td>
        </td>-->
        <!-- <tr @click="props.expanded = !props.expanded"> -->
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.code }}</td>
        <td class="text-xs-center">{{ props.item.description}}</td>
        <td class="text-xs-center">{{ props.item.enableTag ==0 ? "启用" :"禁用" }}</td>
        <td class="text-xs-center">
          <v-btn icon @click="handleEdit(props.item)">
            <v-icon color="teal darken-1">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItem(props.item)">
            <v-icon color="deep-orange accent-4">delete</v-icon>
          </v-btn>
          <v-btn fab dark small color="teal" @click="handleAssignUsers(props.item)">用户</v-btn>
          <v-btn fab dark small color="purple">权限</v-btn>
        </td>
        <!-- </tr> -->
      </template>
    </v-data-table>
    <!-- 新增列表 弹框模式 v-on:addUser="addUserItem(user)" -->
    <v-dialog v-model="dialogShow" max-width="500px" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title v-if="roleMark">{{editMark ? '修改' : '新增'}}角色</v-toolbar-title>
          <v-toolbar-title v-if="userMark">角色选择用户</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-2" style="height:400px" v-if="roleMark">
          <RoleEdit :editMark="editMark" :oldData="oldData" v-on:show="closeDialog"/>
        </v-card-text>
        <v-card-text class="px-2" style="height:600px" v-if="userMark">
          <!-- <UserRoleEdit :user="user"></UserRoleEdit> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import RoleEdit from "./RoleEdit";
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
      roleMark: false, //角色标记
      userMark: false, //分配用户标记
      user: {},
      //数据表头,
      headers: [
        {
          text: "角色名称",
          align: "center",
          value: "name"
        },
        {
          text: "角色代码",
          align: "center",
          value: "code"
        },
        { text: "角色描述", align: "center", value: "description" },
        { text: "状态", align: "center", value: "enable_tag", sortable: false },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  components: {
    RoleEdit
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
      this.roleMark = false;
      this.userMark = false;
      this.getDataFromServer();
    },
    //关闭对话框
    closeDialog() {
      this.initData();
    },
    //添加按钮事件
    handleadd() {
      this.userMark = false;
      this.roleMark = true;
      this.editMark = false;
      this.oldData = {};
      this.dialogShow = true;
    },
    //编辑按钮事件
    handleEdit(params) {
      this.userMark = false;
      this.roleMark = true;
      this.oldData = params;
      this.editMark = true;
      this.dialogShow = true;
      console.log(this.oldData);
    },
    //给角色分配用户按钮
    handleAssignUsers(params) {
      this.roleMark = false;
      this.userMark = true;
      this.dialogShow = true;
      this.user = params;
    },

    //批量删除用户
    deleteItems() {
      //this.getTest();
    },
    //删除一个用户
    deleteItem(params) {
      //根据ID删除一条记录
      const id = params.id;
      console.log(id),
        confirm("删除角色同时也删除拥有该角色用户?") &&
          this.$axios.delete("upms/sys/role/" + id).then(() => {
            console.log("删除成功");
            this.getDataFromServer();
          });
    },
    //从后台获取数据
    getDataFromServer() {
      this.$axios
        .get("upms/sys/role/page", {
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
          // console.log(resp.data.msg),
          //if(resp.data.code===0){
          this.datas = resp.data.data.list;
          this.total = resp.data.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
          // }
        });
    }
  }
};
</script>



