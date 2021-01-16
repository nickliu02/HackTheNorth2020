<template>
    <v-app>
        <v-card
            fluid class="primary fill-height"
        >
            <v-app-bar
                dark
            >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>Title</v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
            >
            <v-list
                nav
                dense
            >
                <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
                >
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Account</v-list-item-title>
                </v-list-item>
                </v-list-item-group>
            </v-list>
            </v-navigation-drawer>
        </v-card>
    </v-app>
</template>

<script>

export default {
  name: 'Appbar',

  components: {
    
  },

  data: () => ({
      drawer: false,
      group: null,
      items: [
          {},
          {},
      ]
  })
}
</script>
