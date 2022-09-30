<template>
<div>
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


        <back></back>
        
      </v-container>
      
</div>
</template>

<script>
import back from '../components/Back.vue';
  export default {
    components: {
      back
    },
    computed: {
      cars () {
       return this.$store.getters.caruselCars;
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods:  {
      selectedCar(id) {
        this.$router.push(`/cars/${id}`);
      },
    }
  }
</script>


