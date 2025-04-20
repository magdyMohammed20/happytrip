
import axios from '@/plugins/axios'

// initial state
const state = {
    walletBalance: 0
}
// mutations
const mutations = {
    SET_WALLET_BALANCE(state, payload) {
        state.walletBalance = payload
    }
}
// actions
const actions = {
    getWalletBalance({ commit }) {
        let currency = localStorage.getItem("CURR");
        axios.get(`/api/user/wallet-balance/${currency}`).then((response) => {
            commit('SET_WALLET_BALANCE', response.data.balance)
        })
    }
}

export default {
    namespaced: true,
    name: 'wallet',
    state,
    actions,
    mutations
}
