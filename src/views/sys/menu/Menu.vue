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
        open-on-click
        transition
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
    avatar: null,
    iteeee: [],
    open: [],
    items: [
      {
        id: 5,
        name: 'Documents :',
        children: [
          {
            id: 6,
            name: 'vuetify :',
            children: [
              {
                id: 7,
                name: 'src :',
                children: [
                  { id: 8, name: 'index : ts' },
                  { id: 9, name: 'bootstrap : ts' }
                ]
              }
            ]
          },]
      }

    ]

  }),

  methods: {
    hendale () { console.log("dianj") }
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

    iteeee: {
      deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
      handler () {
        // 变化后的回调函数，这里我们再次调用getDataFromServer即可
        console.log("iteeee")
        console.log(this.iteeee)
      }
    }

  }
}
</script>



