<template>
          <v-dialog
            v-model="dialog"
            max-width="350"
          >

            <v-card id="modal">
              <v-card-title class="headline justify-center">
                 Duplicate {{project.name}}?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="duplicateProject"
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
  name: 'DuplicateModal',
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
    duplicateProject() {
        this.exit();
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
