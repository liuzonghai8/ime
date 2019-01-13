<template>
  <v-footer :color="dark ? 'secondary' : 'primary'">
    <v-flex text-xs-center xs12>
      &copy;{{ new Date().getFullYear() }}
      <strong>Sweet</strong>
    </v-flex>
  </v-footer>
</template>
<script>
export default {
    props:{
      dark: Boolean
    }
}
</script>

