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
          <v-card class="elevation-6">
            <v-card-text>
              <v-form @submit.prevent="createCar">
                <v-text-field v-validate="'required'" autofocus v-model= "car.model" prepend-icon="directions_car" name="model" label="Model" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('model') }}</span>
                <v-text-field v-validate="'required'" v-model= "car.registration" prepend-icon="directions_car" name="registration" label="Registration" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('registration') }}</span>
                <v-text-field v-validate="'required|numeric'" v-model= "car.year" prepend-icon="access_time" name="year" label="Year" type="number"></v-text-field>
                <span class="red--text">{{ errors.first('year') }}</span>
                <v-text-field v-validate="'required|numeric'" v-model= "car.price" prepend-icon="euro_symbol" name="price" label="Price per day" type="number"></v-text-field>
                <span class="red--text">{{ errors.first('price') }}</span>
                <v-text-field v-validate="'required|numeric'" v-model= "car.consuming" prepend-icon="local_gas_station" name="consuming" label="Consuming" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('consuming') }}</span>
                <v-btn
                  color="orange accent-1"
                  class="blue-grey--text"
                  @click.native= "pickFile"
                >
                  Upload image
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
                <input name="image" @change="processFile($event)" style="display: none" type="file" ref="inputFile" accept="image/*"> 
                <!-- <span class="red--text">{{ errors.first('imageURL') }}</span> -->
                <v-layout align-center justify-center class="mt-3">
                  <v-flex xs10>
                      <img class="rounded-card mt-1 elevation-6" :src="imageURL" height="100">
                  </v-flex> 
                </v-layout>
                <v-textarea v-validate="'required'" v-model= "car.description" prepend-icon="description" name="description" label="Car description" type="text"></v-textarea>
                <span class="red--text">{{ errors.first('description') }}</span>
              </v-form>
            </v-card-text>
            <v-layout row wrap>
                    <v-flex xs-12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn block :disabled= "!curentUser" to="/cars" flat>Cancel</v-btn>
                            <v-btn block :disabled= "!curentUser" type="submit" class="blue-grey--text" color="orange accent-1">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { carService } from '../../services/carService';

export default {
  data() {
    return {
      car: {
        model: '',
        registration: '',
        year: '',
        price: '',
        consuming: '',
        description: '',
        company_id: '',
        image: null
      },
      curentUser: null,
      imageURL: '',
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
    },
  },
  methods: {
    createCar(){
      if (this.curentUser === null) {
        return;
      }
      this.$validator.validate().then(() => {
        this.car.company_id = this.curentUser[0].company_id;
          carService.addCar(this.car);
      });
    },
    pickFile() {
      this.$refs.inputFile.click();
    },
    processFile(event) {
      let fileName = event.target.files[0].name;
      if(fileName.lastIndexOf(".") <= 0) {
        alert("Please enter a valid file!");
      }
      this.car.image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      });
    },
    onDismissed() {
      this.snackbar = false;
      this.$store.dispatch('clearError');
    }
  },
  created() {
      this.curentUser = this.$store.getters.currentUser;
  },

}
</script>

<style scoped>
.rounded-card{
    border-radius:10px;
}


</style>
