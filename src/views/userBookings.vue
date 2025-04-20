<template>
  <el-tabs type="border-card" v-model="activeName" class="demo-tabs account-tabs">
    <el-tab-pane label="Hotels" name="first" v-if="previuosReservations">
      <el-tabs v-model="activeHotelName" class="demo-tabs account-tabs mt-3">
        <el-tab-pane label="Upcomming" name="firstTab" v-if="comingReservations">
          <booking-card tabName="Upcomming" v-bind:currentTab="comingReservations"></booking-card>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="secondTab" v-if="previuosReservations">
          <booking-card tabName="Completed" v-bind:currentTab="previuosReservations"></booking-card>
        </el-tab-pane>
        <el-tab-pane label="Cancelled" name="thirdTab" v-if="cancelledReservations">
          <booking-card tabName="Cancelled" v-bind:currentTab="cancelledReservations"></booking-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="Packages" name="second" ref="myTabs">
      <el-tabs v-model="activePackage" class="demo-tabs account-tabs mt-3">

        <el-tab-pane label="Comming" name="firstPackageTab" v-if="packagesComing">
          <booking-package-card tabName="Comming" v-bind:currentTab="packagesComing"></booking-package-card>
        </el-tab-pane>
        <el-tab-pane label="Pending" name="secondPackageTab" v-if="packagesPending">
          <booking-package-card tabName="Pending" v-bind:currentTab="packagesPending"></booking-package-card>
        </el-tab-pane>
        <el-tab-pane label="Previous" name="thirdPackageTab" v-if="packagesPrevious">
          <booking-package-card tabName="Previous" v-bind:currentTab="packagesPrevious"></booking-package-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapState } from "vuex";
// import bookingCard from "../components/userAccount/bookingsComponent/bookingCard.vue"
export default {
  // components:{
  //   bookingCard
  // },
  data() {
    return {
      activeName: "first",
      activeHotelName: "firstTab",
      rooms: [],
      activePackage: "secondPackageTab"
    };
  },
  methods: {
    ...mapActions("userAccount", ["fetchUserBookings", "fetchBookedPackges"])
  },
  computed: {
    ...mapState("userAccount", {
      previuosReservations: state => state.bookings?.previuosReservations,
      comingReservations: state => state.bookings?.comingReservations,
      cancelledReservations: state => state.bookings?.cancelledReservations,
      bookings: state => state.bookings,
      packagesComing: state => state.packages?.packagesComing,
      packagesPending: state => state.packages?.packagesPending,
      packagesPrevious: state => state.packages?.packagesPrevious
    })
    // roomDetails() {
    //   return room => `${(this.rooms = room.split("}"))}`;
    // }
  },
  created() {
    this.fetchUserBookings();
    this.fetchBookedPackges();
    if (this.$route.query.activeName) {
      this.activeName = 'second'
    }
  },
};
</script>