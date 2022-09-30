<template>
  <v-layout class="mt-5" row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card class="elevation-6 rounded-card">
            <v-card-text>
              <v-form @submit.prevent = "Return_Car" method="POST" >
                <v-text-field v-model= "returnData.endodometer" name="endodometer" label="endodometer" ></v-text-field>
                <v-text-field v-model= "returnData.startodometer" name="startodometer" label="startodometer" ></v-text-field>
                <v-text-field v-model= "returnData.cardNumber" name="cardNumber" label="cardNumber" ></v-text-field>
                <v-text-field v-model= "returnData.method_ID" name="method_ID" label="Card Type" ></v-text-field>
                <div>
                    <div>Debit: 1, Crdit: 2, Gift: 3</div>
                </div>
                <v-btn
                    class="blue-grey--text"
                    type="submit"
                    color="orange accent-1"
                >
                  Return_Car
                  <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
</template>

<script>
import axios from "axios";
import router from '../router';

export default {
  name: "ReturnCar",
  data () {
    return {
      returnData: {
        cid: 1,
        vin: 1,
        pickdate: 2,
        endorometer: '',
        startodometer: '',
        cardNumber: '',
        method_ID: ''
      }
    }
  },
  methods: {
    Return_Car() {
      var url = "http://localhost:8000/APP/ReturnCar";
      axios.post(url, {returnData: this.returnData}).then(response => {
        console.log("return car successful");
      })
      this.$router.go(-1);
    }
  }
}
</script>


