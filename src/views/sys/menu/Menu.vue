<template>
  <v-card>
    <v-card-title class="py-1">
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleadd">新增</v-btn>
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handleedit">编辑</v-btn>
      <v-btn small :color="dark ? 'secondary' : 'primary'" @click="handledelete">删除</v-btn>
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
          <v-card v-else :key="menu.id" class="pt-4 mx-auto" max-width="700" flat>
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
              <v-flex xs6 md5>
                <v-text-field label="类型:" v-model.trim="menu.type" :readonly="edit"></v-text-field>
              </v-flex>
              <v-flex xs6 md5>
                <v-select :items="items" label="类型"></v-select>
              </v-flex>
              <v-flex xs6 md5>
                <v-switch v-model="menu.type" :label="menu.type=='0' ? '0 ':'1'"></v-switch>
              </v-flex>
            </v-layout>
            <v-layout class="my-2" row>
              <v-btn @click="clear">重置</v-btn>
              <v-spacer/>
              <v-btn @click="submit" color="primary">保存</v-btn>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>

export default {
  name: 'sys-menu',
  props: {
    dark: Boolean
  },
  data: () => ({
    active: [],
    items: [], //数据集合，
    menu: null,  //选择的数据
    edit: false
    //selected: false
  }),
  mounted () {
    this.getDataFromServer();
  },
  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    selected: {
      deep: true,
      handler () {
        if (this.active.length) {
          this.getMenuById()
        }
      }
    }
  },
  computed: {
    selected () {
      if (!this.active.length) return undefined
      const id = this.active[0]
      this.getData().then(resp => { this.menu = resp })
      return id
    }
  },
  methods: {
    //获取全部数据
    getDataFromServer () {
      this.$axios.get("upms/sys/menu/tree").then((resp) => {
        console.log(resp.data)
        if (resp.data.code === 0) {
          console.log("查询到数据")
          this.items = resp.data.data
          console.log(resp.data.data)
        }
        else {
          console.log("未查询到数据")
          console.log(resp.data.msg)
        }
      })
    },
    //根据ID获取单个数据
    getMenuById () {
      this.$axios.get("upms/sys/menu/" + this.active[0])
        .then((resp) => {
          console.log(resp.data)
          this.menu = resp.data.data
        })
    },
    async getData () {
      return await this.$axios.get("upms/sys/menu/" + this.active[0]).then((resp) => resp.data);
    },

    handleadd () { },
    handleedit () { },
    handledelete () { },
    clear () { },
    submit () { }

  }
}
</script>



