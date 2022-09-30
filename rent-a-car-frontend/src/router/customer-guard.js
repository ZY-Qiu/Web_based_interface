import store  from '../store'

export default (to, from, next) => {

    if (store.getters.currentUser) {
        console.log('user je ulogovan')
        console.log(store.getters.currentUser[0])
        next(); 
    } else {
        console.log('user nije customer ili')
        console.log(store.getters.currentUser)
        next('/login');
    }

}