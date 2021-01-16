<template>
  <v-app>
    <Appbar v-bind:title="'Dashboard'"/>
    
    <v-btn
        max-width="200"
        color="secondary"
        margin="20px"
    >New Project</v-btn>

    <v-container class="grey lighten-5">

        <v-row>
            
        </v-row>
        
    </v-container>

  </v-app>

</template>

<script>
import Appbar from "./components/Appbar";

export default {
  name: "Dashboard",

  components: {
    Appbar
  },
  data: () => ({
      projects: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }],

  }),

  methods: {

  }
}
</script>

<style scoped>
.project {
    display: inline-block;
    margin: 10px;
    text-align: center;
}

</style>
