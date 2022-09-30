<template>
    <v-content>
      <v-container>
         <v-layout row v-if= "loading">
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

        <!-- <v-layout row v-if="error">
          <v-flex xs12 sm6 offset-sm3>
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
          </v-flex>
        </v-layout> -->
        <v-snackbar class="mb-5" v-if= "error"
            v-model="snackbar"
            auto-height
            color="red"
            multi-line
            :timeout = 0
            top
            style="top: 0px"
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
            <v-card class="elevation-6 rounded-card">
              <v-card-text>
                <v-form @submit.prevent = "register" method="POST" >
                  <v-text-field prepend-icon="person" v-model= "user.username"  name="username" label="Username" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model= "user.pwd"  name="password" label="Password" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" :append-icon="show2 ? 'visibility_off' : 'visibility'"></v-text-field>
                  <v-text-field
                  id="passwordConfirm"
                  prepend-icon="lock"
                  name="password_confirmation"
                  label="Confirm password"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1" :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  v-model= "user.password_confirmation"

                  >
                  </v-text-field>
                  <v-text-field prepend-icon="email" v-model= "user.saddress"  name="saddress" label="Street" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" v-model= "user.caddress"  name="caddress" label="City" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" v-model= "user.staddress"  name="staddress" label="State" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" v-model= "user.email" type="email" name="email" label="Email" ></v-text-field>
                  <v-text-field prepend-icon="phone" v-model= "user.phone" type="phone" name="phone" label="Phone" ></v-text-field>
                  <v-text-field prepend-icon="person" v-model= "user.fname" type="fname" name="fname" label="First Name" ></v-text-field>
                  <v-text-field prepend-icon="person" v-model= "user.lname" type="lname" name="lname" label="Last Name" ></v-text-field>
                  <v-text-field prepend-icon="person" v-model= "user.dln" type="dln" name="dln" label="Driver License No." ></v-text-field>
                  <v-text-field prepend-icon="person" v-model= "user.icn" type="icn" name="icn" label="Insurance Company Name" ></v-text-field>
                  <v-text-field prepend-icon="person" v-model= "user.ipn" type="ipn" name="ipn" label="Insurance Policy No." ></v-text-field>
                  <v-btn
                    class="blue-grey--text"
                    type="submit"
                    color="orange accent-1"
                    :loading="loading"
                    :disabled="loading"
                    >
                    Register
                    <span slot="loader" class="custom-loader">
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
          pwd: '',
          saddress: '',
          caddress: '',
          staddress: '',
          zipcode: '',
          password_confirmation: '',
          email: '',
          phone: '',
          fname: '',
          lname: '',
          dln: '',
          icn: '',
          ipn: ''
        },
        passwordConfirm: '',
        snackbar: false,
        mode: '',
        show1: false,
        show2: false
      }
    },

     methods: {
      register() {
       auth.register(this.user, this);
      },

      onDismissed() {
        this.snackbar = false;
        this.$store.dispatch('clearError');
      }
    },
    computed: {
      comparePasswords() {
        return this.user.password !== this.passwordConfirm ? 'Passwords do not match' : '';
      },
      currentUser() {
        return this.$store.getters.currentUser;
      },
      error() {
        if(this.$store.getters.error){
              this.snackbar = true;
              return this.$store.getters.error;
          }
      },
      loading() {
        return this.$store.getters.loading;
      }
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

.rounded-card{
    border-radius:10px;
  }

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>
