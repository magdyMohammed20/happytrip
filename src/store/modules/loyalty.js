import axios from '@/plugins/axios'

// initial state
const state = {
    loyaltyData: {},
    userActivities: []
}
// mutations
const mutations = {
    SET_LOYALTY_DATA(state, payload) {
        state.loyaltyData = payload
    },
    SET_USER_ACTIVITIES(state, payload) {
        state.userActivities = payload
    }
}
// actions
const actions = {
    fetchLoyaltyData({ state, commit }) {
        return axios.get(`api/user/loyalty-points`).then((res) => {
            commit('SET_LOYALTY_DATA', res.data.data)
            return res;
        })
    },
    fetchUserActivity({ state, commit }) {
        return axios.get(`/api/user/activities/hotel`).then((res) => {
            commit('SET_USER_ACTIVITIES', res.data.previuosReservations)
            return res;
        })
    },

}

export default {
    namespaced: true,
    name: 'loyalty',
    state,
    actions,
    mutations
}
