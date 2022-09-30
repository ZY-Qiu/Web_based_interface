import store  from '../store'

export default (to, from, next) => {

    if (store.getters.currentUser && store.getters.currentUser[0].role_id >= 1) {
        next(); 
    } else {
        next('/login');
    }

}