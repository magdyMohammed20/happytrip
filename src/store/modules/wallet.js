import axios from "@/plugins/axios";

// initial state
const state = {
  walletBalance: 0,
  customerMembers: [],
};
// mutations
const mutations = {
  SET_WALLET_BALANCE(state, payload) {
    state.walletBalance = payload;
  },
  SET_CUSTOMER_MEMBERS(state, payload) {
    state.customerMembers = payload;
  },
};
// actions
const actions = {
  getWalletBalance({ commit }) {
    let currency = localStorage.getItem("CURR") || "SAR";
    return axios
      .get(`api/user/wallet-balance/${currency}`)
      .then((response) => {
        commit("SET_WALLET_BALANCE", response.data.balance);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching wallet balance:", error);
        throw error;
      });
  },
  getCustomerMembers({ commit }) {
    return axios
      .get("api/user/customer-member/all")
      .then((response) => {
        console.log("Customer members fetched:", response.data);
        commit(
          "SET_CUSTOMER_MEMBERS",
          response.data?.data || response.data || [],
        );
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching customer members:", error);
        throw error;
      });
  },
};

export default {
  namespaced: true,
  name: "wallet",
  state,
  actions,
  mutations,
};
