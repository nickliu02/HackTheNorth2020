<template>
  <v-app>
    <Appbar v-bind:title="'Dashboard'"/>

    <v-card>
      <v-toolbar

      >
        <v-card-title size = 300>Projects</v-card-title>
          <v-btn
            max-width="200"
            color="secondary"
            bottom
            left
            @click='openNewProjectModal'
          >New Project</v-btn>
      </v-toolbar>



    <v-container class = "d-flex flex-wrap align-content-space-around">
      <v-hover v-slot="{hover}" v-for="(project,index) in info" :key="index">
        <v-card
          outlined
          class="mx-auto ma-12"
          :elevation="hover ? 5 : 2"
          height = 400
          width = 400
        >
          <v-card-title @click="enterWorkspace(project)">{{project.name}} <v-spacer></v-spacer>
            <v-menu
                top
                offset-y
            >
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-on="on" v-bind="attrs">{{ mdiDotsHorizontal }}</v-icon>
            </template>

            <v-list>
                <v-list-item @click="openModal(project)">
                    <v-list-item-title>Contributors</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDeleteModal(project)">
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDuplicateModal(project)">
                    <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
          </v-card-title>
          <div v-if="project.thumbnail === null">
            <v-img
              max-height="300"
              max-width="400"
              src="https://tr1.cbsistatic.com/hub/i/r/2019/04/22/4d381966-1b3d-454e-9767-17343536a7f4/thumbnail/768x432/0f6e55b857b35c4af801351474788786/20190418linuxdesktopsjack.jpg"
            > </v-img>
          </div>

          <div v-else>
            <v-img
              max-height="300"
              max-width="400"
              :src="project.thumbnail"
            > </v-img>
          </div>

          <v-card-text>Created at: {{project.createdAt}}</v-card-text>
          <v-card-text>Packages installed: {{formatConfig(project.packages)}}</v-card-text>

        </v-card>
      </v-hover>



    </v-container>
    </v-card>

    <ContributorsModal
        v-show="isModalOpen"
        v-bind:dialog="isModalOpen"
        v-bind:project="selectedProject"
        v-bind:users="users"
        @exit="exit"
    />
    <DeleteModal
        v-show="isDeleteModalOpen"
        v-bind:dialog="isDeleteModalOpen"
        v-bind:project="selectedProject"
        @exit="exitDelete"
    >
    </DeleteModal>
    <DuplicateModal
        v-show="isDuplicateModalOpen"
        v-bind:dialog="isDuplicateModalOpen"
        v-bind:project="selectedProject"
        @exit="exitDuplicate"
    >
    </DuplicateModal>

    <NewProjectModal
        v-show="isDuplicateModalOpen"
        v-bind:dialog="isNewProjectModalOpen"
        @exit="exitNewProjectModal"

    />

  </v-app>

</template>

<script>
import Appbar from "./components/Appbar";
import { mdiDotsHorizontal } from "@mdi/js";
import ContributorsModal from "./components/ContributorsModal";
import DeleteModal from './components/DeleteModal';
import DuplicateModal from './components/DuplicateModal';
import NewProjectModal from './components/NewProjectModal';

export default {
  name: "Dashboard",

  components: {
    Appbar, mdiDotsHorizontal,
    ContributorsModal, DeleteModal,
    DuplicateModal, NewProjectModal

  },

  data: () => {
    return {
        mdiDotsHorizontal: mdiDotsHorizontal,
        info: {},
        isModalOpen: false,
        selectedProject: {},
        isDeleteModalOpen: false,
        isDuplicateModalOpen: false,
        isNewProjectModalOpen: false,
        users: []

    }
  },

  methods: {
      formatConfig (arr) {
          let out = "";
          for (let i = 0; i < arr.length; i++) {
              out += arr[i] + ', ';
          }
          out = out.substring(0, out.length - 2);
          return out;
      },
      async openModal(project) {
          this.isModalOpen = true;
          this.selectedProject = project;
          const res = await this.$axios.get('http://ceres.host.412294.xyz/workspaces/'+ project.id + '/users');
          console.log(res);
          this.users = res.data;
      },
      openDeleteModal(project) {
          this.isDeleteModalOpen = true;
          this.selectedProject = project;
      },
      openDuplicateModal(project) {
          this.isDuplicateModalOpen = true;
          this.selectedProject = project;
      },
      openNewProjectModal() {
          this.isNewProjectModalOpen = true;
      },
      exit() {
          console.log("here");
          this.isModalOpen = false;
          this.getWorkspaces();
      },
      exitDelete() {
          this.isDeleteModalOpen = false;
          this.getWorkspaces();
      },
      exitDuplicate() {
          this.isDuplicateModalOpen = false;
          this.getWorkspaces();
      },
      exitNewProjectModal() {
          this.isNewProjectModalOpen = false;
          this.getWorkspaces();
      },

      getWorkspaces() {
        console.log("here22");
        this.$axios.get("http://ceres.host.412294.xyz" + "/users/workspaces?username="+this.$store.state.auth.user,
          {
            headers: {
              'Content-Type':'application/json',
              'x-access-token': this.$store.state.auth.jwt
            }
          }
        )
          .then(response => {
            console.log(response.data);
            this.info = response.data;

          })
          .catch(error => {
            console.log(error);
          })
      },

      enterWorkspace(project) {
        console.log("hhhhhhhhh")
        console.log(project)
        this.$router.push('/Workspace?id='+project.id);
      },

  },
  mounted: function() {
    // Getting VM info
    /*
    this.info = {
      projects: [
        {
          name: "test1",
          os: "Linux",
          config: ["python","bogosort","opencv"],
          users: ["fairnightzz","kaitokid", "nickliu02", "lmaoxd", "darkgreenrice", "waterpoke", "pikachu"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        },
        {
          name: "test2",
          os: "Linux",
          config: ["java","bst-tree","php"],
          users: ["darkgreenrice","waterpoke"],
          thumbnail: "https://www.osboxes.org/wp-content/uploads/photo-gallery/ubuntu.jpg"
        }
      ]
    }
    */
    console.log(this.$store.state.auth.jwt);
    this.getWorkspaces();
    
  }
}
</script>

<style scoped>
.project {
    display: inline-block;
    margin: 10px;
    text-align: center;
}

</style>
