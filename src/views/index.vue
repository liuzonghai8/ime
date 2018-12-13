<template>
    <div>首页

Todo ：各种统计
的个的 的的的
   store.user.state={{user.count}}
  <!-- getters: {{this.$store.state.user.tenCount}} -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    // computed: {
    //     count(){
    //        return this.$store.state.user.count
    //     }
    // },

    computed: mapState([
        'user.count'
    ])

}
</script>


