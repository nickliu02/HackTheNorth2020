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
                                        name="Name"
                                        v-model="form.name"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        label="Users (seperate by ';')"
                                        name="users"
                                        v-model="users"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Config (seperate by ';')"
                                        name="config"
                                        v-model="form.packages"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="createProject" color="secondary" block>Create Project!</v-btn>
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
    async createProject() {
      this.form.username = this.$store.state.auth.user;
      console.log(this.form);
      this.form.packages = this.form.packages.split(";");
      try {
          const res = await this.$axios.post("http://ceres.host.412294.xyz" + "/workspaces",
            {
                ...this.form
            },
                {
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': this.$store.state.auth.jwt
                }
                }
            )
      }
      catch (err) {
          console.log(err)
      }
      

      this.info = res.data;
      this.users = this.users.split(";")
          for (var i = 0; i<this.users.length; i++) {
            console.log("Adding",this.users[i])
            try {
                await this.$axios.post("http://ceres.host.412294.xyz" + "/workspaces/add_user/"+this.info.data.id,
                {
                    "username":this.users[i]
                },
                {
                    headers: {
                    'Content-Type':'application/json',
                    'x-access-token': this.$store.state.auth.jwt
                    }
                }
                )
            } catch (err) {
                console.log(err);
            }
          }

      this.form.packages = "";
      this.exit()
      
    }

  },
  data: () => ({
      mdiClose: mdiClose,
      form: {
        username: "",
        name: "",
        packages: ""
      },
      users: "",
      info: {}

  }),

  computed: {
      users: function() {
          return this.users;
      }
  }
}
</script>

<style scoped>

</style>
