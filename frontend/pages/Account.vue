<template>
  <v-app>
    <Appbar v-bind:title="'Account'"/>
    <h1>Account</h1>
  </v-app>

</template>

<script>
import Appbar from "./components/Appbar";

export default {
  name: "Account",

  components: {
    Appbar
  },
  data: () => ({

  }),

  methods: {

  }
}
</script>

<style scoped>

</style>
