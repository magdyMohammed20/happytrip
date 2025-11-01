<template>
  <el-card>
    <div class="card-header mb-3 py-0 my-0 border-b-1 border-slate-200">
      <p class="mx-3 pt-0 mt-0 text-lg md:text-xl font-bold text-center">
        Summary Details
      </p>
    </div>
    <div class="p-3 flex" v-if="hotelData && bookingData">
      <div
        class="inline bg-violet-200/50 rounded-full py-2 px-3 md:p-3 md:px-5"
      >
        <span class="i-mdi-building text-2xl mt-2 text-purple-800"></span>
      </div>
      <div class="px-3">
        <p class="font-bold p-0 m-0">{{ bookingData.name || "Hotel" }}</p>
        <p class="p-0 m-0 text-xs text-slate-400">
          {{ bookingData.addressLine1 || "" }}
        </p>
      </div>
    </div>
    <div
      v-for="(room, index) in paxesList"
      :key="`room-${index}-${hotelCode}`"
      class="mx-2 my-3 justify-between text-sm md:text-base"
    >
      <p class="text-rose-500 mb-0 pb-0 font-bold">
        {{ RoomName }} (Adult {{ room.Adults }}, Kid {{ room.Children }})
      </p>
      <p class="text-slate-500 my-0 py-0 font-bold" v-if="boardName">
        <span class="text-sm">{{ boardName }}</span>
      </p>
      <p
        class="text-slate-500 mt-0 pt-0 font-bold"
        v-if="hasCancellationPolicies"
      >
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
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-b-1 border-slate-200"
      v-if="bookingData && paxesList"
    >
      <p class="font-bold">Total Rooms</p>
      <p class="text-violet-700 font-bold">
        <span class="text-sm">{{ paxesList.length }}</span>
      </p>
    </div>
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-b-1 border-slate-200"
      v-if="bookingData"
    >
      <p class="font-bold">Total Days</p>
      <p class="text-violet-700 font-bold">
        <span class="text-sm">{{ bookingData.nightsNumber || 0 }}</span>
      </p>
    </div>
    <div
      class="flex mx-2 justify-between text-sm md:text-base border-slate-200"
      v-if="currency"
    >
      <p class="font-bold">Total Amount</p>
      <p class="text-violet-700 font-bold">
        {{ currency }}
        <span class="text-sm">{{ formattedTotalAmount }}</span>
      </p>
    </div>
    <div
      class="border-t-dashed border-t-2 border-slate-300"
      v-if="supplementPrice"
    >
      <p class="text-rose-500 pb-0 text-xl text-center font-bold">
        Amount to be paid at the hotels
      </p>
      <p class="text-violet-700 font-bold mx-2 text-center">
        {{ supplementPrice }}
        {{ currency }}
      </p>
    </div>
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
          state.hotels.availbleHotelsDetails,
        );
      },
      bookingDetails: (state) => state.payment.searchForm,
    }),
    // Safe data accessors
    hotelData() {
      return this.checkoutData?.hotel?.[0] || null;
    },
    bookingData() {
      return this.checkoutData?.bookingData || null;
    },
    paxesList() {
      return this.bookingData?.paxes || [];
    },
    hotelCode() {
      return this.hotelData?.hotelCode || `hotel-${Date.now()}`;
    },
    currency() {
      return this.hotelData?.currency || this.currentCurrency;
    },
    firstRoom() {
      return this.hotelData?.rooms?.[0] || null;
    },
    boardName() {
      return this.firstRoom?.boardName || "";
    },
    cancellationPolicies() {
      return this.hotelData?.cancellationPolicies || [];
    },
    hasCancellationPolicies() {
      return this.cancellationPolicies.length > 0;
    },
    firstCancellationPolicy() {
      return this.cancellationPolicies[0] || null;
    },
    secondCancellationPolicy() {
      return this.cancellationPolicies[1] || null;
    },
    supplementPrice() {
      return this.firstRoom?.supplements?.[0]?.price || null;
    },
    currentCurrency() {
      return window.localStorage.getItem("CURR") || "SAR";
    },
    // Total amount calculation with proper fallbacks
    totalAmount() {
      // Priority 1: roomSelected.net (from payment store - this is the actual price after any discounts/coupons)
      if (
        this.roomSelected?.net !== undefined &&
        this.roomSelected.net !== null &&
        this.roomSelected.net !== ""
      ) {
        const netValue = parseFloat(this.roomSelected.net);
        if (!isNaN(netValue) && netValue > 0) {
          return netValue;
        }
      }

      // Priority 2: hotel totalFare (from checkout data)
      if (
        this.hotelData?.totalFare !== undefined &&
        this.hotelData.totalFare !== null
      ) {
        const totalFare = parseFloat(this.hotelData.totalFare);
        if (!isNaN(totalFare) && totalFare > 0) {
          return totalFare;
        }
      }

      // Priority 3: bookingData totalAmount or total
      if (this.bookingData) {
        if (
          this.bookingData.totalAmount !== undefined &&
          this.bookingData.totalAmount !== null
        ) {
          const totalAmount = parseFloat(this.bookingData.totalAmount);
          if (!isNaN(totalAmount) && totalAmount > 0) {
            return totalAmount;
          }
        }
        if (
          this.bookingData.total !== undefined &&
          this.bookingData.total !== null
        ) {
          const total = parseFloat(this.bookingData.total);
          if (!isNaN(total) && total > 0) {
            return total;
          }
        }
      }

      // Priority 4: Calculate from room prices if available
      if (
        this.firstRoom?.price !== undefined &&
        this.firstRoom.price !== null
      ) {
        const roomPrice = parseFloat(this.firstRoom.price) || 0;
        const nights = parseInt(this.bookingData?.nightsNumber) || 1;
        const rooms = parseInt(this.paxesList?.length) || 1;
        const calculated = roomPrice * nights * rooms;
        if (calculated > 0) {
          return calculated;
        }
      }

      return 0;
    },
    formattedTotalAmount() {
      return this.totalAmount;
    },
    isFreeIgnoringAmount() {
      if (!this.firstCancellationPolicy) return false;
      return this.firstCancellationPolicy.type == "free";
    },
    toDate() {
      return this.firstCancellationPolicy?.from || "";
    },
    isFreeWithOutZeroAmount() {
      if (!this.firstCancellationPolicy) return false;
      return (
        this.firstCancellationPolicy.type == "unFree" &&
        this.firstCancellationPolicy.amount != 0
      );
    },
    isFreeWithZeroAmount() {
      if (!this.firstCancellationPolicy) return false;
      return (
        this.firstCancellationPolicy.type == "unFree" &&
        this.firstCancellationPolicy.amount == 0
      );
    },
    firstIndexFromDate() {
      if (!this.secondCancellationPolicy) return "";
      return this.secondCancellationPolicy.type == "free"
        ? this.secondCancellationPolicy.from
        : "";
    },
    firstIndexType() {
      return this.secondCancellationPolicy?.type == "free" || false;
    },
    RoomName() {
      if (!this.firstRoom?.name) return "Room";
      return this.firstRoom.name.split("&").slice(0, 2).join(" ");
    },
  },
};
</script>
