<template>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="primary" icons-and-text dark grow >
                    <v-tabs-slider color="secondary"></v-tabs-slider>
                    <v-tab v-for="(i,index) in tabs" :key="index">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4" background-color="white">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginUsername" label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" type="password" name="input-10-1" label="Password"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
</template>

<script>

export default {
  name: 'LoginModal',
    props: {
        dialog: Boolean
    },

  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    validate() {
      if (this.tab == 0) {
        // submit form to server/API here...
        let form =  {
         "username": this.loginUsername,
         "password": this.loginPassword
        }
        this.$axios.post("https://api.subspace.tech"+"/users/login", {
          ...form
        },
          {
            headers: {'Content-Type':'application/json'}
          }
        )
        .then(response => {
            if (response.data != "ERROR") {
              console.log("Login success")
              this.$store.commit('auth/setUser',this.loginUsername);
              this.$store.commit('auth/setAuth',true); // Change this to fit whatever
              this.$store.commit('auth/setJwt',response.data.token);
              console.log(response.data.token);
              this.$router.push('/Dashboard');
            }

        })
        .catch(error => {
          console.log(error)
        })
    }
      else if (this.tab == 1) {

        let form =  {
          "username": this.username,
          "password": this.password
        }
        this.$axios.post("https://api.subspace.tech"+"/users", {
          ...form
        },
          {
            headers: {'Content-Type':'application/json'}
          })
          .then(response => {
              if (response.data != "ERROR") {
                this.$store.commit('auth/setUser',this.username)
                this.$store.commit('auth/setAuth',true); // Change this to fit whatever
                this.$store.commit('auth/setJwt', response.data.token)
                console.log(this.$store.state.auth.jwt);
                this.$router.push('/Dashboard');
              }

          })
          .catch(error => {
            console.log(error)
          })
      }},

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({

    tab: 0,
    active_tab:0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,

    username: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginUsername: "",
    usernameRules: [
      v => !!v || "Required",
      v => (v && v.length >= 3) || "Min 3 characters"

    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  })
}
</script>

