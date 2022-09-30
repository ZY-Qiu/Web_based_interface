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
        <v-layout row v-else>
            <v-flex xs12 sm10 offset-sm1>
                <v-card>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                            <v-flex v-for="car in cars" :key="car.id" xs4 class="rounded-card elevation-6 mt-1"> 
                                <v-card-media
                                    class="rounded-image white--text"
                                    height="200px"
                                    :src="'http://localhost:8000/storage/images/' + car.image"
                                    >
                                    <!-- <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline">{{car.available}}</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container> -->
                                </v-card-media>
                                <v-card-title>
                                    <div>
                                        <span class="grey--text">{{car.model}}</span><br>
                                        <span class="grey--text">available: {{car.available == "available" ? "yes": "no"}}</span>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                        <v-btn :to="`/cars/${car.id}`" color="orange accent-1">Details</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { companyService } from '../../services/companyService';
export default {
    data () {
        return {
            cars: []
        }
    },
    created () {
        var id = this.$route.params.id;
        companyService.getCompanyCars(id)
        .then(data => this.cars = data);
       
    },
    computed: {
        
        loading () {
            return this.$store.getters.loading
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

