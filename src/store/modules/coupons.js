import axios from '@/plugins/axios'
// initial state
const state = {
    coupons: [],
    couponDetails: {},
    couponMessage: ""

}
// mutations
const mutations = {
    SET_COUPONS(state, payload) {
        state.coupons = payload
    },
    SET_COUPON_DETAILS(state, payload) {
        state.couponDetails = payload
    },
    SET_COUPON_MESSAGE(state, payload) {
        state.couponMessage = payload;
    }
}
// actions
const actions = {
    fetchCoupons({ commit }) {
        return axios.get('api/hotels/coupons').then((res) => {
            commit('SET_COUPONS', res.data.coupons)
            return res;
        })
    },
    fetchCouponDetails({ commit }, code) {
        return axios.get(`api/user/coupons/${code}`).then((res) => {
            commit('SET_COUPON_DETAILS', res.data.data)
            commit('SET_COUPON_MESSAGE', res.data.massage)
            return res;
        }).catch(e => {
            commit('SET_COUPON_DETAILS','')
            commit('SET_COUPON_MESSAGE', e.response.data.message)
        })
    }
}

export default {
    namespaced: true,
    name: 'coupons',
    state,
    actions,
    mutations
}
