<template>
    <v-app  v-bind:style="{ 'background-image': 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(background.svg)', 'background-position': 'center center',
  'background-repeat': 'no-repeat', 'background-size': 'cover' }">
        <div>

        </div>

        <div id="main">
            <h1 id="title">Subspace</h1>
            <h2 id="tagline">Begin the World of Collaboration</h2>
            <v-divider dark></v-divider>
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
    padding: 20px;
}

#title {
    font-size: 90px;
    text-shadow: 3px 3px  #000000;
    
}

#tagline {
    font-size: 40px;
    text-align: center;
    text-shadow: 2px 2px 2px  #000000;
}

#btn {
    margin: 20px;
}
</style>
