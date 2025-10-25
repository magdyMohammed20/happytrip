import axios from '@/plugins/axios';

// initial state
const state = {
  roomSelected: {},
  hotel: {},
  searchForm: {},
  originalPrice: 0,
  travellerDetails: {},
  couponData: {},
};
// mutations
const mutations = {
  SET_ROOM_SELECTED(state, payload) {
    state.roomSelected = payload;
  },
  SET_HOTEl(state, payload) {
    console.log(payload);
    state.hotel = payload;
  },
  SET_SEARCH_FORM(state, payload) {
    state.searchForm = payload;
    console.log(payload);
  },
  SET_ORIGINAL_PRICE(state, payload) {
    state.originalPrice = payload;
  },

  SET_TRAVELLER_DETAILS(state, payload) {
    state.travellerDetails = payload;
  },

  SET_COUPON_DATA(state, payload) {
    state.couponData = payload;
  },
};
// actions
const actions = {
  updateOriginalPrice({ commit }, price) {
    commit('SET_ORIGINAL_PRICE', price);
  },

  // applyCouponCode({ commit }, code) {
  //     axios.get(`/api/user/coupons/${code}`)
  //         .then(res => {
  //             if (res.data.valid) {
  //                 commit('SET_COUPON_CODE', code);
  //             } else {
  //                 // handel invalid coupon code

  //             }
  //         }).catch(err => {
  //             // handel error
  //         })

  // },
};

export default {
  namespaced: true,
  name: 'payment',
  state,
  actions,
  mutations,
};
