<template>
  <div v-if="currentTab.length == 0">
    <p class="text-slate-400 text-4 text-center">
      You have no {{ tabName }} Reservations ...
    </p>
  </div>
  <el-card
    v-else
    v-for="(card, index) in currentTab"
    :key="card"
    class="booking-card mt-5"
  >
    <!-- <template #header> -->
    <div class="card-header flex items-center border-b-1 border-slate-200 p-3">
      <span class="border-1 text-5 rounded-full py-1 px-3">{{
        index + 1
      }}</span>
      <span class="mx-2 text-sm">Review Hotel Details</span>
    </div>
    <!-- </template> -->
    <div class="pt-6">
      <div
        class="flex flex-wrap lg:md:justify-between sm:justify-around sm:flex-col lg:md:flex-row"
      >
        <div class="flex flex-col">
          <img
            v-if="card.hotel"
            :src="card.hotel.min_image"
            class="image my-3 image-booking-hotel sm:w-full rounded-3xl"
          />
          <!-- <img
                      src="../../../../src/assets/images/reviewImage.png"
                      class="image lg:md:w-70 py-5 sm:w-full"
          />-->
          <!-- TODO: THE TOTAL INVOICE WITHOUT CURRENCY -->
          <el-tag type="error" class="p-4 rounded-lg" effect="light">
            <p class="font-bold text-sm">
              Total invoice : {{ card.total }}
              {{ currencyType }}
            </p>
          </el-tag>
          <div class="separator text-xs text-slate-300">see Details</div>

          <router-link
            :to="'/CheckOutPayment/' + card.id"
            class="no-underline flex"
          >
            <el-button
              text
              class="button text-sm custom-button font-bold px-3 py-5 w-full"
              >View Book Details</el-button
            >
          </router-link>
          <!-- <p class="text-xs font-light">Booking Id: {{ card.customer_id }}</p> -->
          <!-- <p
            class="text-xs font-light"
          >Booked on {{new Date(card.transaction_date).toDateString() }}</p>-->
        </div>

        <div
          class="sm:pb-5 lg:border-b-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="card.hotel"
            :content="card.hotel.name"
            placement="top-start"
          >
            <P class="font-bold text-4">{{ getCardName(card) }}</P>
          </el-tooltip>
          <div class="bottom">
            <p class="text-xs py-0 my-0 font-thin text-slate-800">
              Transaction Date : {{ card.transaction_date }}
            </p>
            <p class="text-xs py-0 my-1 font-light">
              Happy Trip Id: {{ card.id }}
            </p>

            <!-- <span class="i-mdi-location text-3xl h-5 text-purple-800"></span> -->
            <!-- <span class="text-xs text-slate-500">{{ card.address }}</span> -->

            <div class>
              <el-rate
                v-if="card.hotel"
                v-model="card.hotel.ratingStars"
                size="large"
                disabled
                text-color="#ff9900"
              />
              <!-- <ul class="list-none py-2 px-0 m-0">
                <li class="font-bold pb-0 mb-0 text-4">Room Name</li>

                <li class="text-xs font-thin text-slate-800 py-1">
                  Twin/ Double Room
                </li>
                <li class="text-xs font-thin text-slate-800 py-1">
                  1 Night, Bed & Brekfast
                </li>
              </ul> -->
              <div class="text-xs font-light">
                status :
                <el-tag :type="card.status == 'cancelled'? 'error' : 'success'" class="mx-1 mt-0" effect="light" round
                  >{{ card.status }}</el-tag
                >
              </div>
            </div>
          </div>
        </div>
        <div class="lg:md:self-end sm:self-start">
          <div class="bottom">
            <div class="py-1">
              <p class="font-bold text-4">Check In</p>
              <div class="flex bg-green-100 rounded-3 p-2">
                <p
                  class="font-bold py-1 my-1 custom-extra-bold px-1 text-5xl text-green-500"
                >
                  {{ new Date(card.check_in).getDate() }}
                </p>
                <div class="flex flex-col px-2">
                  <p class="font-light p-0 m-0 text-xl text-green-500">
                    {{
                      new Date(card.check_in).toLocaleString("default", {
                        month: "long",
                      })
                    }}
                  </p>
                  <p class="font-light p-0 m-0 text-xl text-green-500">
                    {{ new Date(card.check_in).getFullYear() }}
                  </p>
                </div>
              </div>
            </div>
            <div class="py-1">
              <p class="font-bold text-4">Check out</p>
              <div class="flex bg-rose-100 rounded-3 p-2">
                <p
                  class="font-bold py-1 my-1 custom-extra-bold px-1 text-5xl text-rose-500"
                >
                  {{ new Date(card.check_out).getDate() }}
                </p>
                <div class="flex flex-col px-2">
                  <p class="font-light p-0 m-0 text-xl text-rose-500">
                    {{
                      new Date(card.check_out).toLocaleString("default", {
                        month: "long",
                      })
                    }}
                  </p>
                  <p class="font-light p-0 m-0 text-xl text-rose-500">
                    {{ new Date(card.check_out).getFullYear() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.currentTab.forEach((element) => {
      // console.log("currentTab",JSON.parse(element.room));
    });
  },
  props: ["currentTab", "tabName"],
  data() {
    return {
      imageBaseURL: "https://photos.hotelbeds.com/giata/original/",
      currencyType: window.localStorage.getItem("CURR"),
    };
  },
  computed: {
    ...mapState("hotels", ["currencyPrice"]),
    getTotalInvoice() {
      return (invoiceTotal) =>
        `${Math.round(Number(invoiceTotal * this.currencyPrice))}`;
    },
  },
  methods: {
    ...mapActions("hotels", ["convertCurrency"]),
    getCardName(card) {
      return card.hotel.name.split(" ").slice(0, 5).join(" ");
    },
  },
  mounted() {
    this.convertCurrency({
      from: "SAR",
      to: window.localStorage.getItem("CURR")
        ? window.localStorage.getItem("CURR")
        : "SAR",
    });
  },
};
</script>
<style>
.image-booking-hotel {
  width: 300px !important;
  height: 200px;
  object-fit: cover;
  align-content: center;
  display: flex;
}
.border-rad {
  border-radius: 15px !important;
}

.booking-card > .el-card__body {
  padding-top: 0px !important;
}
</style>
