<template>
  <el-row>
    <el-col class="bg-#8612EA h-50 sm:hidden lg:md:block"></el-col>
    <el-col class="relative lg:md:bottom-40 lg:px-20 md:px-20 sm:px-0">
      <div class="sm:block lg:md:hidden">
        <el-radio-group v-model="radio1" size="large" class="px-3 pt-4">
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/travellers')"
            label="Manage Travellers"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/profile')"
            label="My Dashboard"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/profile')"
            label="My Profile"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/userBookings')"
            label="My Bookings"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/profile')"
            label="Coupons"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/profile')"
            label="Favourite"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/userAccount/changePassword')"
            label="Change Password"
          />
          <el-radio-button
            class="custom-radius"
            @click="$router.push('/loyalty')"
            label="Go to loyalty page"
          />
        </el-radio-group>
      </div>
      <div
        class="flex bg-white sm:w-full lg:w-auto sm:overflow-hidden drop-shadow-md lg:p-10 sm:py-5 custom-border"
      >
        <div class="border-r-1 border-slate-300 lg:md:w-1/4 sm:hidden lg:md:block">
          <div class="sm:block lg:md:hidden">
            <el-radio-group v-model="isCollapse">
              <el-button @click="isCollapse = !isCollapse"
                ><span class="i-mdi-menu text-2xl"></span>
              </el-button>
            </el-radio-group>
          </div>
          <div class="left-card sm:hidden lg:md:flex">
            <div>
              <img
                width="60"
                class="rounded-full w-[60px] h-[60px] border-2 border-indigo-500"
                :src="
                  profileData.photo == '' || !profileData.photo
                    ? '../../src/assets/images/noProfilePic.png'
                    : profileData.photo
                "
              />
            </div>
            <div class="mx-5 pt-3">
              <span>{{ profileData.name ? profileData.name : "" }}</span>
              <!-- <span class="block text-xs text-slate-500">Travel Blogger</span> -->
            </div>
          </div>
          <div class="bg-white">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo mt-10 p-0"
              :collapse="isCollapse"
            >
              <el-menu-item
                :class="[$route.name == 'dashBoard' ? 'custome-is-active' : '']"
                index="2"
              >
                <span class="i-mdi-monitor-dashboard mr-3 text-2xl"></span>
                <span>My Dashboard</span>
              </el-menu-item>

              <el-menu-item
                index="3"
                :class="[$route.name == 'profile' ? 'custome-is-active' : '']"
                @click="$router.push('/userAccount/profile')"
              >
                <span class="i-mdi-account-outline mr-3 text-2xl"></span>
                <span>My Profile</span>
              </el-menu-item>
              <el-menu-item
                :class="[$route.name == 'userBookings' ? 'custome-is-active' : '']"
                index="4"
                @click="$router.push('/userAccount/userBookings')"
              >
                <span class="i-mdi-calendar mr-3 text-2xl"></span>
                <span>My Bookings</span>
              </el-menu-item>
              <el-menu-item
                :class="[$route.name == 'userWallet' ? 'custome-is-active' : '']"
                index="4"
                @click="$router.push('/userAccount/userWallet')"
              >
                <span class="i-mdi-wallet mr-3 text-2xl"></span>
                <span>My Wallet</span>
              </el-menu-item>
              <el-menu-item index="5"
                :class="[$route.name == 'travellers' ? 'custome-is-active' : '']"
              @click="$router.push('/userAccount/travellers')">
                <span class="i-mdi-star-outline mr-3 text-2xl"></span>
                <span>Manage Travellers</span>
              </el-menu-item>
              <!-- <el-menu-item index="6">
                                <span class="i-mdi-ticket-confirmation-outline mr-3 text-2xl"></span>
                                <span>Coupons</span>

                            </el-menu-item> -->
              <el-menu-item
                index="7"
                :class="[$route.name == 'favs' ? 'custome-is-active' : '']"
                @click="$router.push('/userAccount/favs')"
              >
                <span class="i-mdi-favourite-outline mr-3 text-2xl"></span>
                <span>Favourite</span>
              </el-menu-item>
              <el-menu-item
                :class="[$route.name == 'changePassword' ? 'custome-is-active' : '']"
                @click="$router.push('/userAccount/changePassword')"
                index="8"
              >
                <span class="i-mdi-lock-outline mr-3 text-2xl"></span>
                <span>Change Password</span>
              </el-menu-item>

              <el-menu-item @click="$router.push('/loyalty')" index="8">
                <span class="i-mdi-arrow-left mr-3 text-2xl"></span>
                <span class="">Go to loyalty page</span>
              </el-menu-item>

              <!-- <el-button class=" text-slate-500 px-8 p-3 m-5 sm:hidden lg:md:block">
                                <span class="i-mdi-power mr-3 text-2xl"></span>
                                Logout
                            </el-button> -->
              <!-- <p class="text-blue-500 mt-5 ml-4 text-4 sm:hidden lg:md:block"><span class="i-mdi-power text-5 mr-3 text-blue text-2xl"></span>Log Out</p> -->
            </el-menu>
          </div>
        </div>
        <div class="right-card lg:md:mx-10 sm:mx-2 w-full">
          <RouterView></RouterView>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      date: "",
      isCollapse: false,
      radio1: "",
    };
  },
  computed: {
    ...mapState("globalStore", {
      userPages: (state) => state.userPages,
    }),
    ...mapState("userAccount", ["profileData"]),
  },
};
</script>
<style scoped>
.is-active {
  color: rgb(32, 32, 32) !important;
}
.custome-is-active {
  color: #5808d8 !important;
  background-color: #5808d838;
}
</style>
