<template>
  <div>
    首页count={{count}} <v-btn small @click="handleInrement">+</v-btn><br>
    <!--  :color="dark ? 'secondary' : 'primary'" -->
   <v-btn small @click="handleaddUser">新增用户</v-btn>
    <v-btn small @click="handleaddUser2(testuser)">新增用户2</v-btn>
        <v-btn small @click="handleaddUser3">新增用户3</v-btn>
        <v-btn small @click="handleaddUser4">新增用户4</v-btn>
      <!-- 数据表格 -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :pagination.sync="pagination"
      :total-items="totalUsers"
      :loading="loading"
      class="elevation-1"
      rows-per-page-text="每页行数："
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox align="center" v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.sex }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">
          <v-btn icon @click="handleeditUser(props.item)">
            <v-icon color="teal darken-1">edit</v-icon>
          </v-btn>
          <v-btn icon @click="removeuser1(props.item)">
            <v-icon color="deep-orange accent-4">close</v-icon>
          </v-btn>
            <v-btn icon @click="removeUser(props.item)">
            <v-icon color="deep-orange accent-4">note_add</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState,mapMutations,mapActions } from "vuex";
import Tree from '@/components/tree/Tree'
export default {
 data(){
   return{
    pagination: {}, //监听变化
    loading: false, //加载进度条
    selected: [], //选择的条目
    testuser: { name: "周杰伦test",
      sex: "男",
      phone: "1388888888",
      status: "禁用"},
    headers: [
        { text: "选择框", align: "center", value: "name", sortable: false },
        { text: "用户名", align: "center", value: "name" },
        { text: "性别", align: "center", value: "sex" },
        { text: "手机号码", align: "center", sortable: false, value: "phone" },
        { text: "状态", align: "center", value: "status" },
        { text: "操作", align: "center", value: "name", sortable: false }
      ]
      }
 },
 components:{
   Tree
 },
  computed: {
      totalUsers(){
        return this.users.length
      },

    ...mapState({
      users: state => state.user.users,
      count: state=> state.user.count
     })
  },
  methods:{
    removeuser1(param){
      console.log(param)
    this.deleteUser(this.param)
    },
     removeuser2(param){
      console.log(param)
    this.removeUser(this.param)
    },
handleInrement(){
  this.$store.dispatch('incerement',15)
},
    handleaddUser(){
      console.log("adduser"),
      this.$store.commit(
         'addUser',
        { name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"}
      )
    },
    handleaddUser3(){
      console.log("store.action"),
      this.$store.dispatch(
       'addUser',
       { name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"}
      )
    },
    handleaddUser4(){
      this.$store.dispatch(
       'addUserPromise',
       { name: "周杰伦000",
      sex: "男",
      phone: "1388888888",
      status: "禁用"}
      )
    },
    ...mapMutations({
      handleaddUser2: 'addUser',
      deleteUser: 'removeUser'
    }),
    ...mapMutations([
      'addUser',
      'removeUser'
    ]),
    ...mapActions([
      'addUser',
      'incerement',
      'addUserPromise'
      ])
  }
};
</script>