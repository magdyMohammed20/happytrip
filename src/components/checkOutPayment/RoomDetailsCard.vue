<template>
  <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24" class="px-1 mb-7">
    <el-card class="lg:p-3">
      <div v-if="reservation.hotel">
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col self-center">
            <img
              :src="reservation.hotel.min_image"
              class="image md:w-70 sm:w-full rounded-3xl"
            />
          </div>
          <div class="mt-2 md:mx-7">
            <h3 class="font-bold m-1">{{ reservation.hotel.name }}</h3>
            <h3 class="font-bold m-1">
              {{ reservationHotelObject.addressLine1 }}
            </h3>

            <div class="bottom">
              <span class="i-mdi-map-marker-outline text-xl h-5"></span>
              <span class="text-xs text-slate-500">{{
                reservation.hotel.address
              }}</span>
              <div>
                <el-rate
                  v-model="reservation.hotel.ratingStars"
                  size="xlarge"
                  disabled
                  text-color="#ff9900"
                />
                <ul class="list-none pb-2 px-0 m-0">
                  <li class="text-sm py-1">
                    <span class="i-mdi-phone px-1"></span>

                    {{ reservationHotelObject.phones[0] }}
                  </li>
                  <li class="text-sm py-1">
                    <span class="i-mdi-printer px-1"></span>
                    {{ reservationHotelObject.fax }}
                  </li>
                  <li class="text-sm py-1">
                    <span class="i-mdi-email px-1"></span>
                    {{ reservationHotelObject.emails?.[0] ?? "" }}
                  </li>
                </ul>
                <!-- <p class="text-3 text-slate-400">{{ reservation.hotel.description }}</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card
      class="lg:p-3 p-3 mt-3"
      v-for="(room, index) in reservationRooms[0].rates"
      :key="roomId"
    >
      <div class="flex flex-col md:flex-row">
        <!-- <div class="flex flex-col self-center">
            <img
              :src="reservation.hotel.min_image"
              class="image md:w-70 sm:w-full rounded-3xl"
            />
          </div> -->
        <div class="mt-2 md:mx-7">
          <!-- <h3 class="font-bold m-1">{{ reservation.hotel.name }}</h3> -->
          <h3 class="font-bold my-4">ROOM {{ index + 1 }}</h3>

          <div class="bottom">
            <div>
              <ul class="list-none pb-2 px-0 m-0">
                <li class="text-sm py-1">
                  <span class="i-mdi-star px-1"></span>

                  RATE CLASS : {{ room.rateClass }}
                </li>
                <li class="text-sm py-1">
                  <span class="i-mdi-money px-1"></span>
                  NET PRICE : {{ room.net }}
                </li>
                <li class="text-sm py-1">
                  <span class="i-mdi-user px-1"></span>
                  BOARD : {{ room.boardName }}
                </li>
                <li class="text-sm py-1">
                  <span class="i-mdi-hotel px-1"></span>
                  ROOM NUM : {{ room.rooms }}
                </li>
                <li class="text-sm py-1">
                  <span class="i-mdi-users px-1"></span>
                  ADULTS NUM : {{ room.adults }}
                </li>
                <li class="text-sm py-1">
                  <span class="i-mdi-users px-1"></span>
                  KIDS NUM : {{ room.children }}
                </li>
              </ul>
              <!-- <p class="text-3 text-slate-400">{{ reservation.hotel.description }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <div
      class="bg-violet-50 flex justify-between items-center custom-border p-3 my-5"
    >
      <div class="flex">
        <span
          class="i-mdi-information text-3xl md:text-xl m-3 text-violet-500"
        ></span>
        <p class="text-violet-500 text-[12px] md:text-sm font-bold pr-1.25">
          We sent the confirmation email and booking details to
          <span class="text-violet-700">{{ profileData.email }}</span>
        </p>
      </div>
      <div class="flex mr-4 hidden-md-and-down">
        <el-button
          size="large"
          class="hover:bg-violet-300 p-6 bg-transparent text-violet-600 border-1 border-violet-800 font-bold"
          @click="SET_EDIT_RESERVATION_DIALOG(true)"
        >
          <span class="i-mdi-edit text-2xl md:text-xl m-1"></span>
          Edit
        </el-button>
        <el-button
          size="large"
          id="cancel-btn"
          :disabled="isCanselationPassed"
          class="bg-#FF1E74 text-white font-bold hover:bg-#FF1E74 hover:text-white p-6"
          @click="cancelReservation($route.params.id)"
          :loading="cancelLoading"
        >
          <span class="i-mdi-cancel text-2xl md:text-xl m-1"></span>
          Cancel
        </el-button>
      </div>
      <edit-reservation-dialog></edit-reservation-dialog>
    </div>
  </el-col>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { convertStringValuesToObjects } from "@/utils/helpers";
export default {
  data() {
    return {
      cancelLoading: false,
      imageBaseURL: "https://photos.hotelbeds.com/giata/original/",
    };
  },
  computed: {
    reservationRooms() {
      // reservation.room[0]
      // return convertStringValuesToObjects(this.reservation.room);
      return JSON.parse(this.reservation.room);
    },
    reservationHotelObject() {
      return convertStringValuesToObjects(this.reservation.hotel);
    },
    ...mapState("userAccount", ["reservation", "profileData"]),
    isCanselationPassed() {
      const today = new Date();
      const lastCancellationDate = new Date(
        this.reservation.cancellation_last_date
      );
      console.log("isCanselationPassed", today > lastCancellationDate);
      return today > lastCancellationDate;
    },
  },
  methods: {
    ...mapMutations("userAccount", ["SET_EDIT_RESERVATION_DIALOG"]),
    cancelReservation(reservationId) {
      this.cancelLoading = true;
      this.$axios
        .get(`/api/user/cancelBookingRequest/${reservationId}`)
        .then(() => {
          this.$toast.show("You cancel this Reservation");
          this.$router.push("/userAccount/userBookings");
        })
        .catch((e) => this.$router.push("/userAccount/userBookings"))
        .finally(() => {
          this.cancelLoading = false;
        });
    },
  },
};
</script>

<style scoped>
#cancel-btn {
  border: 1px solid;
  padding: 1.5rem;
  font-weight: bold;
  color: #e6e6fa;
}
</style>
