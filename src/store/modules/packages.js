import axios from '@/plugins/axios'

// initial state
const state = {
    packagesData: [],
    packagesCategoriesData:[],
    packageDetails: {},
    reserveCard: false,
}
// mutations
const mutations = {
    SET_PACKAGES(state, payload) {
        state.packagesData = payload
    },
    SET_PACKAGES_CATEGORY(state, payload){
        state.packagesCategoriesData = payload
    },
    SET_PACKAGES_DETAILS(state, payload) {
        state.packageDetails = payload
    },
    SET_RESERVE_CARD(state, reserveCard) {
        state.reserveCard = reserveCard
    }
}
// actions
const actions = {
    // api/packageCategories
    fetchPackageCategories({ state, commit }) {
        return axios.get(`api/packageCategories`).then((res) => {
            commit('SET_PACKAGES_CATEGORY', res.data.data)
            console.log(res.data.data);
            return res;
        })
    },
    fetchpackages({ state, commit }, form) {
        return axios.post(`api/packages/filter` , form).then((res) => {
            commit('SET_PACKAGES', res.data.data)
            return res;
        })
    },
    fetchPackagesDetails({ commit }, id) {
        return axios.get(`api/package-details/${id}`).then((res) => {
            commit('SET_PACKAGES_DETAILS', res.data.data)
            return res;
        })
    },
    bookPackage({ commit }, data) {
        return axios.post(`/api/packages/book`, data).then((res) => {
            return res;
        })
    }

}

export default {
    namespaced: true,
    name: 'packages',
    state,
    actions,
    mutations
}
