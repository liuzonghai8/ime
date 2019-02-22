<template>
  <v-layout>
    <v-flex xs3>
      <!-- :load-children="fetchUsers"  v-model="iteeee"  open-on-click :active.sync="active" activatable :open="open"  :active="active"-->
      <v-treeview
        :active.sync="active"
        :items="items"
        activatable
        active-class="primary--text"
        class="grey lighten-5"
        transition
        open-on-click
      ></v-treeview>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex xs8>dddddddd</v-flex>
  </v-layout>
</template>
<script>

export default {
  name: 'sys-menu',
  data: () => ({
    active: [],
    items: [] //数据集合
  }),
  mounted () {
    this.getDataFromServer();
  },
  methods: {
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
    }
  },
  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    active: {
      deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
      handler () {
        // 变化后的回调函数，这里我们再次调用getDataFromServer即可
        console.log("active")
        console.log(this.active)
      }
    },

  }
}
</script>



