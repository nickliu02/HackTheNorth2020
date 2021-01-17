<template>
    <v-app>
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
                        <v-form ref="form">
                            <v-text-field
                                v-model="user" label="Add User"
                                class="pl-4"
                            >
                            </v-text-field>
                        </v-form>

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
                            @click="removeUser(item)"
                          >
                            Remove
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>

                    </v-virtual-scroll>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isAddedModalOpen">
            <v-card-title class="white--text black">
                    User Added <v-spacer></v-spacer><v-icon @click="closeModal">{{mdiClose}}</v-icon>
                </v-card-title>

            <v-btn
                depressed
                small
                @click="closeModal"
                >
                Ok
            </v-btn>
        </v-dialog>
    </v-app>

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

    closeModal() {
        this.isAddedModalOpen = false;
    },

    async addUser() {
        this.isAddedModalOpen = true;
        console.log(this.project);
        await this.$axios.post('http://ceres.host.412294.xyz/workspaces/add_user/' + this.project.id, {
            'username': this.user
        }, {
            headers: {'Content-Type':'application/json',
                      'x-access-token':this.$store.state.auth.jwt
            }
        }).then((res) => {
            this.user = "";
        })
    },

    async removeUser(item) {
      await this.$axios.post('http://ceres.host.412294.xyz/workspaces/remove_user/' + this.project.id, {
        'userId': item
      }, {
        headers: {'Content-Type':'application/json',
          'x-access-token':this.$store.state.auth.jwt
        }
      }).then((res) => {

      })
    }

  },
  data: () => ({
      mdiClose: mdiClose,
      user: "",
      isAddedModalOpen: false,

  })
}
</script>

<style scoped>

</style>
