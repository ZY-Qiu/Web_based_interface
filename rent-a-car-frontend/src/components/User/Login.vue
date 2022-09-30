<template>
    <v-content>
      <v-container>
        <v-layout row v-if="loading">
          <v-flex xs12 >
             <div class="text-xs-center">
                <v-progress-circular
                  :width="10"
                  :size="80"
                  color="grey darken-1"
                  indeterminate
                  v-if="loading"
                ></v-progress-circular>
             </div>
          </v-flex>
        </v-layout>
        <v-snackbar class="mb-5" v-if="error"
            v-model="snackbar"
            auto-height
            color="red"
            multi-line
            :timeout = 0
            top
            absolute
            >
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
            <v-btn
                color="black"
                flat
                @click="onDismissed"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-layout class="mt-5" row v-if= "!loading">
          <v-flex xs12 sm6 offset-sm3>
            <v-card class="rounded-card elevation-6">
              <v-card-text>
                <v-form @submit.prevent = "login" method="POST">
                  <v-text-field prepend-icon="person" v-model="user.username" name="username" label="Username" type="text" required></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="user.password" name="password" label="Password" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :append-icon="show1 ? 'visibility_off' : 'visibility'"></v-text-field>
                  <v-btn
                  type="submit"
                  class="blue-grey--text"
                  color="orange accent-1"
                  :loading= "loading"
                  :disabled= "loading"
                  >
                    Login
                    <span slot= "loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { auth } from '../../services/authService';

  export default {
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        snackbar: false,
        mode: '',
        show1: false
      }
    },
    methods: {
      login() {
       auth.login(this.user, this);
      },
      onDismissed() {
        this.snackbar = false;
        this.$store.dispatch('clearError');
      }
    },
    computed: {
      error() {
        if(this.$store.getters.error){
            this.snackbar = true;
            return this.$store.getters.error;
          }
      },
      loading() {
        return this.$store.getters.loading;
      },
      currentUser() {
        return this.$store.getters.currentUser;
      },
    },
    watch: {
      currentUser(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  .rounded-card{
    border-radius:10px;
  }

</style>
