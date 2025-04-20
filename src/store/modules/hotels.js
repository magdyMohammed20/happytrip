import axios from "@/plugins/axios";
// initial state
const state = {
  searchHotels: {},
  availbleHotels: {},
  uuid: "",
  availbleHotelsDetails: {},
  fullHotelDetails: {},
  currencyPrice: {},
  hotelCurrency: {},
  guestCurrency: "SAR",
  reviews: [],
  marginVendorData: {},
  page: 1,
  checkoutData: {},
  enableFilters: false,
  hotelsLoader: true,
  roomsLoader: false,
  cancellationDialog: false,
  cancellationDialogData: {}
};
// mutations
const mutations = {
  SET_CANCELLATION_DIALOG_DATA(state, payload) {
    state.cancellationDialogData = payload
  },
  SET_CANCELLATION_DIALOG(state, payload) {
    console.log("cancellation")
    state.cancellationDialog = payload;
    console.log(state.cancellationDialog)
  },
  SET_SEARCH_HOTELS(state, payload) {
    state.searchHotels = payload;
  },
  SET_GUEST_CURRENCY(state, payload) {
    state.guestCurrency = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload
  },
  SET_UUID(state, payload) {
    state.uuid = payload;
    window.localStorage.setItem("uuid", state.uuid);
  },
  SET_AVAILABLE_HOTELS(state, payload) {
    state.availbleHotels = payload;
  },
  SET_AVAILABLE_HOTELS_LOADER(state, payload) {
    state.hotelsLoader = payload
    console.log("state.hotelsLoader", state.hotelsLoader);
  },
  SET_AVAILABLE_HOTELS_DETAILS(state, payload) {
    state.availbleHotelsDetails = payload;
  },
  SET_FULL_HOTEL_DETAILS(state, payload) {
    state.fullHotelDetails = payload;
  },
  SET_CURRENCY_PRICE(state, payload) {
    state.currencyPrice = payload;
  },
  SET_HOTELS_CURRENCY(state, payload) {
    state.hotelCurrency = payload;
  },
  SET_VENDOR_MARGIN_DATA(state, payload) {
    state.marginVendorData = payload;
  },
  SET_HOTELS_REVIEWS(state, payload) {
    state.reviews = payload;
  },
  SET_VENDOR_MARGIN_DATA(state, payload) {
    state.marginVendorData = payload;
  },
  SET_CHECKOUT_DATA(state, payload) {
    state.checkoutData = payload
  },
  SET_ENABLE_FILTERS(state, payload) {
    state.enableFilters = payload
  },
  SET_ROOM_LOADING(state, payload) {
    state.roomsLoader = payload
  }
};
// actions
const actions = {
  fetchHotels({ commit, dispatch, state }, filters) {
    // let str = JSON.stringify(filters)
    commit("SET_AVAILABLE_HOTELS_LOADER", true);
    return axios
      .get("/api/mapping/hotels/search", { params: filters })
      .then((res) => {
        commit("SET_SEARCH_HOTELS", res.data);
        commit("SET_UUID", res.data.searchData.uuid);
        return res;
      })
      .then((res) => {
        dispatch("fetchAvailbleHotel", { uuid: state.uuid });
        return res
      });
  },
  fetchAvailbleHotel({ state, commit }, filters) {
    return axios.get(`/api/available-hotels-cache-search?page=${state.page}`, { params: filters })
      .then((res) => {
        commit("SET_AVAILABLE_HOTELS", res.data);
        commit("SET_AVAILABLE_HOTELS_LOADER", true);
        commit("SET_ENABLE_FILTERS", true);
        return res;
      }).finally(() => {
        commit("SET_AVAILABLE_HOTELS_LOADER", false);
      })
  },
  // fetchAvailbleHotelDetails({ commit , state}, id) {
  //   return axios.get(`/api/hotels/details/${id}`,{ params: state.page }).then((res) => {
  //     commit("SET_AVAILABLE_HOTELS_DETAILS", res.data.data);
  //     return res;
  //   });
  // },
  fetchAvailbleHotelRooms({ commit, state }, { uuid, vervotech_id }) {
    return axios.get(`/api/mapping/hotels/availableRooms/${uuid}/${vervotech_id}`).then((res) => {
      console.log("res data of rooms", res.data);
      commit("SET_AVAILABLE_HOTELS_DETAILS", res.data);
      return res;
    });
  },

  convertCurrency({ state, commit }, { from, to, amount = 100 }) {
    return fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=e9cffdf0d37553e4849840e1856323b8`
    )
      .then((res) => {
        let response = res.json();
        return response;
      })
      .then((res) => {
        commit("SET_CURRENCY_PRICE", res.info.rate);
        return res;
      });
  },
  // getVendorMargins({ commit }, curr) {
  //   let currency = curr || "SAR";
  //   return axios
  //     .get(`api/getSitting/vendorMargin/hotelbeds/${currency}`)
  //     .then((res) => {
  //       console.log("res from vendor data" , res)
  //       commit("SET_VENDOR_MARGIN_DATA", res.data.data);
  //       return res;
  //     });
  // },
  fetchHotelReviews({ commit }, id) {
    return axios.get(`api/hotels/reviews/${id}`).then((res) => {
      commit("SET_HOTELS_REVIEWS", res.data.reviews);
      console.log("res.data.reviews", res.data.reviews);
      // return fetch(
      //   `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
      // )
      //   .then((res) => {
      //     let response = res.json();
      //     return response;
      //   })
      //   .then((res) => {
      //     commit("SET_CURRENCY_PRICE", res.info.rate);
      //     return res;
      //   });
    });
  },

  // fetchCheckoutData({ commit }, selectedRoom) {
  //   return axios.post(`api/mapping/hotels/preBook`, selectedRoom).then((res) => {
  //     console.log("state checkout  ", res.data)
  //     commit("SET_CHECKOUT_DATA", res.data);
  //   })
  // },
  // getVendorMargins({ commit }, curr) {
  //   return axios
  //     .get(`api/getSitting/vendorMargin/hotelbeds/${curr}`)
  //     .then((res) => {
  //       commit("SET_VENDOR_MARGIN_DATA", res.data.data);
  //       return res;
  //     });
  // },
};

export default {
  namespaced: true,
  name: "hotels",
  state,
  actions,
  mutations,
};
