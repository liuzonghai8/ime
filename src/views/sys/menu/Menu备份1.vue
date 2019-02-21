<template>
  <v-card>
    <v-flex xs12 sm10>
      <v-tree
        url="/item/category/list"
        :isEdit="isEdit"
        @handleAdd="handleAdd"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @handleClick="handleClick"
      />
    </v-flex>
  </v-card>
</template>
<script>

export default {
  props: {
    dark: Boolean
  },
  data () {
    return {
      isEdit: true
    }
  },
  components: {
  },
  //计算属性：
  computed: {},

  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    pagination: {
    }
  },
  // 监视搜索字段
  search: {

  },
  //页面加载是钩子函数
  mounted () {
  },

  methods: {
    handleAdd (node) {
      console.log("add .... ");
      console.log(node);
    },
    handleEdit (id, name) {
      console.log("edit... id: " + id + ", name: " + name)
    },
    handleDelete (id) {
      console.log("delete ... " + id)
    },
    handleClick (node) {
      console.log(node)
    }
  }
};
</script>



