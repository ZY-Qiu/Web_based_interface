<template>
  <v-app>
    <v-navigation-drawer
      class="orange accent-1"
      v-model="sideNav"
      mobile-break-point="10240"
      fixed
      app
      absolute
    >
      <v-list dense>
        <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
         :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isUserauthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log-out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar  dark color="grey darken-1">
    <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
    <v-toolbar-title>
     <router-link to="/" tag="span"  style="cursor: pointer"> Rent-a-Car </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        color="grey lighten-2"
        style="font-family: Arial, Helvetica, sans-serif "
        flat v-for="item in menuItems"
        :key="item.title"
        roter
        :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
      </v-btn>
       <v-btn
        color="grey lighten-2"
        style="font-family: Arial, Helvetica, sans-serif "
        flat
        v-if="isUserauthenticated"
        @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          Loguot
      </v-btn>
    </v-toolbar-items>

   </v-toolbar>
   <main>
      <v-snackbar class="mb-5" v-if="success"
        v-model="successSnackbar"
        auto-height
        :timeout="timeout"
        color="green lighten-2"
        multi-line
        top
        style="top: 50px"
        absolute
      >
      <success-component @dismissed="onDismissed" :text="success"></success-component>
      <v-btn
        color="black"
        flat
        @click="onDismissed"
      >
        Close
      </v-btn>
  </v-snackbar>
    <router-view></router-view>
   </main>
  </v-app>
</template>


<script>

export default {
  name: 'App',
  data() {
    return {
      sideNav: null,
      loggedUser: this.$store.getters.currentUser,
      successSnackbar: false,
      timeout:10000
    }
  },
  computed: {
    success() {
      if(this.$store.getters.success){
          this.successSnackbar = true;
          return this.$store.getters.success;
        }
    },
    menuItems () {
      let menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'lock_open', title: 'Login', link: '/login'},
        {icon: 'supervisor_account', title: 'Register', link: '/register'}
      ];

      if (this.isUserauthenticated && this.$store.getters.currentUser.id !== 1) {
        menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'home', title: 'User', link: '/companies'}
        ]
      };

      if (this.isUserauthenticated && this.$store.getters.currentUser.id === 1) {
        menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'home', title: 'User', link: '/companies'},
        ]
      };

      return menuItems;
    },

    isUserauthenticated() {
       return this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    }

  },
  methods: {
    onLogout () {
      this.$router.push('/')
      this.$store.dispatch('logout');
    },
    onDismissed() {
      this.successSnackbar = false;
      this.$store.dispatch('clearSuccess');
    }
  },
};
</script>
