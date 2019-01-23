<template>
  <v-footer :color="color" text-color="white">
    <v-flex text-xs-center xs12>
      &copy;{{ new Date().getFullYear() }}
      <strong>Sweet</strong>
    </v-flex>
  </v-footer>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    dark: Boolean
  },
  computed: {
    ...mapState("app", ["color"])
  }
};
</script>

