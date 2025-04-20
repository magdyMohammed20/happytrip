// Refactor this file with the best practices and Clean the code

import axios from "@/plugins/axios";
import router from "@/router";

let timer;
// initial state
const state = {
  // userPages: {
  //   account: true,
  //   bookings: false,
  //   changePassword: false,
  //   logout: false,
  // },
  token: null,
};
// Getters
const getters = {
  token: (state) => state.token,
  isAuthenticated(state) {
    return !!state.token;
  },
};

// mutations
const mutations = {
  // SET_USER_PAGE(state, page) {
  //   state.userPages = page;
  // },

  SET_USER_TOKEN(state, payload) {
    state.token = payload.token;
  },
};
// actions
const actions = {
  loginUser(context, credentials) {
    let payload = new FormData();
    for (const property in credentials) {
      if (
        !credentials.hasOwnProperty(property) ||
        credentials[property] == null
      ) {
        continue;
      }
      if (
        Array.isArray(credentials[property]) &&
        credentials[property].length > 0
      ) {
        for (const iterator of credentials[property]) {
          payload.append(property + "[]", iterator);
        }
      } else {
        payload.append(property, credentials[property]);
      }
    }
    return axios.post("/api/auth/login", payload).then((res) => {
      // Create token Expiration in 2 days and save it in local storage
      // const expiresIn = 10000; // * for the sake of testing
      const expiresIn = 1000 * 60 * 60 * 24 * 2;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("tokenExpiration", expirationDate);
      localStorage.setItem("token", "Bearer " + res.data.token);
      //TODO: Replace Status from localStorage to Vuex 'getters'
      localStorage.setItem("status", "authenticated");
      // Set timer for auto-logout
      timer = setTimeout(() => {
        context.dispatch("logoutUser");
      }, expiresIn);

      context.commit("SET_USER_TOKEN", { token: res.data.token });
      router.replace("/"); // redirect to home page
    });
  },
  //  autoLogin
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("logoutUser");
    }, expiresIn);
    if (token) {
      context.commit("SET_USER_TOKEN", { token: token });
    }
  },

  logoutUser(context) {
    return axios
      .post("/api/user/logout")
      .then((res) => {
        // remove token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.setItem("status", "Unauthenticated.");

        // remove token from vuex
        clearTimeout(timer);
        context.commit("SET_USER_TOKEN", { token: null });

        // redirect to login page
        router.replace("/login");
      })
      .catch((error) => {
        console.log("Logout Error:", error);
      });
  },
  socialLogin({commit}, socialData) {
    return axios.post("/api/auth/socialLogin", socialData).then((res) => {
      // localStorage.removeItem("token");
    commit("SET_USER_TOKEN", { token: res.data.token });
    localStorage.setItem("status", "authenticated");

    localStorage.setItem("token", "Bearer " + res.data.token);
      router.replace("/");
      // localStorage.setItem("token", "Bearer " + res.data.token);
    });
  },
};

export default {
  namespaced: true,
  name: "logUser",
  state,
  getters,
  actions,
  mutations,
};
