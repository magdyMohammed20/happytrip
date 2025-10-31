<template>
  <el-col class="para-filter">
    <div class="flex justify-between flex-wrap items-center gap-4">
      <h5 class="font-extrabold">Show Rooms With:</h5>
      <!-- filters -->
      <div class="flex gap-4 flex-wrap">
        <el-card class="w-60">
          <div class="flex flex-col gap-2">
            <div class="bg-#5cf4eb flex justify-center w-24 p-4 rounded-xl">
              <span
                class="i-mdi-cancel text-white text-4xl text-slate-800"
              ></span>
            </div>
            <p>Free Cancellation</p>
            <el-switch
              :disabled="roomsLoader"
              size="large"
              v-model="filters.freeCancellation"
            ></el-switch>
          </div>
        </el-card>

        <el-card class="w-60">
          <div class="flex flex-col gap-2">
            <div class="bg-#ff0097 flex justify-center w-24 p-4 rounded-xl">
              <img src="../../assets/icons/dinner.png" alt="food icon" />
            </div>
            <p>With Breakfast</p>
            <el-switch
              :disabled="roomsLoader"
              size="large"
              v-model="filters.breakfast"
            ></el-switch>
          </div>
        </el-card>
      </div>
    </div>
  </el-col>

  <!-- end of filters of body cards -->
  <el-col class="mt-6" v-if="roomsLoader">
    <loading-card></loading-card>
  </el-col>

  <div
    v-else-if="computedRooms.length != 0"
    class="flex flex-wrap gap-6 mt-12 justify-center"
  >
    <div v-for="(room, roomIndex) in computedRooms" :key="room.id">
      <!-- <div class="sm:block border-1 border-slate-200 main-card">
      <div
        class="py-3 border-1 border-slate-200 top-radius bg-slate-50 sm:w-full flex flex-col"
      >
        <div class>
          <div
            class="custom-border text-4 font-bold text-gray-500 px-3 top-radius border-slate-300"
          >
            {{ room.name }}
          </div>
          <div class="flex w-[80%]">
            <div
              class="px-4"
              v-for="roomDetail in availbleHotelsDetails.data.rooms"
              :key="roomDetail"
            >
              <img
                :src="availbleHotelsDetails.data.hotel.thumbnail"
                class="w-[45%] mt-2 rounded-xl"
              />

              <p class="text-sm text-slate-400 py-0 my-0">
                <span>Adults : {{ roomDetail.occupancy.max_adults }}</span>
                <span>Kids : {{ roomDetail.occupancy.max_children }}</span>
              </p>
              <span
                class="text-xs text-slate-400 py-0 my-0"
                v-for="(age, index) in roomDetail.ChildrenAges"
                >Kid {{ index + 1 }} : {{ age }} years</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex body-right-card">
        <div class="flex w-[35%] m-5 self-center">
          <div class>
            <div class="flex justify-center">
              <img
                :src="availbleHotelsDetails.data.hotel.thumbnail"
                class="w-[100%] rounded-xl"
              />
            </div>
            <!-- <div>
              <p
                class="text-gray-400 text-xs inline-flex border-2 border-slate-200 rounded-3xl m-2 p-1 px-2"
              >
                <span class="i-mdi-bed-double-outline text-xl mr-1 text-slate-400"></span>
                Double bed
              </p>
              <p
                class="text-gray-400 text-xs inline-flex border-2 border-slate-200 rounded-3xl m-2 p-1 px-2"
              >
                <span class="i-mdi-bed-single-outline text-xl text-slate-400"></span>
                <span class="i-mdi-bed-single-outline text-xl mr-1 text-slate-400"></span>
                Or 2 twin Beds
              </p>
              <p
                class="text-gray-400 text-xs inline-flex border-2 border-slate-200 rounded-3xl m-2 p-1 px-2"
              >
                <span class="i-mdi-beach mr-1 text-xl text-slate-400"></span>
                Sea view
              </p>
              <p
                class="text-gray-400 text-xs inline-flex border-2 border-slate-200 rounded-3xl m-2 p-1 px-2"
              >
                <span class="i-mdi-bed-single-outline text-xl text-slate-400"></span>
                <span class="i-mdi-bed-single-outline text-xl mr-1 text-slate-400"></span>
                Or 2 twin Beds
              </p>
              <p
                class="text-gray-400 text-xs inline-flex border-2 border-slate-200 rounded-3xl m-2 p-1 px-2"
              >
                <span class="i-mdi-bed-double-outline text-xl mr-1 text-slate-400"></span>
                Double bed
              </p>
            </div> -->
      <!-- </div>
        </div> -->
      <!--       <div class="w-full">
          <div
            class="flex flex-col bg-white sm:flex-row sm:flex-wrap remove-top-border justify-between border-solid border-1 border-slate-300"
            v-for="rate in room?.rates[0].open
              ? room.rates
              : room.rates.slice(0, 2)" :key="rate">

            <div class="px-8">
              <p class="subheader font-light text-xl">Whats Included</p>

              <ul class="ml-0 pl-0" v-if="rate.cancellationPolicies">
                <li class="font-light m-0 p-0 list-style text-black py-1"
                  v-if="isFreeToCancel(rate.cancellationPolicies)">
                  <p v-if="isFreeToCancel(rate.cancellationPolicies)"
                    class="text-xs p-0 m-0 text-green-400 lg:md:block sm:inline break-all">
                    <span class="i-mdi-circle-small text-3xl text-green-500"></span>

                    <span class="font-semibold">Free Cancellation before:</span>
                  </p>
                  <p v-if="isFreeToCancel(rate.cancellationPolicies)"
                    class="text-xs pl-7 m-0 text-green-400 lg:md:block sm:inline break-all">
                    {{ cancelationDate(rate) }}
                    <span class="inline custom-icon" @click="
                      SET_CANCELLATION_DIALOG(true);
                    SET_CANCELLATION_DIALOG_DATA(rate);
                    ">
                      <span class="i-mdi-exclamation text-sm border-rounded-xl text-blue-500"></span>
                    </span>
                  </p>
                </li>
                <li class="font-bold m-0 p-0 list-style text-red-500 py-1" v-else>
                  <span class="i-mdi-circle-small text-3xl text-red-500"></span>
                  Non Refundable
                </li>
                <li class="font-bold list-style py-1 text-#5808D8">
                  <span class="i-mdi-circle-small text-3xl text-green-500"></span>
                  {{ rate.boardName }}
                </li>
              </ul>
              <div class="w-full">
                <p class="text-red-500 font-bold">
                  {{ rate.promotion[0] }}
                </p>
              </div>
              <div class="text-slate-500">{{ rate.inclusion }}</div>
            </div>

            <div
              class="px-5 flex lg:md:flex-col sm:flex-row sm:justify-between lg:md:justify-start lg:md:w-fit sm:w-full">
              <p class="subheader text-center pb-0 mb-0 font-light text-xl">
                Capacity
              </p>
              <div>
                <span class="i-mdi-account text-5xl text-slate-800"></span>
                <span class="i-mdi-account text-5xl text-slate-800"></span>
              </div>
            </div>
            <div class="px-5">
              <p class="subheader font-light lg:md:text-xl sm:text-4 font-bold">
                Total For Stay
              </p>
              <p class="text-xl py-0 my-0 custom-extra-bold text-#FF1E74 lg:md:block sm:inline">
                {{ getCurrencyType }}
                {{ Math.round(rate.net) }}
              </p>
              <p class="subheader font-light pt-0 mt-0 text-slate-500 text-xs lg:md:block">
                total For {{ getDiffrencetotalDays }} Days
              </p>
            </div>
            <div class="lg:md:w-fit sm:w-full flex flex-col justify-between text-center py-2 mt-5">
              <div>
                <el-button
                  class="flex-grow-1 text-white font-bold bg-#1CCF3D text-center py-5 px-8 custom-border book-btn hover:bg-violet-100 ease-in-out duration-300"
                  @click="goToPayment(rate)">
                  Book for
                  {{ availbleHotelsDetails.roomCount }} Room
                </el-button>

              </div>
            </div>
          </div>

          <div @click="displayedItems(room)" v-if="room.rates.length > 2"
            class="button hover:bg-violet-100 ease-in-out duration-300 font-bold text-purple-800 text-xs bg-violet-100 p-3 text-center cursor-pointer lg:md:block sm:hidden">
            {{ room.rates[0].open ? "Show less" : "Show more" }}
          </div>
        </div> -->
      <!-- </div>
      </div> -->
      <room-card :room="room" :hotelsDetails="availbleHotelsDetails" />
    </div>
  </div>

  <el-col v-else>
    <h5 class="text-slate-400">
      Sorry There is no Rooms available try another search
    </h5>
  </el-col>
  <cancellation-time-line-room-dialog></cancellation-time-line-room-dialog>

  <!-- end of body cards -->
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import RoomCard from "./RoomCard.vue";
export default {
  data() {
    return {
      active: 0,
      dialogVisible: false,
      rooms: [],
      filters: {
        freeCancellation: false,
        breakfast: false,
      },
      currencyType: window.localStorage.getItem("CURR"),
      rates: [],
      filteredRates: [],
      originalRooms: [],
      ratesLength: 0,
      roomSelected: null,
      payload: {},
    };
  },
  components: {
    RoomCard,
  },
  computed: {
    ...mapState("hotels", [
      "availbleHotels",
      // "currencyPrice",
      "guestCurrency",
      "hotelCurrency",
      "marginVendorData",
      "availbleHotelsDetails",
      "roomsLoader",
    ]),
    ...mapState("featuredHotels", ["featuredHotelsRooms"]),
    computedRooms() {
      if (this.availbleHotelsDetails.data.rooms_count) {
        // console.log("rooms_count", this.availbleHotelsDetails.data.rooms_count);
        // console.log("data", this.availbleHotelsDetails.data);

        let rooms = this.availbleHotelsDetails.data.rooms;

        // Apply freeCancellation filter (refundable rooms)
        if (this.filters.freeCancellation) {
          rooms = rooms.filter((room) => {
            return room.cancellation_policy.is_refundable === true;
          });
        }

        // Apply breakfast filter
        if (this.filters.breakfast) {
          rooms = rooms.filter((room) => {
            return room.base_rate_id === "BB";
          });
        }

        return rooms;
      }
    },
    getDiffrencetotalDays() {
      return Math.ceil(
        Math.abs(
          new Date(this.availbleHotelsDetails.checkIn) -
            new Date(this.availbleHotelsDetails.checkOut),
        ) /
          (1000 * 60 * 60 * 24),
      );
    },
    getCurrencyType() {
      return this.currencyType ? this.currencyType : "SAR";
    },
    "$store.state.hotels.guestCurrency": {
      handler(newValue, oldValue) {
        conosle.log("newValue", newValue);
        this.convertCurrency({
          from: this.hotelCurrency,
          to: newValue,
        });
        this.currencyType = this.guestCurrency;
        let afterCurrencyRoomsRates = this.rooms.map((room) => ({
          ...room,
          rates: room.rates.map((rate) => ({
            ...rate,
            // net: this.claculatePrice(Number(rate.net))
          })),
        }));
      },
    },
  },
  methods: {
    xx() {},
    ...mapMutations("hotels", [
      "SET_CANCELLATION_DIALOG",
      "SET_CANCELLATION_DIALOG_DATA",
    ]),
    ...mapMutations("hotels", ["SET_AVAILABLE_HOTELS_DETAILS"]),
    items(rate) {},
    displayedItems(room) {
      // this.showAllRooms = room.rates[0].open;
      room.rates[0].open = !room.rates[0].open;
      // return rates[clickedCardIndex].open ? rates : rates.slice(0, 2);
    },
    log() {
      // console.log(this.roomsLoader);
    },
    // claculatePrice(price) {
    //   if (this.marginVendorData.type == "percentage") {
    //     // let amountBeforeVendorMargin = Number(
    //     //   price * this.currencyPrice + 0.01 * (price * this.currencyPrice)
    //     // );
    //     let amountAfterVendorMargin =
    //       price + (price * this.marginVendorData.amount) / 100;
    //     return Math.round(amountAfterVendorMargin);
    //   } else {
    //     //TODO :back end manifacture
    //     // let amountBeforeVendorMargin = Number(
    //     //   price * this.currencyPrice + 0.01 * (price * this.currencyPrice)
    //     // );
    //     let amountAfterVendorMargin = price + this.marginVendorData.amount;
    //     return Math.round(amountAfterVendorMargin);
    //   }
    //   // return Number(price * this.currencyPrice + 0.01 * (price * this.currencyPrice)).toFixed(3);
    // },

    ...mapActions("hotels", [
      "fetchAvailbleHotel",
      "convertCurrency",
      "fetchAvailbleHotelRooms",
      // "getVendorMargins"
    ]),
    ...mapActions("featuredHotels", ["fetchFeaturedHotelsRooms"]),
    // handleRates() {
    //   this.rooms.forEach(room => {
    //     room.rates.forEach(rate => {
    //       this.rates.push(rate);
    //       this.ratesLength = this.rates.length;
    //     });
    //   });
    //   this.originalRooms = JSON.parse(JSON.stringify(this.rooms));
    //   console.log("1 this.originalRooms", this.originalRooms);
    // },

    handleClose() {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
          // desotry payment form
          // goSell.destroy();
        })
        .catch(() => {
          // catch error
        });
    },
    // Filtering rooms
    filterRooms(filterFn) {
      this.filteredRates = [];
      this.originalRooms.forEach((room) => {
        const filteredRates = room.rates.filter(filterFn);
        if (filteredRates.length) {
          const filteredRoom = Object.assign({}, room);
          filteredRoom.rates = filteredRates;
          this.filteredRates.push(filteredRoom);
        }
      });
      this.rooms = this.filteredRates;
    },
    goToPayment(roomSelected) {
      let fullRoomObj = {
        uuid: this.$route.params.uuid,
        vervotech_id: this.$route.params.vervotech_id,
        rateKey: roomSelected.rateKey,
        provider: roomSelected.provider,
      };
      let enCodeQuery = encodeURIComponent(JSON.stringify(fullRoomObj));

      this.$router.push({
        path: "/CheckOut",
        query: { q: enCodeQuery },
      });
      this.$store.commit("payment/SET_ROOM_SELECTED", {
        ...roomSelected,
        ...fullRoomObj,
        // net: this.claculatePrice(Number(roomSelected.net))
      });
    },

    isFreeToCancel(cancellationPolicies) {
      // console.log("cancellationPolicies", cancellationPolicies);
      // TODO: Cancelate based on the last index cancellationPolicies
      let cancelTime = "";

      if (cancellationPolicies[0]) {
        if (cancellationPolicies[0].type != "free") return false;
        cancelTime = new Date(cancellationPolicies[0].from);
      }
      const now = new Date();
      if (cancelTime) {
        const timeDiff = cancelTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return hoursDiff > 48;
      }
    },
    cancelationDate(rate) {
      let cancelDate = new Date(rate.cancellationPolicies[0].from);
      cancelDate.setDate(cancelDate.getDate());
      return cancelDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  watch: {
    filters: {
      handler: function (filter) {
        console.log("filterfilterfilterfilter", filter);
        if (!filter.breakfast && !filter.freeCancellation) {
          this.rooms = this.originalRooms;
        } else if (filter.breakfast && filter.freeCancellation) {
          this.filterRooms(
            (rate) =>
              rate.boardName == "BED AND BREAKFAST" &&
              this.isFreeToCancel(rate.cancellationPolicies),
          );
        } else if (filter.breakfast) {
          // TODO: breackfastFilter boardCode {'BreakFast', 'BreakFast', 'BreakFast', 'BreakFast'} ;
          this.filterRooms((rate) => rate.boardName == "BED AND BREAKFAST");
        } else {
          this.filterRooms((rate) =>
            this.isFreeToCancel(rate.cancellationPolicies),
          );
        }
      },
      deep: true,
    },
    "$store.state.hotels.guestCurrency": {
      handler(newValue, oldValue) {
        conosle.log("newValue", newValue);
        this.fetchAvailbleHotelRooms(); //fetch rooms after change currency
      },
    },
    "$store.state.hotels.availbleHotelsDetails": {
      handler(newValue, oldValue) {
        if (newValue?.hotel) {
          this.rooms = newValue.hotel.rooms;
          this.originalRooms = JSON.parse(JSON.stringify(this.rooms));
        }
      },
      immediate: true,
    },
  },
  created() {
    console.log("this.rooms", this.rooms);
    console.log("this.roomsLoader", this.roomsLoader);

    // if(!this.$route.params.uuid && this.featuredHotelsRooms){
    //   // this.fetchFeaturedHotelsRooms()
    //   this.SET_AVAILABLE_HOTELS_DETAILS(this.featuredHotelsRooms)
    // }
  },
};
</script>

<style lang="scss">
.custom-icon {
  border: 1px solid #3b82f6;
  border-radius: 100%;
  padding: 2px 1px;
  margin: 5px;
}

//
.custom-icon > span {
  margin: 3px;
}

.top-radius {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.card-border {
  border: 1px solid rgba(188, 188, 188, 0.587);
}

.list-style {
  list-style: none;
}

.remove-top-border {
  border-top: 0px;
}

.payer-information-dialig {
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90% !important;
  }
}

.payment-information-diloag {
  position: relative;
  width: 100vw;
  height: 100vh;

  // left: 50%;
  // top: calc(0px - 15vh + 50%);
  // transform: translate(-50%, -50%);
  // //background-color: #00000040;
  @media (max-width: 1200px) {
    width: 100% !important;
  }

  .el-dialog__body {
    padding-bottom: 10px;
  }
}
</style>
