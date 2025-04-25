import axios from '@/plugins/axios'

// initial state
const state = {
    userPages: {
        account: true,
        bookings: false,
        changePassword: false,
        logout: false,
        countries: {},
        countriesWithCodes: {},
        nationalities: [],
        currencies: {}
    },
    loading: true,
}

// mutations
const mutations = {
    SET_USER_PAGE(state, page) {
        state.userPages = page;
        console.log("hey iam store");
    },
    SET_COUNTRIES(state, countries) {
        state.countries = countries
    },
    SET_COUNTRIES_CODES(state, payload) {
        state.countriesWithCodes = payload
    },
    SET_NATIONALITIES(state, payload) {
        state.nationalities = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_CURRENCIES(state, payload) {
        state.currencies = payload
    }
}

// actions
const actions = {
    fetchCountries({ state, commit }) {
        return axios.get('https://restcountries.com/v3.1/all').then((res) => {
            commit("SET_COUNTRIES", [...res.data]);
        })
    },
    fetchCountriesWithCodes({ state, commit, dispatch }, searchText) {
        
/* // Fetch Google Places
fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Dubai&language=ar&types=(cities)&key=AIzaSyAtPw2FPVcDAA-ywgtLdvsfb3Oo3wCAagU', {
  method: 'GET',
  headers: {
    'Accept-Language': 'en',
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
}); */
      

       /*  return axios.get('api/destinations', { params: { search: searchText } }).then((res) => {
           
            commit("SET_COUNTRIES_CODES", res.data.data);
        }) */
    },

    fetchTopCities({ state, commit }) {

        return axios.get('api/hotel-vendors/cities?top_cities=1').then((res) => {
            commit("SET_COUNTRIES_CODES", res.data.data.cities);
        })
    },
    fetchNationalities({ state, commit }) { 
        return axios.get('api/nationality/all').then((res) => {
            commit("SET_NATIONALITIES", res.data.data);
        })
    },
    fetchCurrencies({ commit }) {
        return axios.get('api/payment_currency').then((res) => {
            commit("SET_CURRENCIES", res.data);
        })
    }
}

export default {
    namespaced: true,
    name: 'globalStore',
    state,
    actions,
    mutations
}
