import axios from '@/plugins/axios'
// initial state
const state = {


}
// mutations
const mutations = {

}
// actions
const actions = {
    sendContactMessage({ commit }, form) {
        return axios.post("/api/contact-us" , form ).then((res) => {
            return res;
        })
    }
}

export default {
    namespaced: true,
    name: 'contactUs',
    state,
    actions,
    mutations
}
