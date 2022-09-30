import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import Home from '../components/Home';
import Cars from '../components/Car/Cars';
import Car from '../components/Car/Car';
import NewCar from '../components/Car/NewCar';
import RentCar from '../components/Car/RentCar';
import AuthGuard from './auth-guard'
import CustomerGuard from './customer-guard'
import Companies from '../components/Company/Companies';
import CompanyCars from '../components/Company/CompanyCars';
import NewCompany from '../components/Company/NewCompany';
import ReturnCar from '../components/ReturnCar'

Vue.use(Router);

export default new Router({
     
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
       
      },
      {
        path: '/ReturnCar',
        name: 'ReturnCar',
        component: ReturnCar,
       
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
       
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        
      },
      {
        path: '/cars',
        name: 'cars',
        component: Cars,
        
      },
      {
        path: '/newcar',
        name: 'newcar',
        component: NewCar,
        beforeEnter: AuthGuard
        
      },
      {
        path: '/cars/:id',
        name: 'car',
        component: Car,
        
      },
      {
        path: '/companies',
        name: 'companies',
        component: Companies,
        
      },
      {
        path: '/companies/:id/cars',
        name: 'companyCars',
        component: CompanyCars,
      },
      {
        path: '/newCompany',
        name: 'newCompany',
        component: NewCompany,
        beforeEnter: AuthGuard
        
      },
      {
        path: '/rent-car/:id',
        name: 'rent-car',
        component: RentCar,
        beforeEnter: AuthGuard
        
      },
      
    ],
    mode: 'history'
})