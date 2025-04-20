import axios from "@/plugins/axios";
// initial state
const state = {
  checkoutData: {},
  cancellationDialog: false,
  userTravellers: [],
  userTravellersasly: [],
};
// mutations
const mutations = {
  SET_CHECKOUT_DATA(state, payload) {
    state.checkoutData = payload;
  },
  SET_CANCELLATION_DIALOG(state, payload) {
    state.cancellationDialog = payload;
    console.log("cacellation " , payload);
  },
  SET_USER_TRAVELLERS(state, payload) {
    state.userTravellers = payload;
    console.log("payload", payload);
  },
  SET_USER_TRAVELLERS_asly(state, payload) {
    state.userTravellersasly = payload;
  },
};
// actions
const actions = {
  fetchCheckoutData({ commit }, selectedRoom) {
    return axios
      .post(`api/mapping/hotels/preBook`, selectedRoom)
      .then((res) => {
        console.log("state checkout  ", res.data);
        commit("SET_CHECKOUT_DATA", res.data);
      });
  },
  fetchUserTravellers({ commit }) {
    return axios.get(`api/user/customer-member/all`).then((res) => {
      console.log("state checkout  ", res.data);
      commit("SET_USER_TRAVELLERS", res.data.data);
      commit("SET_USER_TRAVELLERS_asly", res.data.data);
    });
  },
  // api/user/customer-member/store
  addUserTraveller({ commit }, userTraveller) {
    return axios
      .post(`api/user/customer-member/store`, userTraveller)
      .then((res) => {
        console.log("state checkout  ", res.data);
        commit("SET_USER_TRAVELLERS", res.data.data);
      });
  },
};

export default {
  namespaced: true,
  name: "checkout",
  state,
  actions,
  mutations,
};
