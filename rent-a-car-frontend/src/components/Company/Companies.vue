<!--<template>-->
<!--    <v-container>-->
<!--        <v-layout row v-if="loading">-->
<!--          <v-flex xs12 >-->
<!--             <div class="text-xs-center">-->
<!--                <v-progress-circular-->
<!--                  :width="10"-->
<!--                  :size="80"-->
<!--                  color="grey darken-1"-->
<!--                  indeterminate-->
<!--                  v-if="loading"-->
<!--                ></v-progress-circular>-->
<!--             </div>-->
<!--          </v-flex>-->
<!--        </v-layout>-->
<!--        <v-snackbar class="mb-5" v-if= "error"-->
<!--            v-model="snackbar"-->
<!--            auto-height-->
<!--            color="red"-->
<!--            :multi-line="mode === 'multi-line'"-->
<!--            :timeout = 0-->
<!--            top-->
<!--            absolute-->
<!--            :vertical="mode === 'vertical'"-->
<!--            >-->
<!--            <alert-component @dismissed="onDismissed" :text="error"></alert-component>-->
<!--            <v-btn-->
<!--                color="black"-->
<!--                flat-->
<!--                @click="onDismissed"-->
<!--            >-->
<!--                Close-->
<!--            </v-btn>-->
<!--        </v-snackbar>-->
<!--        <v-layout row v-if="!loading">-->
<!--            <v-flex xs12 sm10 offset-sm1>-->
<!--                <v-card class="rounded-card">-->
<!--                    <v-container fluid grid-list-sm>-->
<!--                        <v-layout row wrap>-->
<!--                            <v-flex xs12 v-for="company in companies" :key="company.id" class="rounded-card elevation-6 ma-2"> -->
<!--                                <v-card-media-->
<!--                                    class="rounded-image white&#45;&#45;text"-->
<!--                                    height="200px"-->
<!--                                    src="https://ps.w.org/multiple-location-google-map/assets/banner-772x250.png?rev=1451222"-->
<!--                                    >-->
<!--                                      <v-container fill-height fluid>-->
<!--                                        <v-layout fill-height>-->
<!--                                        <v-flex xs12 align-end flexbox>-->
<!--                                            <span > <h3 class="black&#45;&#45;text"> DEMO APP - FAKE GOOGLE MAP</h3></span>-->
<!--                                            <span > <h3 class="black&#45;&#45;text"> REAL APP - REAL GOOGLE MAP</h3></span>-->
<!--                                        </v-flex>-->
<!--                                        </v-layout>-->
<!--                                    </v-container> -->
<!--                                </v-card-media>-->
<!--                                <v-card-title>-->
<!--                                    <div>-->
<!--                                       -->
<!--                                        <span class="grey&#45;&#45;text">Name: {{company.name}}</span><br>-->
<!--                                        <span class="grey&#45;&#45;text">Address: {{company.address}}</span><br>-->
<!--                                        <span class="grey&#45;&#45;text">Phone: {{company.phone}}</span>-->
<!--                                    </div>-->
<!--                                </v-card-title>-->
<!--                                <v-card-actions>-->
<!--                                    <v-btn :to="`/companies/${company.id}/cars`" class="blue-grey&#45;&#45;text" color="orange accent-1">Cars ({{company.numberOfCars}})</v-btn>-->
<!--                                    <span><edit-company-dialog v-if="canUserEdit" :company="company"></edit-company-dialog></span>-->
<!--                                </v-card-actions>-->
<!--                            </v-flex>-->
<!--                        </v-layout>-->
<!--                    </v-container>-->
<!--                </v-card>-->
<!--            </v-flex>-->
<!--    </v-layout>-->
<!--</v-container>-->
<!--</template>-->

<!--<script>-->
<!--import { companyService } from '../../services/companyService';-->
<!--export default {-->
<!--    data () {-->
<!--      return {-->
<!--        snackbar: false,-->
<!--        y: '500',-->
<!--        x: null,-->
<!--        mode: '',-->
<!--        timeout: 6000-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--        companies: function () {-->
<!--            return this.$store.getters.getCompanies;-->
<!--        },-->
<!--        loading () {-->
<!--            return this.$store.getters.loading-->
<!--        },-->
<!--        isUserauthenticated() {-->
<!--            return  this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;-->
<!--        },-->
<!--        canUserEdit() {-->
<!--            if (!this.isUserauthenticated) {-->
<!--                return-->
<!--            }-->
<!--            return this.$store.getters.currentUser[0].role_id !== 1-->
<!--        },-->
<!--        error() {-->
<!--            if(this.$store.getters.error){-->
<!--                this.snackbar = true;-->
<!--                return this.$store.getters.error;-->
<!--            }-->
<!--        },-->
<!--    },-->
<!--    methods: {-->
<!--        onDismissed() {-->
<!--            this.snackbar = false;-->
<!--            this.$store.dispatch('clearError');-->
<!--        },-->
<!--    }-->
<!--    -->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.rounded-card{-->
<!--    border-radius:10px;-->
<!--}-->

<!--.rounded-image{-->
<!--    border-radius:10px 10px 0px 0px;-->
<!--    margin: 0px;-->
<!--}-->

<!--</style>-->


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
    <v-layout row v-if="!loading">
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="rounded-card">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 class="rounded-card elevation-6 ma-2">
                <v-card-title>
                  <div class="usertitle">
                    <b>User information</b>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div class="userinfo">
                    <span class="grey--text">ID: {{user.id}}</span><br>
                    <span class="grey--text">Address: {{user.address}}</span><br>
                    <span class="grey--text">Email: {{user.email}}</span><br>
                    <span class="grey--text">Phone: {{user.phone}}</span>
                    <div v-if="user.ctype=='I'">
                      <span class="grey--text">Name: {{user.name}}</span><br>
                      <span class="grey--text">DLN: {{user.dln}}</span><br>
                      <span class="grey--text">ICN: {{user.icn}}</span><br>
                      <span class="grey--text">IPN: {{user.ipn}}</span>
                    </div>
                    <div v-if="user.ctype=='C'">
                      <span class="grey--text">EmpID: {{user.empid}}</span><br>
                      <span class="grey--text">CorpName: {{user.corpname}}</span><br>
                      <span class="grey--text" v-if="user.discount!==undefined&&user.discount!==null">Discount: {{user.discount}}</span>
                    </div>
                  </div>
                </v-card-text>
                <!-- <v-card-actions>
                    <v-btn :to="`/companies/${company.id}/cars`" class="blue-grey--text" color="orange accent-1">Cars ({{company.numberOfCars}})</v-btn>
                    <span><edit-company-dialog v-if="canUserEdit" :company="company"></edit-company-dialog></span>
                </v-card-actions> -->
              </v-flex>
              <v-flex xs12 class="rounded-card elevation-6 ma-2">
                <v-card-title>
                  <div class="usertitle">
                    <b>In Renting</b>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>
                    <v-flex v-for="rent in renting" xs12 :key="rent.pickdate" class="rounded-card elevation-6 ma-2">
                      <!-- <v-flex class="rounded-card elevation-6 ma-2"> -->
                      <v-card-text>
                        <div class="userinfo">
                          <span class="grey--text">VIN: {{rent.vin}}</span><br>
                          <span class="grey--text">Type: {{rent.type}}</span><br>
                          <span class="grey--text">Make: {{rent.make}}</span><br>
                          <span class="grey--text">Model: {{rent.model}}</span><br>
                          <span class="grey--text">PickDate: {{rent.pickdate}}</span><br>
                          <span class="grey--text">PickLoc: {{rent.pickloc}}</span><br>
                          <span class="grey--text">DropLoc: {{rent.droploc}}</span><br>
                          <span class="grey--text">StartOdometer: {{rent.startodometer}}</span>
                        </div>
                        <v-card-actions>
                            <!--  :to="`/ReturnCar`" -->
                            <v-btn :to="{path: `/ReturnCar`, params: {vin: rent.vin}}" class="blue-grey--text" color="orange accent-1">Return Car</v-btn>
                            <!-- <router-link to="/ReturnCar">ReturnCar</router-link> -->
                            <!-- <router-view></router-view> -->
                        </v-card-actions>
                      </v-card-text>
                    </v-flex>
                  </div>
                </v-card-text>
              </v-flex>
              <v-flex xs12 class="rounded-card elevation-6 ma-2">
                <v-card-title>
                  <div class="usertitle">
                    <b>Rent history</b>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>
                    <v-flex v-for="history in histories" xs12 :key="history.pickdate" class="rounded-card elevation-6 ma-2">
                      <!-- <v-flex class="rounded-card elevation-6 ma-2"> -->
                      <v-card-text>
                        <div class="userinfo">
                          <span class="grey--text">VehicleIN: {{ history.vin }}</span><br>
                          <span class="grey--text">Type: {{ history.type }}</span><br>
                          <span class="grey--text">Make: {{ history.make }}</span><br>
                          <span class="grey--text">Model: {{ history.model }}</span><br>
                          <span class="grey--text">Pickupdate: {{ history.pickupdate }}</span><br>
                          <span class="grey--text">Dropdate: {{ history.dropdate }}</span><br>
                          <span class="grey--text">Pickloc: {{ history.pickloc }}</span><br>
                          <span class="grey--text">Droploc: {{ history.droploc }}</span><br>
                          <span class="grey--text">Mileage: {{ history.mileage }}</span>
                        </div>
                      </v-card-text>
                    </v-flex>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import store from "../../store";

export default {
  data () {
    return {
      user:{
        id: "1",
        address: "NY, NEW YORK CITY, William ST, 10001",
        email: "10001@nyu.edu",
        phone: "123-456-101",
        name: "Justin Bieber",
        dln: "1000001",
        ctype: "I",
        icn: "Wellfleet",
        ipn: "1",
        empid: "10001",
        corpname: "Apple",
        discount: "5.20"
      },
      snackbar: false,
      y: '500',
      x: null,
      mode: '',
      timeout: 6000
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.currentUser;
    },
    histories: function () {
      return this.$store.getters.getCompanies;
    },
    renting: function () {
      return this.$store.getters.getRenting;
    },
    loading () {
      return this.$store.getters.loading
    },
    isUserauthenticated() {
      return  this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    },
    canUserEdit() {
      if (!this.isUserauthenticated) {
        return
      }
      return true
    },
    error() {
      if(this.$store.getters.error){
        this.snackbar = true;
        return this.$store.getters.error;
      }
    },
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage(){
      var tmp_u = this.$store.getters.currentUser;
      // console.log(cid)
      console.log('fuck it!!!!!!!')
      console.log(this.$store.getters.currentUser);
      // console.log(localStorage.getItem('cid'))
      // this.getUserInfo(cid);
      this.getHistory(tmp_u.id);
      this.requestRenting(tmp_u.id);
    },

    getUserInfo(cid){
      var url = "http://localhost:8000/APP/getUserInfo";

      axios.post(url, {cid: cid}).then(response => {
        console.log("get user info")
        console.log(response.data);
        // this.user = response.data;
      })
    },

    getHistory(cid){
      var url = "http://localhost:8000/APP/getHistory";
      axios.post(url, {cid: cid}).then(response => {
        console.log("get history")
        console.log(response.data);
        store.dispatch('setHistory', response.data);
      })
    },

    requestRenting(cid){
      var url = "http://localhost:8000/APP/requestRenting";
      axios.post(url, {cid: cid}).then(response => {
        console.log("requestRenting")
        console.log(response.data);
        store.dispatch('setRenting', response.data.data);
      })
    },

    onDismissed() {
      this.snackbar = false;
      this.$store.dispatch('clearError');
    },
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

.usertitle {
  font-size: 24px;
}
.userinfo {
  font-size: 20px;
}

</style>



