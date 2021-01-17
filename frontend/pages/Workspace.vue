<template>
  <v-app>
    <v-icon x-large @click="returnBack" class="ma-4">{{mdiKeyboardBackspace}}</v-icon>

    <v-navigation-drawer absolute right v-bind:width="300">
        <iframe v-for="(vid, index) in videos" :key="index" :src="vid.url" class="cam" scrolling="no">

        </iframe>
    </v-navigation-drawer>



    <h1>{{ this.project.title }}</h1>
    <iframe :src="this.vncUrl" frameborder="0" id="frame"></iframe>
  </v-app>

</template>

<script>
import {mdiKeyboardBackspace} from '@mdi/js';


export default {
  name: "Workspace",

  components: {
    mdiKeyboardBackspace,
  },
  data: () => ({
      mdiKeyboardBackspace: mdiKeyboardBackspace,
      project: {},
      projectId: '',
      videos: [
          { url: "https://fr.wikipedia.org/wiki/Main_Page" },
          { url: "https://fr.wikipedia.org/wiki/Main_Page" },
      ],
    vncUrl: ''

  }),

  methods: {
      returnBack() {
          this.$router.push('/Dashboard');
      },

      async getProject(id) {
          try {
              const res = await this.$axios.post('/workspaces/'+id);
              this.project = res.data;
          } catch (err) {
              console.log(err);
          }

      },

      async getVideoLink() {
          try {
              const res = this.$axios.get('https://video.substream.tech:8880/room/' + this.projectId);
              console.log(res);
          } catch (err) {
              console.log(err);
          }
      },

      async getWorkspace() {
          try {
            this.vncUrl = await this.$axios.$get(`http://ceres.host.412294.xyz/users/vnc_url?username=${this.$store.state.auth.user}&workspaceId=${this.projectId}`);
          } catch (error) {
              console.log(err);
          }
      }
  },

  async mounted() {
      this.projectId = this.$route.query.id;
      await this.getProject(this.projectId);
      await this.getVideoLink();
      await this.getWorkspace();
  },

}
</script>

<style scoped>
#frame {
    text-align: center;
    display:block;
    width: 70vw;
    height: 70vh;
    margin: auto 10vw;
}

#vids {
    display: inline-flex;
    margin-top: 20px;

}

.cam {
    margin: auto auto;
    overflow: hidden;
}
</style>
