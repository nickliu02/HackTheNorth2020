<template>
  <v-app>
    <v-icon x-large @click="returnBack" class="ma-4">{{mdiKeyboardBackspace}}</v-icon>
    <p style="text-align: center"><a :href="this.guestUrl">Guest Url (Copy this link)</a></p>
    <p style="text-align: center">Login password: {{this.entry.password}}</p>
    <!--<v-navigation-drawer absolute right v-bind:width="300">
        <iframe v-for="(vid, index) in videos" :key="index" :src="vid.url" class="cam" scrolling="no">

        </iframe>
    </v-navigation-drawer>-->



    <iframe :src="this.vncUrl" frameborder="0" id="frame"></iframe>

    <no-ssr>
        <Session
            v-bind:apiKey='vidInfo.apiKey'
            v-bind:sessionId='vidInfo.sessionId'
            v-bind:token='vidInfo.token'
        />
    </no-ssr>
  </v-app>

</template>

<script>
import {mdiKeyboardBackspace} from '@mdi/js';
import jwt from 'jsonwebtoken'
import Session from './components/Session.vue';

export default {
  name: "Workspace",

  components: {
    mdiKeyboardBackspace,
    Session,
  },
  data: () => ({
      mdiKeyboardBackspace: mdiKeyboardBackspace,
      project: {},
      projectId: '',
      videos: [
         
      ],
    vncUrl: '',
    guestUrl: '',
    entry:{},
    vidInfo: {}
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
              const res = await this.$axios.$get('https://video.subspace.tech/room/' + this.projectId);
              console.log(res);
          } catch (err) {
              console.log(err);
          }
      },

      async getWorkspace() {
          try {
            this.vncUrl = await this.$axios.$get(`https://api.subspace.tech/users/vnc_url?username=${this.$store.state.auth.user}&workspaceId=${this.projectId}`);
            this.guestUrl = this.vncUrl + '&view_only=true&show_dot=true';
            this.vncUrl += `&username=${this.$store.state.auth.user}`

            const userId = jwt.decode(this.$store.state.auth.jwt).id;
            this.entry = await this.$axios.$get(`https://api.subspace.tech/users/workspaces/${userId}/${this.projectId}/entry`, {
              headers: {
                'x-access-token': this.$store.state.auth.jwt
              }
            })

          } catch (error) {
              console.log(error);
          }
      },
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
    width: 80vw;
    height: 80vh;
    margin: auto 6vw;
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
