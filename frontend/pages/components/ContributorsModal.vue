<template>
        <v-dialog v-model="dialog" persistent max-width="450px" min-width="400px" class="overflow-hidden">
            <v-card class="overflow-hidden">
                <v-card-title class="white--text black">
                    Contributors <v-spacer></v-spacer><v-icon @click="exit">{{mdiClose}}</v-icon>
                </v-card-title>
                
                <v-row class="overflow-hidden">
                    <v-col
                        cols="12"
                        sm="9" 
                    >   
               
                        <v-text-field
                            v-model="user" label="Add User"
                            class="pl-4"
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" sm ="2">
                        <v-btn class="mt-3" @click="addUser">
                            Add
                        </v-btn>
                    </v-col>
                </v-row>


                <v-virtual-scroll
                      :items="project.users"
                      :item-height="50"
                      height="250"
                      
                    > 
                    <template v-slot="{ item }">
                      <v-list-item>

                        <v-list-item-content>
                          <v-list-item-title>{{ item }}</v-list-item-title>
                          
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn
                            depressed
                            small
                          >
                            Remove  
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>

                    </v-virtual-scroll>
            </v-card>
        </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
  name: 'LoginModal',
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
