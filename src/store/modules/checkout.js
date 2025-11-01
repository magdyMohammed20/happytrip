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
    console.log("cacellation ", payload);
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
  fetchCheckoutData({ commit }) {
    // Read pre-built checkout payload from localStorage
    let payload = {};
    try {
      payload = JSON.parse(localStorage.getItem("checkout") || "{}");
    } catch (e) {
      payload = {};
    }

    console.log("payload", payload);

    // Custom serializer for nested params with arrays
    const paramsSerializer = (params) => {
      const parts = [];

      const buildQuery = (obj, prefix = "") => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}[${key}]` : key;

            if (value === null || value === undefined) {
              continue;
            } else if (Array.isArray(value)) {
              // Handle arrays
              if (value.length === 0) {
                parts.push(`${encodeURIComponent(newKey)}[]=`);
              } else {
                value.forEach((item, index) => {
                  if (typeof item === "object") {
                    // Nested object in array
                    buildQuery(item, `${newKey}[${index}]`);
                  } else {
                    parts.push(
                      `${encodeURIComponent(
                        newKey,
                      )}[${index}]=${encodeURIComponent(item)}`,
                    );
                  }
                });
              }
            } else if (typeof value === "object") {
              // Nested object
              buildQuery(value, newKey);
            } else {
              parts.push(
                `${encodeURIComponent(newKey)}=${encodeURIComponent(value)}`,
              );
            }
          }
        }
      };

      buildQuery(params);
      return parts.join("&");
    };

    return axios
      .get(`/api/hotel-vendors/hotel-booking/pre-book`, {
        params: payload,
        paramsSerializer,
      })
      .then((res) => {
        console.log("state checkout  ", res.data);
        // The response structure is: { status, hotel, bookingData }
        // Handle both direct response and nested data structure
        const responseData = res.data?.data || res.data;

        // Ensure we have valid data structure
        let checkoutData = {
          hotel: [],
          bookingData: {},
        };

        if (responseData) {
          // Check if hotel and bookingData exist in response
          if (responseData.hotel) {
            checkoutData.hotel = Array.isArray(responseData.hotel)
              ? responseData.hotel
              : [responseData.hotel];
          }

          if (responseData.bookingData) {
            checkoutData.bookingData = responseData.bookingData;
          }
        }

        console.log("Committing checkoutData:", checkoutData);
        commit("SET_CHECKOUT_DATA", checkoutData);
        return checkoutData;
      })
      .catch((error) => {
        console.error("Error fetching checkout data:", error);
        throw error;
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
