<template>
  <v-card>
    <!-- 搜索条 -->
    <v-card-title>
      <v-btn  small  :color="dark ? 'secondary' : 'primary'" @click="addUser">新增用户</v-btn>
      <v-btn small color="error" @click="deleteUser">批量删除</v-btn>
      <v-spacer/>
      <v-flex xs5>
        <v-text-field v-model.lazy="search" append-icon="search" label="输入关键字搜索" hide-details></v-text-field>
      </v-flex>
    </v-card-title>
    <v-divider/>
    <!-- 数据表格 -->
    <v-data-table
      :headers="headers"
      :items="users"
      :pagination.sync="pagination"
      :total-items="totalUsers"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.sex }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <!-- <td class="justify-center layout px-0">
          <v-btn icon @click="editBrand(props.item)">
            <i class="el-icon-edit"/>
          </v-btn>
          <v-btn icon @click="deleteBrand(props.item)">
            <i class="el-icon-delete"/>
          </v-btn>
        </td>-->
        <td class="text-xs-center">
          <v-btn icon @click="editUser">
            <v-icon color="teal darken-1">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItemUser">
            <v-icon color="deep-orange accent-4">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <!-- 新增列表 弹框模式 -->
  </v-card>
</template>
<script>
export default {
  props:{
    dark: Boolean
  },
  data() {
    return {
      totalUsers: 20, //总条数
      users: [], //数据
      loading: true, //加载进度条
      pagination: {}, //监听变化
      search: "", //搜索内容
      dialog: false,
      headers: [
        { text: "用户名", align: "center", value: "name" },
        { text: "性别", align: "center", value: "sex" },
        { text: "手机号码", align: "center", sortable: false, value: "phone" },
        { text: "状态", align: "center", value: "status" },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.users = data.items;
          this.totalUsers = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.users = data.items;
      this.totalUsers = data.total;
    });
  },
  methods: {
    editUser() {
      return null;
    },
    deleteItemUser() {
      return 
    },
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let items = this.getDesserts();
        const total = items.length;

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getDesserts() {
      return [
        {
          name: "Frozen Yogurt",
          sex: "男",
          phone: "1388888888",
          status: "启动"
        },
          {
          name: "周杰伦",
          sex: "男",
          phone: "1388888888",
          status: "禁用"
        },
        {
          name: "Yogurt",
          sex: "女",
          phone: "1388888888",
          status: "启动"
        }
      ];
    }
  }
};
</script>


