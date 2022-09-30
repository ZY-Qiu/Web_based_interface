<template>
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

      <v-snackbar class="mb-5" v-if= "error"
            v-model="snackbar"
            auto-height
            color="red"
            multi-line 
            :timeout = 0
            top
            style="top: 45px"
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

      <v-layout v-if="!loading" align-center justify-center class="mt-5">
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-6 rounded-card">
            <v-card-text>
              <v-form @submit.prevent="createCompany">
                <v-text-field v-validate="'required'" autofocus v-model= "company.name" prepend-icon="language" name="name" label="Company name" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('name') }}</span>
                <v-text-field v-validate="'required'" v-model= "company.address" prepend-icon="location_on" name="address" label="Address" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('address') }}</span>
                <v-text-field v-validate="'required'" v-model= "company.phone" prepend-icon="phone" name="phone" label="Phone" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('phone') }}</span>
                <v-btn :disabled= "!curentUser" type="submit" class="blue-grey--text" color="orange accent-1">Save</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { companyService } from '../../services/companyService';

export default {
  data() {
    return {
      company: {
        address: '',
        name: '',
        phone: '',
      },
      curentUser: null,
    }
  },
  computed : {
    error() {
      if(this.$store.getters.error){
        this.snackbar = true;
        return this.$store.getters.error;
      }
    },
    loading () {
        return this.$store.getters.loading
      }
  },
  methods: {
    createCompany(){
      if (this.curentUser === null) {
        return;
      }
      this.$validator.validate().then(() => {
          companyService.addCompany(this.company);
      });
    },
    onDismissed() {
      this.snackbar = false;
      this.$store.dispatch('clearError');
    }
  },
  created () {
      this.curentUser = this.$store.getters.currentUser;
  }
}
</script>

<style scoped>
.rounded-card{
    border-radius:10px;
}


</style>
