<template v-bind:style="{ 'backgroundImage': 'url(../static/splash_screen.jpg)' }">
    <v-app>
        

        <div id="main">
            <h1 id="title">Subspace</h1>
            <h2 id="tagline">Closed Under Addition and Scalar Multiplication</h2>
            <v-divider></v-divider>
            <v-btn @click="openLoginModal" id="btn" x-large>Get Started</v-btn>
        </div>


        <LoginModal v-bind:dialog="isLoginModalOpen"/>
 
        
    </v-app>
</template>

<script>
import LoginModal from './components/LoginModal';



export default {
  name: 'Home',

  components: {
    LoginModal
  },

  data: () => ({
      isLoginModalOpen: false,

  }),

  methods: {
      openLoginModal() {
          this.isLoginModalOpen = true;
      },
  },
}
</script>

<style lang="scss">

#main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    vertical-align: middle;
    user-select: none; 
}

#title {
    font-size: 90px;
    
}

#tagline {
    font-size: 40px;
    text-align: center;
}

#btn {
    margin: 20px;
}
</style>
