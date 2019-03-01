<template>
  <v-card>
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleadd">新增</v-btn>
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleedit" v-show="active[0]">编辑</v-btn>
      <v-btn
        small
        :color="dark ? 'secondary' : 'primary'"
        @click="handledelete"
        v-show="active[0]"
      >删除</v-btn>
    </v-card-title>
    <v-layout justify-space-between>
      <v-flex>
        <!-- :load-children="fetchUsers"  v-model="iteeee"  open-on-click :active.sync="active" activatable :open="open"  :active="active"-->
        <v-treeview
          :active.sync="active"
          :items="items"
          activatable
          active-class="primary--text"
          class="grey lighten-5"
          transition
        ></v-treeview>
      </v-flex>
      <!-- <v-divider vertical></v-divider>
      <v-flex xs8>dddddddd</v-flex>-->
      <v-flex d-flex text-xs-center>
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!menu"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >请点击右边的树形菜单，选择一项</div>
          <!-- :key="menu.id" -->
          <v-card v-else class="pt-4 mx-auto" max-width="700" flat>
            <h3 class="blue--text headline mb-2">{{ menu.name }}</h3>
            <v-divider></v-divider>
            <!-- justify-space-between -->
            <v-layout wrap justify-space-between>
              <v-flex xs6 md5>
                <v-text-field label="ID:" v-model.trim="menu.id" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="父ID:" v-model.trim="menu.parentId" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="标题:" v-model.trim="menu.name" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="权限标识:" v-model.trim="menu.permission" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="前端路径:" v-model.trim="menu.frontPath" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="页面组件:" v-model.trim="menu.component" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="请求URL:" v-model.trim="menu.requestUrl" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="请求方法:" v-model.trim="menu.requestMethod" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-text-field label="排序:" v-model.trim="menu.sort" :readonly="edit"></v-text-field>
              </v-flex>
              <!-- <v-flex xs6 md5>
                <v-text-field label="类型:" v-model.trim="menu.type" :readonly="edit"></v-text-field>
              </v-flex>-->
              <v-flex xs6 md5>
                <v-select v-model="menu.type" :items="selects" label="类型"></v-select>
              </v-flex>
              <!-- <v-flex xs6 md5>类型
                <v-switch v-model="menu.type" :label="menu.type=='0' ? '菜单 ':'按钮'"></v-switch>
              </v-flex>-->
            </v-layout>
            <v-layout class="my-2" row>
              <!-- <v-btn @click="clear">重置</v-btn> -->
              <v-spacer/>
              <v-btn v-show="!edit" @click="submit" color="primary">保存</v-btn>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>

export default {
  name: 'sys-dept',
  props: {
    dark: Boolean
  },
  data: () => ({
    active: [],
    items: [], //数据集合，
    selects: ['菜单', '按钮'],
    menu: null,  //选择的数据
    edit: true,
    editMark: false
    //selected: false
  }),
  mounted () {
    this.getDataFromServer();
    //this.getObject("upms/sys/menu/tree").then(resp => this.items = resp.data.data)
  },
  watch: {
    //监听选中是否有变化
    active: {
      handler () {
        if (!this.active.length) { return null }
        this.fetchObj("upms/sys/menu/" + this.active[0]).then(resp => this.menu = resp.data)
        this.edit = true
      }
    }

  },
  computed: {},
  methods: {
    //获取全部数据
    getDataFromServer () {
      this.$axios.get("upms/sys/menu/tree").then((resp) => {
        if (resp.data.code === 0) {
          console.log("查询到数据"),
            this.items = resp.data.data
        }
        else {
          console.log("未查询到数据"),
            console.log(resp.data.msg)
        }
      })
    },

    //异步获取数据
    async fetchObj (url) {
      return await this.$axios.get(url).then((resp) => resp.data);
    },

    handleadd () {
      if (this.active[0]) {
        this.menu = {
          parentId: this.menu.id
        }
      } else {
        this.menu = {}
      }
      this.edit = false,
        this.editMark = false
    },
    handleedit () {
      this.edit = false,
        this.editMark = true
    },
    handledelete () {
      if (!this.active[0]) {
        console.log("选择删除")
      }
      else {
        confirm("是否确定删除用户") &&
          this.$axios.delete("upms/sys/menu/" + this.active[0])
            .then(() => {
              console.log("删除成功")
            })
            .catch((err) => {
              console.log("删除失败")
              console.log(err)
            })
      }

    },
    submit () {
      console.log(this.menu),
        console.log(this.edit)
      this.$axios({
        method: this.editMark ? "put" : "post",
        url: "/upms/sys/menu",
        data: this.$qs.stringify(this.menu)
      })
        .then(() => {
          console.log("添加成功")
        })
        .catch(() => {
          console.log("添加失败")
        })

    }

  }
}
</script>



