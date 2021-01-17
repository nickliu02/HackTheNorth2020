<template>
          <v-dialog
            v-model="dialog"
            max-width="350"
          >

            <v-card id="modal">
              <v-card-title class="headline justify-center">
                 Delete {{project.name}}?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deleteProject"
                >
                    Yes
                </v-btn>

                <v-btn
                  color="red darken-1"
                  text
                  @click="exit"
                >
                    No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
  name: 'DeleteModal',
  components: {
      mdiClose,
  },
    props: {
        dialog: Boolean,
        project: Object,

    },

  methods: {
    exit() {
        this.$emit("exit", true);
    },
    deleteProject() {
      this.$axios.delete("http://ceres.host.412294.xyz" + "/workspaces/"+this.project.id,
        {
          headers: {
            'Content-Type':'application/json',
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
        this.exit();
    }
  },
  data: () => ({
      mdiClose: mdiClose,
  })
}
</script>

<style scoped>

</style>
