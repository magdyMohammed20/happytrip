import axios from "@/plugins/axios";

// initial state
const state = {
  profileData: {
    address: "",
    country: "",
    created_at: "",
    currency: "",
    dailing_code: "",
    dob: "",
    email: "",
    first_name: "",
    firstname: "",
    gender: "",
    id: "",
    id_expiry_date: "",
    id_number: "",
    language: "",
    lastname: "",
    membership_expire_date: "",
    membership_number: "",
    middle_name: "",
    mobile: "",
    mobile_num: "",
    name: "",
    nationality: "",
    num_adults: 0,
    num_children: 0,
    partners: "",
    photo: "",
    title: "",
    updated_at: "",
    user_id: "",
  },
  bookings: {},
  favourites: {},
  commingReservations: [],
  reservation: {},
  isAuthorized: false,
  packages: {},
  travellersDialog: false,
  travellers: [],
  addTravellerDialog: false,
  deleteTravellersDialog: false,
  isEditMode:false,
  singleTravellerData:{},
  editReservationDialog:false
};
// mutations
const mutations = {
  SET_PROFILE_DATA(state, profileData) {
    console.log("incomming profile data" , profileData)
    state.profileData = profileData;
  },
  SET_BOOKINGS(state, payload) {
    state.bookings = payload;
  },
  SET_FAVS(state, payload) {
    state.favourites = payload;
  },
  SET_COMMING_RESERVATIONS(state, payload) {
    state.commingReservations = payload;
  },
  SET_RESERVATION(state, payload) {
    state.reservation = payload;
  },
  SET_AUTHORIZATION(state, payload) {
    state.isAuthorized = payload;
  },
  SET_PACKAGES(state, payload) {
    state.packages = payload;
    console.log("state.packages", state.packages);
  },
  // travellersDialog
  SET_TRAVELLERS_DIALOG(state, payload) {
    console.log(payload);
    state.travellersDialog = payload
  },
  SET_TRAVELLERS(state, payload) {
    state.travellers = payload
  },
  // addTravellerDialog
  SET_ADD_TRAVELLERS_DIALOG(state, payload) {
    console.log(payload);
    state.addTravellerDialog = payload
  },
  SET_DELETE_TRAVELLERS_DIALOG(state, payload) {
    state.deleteTravellersDialog = payload
  },
  SET_EDIT_MODE(state,payload){
    state.isEditMode = payload
  },
  SET_SINGLE_USER_TRAVELLER(state,payload){
    state.singleTravellerData = payload
  },
  SET_EDIT_RESERVATION_DIALOG(state , payload){
    state.editReservationDialog = payload
  }
};
// actions
const actions = {
  fetchUserProfile({ state, commit }) {
    return axios
      .get(`/api/user/profile-data`)
      .then((response) => {
        commit("SET_PROFILE_DATA", response.data.customerInfo);
        commit("SET_AUTHORIZATION", true);
        window.localStorage.setItem(
          "CURR",
          response.data.customerInfo.currency
        );
        window.localStorage.setItem("lang", "en");
      })
   
  },
  updateUserProfile({ }, profileData) {
    let payload = new FormData();
    for (const property in profileData) {
      if (
        !profileData.hasOwnProperty(property) ||
        profileData[property] == null
      ) {
        continue;
      }
      if (
        Array.isArray(profileData[property]) &&
        profileData[property].length > 0
      ) {
        for (const iterator of profileData[property]) {
          payload.append(property + "[]", iterator);
        }
      } else {
        payload.append(property, profileData[property]);
      }
    }
    return axios.post("/api/user/update-profile", payload).then((response) => {
      window.localStorage.setItem("CURR", profileData.currency);
      return response;
    });
  },
  changePassword({ }, form) {
    let payload = new FormData();
    for (const property in form) {
      if (!form.hasOwnProperty(property) || form[property] == null) {
        continue;
      }
      if (Array.isArray(form[property]) && form[property].length > 0) {
        for (const iterator of form[property]) {
          payload.append(property + "[]", iterator);
        }
      } else {
        payload.append(property, form[property]);
      }
    }
    return axios.put("/api/user/change-password", payload);
  },
  fetchUserBookings({ commit }) {
    return axios.get(`/api/user/activities/hotel`).then((response) => {
      commit("SET_BOOKINGS", response.data);
      return response;
    });
  },
  fetchFavs({ commit }) {
    return axios.get(`/api/user/all-favorites`).then((response) => {
      commit("SET_FAVS", response.data.data);
    });
  },
  removeFromFavorite({ }, code) {
    return axios.post(`api/user/remove-favorite?code=${code}`);
  },
  fetchBookedPackges({ commit }) {
    return axios.get(`api/user/activities/package`).then((res) => {
      commit("SET_PACKAGES", res.data);
      return res;
    });
  },
  fetchUserTravellers({ commit }) {
    console.log("fetchUserTravellersfetchUserTravellersfetchUserTravellersfetchUserTravellers");
    return axios.get("api/user/customer-member/all").then((res) => {
      commit("SET_TRAVELLERS", res.data.data);
      return res;
    });
  },
  addUserTraveller({ }, user) {
    return axios.post("api/user/customer-member/store", user).then((response) => {
      return response;
    });
  },
  updateUserTraveller({ }, { id, user }) {
    return axios.post(`api/user/customer-member/edit/${id}`, user).then((response) => {
      return response;
    });
  },
  deleteUserTraveller({ }, id) {
    return axios.get(`api/user/customer-member/delete/${id}`).then((response) => {
      return response;
    });
  },
  getSingleTraveller({commit} , id){
    return axios.get(`api/user/customer-member/show/${id}`).then((response) => {
      commit("SET_SINGLE_USER_TRAVELLER", response.data.data)
      return response;
    });
  }
};

export default {
  namespaced: true,
  name: "userAccount",
  state,
  actions,
  mutations,
};
