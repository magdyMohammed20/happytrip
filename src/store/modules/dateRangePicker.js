// initial state
const state = {
    datePickerForm: {
        checkOut: "",
        checkIn: ""
    }
}
// mutations
const mutations = {
    SET_DATE_RANGE(state, payload) {
        state.datePickerForm = payload
    },
}

export default {
    namespaced: true,
    name: 'dateRangePicker',
    state,
    mutations
}
