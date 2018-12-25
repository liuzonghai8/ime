<template>
  <v-card>
    <!-- 搜索条 -->
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleaddUser">新增问题</v-btn>
      <v-btn small color="error" @click="batchDeleteUser">批量删除</v-btn>
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
      :items="problems"
      :pagination.sync="pagination"
      :total-items="totalUsers"
      :loading="loading"
      class="elevation-1"
      rows-per-page-text="每页行数："
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">
          <!--class="text-xs-center">align="center"  background-color="#0FF00"  > -->
          <v-checkbox v-model="props.selected"></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.sex }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">
          <v-btn icon @click="handleeditUser(props.item)">
            <v-icon color="teal darken-1">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteUser(props.item)">
            <v-icon color="deep-orange accent-4">remove</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <!-- 新增列表 弹框模式 v-on:addUser="addUserItem(user)" -->
    <v-dialog v-model="dialogShow" max-width="600px" persistent scrollable>
      <UserEdit
        :editMark="editMark"
        :oldUser="oldUser"
        v-on:show="handleCloseDialog"
        v-on:addUser="addUserItem"
      />
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  props: {
    dark: Boolean
  },
  data() {
    return {
      search:'',//搜索关键字
      selected: [], //选择的条目
      totalProblems: 20, //总条数
      problems: [] ,//数据
      oldUser: {}, //修改的用户
      loading: true, //加载进度条
      pagination: {}, //监听变化
      dialogShow: false, //显示对话框
      editMark: false,
      //数据表头,
      headers: [
        { text: "故障问题描述", align: "center", value: "problemdeScription", sortable: false },
        { text: "品牌机型", align: "center",sortable: false, value: "brandModel" },
        { text: "系统平台", align: "center",sortable: false, value: "systemPlatform" },
        { text: "咨询单位", align: "center", value: "consultingUnit" },
        { text: "处理方法", align: "center",  value: "model" },
        { text: "记录人", align: "center", value: "recorder" },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  components: {
    //UserEdit
  },
  //计算属性：
  computed: {
    // ...mapState({
    //     users333: state => state.user.users
    // })
  },

  watch: {
    //监听数据的变化，数据有变化时刷新列表
   pagination: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {
          // 变化后的回调函数，这里我们再次调用getDataFromServer即可
          //this.getUserList();
        }
      },
      search: { // 监视搜索字段
        handler() {
         // this.getUserList();
        }
      }
  },
  mounted() {
    this.getTest();
  },
  methods: {
    //数据初始化
    initData() {
      this.dialogShow = false;
      this.editMark = false;
    },
    //关闭对话框
    handleCloseDialog() {
      this.initData();
    },
    //添加用户按钮事件
    handleaddUser() {
      (this.oldUser = {}), (this.dialogShow = true);
    },
    //编辑用户按钮事件
    handleeditUser(user) {
      this.oldUser = user;
      this.editMark = true;
      this.dialogShow = true;
    },
    //添加用户
    addUserItem(user) {
      console.log("add a user");
      console.log(user);
      //模拟添加
      this.users.push(user);
      //Todo 先判断是修改还是新增
      console.log("true 为修改" + this.isEdit);
      //Todo修改，根据ID修改内容
      //Todo新增 ，设置ID（或后台自增） 添加一条
      //this.dialogShow = false;
      this.initData();
    },
    //批量删除用户
    batchDeleteUser() {},
    //删除一个用户
    deleteUser(user) {
      this.users.splice(user, 1); //前端模拟删除
      //Todo 编写后端异步删除一个用户
    },
    //从后台获取数据
    getUserList() {
      // this.users=usersData;
     // return usersData;
       this. $axios.get("/api/22"
       //, {
          // params: {
          //   key: this.search, // 搜索条件
          //   page: this.pagination.page,// 当前页
          //   rows: this.pagination.rowsPerPage,// 每页大小
          //   sortBy: this.pagination.sortBy,// 排序字段
          //   desc: this.pagination.descending// 是否降序
          // }
        //}
        ).then(resp => { // 这里使用箭头函数
        console.log(resp.data),
          this.users = resp.data.items;
          this.totalProblems = resp.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        })
    },
    getTest(){
      this. $axios2.get("http://127.0.0.1:8090/22").then(resp=>{console.log(resp)})
    }
  }
};
</script>



