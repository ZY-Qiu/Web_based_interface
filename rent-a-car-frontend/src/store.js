import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

import CarModule from './store-modules/CarModule';
import CompanyModule from './store-modules/CompanyModule';
import UserModule from './store-modules/UserModule';
import HelpModule from './store-modules/HelpModule';

Vue.use(Vuex);
Vue.use(axios);

// Create store
const store = new Vuex.Store({
    modules: {
      cars: CarModule,
      companies: CompanyModule,
      users: UserModule,
      help: HelpModule,
    }
  });
  
  export default store;