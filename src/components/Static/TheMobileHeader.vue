<template >
  <el-container
    fluid
    class="mx-auto py-4 lg:px-10 md:px-5 sm:px-2"
    :class="[$route.name == 'Home' ? 'homePageNav' : 'restPagesNav']"
  >
    <el-header class="justify-end">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        background-color="#8612EA"
        class="relative z-3 bg-transparent justify-between"
      >
        <div>
          <span v-if="$route.name == 'Home'">
            <img src="/images/logo.png" alt="logo" />
          </span>
          <span v-else>
            <img src="../../assets/images/darkNavLogo.png" class="w-40 p-1" alt="logo" />
          </span>
        </div>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span class="i-mdi-menu text-3xl text-gray my-3"></span>
              <el-icon class="el-icon--right">
                <!-- <arrow-down /> -->
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="!profileData.user_id" @click="notDirectingMessage">
                  <router-link class="no-underline" to="/login">Login</router-link>
                </el-dropdown-item>
            

                <el-dropdown-item class="flex justify-center">
                  <div class="flex items-center">
                    <img
                      :src="
                      profileData.photo == '' || !profileData.photo
                        ? 'images/noProfilePic.png'
                        : profileData.photo
                    "
                      alt="logo"
                      style="width: 50px; height: 50px"
                      class="m-auto rounded-full"
                      v-if="profileData.user_id"
                    />
                    
                    
                  </div>
                </el-dropdown-item>

                <el-dropdown-item>
                  <router-link to="/" class="handle-hover pt-1 m-auto">
                    <!-- <el-menu-item index="1"
                    class="lg:text-white sm:text-gray-800 md:text-gray-800 mx-2 handle-hover">-->
                    <!-- <span class="i-mdi-home text-white text-xl pl-1 handle-hover" /> -->
                    Home
                    <!-- </el-menu-item> -->
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="profileData.user_id">
                  <router-link
                    class="no-underline m-auto pt-1"
                    to="/userAccount/mainUserAccount"
                  >My Account</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="profileData.user_id">
                  <router-link
                    class="no-underline m-auto pt-1"
                    to="/UserAccount/userBookings"
                  >My Bookings</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="profileData.user_id">
                  <router-link
                    class="no-underline m-auto pt-1"
                    to="/UserAccount/changePassword"
                  >Change Password</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-select
                    v-model="language"
                    placeholder="Lang"
                    size="small"
                    class="pill select-box custom-border mobile-placeholder"
                  >
                    <el-option key="Eng" label="Eng" value="Eng" />
                    <el-option key="ARAB" label="ARAB" value="ARAB" />
                  </el-select>
                </el-dropdown-item>
                <el-dropdown-item>
                 <el-select
                      v-if="profileData.user_id"
                      v-model="currency"
                      :placeholder="currency"
                      size="small"
                      color="white"
                      text
                      class="pill mobile-placeholder select-box w-full custom-border"
                    >
                      <el-option
                        v-for="item in currencies"
                        @click="saveCurrency(item)"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-menu>
    </el-header>
  </el-container>
</template>
  
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
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
      currencies: ["AED", "EGP", "SAR", "USD"]
    };
  },
  computed: {
    ...mapState("userAccount", ["profileData"])
  },
  methods: {
    ...mapMutations("hotels", ["SET_GUEST_CURRENCY"]),
    ...mapActions("logUser", ["loginUser", "logoutUser"]),
    ...mapActions("hotels", ["fetchAvailbleHotel"]),
    saveCurrency(typeCurr) {
      window.localStorage.setItem("CURR", typeCurr);
      // this.SET_GUEST_CURRENCY(typeCurr)
      // console.log(this.$store.state.hotels.guestCurrency);
      this.fetchAvailbleHotel({uuid:window.localStorage.getItem("uuid")});
      window.location.reload();
    },
    notDirectingMessage() {
      this.$toast.show(
        "If You're not directing to Login This means that you're logged in you can logout and try to login again"
      );
    },

    logout() {
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
    }
  }
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
}

.homePageNav {
  background-color: transparent;
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

.mobile-placeholder > div > .el-input > .el-input__wrapper > .el-input__inner {
  width: auto !important;
}
.mobile-placeholder
  > div
  > .el-input
  > .el-input__wrapper
  > .el-input__inner::placeholder {
  opacity: 1 !important;
  color: rgb(105, 105, 105) !important;
}
.mobile-placeholder >.el-tooltip__trigger > .el-input > .el-input__wrapper > .el-input__inner {
    color: #07000c;
}
</style>
  