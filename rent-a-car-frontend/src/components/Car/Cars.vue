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
<!--        <v-snackbar class="mb-5" v-if="success"-->
<!--            v-model="successSnackbar"-->
<!--            auto-height-->
<!--            :timeout="timeout"-->
<!--            color="green lighten-2"-->
<!--            multi-line -->
<!--            top-->
<!--            style="top: 50px"-->
<!--            absolute-->
<!--        >-->
<!--            <success-component @dismissed="onDismissed" :text="success"></success-component>-->
<!--            <v-btn-->
<!--            color="black"-->
<!--            flat-->
<!--            @click="onDismissed"-->
<!--            >-->
<!--            Close-->
<!--            </v-btn>-->
<!--        </v-snackbar>-->
<!--        <v-layout v-if="!loading" class="mt-2" >-->
<!--            <v-flex xs12 sm10 offset-sm1 >-->
<!--                <v-text-field -->
<!--                    v-model="search"-->
<!--                    solo-->
<!--                    label="Search for a car..."-->
<!--                ></v-text-field>-->
<!--            </v-flex>-->
<!--        </v-layout>-->
<!--        <v-layout row v-if="!loading" class="mt-2">-->
<!--                <v-flex xs12 sm10 offset-sm1>-->
<!--                    <v-card>-->
<!--                        <v-container fluid grid-list-sm>-->
<!--                            <v-layout row wrap>-->
<!--                                <v-flex v-for="car in filteredCars" :key="car.id" xs4 class="rounded-card elevation-6 mt-1"> -->
<!--                                    <v-card-media-->
<!--                                        class="rounded-image white&#45;&#45;text"-->
<!--                                        height="200px"-->
<!--                                        :src="'http://localhost:8000/storage/images/' + car.image"-->
<!--                                        >-->
<!--                                        &lt;!&ndash; <v-container fill-height fluid>-->
<!--                                            <v-layout fill-height>-->
<!--                                            <v-flex xs12 align-end flexbox>-->
<!--                                                <span class="headline">{{car.available}}</span>-->
<!--                                            </v-flex>-->
<!--                                            </v-layout>-->
<!--                                        </v-container> &ndash;&gt;-->
<!--                                    </v-card-media>-->
<!--                                    <v-card-title>-->
<!--                                        <div>-->
<!--                                            <span class="grey&#45;&#45;text">{{car.model}}</span><br>-->
<!--                                            <span class="grey&#45;&#45;text">Price: {{car.price}} euros/day</span><br>-->
<!--                                            <span class="grey&#45;&#45;text">Location: {{car.location}}</span>-->
<!--                                        </div>-->
<!--                                    </v-card-title>-->
<!--                                    <v-card-actions>-->
<!--                                        <v-btn class="blue-grey&#45;&#45;text" block :to="`/cars/${car.id}`" color="orange accent-1">Details</v-btn>-->
<!--                                    </v-card-actions>-->
<!--                                </v-flex>-->
<!--                            </v-layout>-->
<!--                        </v-container>-->
<!--                    </v-card>-->
<!--                </v-flex>-->
<!--            -->
<!--    </v-layout>-->
<!--</v-container>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->

<!--    data() {-->
<!--        return {-->
<!--            search: '',-->
<!--            successSnackbar: false,-->
<!--            timeout:10000-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        cars () {-->
<!--            return this.$store.getters.getCars;-->
<!--        },-->
<!--        loading () {-->
<!--            return this.$store.getters.loading-->
<!--        },-->
<!--        filteredCars() {-->
<!--            return this.cars.filter((car) => {-->
<!--                return car.model.toLowerCase().match(this.search.toLowerCase())-->
<!--            })-->
<!--        },-->
<!--        success() {-->
<!--            if(this.$store.getters.success){-->
<!--                this.successSnackbar = true;-->
<!--                return this.$store.getters.success;-->
<!--            }-->
<!--        },-->
<!--    },-->
<!--    methods: {-->
<!--        onDismissed() {-->
<!--            this.successSnackbar = false;-->
<!--            this.$store.dispatch('clearSuccess');-->
<!--        }-->
<!--    }-->
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
    <v-snackbar class="mb-5" v-if="success"
                v-model="successSnackbar"
                auto-height
                :timeout="timeout"
                color="green lighten-2"
                multi-line
                top
                style="top: 50px"
                absolute
    >
      <success-component @dismissed="onDismissed" :text="success"></success-component>
      <v-btn
        color="black"
        flat
        @click="onDismissed"
      >
        Close
      </v-btn>
    </v-snackbar>


    <v-layout v-if="!loading" class="mt-2" row wrap align-center>
      <v-flex xs12>
        <ve-table :columns="columns" :table-data="tableData"
                  fixed-header
                  border-y
                  :max-height="500"
                  :scroll-width="1400"
        >
        </ve-table>
      </v-flex>

      <v-flex>
        <v-card class="elevation-6 rounded-card">
          <v-card-text>
            <v-form @submit.prevent = "Order" method="POST" >

              <v-select
                  v-model="SelectedCarID"
                  :items="items"
                  label="Select the cars above"
              ></v-select>

              <v-btn
                  class="blue-grey--text"
                  type="submit"
                  color="orange accent-1"
                  :loading="loading"
                  :disabled="loading"
              >
                Order Now
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
import axios from "axios";

export default {

  data() {
    return {
      columns:[
        { field: "vin", key: "a", title: "VIN", align: "center" },
        { field: "make", key: "b", title: "Make", align: "center"},
        { field: "model", key: "c", title: "Model", align: "center" },
        { field: "year", key: "d", title: "Year", align: "center" },
        { field: "lpn", key: "e", title: "LPN", align: "center" },
        { title: 'order',
          dataIndex: 'tags',
          key: 'tags',
          scopedSlots: { customRender: 'tags' }, },
      ],

      tableData: [
        {
          vin:"vin",
          make:"make",
          model:"model",
          year:"year",
          lpn:"lpn",
        }
      ],
      items: ["1","2","3"],
      SelectedCarID: '',
      search: '',
      successSnackbar: false,
      timeout:10000
    }
  },
  computed: {
    cars () {
      return this.$store.getters.getCars;
    },
    loading () {
      return this.$store.getters.loading
    },
    filteredCars() {
      return this.cars.filter((car) => {
        return car.model.toLowerCase().match(this.search.toLowerCase())
      })
    },
    success() {
      if(this.$store.getters.success){
        this.successSnackbar = true;
        return this.$store.getters.success;
      }
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData(){
      var url = "http://localhost:8000/APP/getAllVehicles";
      console.log(axios);
      axios.get(url).then(response => {
        console.log(response.data);
        this.tableData = response.data;
        console.log("获取列表成功")
      })
    },
    Order:function(){
      this.$router.push({path:`/car`, params:{VIN: this.SelectedCarID}});
    },
    onDismissed() {
      this.successSnackbar = false;
      this.$store.dispatch('clearSuccess');
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


