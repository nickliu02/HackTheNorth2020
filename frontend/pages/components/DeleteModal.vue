<template>
        <v-dialog v-model="dialog" persistent min-width="400px" class="overflow-hidden">
            <v-card>
              
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
    addUser() {

    },
  },
  data: () => ({
      mdiClose: mdiClose,
      user: "",

  })
}
</script>

<style scoped>

</style>
