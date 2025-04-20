<template>
  <el-col :span="24" :xl="16" :lg="22" :sm="24" :md="23" :xs="24" class="px-1 mx-auto">
    <el-row class="py-5 justify-between">
      <reservation-card></reservation-card>
      <help-card></help-card>
      <room-details-card></room-details-card>
      <el-col
        :span="24"
        :lg="16"
        :sm="24"
        :md="16"
        :xs="24"
        class="px-1 hidden-md-and-down"
      >
        <div class="bg-#00D8FD flex custom-border mb-7 p-2 justify-around">
          <div class="self-center">
            <div class="flex">
              <div class="self-center mr-2">
                <span class="i-mdi:emoticon-happy-outline text-6xl text-white"></span>
              </div>
              <div>
                <p class="text-white font-bold pb-0 mb-0">
                  Let the world know how you flet
                </p>
                <p class="text-white text-sm font-light pt-0 mt-0">
                  Click to rate your experience
                </p>
              </div>
            </div>
          </div>

          <div class="self-center w-1/4 m-2 sm:hidden lg:md:block">
            <img src="../../src/assets/images/lineDashed.png" class="w-full" />
          </div>
          <div class="self-center m-2">
            <span class="i-mdi-star text-3xl text-white"></span>
            <span class="i-mdi-star text-3xl text-white"></span>
            <span class="i-mdi-star text-3xl text-white"></span>
            <span class="i-mdi-star text-3xl text-white"></span>
            <span class="i-mdi-star text-3xl text-white"></span>
          </div>
        </div>
      </el-col>

      <price-information-card></price-information-card>
    </el-row>
  </el-col>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      reservation: {},
    };
  },
  methods: {
    ...mapActions("userAccount", ["fetchUserBookings"]),
    ...mapMutations("userAccount", ["SET_RESERVATION"]),
    getSingleReservation() {
      for (const reservation of this.bookings.comingReservations) {
        if (reservation.id == this.$route.params.id) {
          console.log(reservation);
          this.SET_RESERVATION(reservation);
          break;
        }
      }

      for (const reservation of this.bookings.previuosReservations) {
        if (reservation.id == this.$route.params.id) {
          this.SET_RESERVATION(reservation);
          break;
        }
      }

      for (const reservation of this.bookings.cancelledReservations) {
        if (reservation.id == this.$route.params.id) {
          this.SET_RESERVATION(reservation);
          break;
        }
      }
    },
  },
  computed: {
    ...mapState("userAccount", {
      bookings: (state) => state.bookings,
    }),
  },
  mounted() {
    this.fetchUserBookings().then(() => this.getSingleReservation());
  },
};
</script>
