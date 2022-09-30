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

        <v-layout row wrap v-if="!loading">
            <v-flex xs12>
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1" color="orange accent-1">Choose the first day</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2" color="orange accent-1">Choose the last day</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3" color="orange accent-1">Confirm</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                            class="mb-3 rounded-card"
                            height="400px"
                            >
                                <v-card-title>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 offset-md3>
                                            <v-date-picker 
                                                     
                                                    first-day-of-week=1
                                                    :allowed-dates="allowedStartDates"
                                                    color="blue-grey lighten-1"
                                                    header-color="blue-grey lighten-1"
                                                    v-model="date"
                                                    :min="date"
                                                    :picker-date.sync="getMaximumPossibleDateForRent"
                                                    class="ma-1 rounded-card elevation-6"
                                                    >
                                            </v-date-picker>
                                        </v-flex> 
                                    </v-layout>
                                </v-card-title>
                            </v-card>
                            <v-btn flat @click="cancel">
                                Cancel
                            </v-btn>
                            <v-btn
                            class="blue-grey--text"
                            color="orange accent-1"
                            @click="e1 = 2"
                            >
                            Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card
                            class="mb-3 rounded-card"
                            height="400px"
                            >
                                <v-card-title>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 offset-md3 >
                                            <v-date-picker
                                            xs12 
                                            first-day-of-week=1
                                            color="blue-grey lighten-1"
                                            header-color="blue-grey lighten-1"
                                            :min="date"
                                            :max="max2"
                                            v-model="date2"
                                            class="ma-1 rounded-card elevation-6"
                                            >
                                            </v-date-picker>
                                        </v-flex> 
                                    </v-layout>
                                </v-card-title>
                            </v-card>
                            <v-btn flat @click="e1 = 1">
                                <v-icon left>arrow_back</v-icon>
                                Back
                            </v-btn>
                              <v-btn
                            class="blue-grey--text"
                            color="orange accent-1"
                            @click="e1 = 3"
                            >
                            Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-card
                            class="mb-3  rounded-card"
                            height="400px"
                            >
                            <v-layout row wrap xs12>
                                <v-flex xs6 class="mb-1">
                                    <v-card-media
                                    class="rounded-card mb-3"
                                    height="400px"
                                    :src="'http://localhost:8000/storage/images/' + car.image"
                                    >
                                    </v-card-media>
                                </v-flex>
                                <v-card-title xs4 class="mb-1">
                                    <div>
                                        <h2>{{car.model}}</h2>
                                        <h3>Selected dates:</h3>
                                        {{moment(String(date)).format('DD.MM.YYYY')}} - {{moment(String(date2)).format('DD.MM.YYYY')}} 
                                        <!-- <span class="grey--text">Rent period: {{date}} -{{date2}} </span> -->
                                        <!-- <span class="grey--text">Total price: {{rent.total_price}}</span><br>
                                        <span class="grey--text">Period for rent: {{startDateTime}} - {{endDateTime}}  </span><br> -->
                                    </div>
                                </v-card-title>
                            </v-layout>
                           
                            </v-card>
                            <v-btn flat @click="e1 = 2">
                                <v-icon left>arrow_back</v-icon>    
                                Back
                            </v-btn>
                            <v-btn class="blue-grey--text" color="orange accent-1" @click.native="rentCar()">
                                <v-icon left>drive_eta</v-icon>
                                Rent
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment';
import { rentService } from '../../services/rentService';

export default {
    created() {
        const dateTime = moment();
        this.date = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.date2 = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.rent.car_id = this.car.id; 
        this.rent.user_id = this.$store.getters.currentUser[0].id;

        rentService.getRentedDays(this.rent.car_id)
            .then(response =>{
                if(response === null || response === undefined || response === []){
                    this.rentedDays = [];
                    return
                }
                let startsAndEnds = [];
                response.forEach(function (arrayItem) {
                let start = moment(arrayItem.start);
                let end = moment( arrayItem.end);
                while (moment(start).isSameOrBefore(end)) {
                    startsAndEnds.push(start.format('YYYY-MM-DD'));
                    start.add(1, 'days');
                }
                });
                this.rentedDays = startsAndEnds;
            })
            .catch(error =>{
                this.rentedDays = [];
        });
       
    },
    data () {
      return {
        e1: 0,
        snackbar: false,
        y: '500',
        x: null,
        mode: '',
        timeout: 6000,
        date: '',
        date2: '',
        getMaximumPossibleDateForRent: '',
        max2: '2018-10-15',
        startDay: '',
        someDate:'',
        rentedDays: [],
        rent: {
            user_id: '',
            car_id: '',
            start: '',
            end: '',
            total_price: '',
        },
      }
    },
    methods: {
        onDismissed() {
            this.snackbar = false;
            this.$store.dispatch('clearError');
        },
        rentCar() {
            var x = new moment(this.date)
            var y = new moment(this.date2)
            var duration = moment.duration(y.diff(x))
            var days = duration.as('days');
            this.rent.total_price = days * this.car.price;
            this.rent.start = this.startDateTime;
            this.rent.end = this.endDateTime;
            rentService.rentCar(this.rent)
            .then( () => {
                var restDate = moment();
                this.date = restDate.format('YYYY-MM-DD HH:mm:ss'),
                this.date2 = restDate.format('YYYY-MM-DD HH:mm:ss')
                }
            );
        },
        allowedStartDates(val) {
            return this.rentedDays.indexOf(val) === -1;
        },
        cancel() {
            this.$router.push(`/cars/${this.car.id}`);
        },
        
    },
    computed: {
        startDateTime() {
            const startDate = this.date;
            var hours = moment().hours() < 10 ? '0' + moment().hours() : moment().hours(); 
            var minutes = moment().minutes() < 10 ? '0' + moment().minutes() : moment().minutes();
            var seconds = moment().seconds() < 10 ? '0' + moment().seconds() : moment().seconds();
            const startDateTime = startDate + ' ' +  hours + ':' + minutes + ':' + seconds 
            return startDateTime;
        },
        endDateTime() {
            const endDate = this.date2;
            var hours = moment().hours() < 10 ? '0' + moment().hours() : moment().hours();
            var minutes = moment().minutes() < 10 ? '0' + moment().minutes() : moment().minutes();
            var seconds = moment().seconds() < 10 ? '0' + moment().seconds() : moment().seconds();
            const endDateTime = endDate + ' ' +  hours + ':' + minutes + ':' + seconds 
            return endDateTime;
        },
        car() {
            var id = this.$route.params.id;
            return this.$store.getters.getCarById(id);
        },
        loading() {
            return this.$store.getters.loading
        },
        
        error() {
            if(this.$store.getters.error){
                this.snackbar = true;
                return this.$store.getters.error;
            }
      },
      
    },
    watch: {
        date (val) {
           rentService.getMaximumPossibleDateForRent(this.rent.car_id, val)
           .then(
               response => this.max2 = response
           );
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
