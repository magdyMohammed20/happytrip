<template>
  <el-card
    v-if="!checkoutDataComputed?.bookingData || !checkoutDataComputed?.hotel"
    class="review-card"
  >
    <loading-card></loading-card>
  </el-card>

  <el-card v-else class="review-card">
    <template #header>
      <div class="card-header border-b-2 border-slate-200 pb-6 p-3">
        <span class="border-1 rounded-full py-1 px-2.5">1</span>
        <span class="mx-2 font-bold">Review Booking Details</span>
      </div>
    </template>
    <div>
      <div
        class="flex lg:md:justify-between justify-around flex-col md:flex-row flex-wrap p-4 xl:px-8"
      >
        <div class="flex flex-col w-fit">
          <img
            :src="hotelDetails.hotel?.min_image"
            class="image md:w-70 sm:w-full mb-4 rounded-3xl"
          />
          <el-button
            @click="goToHotelDetails"
            text
            class="hotel-details-btn font-bold px-3 py-5 w-11/12 my-3.75 mx-auto"
            >View Hotel Details</el-button
          >
        </div>
        <!-- <div
            class="sm:pb-5 lg:border-b-0 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400"
            >-->
        <div class="mt-2 md:mx-7 w-[40%]">
          <h3 class="font-bold m-1">{{ checkoutDataComputed.bookingData.name }}</h3>
          <div class="bottom">
            <span class="i-mdi-map-marker-outline text-xl h-5"></span>
            <span class="text-xs text-slate-500">{{
              checkoutDataComputed.bookingData.addressLine1
            }}</span>

            <div>
              <el-rate
                v-model="checkoutDataComputed.bookingData.rating"
                size="xlarge"
                disabled
                text-color="#ff9900"
              />
              <!--  -->
              <h3 class="font-bold mt-3 mb-0 pb-0">Rooms Details</h3>

              <ul class="list-none px-0.75 m-0">
                <li class="text-slate-500 text-sm my-1">
                  <span>Adults Number</span>
                  {{ checkoutDataComputed.bookingData.adultsNumber }}
                </li>
                <li class="text-slate-500 text-sm my-1">
                  <span>Kids Number</span>
                  {{ checkoutDataComputed.bookingData.childrenNumber }}
                </li>
                <li class="text-slate-500 text-sm my-1">
                  <span>Days Number</span>
                  {{ checkoutDataComputed.bookingData.nightsNumber }}
                </li>

                <!-- <li class="font-bold">{{ roomName}}</li> -->
                <!-- <li class="text-sm py-1">{{  }}</li> -->
                <!-- <li class="text-sm py-1 pb-3" >
                    {{ roomSelected.boardName }}
                    </li>-->
              </ul>
              <p class="text-blue" @click="SET_CANCELLATION_DIALOG(true)">
                Check Cancellation policies
              </p>
            </div>

            <!-- <div class="my-2">
                <div class="inline bg-green-200/50 rounded-full py-1.75 px-1 mr-1">
                  <span class="i-mdi-wifi text-3xl h-5 text-green-500"></span>
                </div>
                <div class="inline bg-yellow-200/50 rounded-full py-1.75 px-1 m-1">
                  <span class="i-mdi-swim text-3xl h-5 text-yellow-500"></span>
                </div>
                <div class="inline bg-red-200/50 rounded-full py-1.75 px-1 m-1">
                  <span class="i-mdi-restaurant-menu text-3xl h-5 text-red-500"></span>
                </div>
                <div class="inline bg-blue-200/50 rounded-full py-1.75 px-1 m-1">
                  <span class="i-mdi-parking text-3xl h-5 text-blue-500"></span>
                </div>
                </div>-->
            <!-- <div class="py-5">
                <el-alert
                  title="All Stays are subject to a local city"
                  type="info"
                  closable="false"
                  show-icon
                />
                </div>-->
            <!-- <div
                class="bg-blue-100 items-center my-5 rounded-md flex items-center pr-3 w-60 md:w-auto"
              >
                <span class="i-mdi-information text-xl md:text-2xl m-2 md:m-3 text-blue-500"></span>
                <p
                  class="text-blue-500 text-xs md:text-sm font-bold"
                >All Stays are subject to a local city</p>
                </div>-->
          </div>
        </div>
        <div class="m-auto w-full md:w-auto lg:md:self-center self-start">
          <div class="bottom flex xl:flex-col justify-around">
            <div class="text-center">
              <p class="font-bold my-3">Check In</p>
              <div class="flex bg-green-100 rounded-3 px-1 py-1.5">
                <p
                  class="font-bold my-1 custom-extra-bold px-1 text-4xl text-green-500"
                >
                  {{ new Date(checkoutDataComputed.bookingData.checkin).getDate() }}
                </p>
                <div class="flex flex-col pr-1.5">
                  <p class="font-light p-0 m-0 text-md text-green-500">
                    {{
                      new Date(checkoutDataComputed.bookingData.checkin).toLocaleString(
                        "default",
                        {
                          month: "long",
                        },
                      )
                    }}
                  </p>
                  <p class="font-light p-0 m-0 text-lg text-green-500">
                    {{
                      new Date(checkoutDataComputed.bookingData.checkin).getFullYear()
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-center md:space-x-4 xl:space-x-0">
              <p class="font-bold my-3">Check out</p>
              <div class="flex bg-rose-100 rounded-3 px-1 py-1.5">
                <p
                  class="font-bold my-1 custom-extra-bold px-1 text-4xl text-rose-500"
                >
                  {{ new Date(checkoutDataComputed.bookingData.checkout).getDate() }}
                </p>
                <div class="flex flex-col pr-1.5">
                  <p class="font-light p-0 m-0 text-md text-rose-500">
                    {{
                      new Date(
                        checkoutDataComputed.bookingData.checkout,
                      ).toLocaleString("default", {
                        month: "long",
                      })
                    }}
                  </p>
                  <p class="font-light p-0 m-0 text-lg text-rose-500">
                    {{
                      new Date(checkoutDataComputed.bookingData.checkout).getFullYear()
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
  <cancellation-time-line-dialog></cancellation-time-line-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    checkoutData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      value: 3,
    };
  },
  computed: {
    ...mapState("hotels", ["cancellationDialog"]),
    // Use prop if provided, otherwise fall back to Vuex store
    checkoutDataComputed() {
      const data = this.checkoutData || this.$store.state.checkout.checkoutData;
      console.log("ReviewCard - checkoutDataComputed:", data);
      return data;
    },
    // roomName(){
    //     return   this.checkoutDataComputed.bookingData.rooms[0]?.name.split(" ").slice(0, 2).join(" ")
    // },
    /// state => hotels/availbleHotelsDetails ||
    ...mapState({
      roomSelected: (state) => state.payment.roomSelected,
      hotelDetails: (state) => {
        return Object.assign(
          {},
          state.payment.hotel,
          state.hotels.availbleHotelsDetails,
        );
      },
      bookingDetails: (state) => state.payment.searchForm,
    }),
  },
  methods: {
    ...mapMutations("checkout", ["SET_CANCELLATION_DIALOG"]),

    goToHotelDetails() {
      // console.log(this.hotelDetails);
      let decoded = decodeURIComponent(this.$route.query.q);
      let jsonDecoded = JSON.parse(decoded);
      console.log(jsonDecoded.uuid);
      this.$router.push(
        `/HotelSearchResultsDetails/${this.hotelDetails.hotel.name}/${jsonDecoded.uuid}/${this.hotelDetails.hotel.id}`,
      );
    },
  },
  created() {
    console.log("checkoutDatacheckoutDatacheckoutData", this.checkoutData);
  },
};
</script>
<style>
.review-card > .el-card__header {
  background-color: white;
  border-bottom: 1px rgb(255, 255, 255) solid;
  height: fit-content;
}

.review-card .hotel-details-btn {
  border: 3px solid var(--el-color-primary) !important;
  border-radius: 5px !important;
  color: var(--el-color-primary) !important;
}
</style>
