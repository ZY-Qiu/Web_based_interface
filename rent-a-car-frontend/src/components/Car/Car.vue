<template>
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

        <!-- <v-layout row v-if= "error">
          <v-flex xs12 sm10 offset-sm1>
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
          </v-flex>
        </v-layout> -->
         <v-snackbar class="mb-5" v-if= "error"
            v-model="snackbar"
            auto-height
            color="red"
            :multi-line="mode === 'multi-line'"
            :timeout = 0
            top
            absolute
            :vertical="mode === 'vertical'"
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
              <v-form @submit.prevent = "PlaceOrder" method="POST" >
                <v-text-field v-model= "user.PickDate" type="PickDate" name="Pick Date" label="Pick Date" ></v-text-field>
                <v-text-field v-model= "user.DropDate" type="DropDate" name="Drop Date" label="Drop Date" ></v-text-field>



                <v-select
                    v-model="user.DropSAddress"
                    :items="items"
                    label="Drop Location"
                ></v-select>

                <v-text-field v-model= "user.CouID" type="CouID" name="CouID" label="Coupon ID" ></v-text-field>
                <v-text-field v-model= "user.CardType" type="CardType" name="CardType" label="Card Type" ></v-text-field>
                <v-text-field v-model= "user.CardNumber"  name="CardNumber" label="Card Number"></v-text-field>

                <v-btn
                    class="blue-grey--text"
                    type="submit"
                    color="orange accent-1"
                    :loading="loading"
                    :disabled="loading"
                >
                  Place Order
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
</template>

<script>
import { carService } from '../../services/carService';
import {auth} from "../../services/authService";
import axios from "axios";
export default {
  data () {

    return {
      user: {
        VIN: '',
        PickDate: '',
        DropDate: '',
        DropSAddress: '',
        DropCAddress: '',
        DropSTAddress: '',
        CouID: '',
        CardNumber: '',
        CardType: ''
      },
      Invoice:{},
      items: ['A', 'B', 'C', 'D'],
    }
  },
    methods: {
        PlaceOrder() {
            this.user.VIN = this.$route.params.VIN;
            var url = "http://localhost:8000/APP/PlaceOrder";
            console.log(axios);
            axios.post(url).then(response => {
              console.log(response.data);
              this.Invoice = response.data;
              console.log("下单成功")
            })
        },
        deleteCar(id){
            carService.deleteCar(id);
        },
        onDismissed() {
            this.snackbar = false;
            this.$store.dispatch('clearError');
        },
        rent(id) {
            if (!this.isUserauthenticated) {
             this.$router.push('/login')
            } else {
                // ovde treba dodati logiku za rentiranje
              this.$router.push(`/rent-car/${id}`)
            }
        }
    },
    
    computed: {
       car () {
        var id = this.$route.params.id;
        return this.$store.getters.getCarById(id);
      },
      loading () {
        return this.$store.getters.loading
      },
      error() {
          if(this.$store.getters.error){
            this.snackbar = true;
            return this.$store.getters.error;
          }
      },

    isUserauthenticated() {
       return this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    },
    canUserEdit() {
        if (!this.isUserauthenticated) {
            return
        }
        return this.$store.getters.currentUser[0].company_id == this.car.company_id
    }
    }
}
</script>

<style scoped>
.rounded-card{
    border-radius:10px;
}

.rounded-image{
    border-radius:10px 10px 0px 0px;
    margin: 0px;
}

</style>

