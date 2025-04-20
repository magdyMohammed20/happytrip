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
    fetchCountriesWithCodes({ state, commit } ,searchText) {
        return axios.get('api/destinations', {params: { search: searchText }}).then((res) => {
            commit("SET_COUNTRIES_CODES", res.data.data);
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
