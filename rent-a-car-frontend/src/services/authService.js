import axios from 'axios'
import store from "../store"
import qs from 'qs'
import router from "../router";

export default class Auth {
  constructor () {
    //axios.defaults.baseURL = 'http://localhost:8000/api/auth';
    //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }

  login(user, compo) {
    // store.dispatch('setLoadingTrue');
    // store.dispatch('clearError');
    // store.dispatch('clearSuccess');
    // var params = new URLSearchParams();
    // params.append('username', user.email);
    // params.append('pwd', user.password);
    return axios.post('http://localhost:8000/APP/login', user)
        .then((response) => {
          // localStorage.setItem('token', response.data.access_token);
          // localStorage.setItem('user', JSON.stringify(response.data.user));
          // var res_json = JSON.stringify(response.dat)
          console.log(response.data)
          if (response.data && response.data.result === 200){
            console.log("good")
            // localStorage.setItem('cid', response.data.user_id)
            // console.log(localStorage.getItem('cid'));
            console.log(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            store.dispatch('initUser', response.data.user[0]);
            compo.$alert("login success!")
            router.push('/cars');
          }
          else{
            console.log("bad")
            compo.$alert(response.data.msg)
          }

          // store.dispatch('setSuccess', {'message': `Welcome ${response.data.user[0].name} !`} );
          // store.dispatch('setLoadingFalse');
        })
        .catch((error) => {
          console.log(error);
          // store.dispatch('setLoadingFalse');
          //console.log(error.response.data.errors);
          // store.dispatch('setError', error.response.data.errors);
        });
  }

  register(user, compo) {
    // store.dispatch('setLoadingTrue');
    // store.dispatch('clearError');
    // store.dispatch('clearSuccess');
    return axios.post('http://localhost:8000/APP/individualRegister', user)
        .then((response) => {
          console.log(response.data)
          if (response.data && response.data.result === 200){
            console.log("good")
            compo.$alert("register success!")
            router.push('/login');
          }
          else{
            console.log("bad")
          }
          // localStorage.setItem('token', response.data.access_token);
          // localStorage.setItem('user', JSON.stringify(response.data.user));
          // store.dispatch('initUser', response.data.user);
          // store.dispatch('setSuccess', {'message': `Welcome ${response.data.user[0].name} !`} );
          // store.dispatch('setLoadingFalse');

        })
        .catch((error) => {
          // store.dispatch('setLoadingFalse');
          // store.dispatch('setError', error.response.data.errors );
        });
  }
}

export const auth = new Auth();
