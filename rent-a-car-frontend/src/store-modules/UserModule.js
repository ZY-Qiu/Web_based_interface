import store from "../store"

const UserModule = {
    state: {
      currentUser: null
      // currentUser: {id: 1, empid: 222222, address: "China", email: "abc@nyu.edu", phone: "12345", ctype: 'C', corpname: "huawei", discount: 20} // discount may not exist as well
    },
    mutations: {
      setUser: ( state, user) => {
        state.currentUser = user;
        console.log('setUser');
        console.log(state.currentUser);
      }

    },
    actions: {
      initUser: ( context, user) => {
        user = user || JSON.parse(localStorage.getItem('user'));
        context.commit('setUser', user);
      },
      removeUser: ({dispatch, commit}) => {
        context.commit('setUser', null);
      },
      autoSignIn (context) {
        if(localStorage.getItem('user')) {
          let user = JSON.parse(localStorage.getItem('user'));
          context.commit('setUser', user);
        }

      },
      logout ( context) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // localStorage.removeItem('cid')
        store.dispatch('clearError');
        store.dispatch('clearSuccess');
        context.commit('setUser', null);

      },
    },
    getters: {
      currentUser: state => {
        console.log('getCurUser')
        console.log(state.currentUser);
        return state.currentUser;
      }
    }
  };

  export default UserModule;
