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
  cancellationDialogData: {},
  connection: null,
  cache_key: null
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
  },
    SET_CONNECTION(state, payload) {
    state.connection = payload;
  },
    SET_CACHE_KEY(state, payload) {
    state.cache_key = payload;
  },
};
// actions
const actions = {
  fetchHotels({ commit, dispatch, state }, filters) {

    commit("SET_AVAILABLE_HOTELS_LOADER", true);
      
    const x = new WebSocket('wss://stg-py.happytbooking.com/api/v1/hotels/ws/search')
      
    commit("SET_CONNECTION",x);

    state.connection.onopen = function (e) {
              
      const payload = {
        place_id: filters.destinationCode,
        check_in: filters.checkIn,
        check_out: filters.checkOut,
        rooms: filters.rooms,
        nationality: "EG",
        currency: filters.currency
      }
      
      state.connection.send(JSON.stringify(payload));

    }
    
    
    state.connection.onmessage = function (e) {
      try {
        const response = JSON.parse(e.data);

        if (response.code == 200) {

          // خزّن البيانات في الستور
          commit("SET_CACHE_KEY" , response.data.cache_key)
          commit("SET_AVAILABLE_HOTELS", response);
          commit("SET_AVAILABLE_HOTELS_LOADER", false);
          commit("SET_ENABLE_FILTERS", true);
          state.connection.close()

        }
      } catch (err) {
        commit("SET_AVAILABLE_HOTELS_LOADER", false);
                  state.connection.close()

      }
    };

    // في حالة وجود خطأ
    state.connection.onerror = function (err) {
      console.error("WebSocket Error ❌", err);
      commit("SET_AVAILABLE_HOTELS_LOADER", false);
    };

    // عند إغلاق الاتصال
    state.connection.onclose = function () {
      console.log("WebSocket Closed");
    };


    /* // let str = JSON.stringify(filters)
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
      }); */
  },
    fetchFilteredHotels({ commit, dispatch, state }, filters) {

    commit("SET_AVAILABLE_HOTELS_LOADER", true);
      
      const x = new WebSocket('wss://stg-py.happytbooking.com/api/v1/hotels/ws/filter')
      
    commit("SET_CONNECTION",x);

    state.connection.onopen = function (e) {
              
      // const payload = {
      //   action: "apply_filters",
      //   search_id: state.cache_key,
      //   sort_by_price: "asc",
      //   hotel_name: filters.hotel_name,
      //   sort_by_rating: "asc"
      //  /*  filters: {
      //     "price_range": {
      //       "min": 100,
      //       "max": 800
      //     },
      //     "star_rating": [2, 3, 4, 5]
      //   } */
      // }

      const payload = {
        action: "apply_filters",
        search_id: state.cache_key,
        ...filters
      }

      state.connection.send(JSON.stringify(payload));

    }
    
    
     state.connection.onmessage = function (e) {
      try {
        const response = JSON.parse(e.data);

        if (response.code == 200) {

          // خزّن البيانات في الستور
          commit("SET_CACHE_KEY" , response.data.cache_key)
          commit("SET_AVAILABLE_HOTELS", response);
          commit("SET_AVAILABLE_HOTELS_LOADER", false);
          commit("SET_ENABLE_FILTERS", true);
          console.log('Heloooooooooo' , response)
          state.connection.close()

        }
      } catch (err) {
        commit("SET_AVAILABLE_HOTELS_LOADER", false);
                  state.connection.close()

      }
    };

    // في حالة وجود خطأ
    state.connection.onerror = function (err) {
      console.error("WebSocket Error ❌", err);
      commit("SET_AVAILABLE_HOTELS_LOADER", false);
    };

    // عند إغلاق الاتصال
    state.connection.onclose = function () {
      console.log("WebSocket Closed");
    };
 

    /* // let str = JSON.stringify(filters)
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
      }); */
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
