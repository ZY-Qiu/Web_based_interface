const HelpModule = {
    state: {
      loading: false,
      error: null,
      success: null
    },
    mutations: {
      setLoadingFalse: (state) => {
        state.loading = false;
      },
      setLoadingTrue: (state) => {
        state.loading = true;
      },
      setError: (state, payload) => {
        state.error = payload;
      },
      clearError: (state) => {
        state.error = null;
      },
      clearSuccess: (state) => {
        state.success = null;
      },
      setSuccess: (state, payload) => {
        state.success = payload;
      },
    },
    actions: {
        setLoadingFalse (context) {
          context.commit('setLoadingFalse')
        },
        setLoadingTrue (context) {
          context.commit('setLoadingTrue')
        },
        setError (context, payload) {
          context.commit('setError', payload)
        },
        clearError (context) {
            context.commit('clearError')
        },
        setSuccess (context, payload) {
          context.commit('setSuccess', payload)
        },
        clearSuccess (context) {
          context.commit('clearSuccess')
      },
       
    },
    getters: {
      error(state){
        return state.error;
      },
      loading(state){
        return state.loading;
      },
      success(state){
        return state.success;
      },
       
    }
  };
  
  export default HelpModule;
  