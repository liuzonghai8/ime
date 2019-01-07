<template>
  <v-card>
    <!-- 搜索条 -->
   
  </v-card>
</template>
<script>
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
          text: "角色名称",
          align: "center",
          value: "name"
        },
        {
          text: "角色代码",
          align: "center",
          value: "code"
          
        },
        { text: "角色描述", align: "center", value: "description"},
         { text: "状态", align: "center", value: "enable_tag" ,sortable: false},
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  components: {
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
       this.getDataFromServer()
    },
    //关闭对话框
    handleCloseDialog() {
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
        console.log(id),
        confirm('Are you sure you want to delete this item?')
        this.$axios
          .delete("upms/sys/role/" + id)
          .then(()=>{
            console.log("删除成功")
            this.getDataFromServer()
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
          console.log(resp);
          console.log(resp.data.msg),
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



