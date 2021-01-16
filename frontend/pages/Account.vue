<template>
  <v-app>
    <Appbar v-bind:title="'Account'"/>
    <v-card class="mx-auto ma-12">
      <v-img
        width = 600
        src="https://blogs.lse.ac.uk/management/files/2016/11/technology-785742_1920.jpg"
      ></v-img>
     <v-card-title>
         User Info
         <v-spacer></v-spacer>
         <v-icon>
             {{ mdiPencil }}
         </v-icon>
     </v-card-title>
     <v-divider class="mx-4"></v-divider>
     <v-list>
       <v-list-item>
         Name: {{info.username}}
       </v-list-item>
       <v-list-item>
         Email: {{info.email}}
       </v-list-item>
       <v-list-item>
         Password: *****
       </v-list-item>
     </v-list>
    </v-card>
  </v-app>

</template>

<script>
import Appbar from "./components/Appbar";
import { mdiPencil } from '@mdi/js';

export default {
  name: "Account",

  components: {
    Appbar
  },
  data: () => ({
    info: {

    },

    mdiPencil: mdiPencil,
  }),

  methods: {},
  mounted: function() {
    // Getting profile info
    this.info = {
      username: "zhehahizhang",
      email: "zhehai@zhehaizhang.com",
      password: ""

    }
    /*
    this.$axios.get(this.BaseURL + "/user?"+$store.state.auth.user,
      {
        headers: {
          'x-access-token': this.$store.state.auth.jwt
        }
      }
    )
      .then(response => {
        this.info = response.data;

      })
      .catch(error => {
        console.log(error);
      })

     */
  }
}
</script>

<style scoped>

</style>
