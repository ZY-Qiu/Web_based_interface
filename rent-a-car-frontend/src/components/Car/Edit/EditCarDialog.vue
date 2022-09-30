<template>
<v-container xs-12>
    <v-layout row justify-center>
        <v-dialog v-model = "dialog" persistent max-width="360" @keydown.esc="cancelFilterModal">
            <v-btn class="grey--text" large slot="activator" color="orange accent-1">
                <v-icon dark>edit</v-icon>
                Edit
            </v-btn>
        <v-card>
            <v-container >
                <v-layout row wrap>
                    <v-flex xs-12>
                        <v-toolbar dark  color="blue-grey lighten-2">
                            <v-toolbar-title>
                                <div class="text-xs-center">Edit car</div>
                            </v-toolbar-title>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs-12>
                        <v-card-text>
                            <v-text-field v-model = "editedCar.model" v-validate="'required'" prepend-icon="directions_car" name="editedModel" label="Model" type="text"></v-text-field>
                            <v-text-field v-model = "editedCar.registration" v-validate="'required'" prepend-icon="directions_car" name="editedRregistration" label="Registration" type="text"></v-text-field>
                            <v-text-field v-model= "editedCar.price" v-validate="'required|numeric'"  prepend-icon="euro_symbol" name="price" label="Price per day" type="number"></v-text-field>
                            <v-text-field v-model = "editedCar.year" v-validate="'required|numeric'" prepend-icon="access_time" name="editedYear" label="Year" type="text"></v-text-field>
                            <v-text-field v-model = "editedCar.consuming" v-validate="'required|numeric'" prepend-icon="local_gas_station" name="editedConsuming" label="Consuming" type="text"></v-text-field>
                            <v-btn
                                color="orange accent-1"
                                class="blue-grey--text"
                                @click.native="pickFile"
                                >
                                Upload image
                                <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                            <input name="image" @change="processFile($event)" style="display: none" type="file" ref="inputFile" accept="image/*"> 
                            <!-- <span class="red--text">{{ errors.first('imageURL') }}</span> -->
                            <v-layout align-center justify-center class="mt-3">
                            <v-flex xs12 sm8 md6>
                                <img :src="imageURL" height="150">
                            </v-flex> 
                            </v-layout>
                            <v-textarea v-model = "editedCar.description"  prepend-icon="description" name="editedDescription" label="Car description"  type="text"></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                 <v-layout row wrap>
                    <v-flex xs-12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn block flat  @click.native="dialog = false">Cancel</v-btn>
                            <v-btn color="blue-grey lighten-2" block dark  @click.native="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { carService } from '../../../services/carService';
export default {
    props: ['car'],
    data () {
        return {
            editedCar: {
                id: this.car.id,
                model: this.car.model,
                registration: this.car.registration,
                year: this.car.year,
                consuming: this.car.consuming,
                price: this.car.price,
                image: '',
                description: this.car.description,
            },
            imageURL: '',
            dialog: false,
        }
    },
    methods: {
        onSave () {
            if (this.editedCar.model.trim() == '' || this.editedCar.registration.trim() == '' 
            || this.editedCar.year === null || this.editedCar.consuming === null
            || this.editedCar.description.trim() == '' || this.editedCar.price === null) {
                return
            }
            carService.editCar(this.editedCar);
            this.dialog = false;
        },
        cancelFilterModal () {
            this.dialog = false;
        },
        pickFile() {
          this.$refs.inputFile.click();
        },
        processFile(event) {
            let fileName = event.target.files[0].name;
            if(fileName.lastIndexOf(".") <= 0) {
                alert("Please enter a valid file!");
            }
            this.editedCar.image = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.addEventListener('load', () => {
                this.imageURL = fileReader.result;
            });
         },
    },
    
}
</script>

