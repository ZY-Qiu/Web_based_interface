// const CompanyModule = {
//     state: {
//       companies: []
//     },
//     mutations: {
//       setCompanies(state, payload) {
//         state.companies = payload
//       },
//       createCompany(state, payload) {
//         state.companies.push(payload);
//       },
//       updateCompany(state, payload) {
//         let companyForUpdate = state.companies.find( company => {
//           return company.id === payload.id;
//         });
//
//
//         companyForUpdate.name =  payload.name;
//         companyForUpdate.address =  payload.address;
//         companyForUpdate.phone =  payload.phone;
//
//       },
//       deleteCompany(state, id) {
//         state.companies = state.companies.filter(function (company) {
//           return company.id != id;
//         });
//       },
//     },
//     actions: {
//       setCompanies(context, payload) {
//         context.commit('setCompanies', payload);
//       },
//       createCompany(context, payload) {
//         context.commit('createCompany', payload);
//       },
//       updateCompany (context, payload) {
//         context.commit('updateCompany', payload);
//       }
//     },
//     getters: {
//       getCompanies: state => {
//         return state.companies;
//       },
//       getCcompanyById: (state) => (id) => {
//         return state.companies.find(car => car.id === id)
//       }
//
//     }
//   }
//
// export default CompanyModule;
//





const CompanyModule = {
  state: {
    history: [{vin: 10, type: "A", make: "B", model: "C", pickupdate: "05-01-2022", dropdate: "05-05-2022", pickloc: "NY", droploc: "LA", mileage: "500"}, {vin: 20, type: "A", make: "B", model: "C", pickupdate: "04-01-2022", dropdate: "04-05-2022", pickloc: "LA", droploc: "NY", mileage: "500"}],
    renting: [{vin: 30, type: "A", make: "B", model: "C", pickdate: "05-07-2022", pickloc: "NY", droploc: "LA", startodometer: 3000}, {vin: "40", type: "A", make: "B", model: "C", pickdate: "01-07-2022", pickloc: "LA", droploc: "NY", startodometer: 2000}]
  },
  mutations: {
    setHistory(state, payload) {
      state.history = payload
    },
    setRenting(state, payload) {
      state.renting = payload
    },
    createCompany(state, payload) {
      state.history.push(payload);
    },
    updateCompany(state, payload) {
      let companyForUpdate = state.history.find( company => {
        return company.id === payload.id;
      });


      companyForUpdate.name =  payload.name;
      companyForUpdate.address =  payload.address;
      companyForUpdate.phone =  payload.phone;

    },
    deleteCompany(state, id) {
      state.history = state.history.filter(function (company) {
        return company.id !== id;
      });
    },
  },
  actions: {
    setHistory(context, payload) {
      context.commit('setHistory', payload);
    },
    setRenting(context, payload) {
      context.commit('setRenting', payload);
    },
    createCompany(context, payload) {
      context.commit('createCompany', payload);
    },
    updateCompany (context, payload) {
      context.commit('updateCompany', payload);
    }
  },
  getters: {
    getCompanies: state => {
      return state.history;
    },
    getRenting: state => {
      return state.renting;
    },
    getCcompanyById: (state) => (id) => {
      return state.history.find(car => car.id === id)
    }
  }
}

export default CompanyModule;

