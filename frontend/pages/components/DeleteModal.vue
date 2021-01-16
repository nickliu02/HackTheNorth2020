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
                  @click="this.exit()"
                >
                    Yes
                </v-btn>

                <v-btn
                  color="red darken-1"
                  text
                  @click="this.exit()"
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
    delete() {

    }
  },
  data: () => ({
      mdiClose: mdiClose,
      user: "",

  })
}
</script>

<style scoped>

</style>
