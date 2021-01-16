<template>
    <v-dialog
    v-model="dialog"
    max-width="600"
    >   
        <v-card class="overflow-hidden">
            
            <v-card-title class="white--text black">
                New Project <v-spacer></v-spacer><v-icon @click="exit">{{mdiClose}}</v-icon>
            </v-card-title>
        
            
                <v-row
                    class="overflow-hidden"
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="9"
                        md="9"
                    >

                            <v-card-text>
                                <v-form ref="form">
                                    <v-text-field
                                        label="Project Name"
                                        name="login"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        label="Users (seperate by ';')"
                                        name="users"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Config (seperate by ';')"
                                        name="config"
                                    ></v-text-field>

                                    
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary">Create Project!</v-btn>
                            </v-card-actions>
                    

                    </v-col>
                </v-row>
        
            </v-card>
    
    </v-dialog>

</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
  name: 'NewProjectModal',
  components: {
      mdiClose,
  },
    props: {
        dialog: Boolean,
    },

  methods: {
    exit() {
        this.$emit("exit", true);
    },
    
  },
  data: () => ({
      mdiClose: mdiClose,

  })
}
</script>

<style scoped>

</style>
