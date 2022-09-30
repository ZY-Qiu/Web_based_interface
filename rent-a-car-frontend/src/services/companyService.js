import axios from "axios"
import store from "../store"
import router from '../router'

export default class CompanyService {
  constructor () {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }

  addCompany(company) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    store.dispatch('clearSuccess');
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        
    return axios.post("companies", company)
      .then( (response) => {
        // handle success
        store.dispatch('createCompany', response.data);
        store.dispatch('setSuccess', {'message': "You successfully created company!"} );
        store.dispatch('setLoadingFalse');
        router.push('/companies')
      })
      .catch(error => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error.response.data.errors)
      });
  };

  getCompanies() {
    return axios.get("companies");
  };

  deleteCompany(id) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    store.dispatch('clearSuccess');
    return axios.delete(`companies/${id}`)
      .then((response) => {
        store.dispatch('deleteCompany', id);
        store.dispatch('setSuccess', {'message': "You successfully deleted company!"} );
        store.dispatch('setLoadingFalse');
        router.push('/')
      })
      .catch((error) => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error);
  });
  }
  
  editCompany(company) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    store.dispatch('clearSuccess');
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;
    let formData = new FormData()
        formData.append('name', company.name)
        formData.append('address', company.address)
        formData.append('phone', company.phone)
        formData.append('_method', 'PUT');

    return axios.post(`/companies/${company.id}`, formData)
      .then((response) => {
        store.dispatch('updateCompany', response.data.data);
        store.dispatch('setSuccess', {'message': "You successfully edited company!"} );
        store.dispatch('setLoadingFalse');
      })
      .catch((error) => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error);
      });
  };

  getCompanyCars(id) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');

    return axios.get(`/companies/${id}/cars`)
    .then((response) => {
      store.dispatch('setLoadingFalse');
      return response.data.data;
    })
    .catch((error) => {
      console.log(error)
      store.dispatch('setLoadingFalse');
      store.dispatch('setError', error);
    });

  }

}

export const companyService = new CompanyService();