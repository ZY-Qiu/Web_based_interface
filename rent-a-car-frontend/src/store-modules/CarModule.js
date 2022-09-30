const CarModule = {
    state: {
      cars: []
    },
    
    mutations: {
      createCar(state, payload) {
        state.cars.push(payload);
      },
      setCars(state, payload) {
        state.cars = payload
      },

      updateCar(state, payload) {
        let carForUpdate = state.cars.find( car => {
          return car.registration === payload.registration;
        });

        carForUpdate.model =  payload.model;
        carForUpdate.available =  payload.available;
        carForUpdate.registration =  payload.registration;
        carForUpdate.year =  payload.year;
        carForUpdate.consuming =  payload.consuming;
        carForUpdate.price =  payload.price;
        carForUpdate.image =  payload.image;
        carForUpdate.description =  payload.description;
      },

      deleteCar(state, id) {
        state.cars = state.cars.filter(function (car) {
          return car.id != id;
      });
      }
    },
    actions: {
      createCar(context, payload) {
        payload.image = payload.imageURL;
        payload.imageURL = '';
        context.commit('createCar', payload.data);
      },
      setCars(context, payload) {
        context.commit('setCars', payload);
      },
      updateCar(context, payload) {
        context.commit('updateCar', payload);
      },
      deleteCar(context, id) {
         context.commit('deleteCar', id);
      }
    },
    getters: {
      getCars: state => {
        return state.cars;
      },
      caruselCars: (state) => {
        return state.cars.slice(0,5);
      },

      getCarById: (state) => (id) => {
        return state.cars.find(car => car.id == id);
      }

    }
  };
  
  export default CarModule;
  