import axios from '@/plugins/axios'
// initial state
const state = {
    featuredHotelsData: [],
    featuredHotelsRooms: [],
    featuredHotelsLoader: false,
    enableFilters: false,

}
// mutations
const mutations = {
    SET_FEATURED_HOTELS_LOADER(state, payload) {
        state.featuredHotelsLoader = payload
    },
    SET_FEATURED_HOTELS(state, payload) {
        state.featuredHotelsData = payload
    },
    SET_FEATURED_HOTELS_ROOMS(state, payload) {
        state.featuredHotelsRooms = payload
    },
    SET_ENABLE_FILTERS(state, payload) {
        state.enableFilters = payload
    }
}
// actions
const actions = {
    fetchFeaturedHotels({ commit }) {
        return axios.get('api/hotels/featuredHotels').then((res) => {
            commit('SET_FEATURED_HOTELS', res.data.hotels)
            commit("SET_FEATURED_HOTELS_LOADER", true);
        }
        ).finally(() => {
            commit("SET_FEATURED_HOTELS_LOADER", false);
        })
    },
    fetchFeaturedHotelsRooms({ state, commit }, filters) {
        commit("SET_FEATURED_HOTELS_LOADER", true);

        return axios.get(`/api/hotels/searchFeaturedHotels`, { params: filters })
            .then((res) => {
                commit("SET_FEATURED_HOTELS_ROOMS", res.data);
                commit("SET_ENABLE_FILTERS", true);
                return res;
            }).finally(() => {
                commit("SET_FEATURED_HOTELS_LOADER", false);
            })
    },
}

export default {
    namespaced: true,
    name: 'featuredHotels',
    state,
    actions,
    mutations
}
