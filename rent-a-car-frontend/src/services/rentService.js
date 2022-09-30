import axios from "axios"
import store from "../store"
import router from '../router'

export default class RentService {

  constructor () {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  };

  rentCar(rentData) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    return axios.post('rent', rentData)
      .then( (response) => {
        // handle success
        store.dispatch('setLoadingFalse');
        store.dispatch('setSuccess', {'message': "You successfully rented a car! Thank you!"} );
        router.push('/')
      })
      .catch(error => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error.data)
      });
    };

  getRentedDays(carId) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    return axios.get(`rent/${carId}`)
      .then( (response) => {
        // handle success
        store.dispatch('setLoadingFalse');
        return response.data.data;
      })
      .catch(error => {
        console.log(error)
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error.data)
      });
    };

    getMaximumPossibleDateForRent(car_id, startDate) {
      store.dispatch('setLoadingTrue');
      store.dispatch('clearError');
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
      return axios.get(`next-rent/${car_id}/${startDate}`)
        .then((response) => {
          store.dispatch('setLoadingFalse');
          return response.data;
        })
        .catch(error => {
          store.dispatch('setLoadingFalse');
          store.dispatch('setError', error.data)
        });

    };
    
}

export const rentService = new RentService();