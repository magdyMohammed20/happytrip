import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
function lazyLoadRoute(view) {
  return () => import(`@/views/${view}.vue`);
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      // Async component
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/HotelSearchResultsDetails/:name/:uuid/:vervotech_id",
      name: "HotelSearchResultsDetails",
      // Async component
      component: () => import("@/views/HotelSearchResultsDetails.vue"),
    },
    {
      path: "/rooms/:roomId",
      name: "RoomDetails",
      // Async component
      component: () => import("@/views/RoomDetails.vue"),
    },
    //FeaturedHotels
    {
      path: "/FeaturedHotels",
      name: "FeaturedHotels",
      // Async component
      component: () => import("@/views/FeaturedHotels.vue"),
    },
    {
      path: "/Payment",
      name: "Payment",
      // Async component
      component: () => import("@/views/Payment.vue"),
    },
    // UserAccount
    {
      path: "/UserAccount",
      name: "UserAccount",
      // Async component

      component: () => import("@/views/UserAccount.vue"),
      children: [
        {
          path: "changePassword",
          name: "changePassword",
          component: () => import("@/views/changePassword.vue"),
        },
        {
          path: "logout",
          name: "logout",
          component: () => import("@/views/logout.vue"),
        },
        {
          path: "mainUserAccount",
          name: "mainUserAccount",
          component: () => import("@/views/mainUserAccount.vue"),
        },
        {
          path: "userBookings",
          name: "userBookings",
          component: () => import("@/views/userBookings.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/profile.vue"),
        },
        {
          path: "favs",
          name: "favs",
          component: () => import("@/views/favs.vue"),
        },
        {
          path: "userWallet",
          name: "userWallet",
          component: () => import("@/views/userWallet.vue"),
        },
        {
          path: "travellers",
          name: "travellers",
          // Async component
          component: () => import("@/views/travellers.vue"),
        },
      ],
    },
    // HotelSearchResult
    {
      path: "/HotelSearchResult",
      name: "HotelSearchResult",
      // Async component
      component: () => import("@/views/hotelSearchResult.vue"),
    },
    // FeaturedRooms
    {
      path: "/FeaturedRooms/:name/:vervotech_id",
      name: "FeaturedRooms",
      // Async component
      component: import("@/views/FeaturedRooms.vue"),
    },
    {
      path: "/flightSearchResult",
      name: "flightSearchResult",
      // Async component

      component: () => import("@/views/flightSearchResult.vue"),
    },
    //Loyalyty
    {
      path: "/Loyalty",
      name: "Loyalty",
      // Async component
      component: () => import("@/views/Loyalty.vue"),
    },
    // CheckOutPayment
    {
      path: "/CheckOutPayment/:id",
      name: "CheckOutPayment",
      // Async component
      component: () => import("@/views/CheckOutPayment.vue"),
    },
    {
      path: "/AboutUs",
      name: "AboutUs",
      // Async component
      component: () => import("@/views/AboutUs.vue"),
    },
    {
      path: "/FAQ",
      name: "FAQ",
      // Async component
      component: () => import("@/views/FAQ.vue"),
    },
    {
      path: "/ContactUs",
      name: "ContactUs",
      // Async component
      component: () => import("@/views/ContactUs.vue"),
    },
    // travellers

    {
      path: "/CheckOut",
      name: "CheckOut",
      // Async component
      beforeEnter: (to, from, next) => {
        let paymentStore = store.state.payment;
        if (
          Object.keys(paymentStore.roomSelected).length
          // &&
          // Object.keys(paymentStore.hotel).length &&
          // Object.keys(paymentStore.searchForm).length
        ) {
          next();
        } else {
          console.log(
            "Object.keys(paymentStore.roomSelected).length ",
            paymentStore,
          );
          next({ name: "Home" });
        }
      },
      component: () => import("@/views/CheckOut.vue"),
    },
    {
      path: "/Cars",
      name: "Cars",
      // Async component
      component: () => import("@/views/Cars.vue"),
    },
    {
      path: "/Login",
      name: "Login",
      // Async component
      component: () => import("@/views/Login.vue"),
      meta: { layout: "Auth" },
    },
    // packagesCategories
    {
      path: "/packagesCategories",
      name: "packagesCategories",
      // Async component
      component: () => import("@/views/packagesCategories.vue"),
    },
    {
      path: "/Packages/:id",
      name: "Packages",
      // Async component
      component: () => import("@/views/packages.vue"),
    },
    // PackagesDetails
    {
      path: "/PackagesDetails/:id",
      name: "PackagesDetails",
      // Async component
      component: () => import("@/views/PackagesDetails.vue"),
    },
    {
      path: "/packages",
      name: "packages",
      // Async component
      component: () => import("@/views/packages.vue"),
    },
    // PackagesDetails
    {
      path: "/PackagesDetails/:id",
      name: "PackagesDetails",
      // Async component
      component: () => import("@/views/PackagesDetails.vue"),
    },
    {
      path: "/Registration",
      name: "Registration",
      // Async component
      component: () => import("@/views/Registration.vue"),
    },
    // ForgetPassword
    {
      path: "/ForgetPassword",
      name: "ForgetPassword",
      // Async component
      component: () => import("@/views/ForgetPassword.vue"),
    },
    {
      path: "/VerifyPassword",
      name: "VerifyPassword",
      // Async component
      component: () => import("@/views/VerifyPassword.vue"),
    },
    {
      path: "/ResetPassword",
      name: "ResetPassword",
      // Async component
      component: () => import("@/views/resetPassword.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test.vue"),
    },
    {
      path: "/redirectPayment",
      name: "redirectPayment",
      component: () => import("@/views/redirectPayment.vue"),
    },
    {
      path: "/PaymentSuccessPage",
      name: "PaymentSuccessPageNew",
      component: () => import("@/views/PaymentSuccessPageNew.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  //if logged in do not go to login but can go to loyalty.
  if (token && to.name == "Loyalty") next();
  if (to.name == "Login" && token) {
    next({ path: "/" });
  } else {
    // Not logged in, make nothing if not loyalty.
    if (to.name == "Loyalty") {
      next({ path: "/" });
    } else {
      next();
    }
  }
});
router.afterEach((to, from) => {
  console.log("router.afterEach APPLIED");
  if (!from.name) {
    store.commit("globalStore/SET_LOADING", false);
  } else {
    store.commit("globalStore/SET_LOADING", true);
  }
  setTimeout(() => {
    store.commit("globalStore/SET_LOADING", false);
  }, 800);
});
export default router;
