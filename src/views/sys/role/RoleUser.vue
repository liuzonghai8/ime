<template>
  <v-card>
    <v-layout>
      <v-flex xs5>
        <v-toolbar card py="0" my="0">
          <v-toolbar-title>拥有该角色的用户</v-toolbar-title>
        </v-toolbar>
        <v-text-field v-model.lazy="search" append-icon="search" label="输入用户名搜索" hide-details></v-text-field>
        <v-card-text>左边</v-card-text>
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
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="handleEdit(props.item.id)">
                <v-icon color="teal darken-1">edit</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-spacer/>
      <v-divider vertical></v-divider>

      <v-flex xs5>
        <v-toolbar card color="grey lighten-3">
          <v-toolbar-title>未拥有该角色的用户</v-toolbar-title>
        </v-toolbar>
        <v-text-field v-model.lazy="search" append-icon="search" label="输入用户名搜索" hide-details></v-text-field>
        <v-card-text>右边</v-card-text>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn flat @click="tree = []">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="green darken-1" depressed>添加
        <v-icon right>content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    search: "", //搜索关键字
    selected: [], //选择的条目
    total: 20, //总条数
    datas: [], //数据集合
    loading: true, //加载进度条
    pagination: {}, //监听变化
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
      }]
  }),

  computed: {
  },

  watch: {

  },

  methods: {

  }
};
</script>