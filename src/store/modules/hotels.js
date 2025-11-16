import axios, { AxiosSocket } from "@/plugins/axios";
import { h } from "vue";
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
  cache_key: null,
};
// mutations
const mutations = {
  SET_CANCELLATION_DIALOG_DATA(state, payload) {
    state.cancellationDialogData = payload;
  },
  SET_CANCELLATION_DIALOG(state, payload) {
    console.log("cancellation");
    state.cancellationDialog = payload;
    console.log(state.cancellationDialog);
  },
  SET_SEARCH_HOTELS(state, payload) {
    state.searchHotels = payload;
  },
  SET_GUEST_CURRENCY(state, payload) {
    state.guestCurrency = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  SET_UUID(state, payload) {
    state.uuid = payload;
    window.localStorage.setItem("uuid", state.uuid);
  },
  SET_AVAILABLE_HOTELS(state, payload) {
    console.log("payload in mutation", payload);
    state.availbleHotels = payload;
  },
  SET_AVAILABLE_HOTELS_LOADER(state, payload) {
    state.hotelsLoader = payload;
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
    state.checkoutData = payload;
  },
  SET_ENABLE_FILTERS(state, payload) {
    state.enableFilters = payload;
  },
  SET_ROOM_LOADING(state, payload) {
    state.roomsLoader = payload;
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

    const x = new WebSocket(
      "wss://stg-py.happytbooking.com/api/v1/hotels/ws/search",
    );

    commit("SET_CONNECTION", x);

    state.connection.onopen = function (e) {
      const payload = {
        place_id: filters.destinationCode,
        check_in: filters.checkIn,
        check_out: filters.checkOut,
        rooms: filters.rooms,
        nationality: "EG",
        currency: filters.currency,
      };

      state.connection.send(JSON.stringify(payload));
    };

    state.connection.onmessage = function (e) {
      try {
        const response = JSON.parse(e.data);

        if (response.code == 200) {
          // خزّن البيانات في الستور
          commit("SET_CACHE_KEY", response.data.cache_key);
          commit("SET_AVAILABLE_HOTELS", response);
          console.log("response from ws", response);
          localStorage.setItem("availbleHotels", JSON.stringify(response));
          commit("SET_AVAILABLE_HOTELS_LOADER", false);
          commit("SET_ENABLE_FILTERS", true);
          
          state.connection.close();
        }

        if (response.code == 400) { 
          localStorage.removeItem("availbleHotels");
          commit("SET_AVAILABLE_HOTELS_LOADER", null);

          commit("SET_ENABLE_FILTERS", false);
        }

      } catch (err) {
        commit("SET_AVAILABLE_HOTELS_LOADER", false);
        
        state.connection.close();
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
  fetchFilteredHotels({ commit, state }, filters) {
    commit("SET_AVAILABLE_HOTELS_LOADER", true);

    const hotelsFromStorage = JSON.parse(localStorage.getItem("availbleHotels"))
      .data.hotels;
    console.log("filters in action", filters);
    console.log("hotelsFromStorage", hotelsFromStorage);
    try {
      // Assume hotels are already in state (from fetchHotels)
      let hotels = hotelsFromStorage || [];
      console.log(
        "Parsed hotels",
        JSON.parse(localStorage.getItem("availbleHotels")),
      );
      const hotel_search = JSON.parse(localStorage.getItem("availbleHotels"))
        .data.hotel_search;
      // --- Hotel name search ---
      if (filters.hotel_name && filters.hotel_name.trim() !== "") {
        const name = filters.hotel_name.toLowerCase();
        hotels = hotels.filter((h) => h.name.toLowerCase().includes(name));
      } else {
        hotels = hotelsFromStorage;
      }

      if (filters.sort === "rating") {
        hotels = [...hotels].sort(
          (a, b) => Number(a.rating) - Number(b.rating),
        );
      }

      if (filters.sort === "price") {
        hotels = [...hotels].sort(
          (a, b) => Number(a.best_price?.amount) - Number(b.best_price?.amount),
        );
      }

      // --- Price range filter ---
      if (filters.min != null && filters.max != null) {
        const min = Number(filters.min);
        const max = Number(filters.max);

        const dummy = hotels.filter((h) => {
          const price = Number(h.best_price?.amount || h.price || 0);
          return price >= min && price <= max;
        });

        if (dummy) {
          hotels = dummy;
        }
      }

      // --- Rating filter ---
      if (filters.rating && filters.rating.length > 0) {
        console.log("Filtering by ratings", filters.rating);

        const dummy = hotels.filter(
          (h) =>
            filters.rating.includes(String(h.rating)) ||
            filters.rating.includes(Number(h.rating)),
        );

        if (dummy) {
          hotels = dummy;
        }
      }
      if (!filters.rating) {
        hotels = hotelsFromStorage;
      }

      /*    // --- Price filter ---
    if (filters.price && filters.price.length === 2) {
      const [min, max] = filters.price;
      hotels = hotels.filter(h => h.price >= min && h.price <= max);
    }

    // --- Min / Max Price (alternative fields) ---
    if (filters.min_price > 0) {
      hotels = hotels.filter(h => h.price >= filters.min_price);
    }
    if (filters.max_price > 0) {
      hotels = hotels.filter(h => h.price <= filters.max_price);
    }

    // --- Rating filter ---
    if (filters.rating && filters.rating.length > 0) {
      hotels = hotels.filter(h => filters.rating.includes(h.star_rating));
    }

   

    // --- Sorting ---
    if (filters.sort === "price_asc") {
      hotels = [...hotels].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_desc") {
      hotels = [...hotels].sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating_desc") {
      hotels = [...hotels].sort((a, b) => b.star_rating - a.star_rating);
    } else if (filters.sort === "rating_asc") {
      hotels = [...hotels].sort((a, b) => a.star_rating - b.star_rating);
    }
 */
      // Prepare a response-like object to stay consistent

      const response = {
        code: 200,
        data: {
          hotels,
          min_price: filters.min,
          max_price: filters.max,
          rates: JSON.parse(localStorage.getItem("availbleHotels")).data.rates,
          cache_key: state.cache_key, // keep the existing cache_key
          hotel_search,
        },
      };

      //commit("SET_CACHE_KEY" , response.data.cache_key)
      commit("SET_AVAILABLE_HOTELS", response);
      //localStorage.setItem('availbleHotels' , JSON.stringify(response))
      commit("SET_AVAILABLE_HOTELS_LOADER", false);
      commit("SET_ENABLE_FILTERS", true);
    } catch (err) {
      console.error("Local filter error ❌", err);
      commit("SET_AVAILABLE_HOTELS_LOADER", false);
    }
  },

  fetchAvailbleHotel({ state, commit }, filters) {
    return axios
      .get(`/api/available-hotels-cache-search?page=${state.page}`, {
        params: filters,
      })
      .then((res) => {
        commit("SET_AVAILABLE_HOTELS", res.data);
        commit("SET_AVAILABLE_HOTELS_LOADER", true);
        commit("SET_ENABLE_FILTERS", true);
        return res;
      })
      .finally(() => {
        commit("SET_AVAILABLE_HOTELS_LOADER", false);
      });
  },
  // fetchAvailbleHotelDetails({ commit , state}, id) {
  //   return axios.get(`/api/hotels/details/${id}`,{ params: state.page }).then((res) => {
  //     commit("SET_AVAILABLE_HOTELS_DETAILS", res.data.data);
  //     return res;
  //   });
  // },
  fetchAvailbleHotelRooms(
    { commit, state },
    { /* uuid, vervotech_id */ payload },
  ) {
    // stg-py.happytbooking.com/
    return AxiosSocket.post(`/api/v1/rooms/hotel-details`, payload).then(
      (res) => {
        localStorage.setItem("hotelDetails", JSON.stringify(res.data));
        commit("SET_AVAILABLE_HOTELS_DETAILS", res.data);
        return res;
      },
    );
  },

  /* fetchRoomById({ commit }, roomId) {
    // Fetch individual room details by room ID
    return AxiosSocket.get(`/api/v1/rooms/${roomId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("Error fetching room by ID:", error);
        throw error;
      });
  }, */

  convertCurrency({ state, commit }, { from, to, amount = 100 }) {
    return fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=e9cffdf0d37553e4849840e1856323b8`,
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
