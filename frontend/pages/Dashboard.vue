<template>
  <v-app>
    <Appbar v-bind:title="'Dashboard'"/>

    <v-card>
      <v-toolbar
        extended
      >
        <v-card-title size = 300>Projects</v-card-title>
          <v-btn
            max-width="200"
            color="secondary"
            bottom
            left
          >New Project</v-btn>



      </v-toolbar>



    <v-container class = "d-flex flex-wrap align-content-space-around">
      <v-hover v-slot="{hover}" v-for="(project,index) in info.projects" :key="index">
        <v-card
          outlined
          class="mx-auto ma-12"
          :elevation="hover ? 5 : 2"
          height = 400
          width = 400
        >
          <v-card-title>{{project.name}}</v-card-title>
          <v-img
            max-height="300"
            max-width="400"
            :src="project.thumbnail"
          > </v-img>
          <v-card-text>project.os</v-card-text>
          <v-card-text>project.config</v-card-text>
        </v-card>
      </v-hover>


    </v-container>
    </v-card>
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
    info: {

      }
  }),

  methods: {

  },
  mounted: function() {
    // Getting VM info
    this.info = {
      projects: [
        {
          name: "test1",
          os: "Linux",
          config: ["python","bogosort","opencv"],
          users: ["fairnightzz","kaitokid"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        }
      ]
    }
    /*
    this.$axios.get(this.BaseURL + "/projects",
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
.project {
    display: inline-block;
    margin: 10px;
    text-align: center;
}

</style>
