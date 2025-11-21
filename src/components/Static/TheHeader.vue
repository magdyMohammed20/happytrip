<template>
  <div class id="nav" @click="log()">
    <div v-if="mainNavBar">
      <el-container
        fluid
        class="mx-auto h-full py-4 lg:px-10 md:px-5 sm:px-2 relative z-6"
        :class="[$route.name == 'Home' ? 'homePageNav' : 'restPagesNav']"
      >
        <el-header class="justify-end">
          <el-menu
            mode="horizontal"
            :ellipsis="false"
            background-color="#8612EA"
            class="relative z-3 bg-transparent justify-end"
          >
            <span v-if="$route.name == 'Home'">
              <img src="/images/logo.png" alt="logo" @click="loginUser(form)" />
            </span>
            <span v-else>
              <router-link to="/">
                <img
                  src="../../assets/images/darkNavLogo.png"
                  class="w-40 p-1"
                  alt="logo"
                />
              </router-link>
            </span>
            <div class="flex-grow" />
            <div class="flex handle-right-nav justify-end">
              <router-link to="/" class="handle-hover mt-1">
                <el-menu-item
                  index="1"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover"
                >
                  <span
                    class="i-mdi-home text-white text-xl pl-1 handle-hover"
                  />
                  
                  {{ $t("header.home") }}
                </el-menu-item>
              </router-link>


              <router-link to="/packagesCategories" class="handle-hover mt-1">
                <el-menu-item
                  index="1"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover"
                >
                  <span
                    class="i-mdi-gift text-white text-xl pl-1 handle-hover"
                  />
                  Packages
                </el-menu-item>
              </router-link>
              <!-- <router-link to="/Cars" class="handle-hover mt-1">
                <el-menu-item
                  index="2"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover"
                >
                  <span class="i-mdi-car text-white text-xl pl-1 handle-hover" />
                  Cars
                </el-menu-item>
              </router-link> -->
              <!-- <router-link to="/Flights" class="handle-hover mt-1">
                <el-menu-item index="3" class="lg:text-white sm:text-gray-800 md:text-gray-800 handle-hover">
                  <span class="i-mdi-airplane text-white text-xl pl-1 handle-hover" />Flights
                </el-menu-item>
              </router-link>-->
              <!-- <router-link to="/FeaturedHotels" class="handle-hover mt-1">
                <el-menu-item
                  index="4"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 handle-hover"
                >
                  <span
                    class="i-mdi-office-building text-white text-xl pl-1 handle-hover"
                  />Featured Hotels
                </el-menu-item>
              </router-link> -->

              <!-- <el-select
                v-model="language"
                placeholder="Lang"
                size="small"
                class="pill select-box custom-border placeholder mt-3"
              >
                <el-option key="en" label="Eng" value="Eng" @click="setLang('en')" />
                <el-option key="ar" label="ARAB" value="ARAB" @click="setLang('ar')" />
              </el-select> -->
              <el-select
                v-if="!profileData.user_id"
                v-model="currency"
                :placeholder="currency"
                size="small"
                color="white"
                text
                class="pill select-box custom-border pt-3 curr-placeholder w-[30%]"
              >
                <el-option
                  v-for="item in currencies"
                  @click="saveCurrency(item)"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
              <el-dropdown
                trigger="click"
                class="custom-border"
                style="margin: 0 10px"
                cursor="pointer"
                v-if="profileData.user_id"
              >
                <div
                  class="display-flex items-center"
                  v-if="profileData.user_id"
                >
                  <img
                    :src="
                      profileData.photo == '' || !profileData.photo
                        ? 'images/noProfilePic.png'
                        : profileData.photo
                    "
                    alt="profile image"
                    style="width: 50px; height: 50px"
                    class="mx-1 rounded-full"
                  />
                  <span class="text-color pl-3 text-base font-bold">
                    <!-- {{ profileData.name.split(' ')[0] ? profileData.name.split(' ')[0] : ''}} -->
                  </span>
                </div>

                <template #dropdown class="custom-border">
                  <div class="card-body custom-border">
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-if="!profileData.user_id"
                        @click="notDirectingMessage"
                      >
                        <router-link class="no-underline" to="/login"
                          >Login</router-link
                        >
                      </el-dropdown-item>
                      <el-dropdown-item v-if="profileData.user_id">
                        <router-link
                          class="no-underline"
                          to="/userAccount/mainUserAccount"
                          >My Account</router-link
                        >
                      </el-dropdown-item>
                      <el-dropdown-item v-if="profileData.user_id">
                        <router-link
                          class="no-underline"
                          to="/UserAccount/userBookings"
                          >My Bookings</router-link
                        >
                      </el-dropdown-item>
                      <el-dropdown-item v-if="profileData.user_id">
                        <router-link
                          class="no-underline"
                          to="/UserAccount/changePassword"
                          >Change Password</router-link
                        >
                      </el-dropdown-item>
                      <!-- loyalty -->
                      <el-dropdown-item v-if="profileData.user_id">
                        <router-link class="no-underline" to="/loyalty"
                          >Rahal Program
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="profileData.user_id"
                        @click="dialog = true"
                        >Logout</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </div>
                </template>
              </el-dropdown>
              <div v-else>
                <router-link class="no-underline" to="/login">
                  <el-button
                    type="info"
                    plain
                    class="mt-3 custom-border p-4 text"
                    >Login</el-button
                  >
                </router-link>
              </div>
            </div>
            <el-dialog v-model="dialog" width="30%" class="logout-dialog">
              <p class="font-bold text-center">
                Are you sure you want to logout ?
              </p>
              <template #footer>
                <span class="dialog-footer text-center">
                  <el-button @click="dialog = false" class="text-center"
                    >Cancel</el-button
                  >
                  <el-button
                    type="primary"
                    @click="
                      dialog = false;
                      logout();
                    "
                    >Confirm</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </el-menu>
        </el-header>
      </el-container>
    </div>

    <!-- TODO:de talsima alazm tt3dl al nav bar mttkrra mara fe al login bas fixed we al ba2y la 34an 7ewar al many design of nav 
    in many pages-->
    <div v-else>
      <el-container
        fluid
        class="mx-auto py-4 loginNavBar lg:px-10 md:px-5 sm:px-2 relative z-6"
      >
        <el-header class="justify-end">
          <el-menu
            mode="horizontal"
            :ellipsis="false"
            background-color="#8612EA"
            class="relative z-3 bg-transparent justify-end"
          >
            <span>
              <router-link to="/">
                <img
                  src="../../assets/images/darkNavLogo.png"
                  class="w-40 p-1"
                  alt="logo"
                />
              </router-link>
            </span>
            <div class="flex-grow" />
            <div class="flex justify-end">
              <router-link to="/" class="handle-hover mt-1">
                <el-menu-item
                  index="1"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover"
                >
                  <span
                    class="i-mdi-home text-white text-xl pl-1 handle-hover"
                  />
                  Home
                </el-menu-item>
              </router-link>
              <!-- <router-link to="/" class="handle-hover mt-1">
                <el-menu-item
                  index="1"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover"
                >
                  <span class="i-mdi-car text-white text-xl pl-1 handle-hover" />
                  Cars
                </el-menu-item>
              </router-link> -->

              <!-- <el-menu-item
                index="2"
                class="lg:text-white sm:text-gray-800 md:text-gray-800 handle-hover"
              >
                <span
                  class="i-mdi-airplane text-white text-xl pl-1 handle-hover"
                />Flights
              </el-menu-item> -->
              <router-link to="/packagesCategories" class="handle-hover mt-1">
                <el-menu-item
                  index="3"
                  class="lg:text-white sm:text-gray-800 md:text-gray-800 handle-hover"
                >
                  <span
                    class="i-mdi-gift text-white text-xl pl-1 handle-hover"
                  />Packages
                </el-menu-item>
              </router-link>

              <!-- <el-select
                v-model="language"
                placeholder="Lang"
                size="small"
                class="pill select-box custom-border placeholder mx-5"
              >
                <el-option
                  key="en"
                  label="Eng"
                  value="Eng"
                  @click="setLang('en')"
                />
                <el-option
                  key="ar"
                  label="ARAB"
                  value="ARAB"
                  @click="setLang('ar')"
                />
              </el-select> -->

              <!-- <el-select
                v-model="currency"
                :placeholder="currency"
                size="small"
                color="white"
                text
                class="pill select-box custom-border curr-placeholder"
              >
                <el-option
                  v-for="item in currencies"
                  @click="saveCurrency(item)"
                  :label="item"
                  :value="item"
                />
              </el-select>-->
            </div>
          </el-menu>
        </el-header>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import i18n from "@/plugins/i18n";

export default {
  data() {
    return {
      form: {},
      language: "en",
      currency: window.localStorage.getItem("CURR")
        ? window.localStorage.getItem("CURR")
        : "SAR",
      dialog: false,
      isAuthor: window.localStorage.getItem("status"),
      // currencies: ["AED", "EGP", "SAR", "USD"]
    };
  },
  methods: {
    ...mapMutations("hotels", ["SET_GUEST_CURRENCY"]),
    ...mapActions("logUser", ["loginUser", "logoutUser"]),
    ...mapActions("hotels", ["fetchAvailbleHotel"]),
    ...mapMutations("userAccount", ["SET_PROFILE_DATA"]),
    setDefaultCurrency() {
      localStorage.setItem("CURR", "SAR");
    },
    log() {
      console.log("profileData", this.profileData);
    },
    saveCurrency(typeCurr) {
      console.log("typeCURRR", typeCurr.code);
      localStorage.setItem("CURR", typeCurr.code);
      // this.SET_GUEST_CURRENCY(typeCurr)
      // console.log(this.$store.state.hotels.guestCurrency);
      this.fetchAvailbleHotel({ uuid: window.localStorage.getItem("uuid") });
      window.location.reload();
    },
    logout() {
      this.SET_PROFILE_DATA({});
      this.logoutUser()
        .then(() => {
          this.$toast.show(
            "you Logged out from Happy Trip please Login again for more accessability "
          );
          // this.$router.push("/login");
        })
        .catch(() => {
          this.$toast.show(
            "an error happened while logging out ... please try again"
          );
        });
    },
    setLang(lang) {
      this.$root.$i18n.locale = lang;
      console.log(this.$root.$i18n.locale);
      localStorage.setItem("lang", lang);
      // window.location.reload()
    },
    notDirectingMessage() {
      this.$toast.show(
        "If You're not directing to Login This means that you're logged in you can logout and try to login again"
      );
    },
  },
  created() {
    this.setDefaultCurrency();
  },
  computed: {
    ...mapState("globalStore", ["currencies"]),
    ...mapState("userAccount", ["profileData"]),
    mainNavBar() {
      return this.$route.name != "Login";
    },
  },
};
</script>
<style>
.text-color {
  color: white;
}

.card-body {
  padding: 10px 0 !important;
}

.select-box {
  width: 10%;
  display: flex;
  align-items: center;
  margin: 0 10px;
  background-color: transparent !important;
}

.select-box > .el-tooltip__trigger > .el-input > .el-input__wrapper {
  background-color: transparent !important;
  border: 1px solid white;
  height: 100%;
}
.select-box
  > .el-tooltip__trigger
  > .el-input
  > .el-input__wrapper
  > .el-input__inner {
  color: white;
}
.homePageNav {
  background-color: transparent;
  /* position: fixed !important; */
  width: 100%;
  height: 100%;
}

.loginNavBar {
  background-color: transparent;
  position: fixed !important;
  /* margin-bottom: 20px; */
  width: 100%;
  /* height: 20px; */
}

.restPagesNav {
  background-color: #8612ea;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.handle-hover:hover,
.handle-hover:focus,
.handle-hover:active {
  color: rgb(209, 209, 209) !important;
  font-weight: 800;
  text-decoration: none;
}

.handle-hover {
  text-decoration: none;
}

.placeholder
  > div
  > .el-input
  > .el-input__wrapper
  > .el-input__inner::placeholder {
  opacity: 1;
  color: rgb(255, 255, 255) !important;
}

.placeholder
  > div
  > .el-input
  > .el-input__wrapper
  > .el-input__suffix
  > .el-input__suffix-inner
  > i
  > svg {
  opacity: 1;
  color: rgb(255, 255, 255) !important;
}

.curr-placeholder
  > div
  > .el-input
  > .el-input__wrapper
  > .el-input__inner::placeholder {
  opacity: 1;
  color: rgb(255, 255, 255) !important;
}

.curr-placeholder
  > div
  > .el-input
  > .el-input__wrapper
  > .el-input__suffix
  > .el-input__suffix-inner
  > i
  > svg {
  opacity: 1;
  color: rgb(255, 255, 255) !important;
}

.curr-placeholder
  > .el-tooltip__trigger
  > .el-input
  > .el-input__wrapper
  > .el-input__inner {
  color: white;
}

.logout-dialog > footer {
  text-align: center;
}
</style>
