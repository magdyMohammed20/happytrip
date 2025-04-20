<template>
  <el-card v-if="!checkoutData.bookingData && !checkoutData.hotel">
    <loading-card></loading-card>
  </el-card>
  <el-card v-else>
    <!-- <template #header> -->
    <div class="card-header mb-3 py-0 my-0 border-b-1 border-slate-200">
      <p class="mx-3 pt-0 mt-0 text-lg md:text-xl font-bold text-center">
        Summary Details
      </p>
    </div>
    <div class="p-3 flex">
      <div
        class="inline bg-violet-200/50 rounded-full py-2 px-3 md:p-3 md:px-5"
      >
        <span class="i-mdi-building text-2xl mt-2 text-purple-800"></span>
      </div>
      <div class="px-3">
        <p class="font-bold p-0 m-0">{{ checkoutData.bookingData.name }}</p>
        <p class="p-0 m-0 text-xs text-slate-400">
          {{ checkoutData.bookingData.addressLine1 }}
        </p>
      </div>
    </div>
    <!-- <div class="bg-green-100 flex items-center custom-border my-5 md:max-w-lg">
        <span class="i-mdi-present text-2xl md:text-xl m-3 text-green-500"></span>
        <p
          class="text-green-500 text-[12px] md:text-sm lg:text-[12px] xl:text-sm font-bold pr-1.25"
        >
          You will earn 50 flying reward points with this booking
        </p>
    </div>-->
    <div
      v-for="(room, index) in checkoutData.bookingData.paxes"
      :key="checkoutData.hotel[0].hotelCode"
      class="mx-2 my-3 justify-between text-sm md:text-base"
    >
      <p class="text-rose-500 mb-0 pb-0 font-bold">
        {{ RoomName }} (Adult {{ room.Adults }}, Kid {{ room.Children }})
      </p>
      <p class="text-slate-500 my-0 py-0 font-bold">
        <span class="text-sm">{{
          checkoutData.hotel[0].rooms[0].boardName
        }}</span>
      </p>
      <!-- here are CANCELLATION POLICY conditions -->
      <p class="text-slate-500 mt-0 pt-0 font-bold">
        <span class="text-sm text-green-600" v-if="isFreeIgnoringAmount"
          >Refundubale till {{ toDate }}</span
        >

        <span class="text-sm text-slate-500" v-if="isFreeWithOutZeroAmount"
          >Non-Refundubale</span
        >

        <span class="text-sm text-slate-500" v-if="isFreeWithZeroAmount">
          {{ firstIndexType ? "Refundable" : "Non-Refundable" }}
        </span>

        <span class="text-sm text-slate-500" v-if="isFreeWithZeroAmount">{{
          firstIndexFromDate
        }}</span>
      </p>
    </div>
    <!-- <div class="separator text-slate-300">Loyalty Data</div> -->

    <!-- <div
        class="mx-2 my-3 justify-between text-sm md:text-base border-b-1 border-slate-200"
      >
        <div class="flex justify-between">
          <p class="text-rose-500 font-bold te">All Nights</p>
          <p class="text-violet-700 font-bold">
            <span class="text-sm">
              {{ loyaltyData.allNights }}
            </span>
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-rose-500 font-bold te">Free Nights</p>
          <p class="text-violet-700 font-bold">
            <span class="text-sm">
              {{ loyaltyData.freeNights }}
            </span>
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-rose-500 font-bold te">Reminder Nights</p>
          <p class="text-violet-700 font-bold">
            <span class="text-sm">
              {{ loyaltyData.reminderNights }}
            </span>
          </p>
        </div>
    </div>-->
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-b-1 border-slate-200"
    >
      <p class="font-bold">Total Rooms</p>
      <p class="text-violet-700 font-bold">
        <span class="text-sm">{{ checkoutData.bookingData.paxes.length }}</span>
      </p>
    </div>
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-b-1 border-slate-200"
    >
      <p class="font-bold">Total Days</p>
      <p class="text-violet-700 font-bold">
        <span class="text-sm">{{ checkoutData.bookingData.nightsNumber }}</span>
      </p>
    </div>
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-slate-200"
    >
      <p class="font-bold">Total Amount</p>
      <p class="text-violet-700 font-bold">
        {{ checkoutData.hotel[0].currency }}
        <span class="text-sm">{{ Math.round(roomSelected.net) }}</span>
      </p>
    </div>
    <div
      class="border-t-dashed border-t-2 border-slate-300"
      v-if="checkoutData.hotel[0].rooms[0]"
    >
      <div v-if="checkoutData.hotel[0]">
        <div v-if="checkoutData.hotel[0].rooms[0]">
          <div v-if="checkoutData.hotel[0].rooms[0].supplements[0]">
            <p class="text-rose-500 pb-0 text-xl text-center font-bold">
              Amount to be paid at the hotels
            </p>
            <p
              class="text-violet-700 font-bold mx-2 text-center"
              v-if="checkoutData.hotel[0].rooms[0].supplements[0].price"
            >
              {{ checkoutData.hotel[0].rooms[0].supplements[0].price }}
              {{ checkoutData.hotel[0].currency }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bg-yellow-100 custom-border mx-2 px-3 py-1 my-3">
        <p class="text-yellow-500 font-bold">Note</p>
        <p class="text-yellow-500 text-xs">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum ha
        </p>
    </div>-->
  </el-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("checkout", ["cancellationDialog", "checkoutData"]),

    ...mapState("loyalty", ["loyaltyData"]),
    ...mapState({
      roomSelected: (state) => state.payment.roomSelected,
      hotelDetails: (state) => {
        return Object.assign(
          {},
          state.payment.hotel,
          state.hotels.availbleHotelsDetails
        );
      },
      bookingDetails: (state) => state.payment.searchForm,
    }),
    currentCurrency() {
      return window.localStorage.getItem("CURR") || "SAR";
    },
    isFreeIgnoringAmount() {
      return this.checkoutData.hotel[0].cancellationPolicies[0].type == "free";
    },
    toDate() {
      return this.checkoutData.hotel[0].cancellationPolicies[0].from;
    },
    isFreeWithOutZeroAmount() {
      return (
        this.checkoutData.hotel[0].cancellationPolicies[0].type == "unFree" &&
        this.checkoutData.hotel[0].cancellationPolicies[0].amount != 0
      );
    },
    isFreeWithZeroAmount() {
      return (
        this.checkoutData.hotel[0].cancellationPolicies[0].type == "unFree" &&
        this.checkoutData.hotel[0].cancellationPolicies[0].amount == 0
      );
    },
    firstIndexFromDate() {
      return this.checkoutData.hotel[0].cancellationPolicies[1].type == "free"
        ? this.checkoutData.hotel[0].cancellationPolicies[1].from
        : "";
    },
    firstIndexType() {
      return this.checkoutData.hotel[0].cancellationPolicies[1].type == "free";
    },
    RoomName() {
      return this.checkoutData.hotel[0].rooms[0].name
        .split("&")
        .slice(0, 2)
        .join(" ");
    },
  },
};
</script>
