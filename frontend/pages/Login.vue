<template>
  <v-app>
    <LoginModal v-bind:dialog="true"></LoginModal>
  </v-app>

</template>

<script>
import LoginModal from './components/LoginModal';
export default {
  name: "Login",

  components: {
    LoginModal
  },
  data: () => ({

  }),

  methods: {

  },


}
</script>

<style scoped>

</style>
