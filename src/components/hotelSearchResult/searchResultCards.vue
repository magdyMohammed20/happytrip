<template>
  <el-col v-if="hotelsLoader" class="lg:md:px-10 sm:px-2" :span="24" :lg="15" :md="15" :sm="24">
    <loadingHotelComponent></loadingHotelComponent>
  </el-col>

  <el-col v-else :span="24" :lg="15" :md="15" :sm="24" class="lg:md:px-10 sm:px-2">
    <div>
      <p class="font-bold pt-5 mt-1 text-basic px-1">
        {{
        availbleHotels?.data?.pagination?.total
        ? availbleHotels?.data?.pagination?.total
        : availbleHotels.data?.hotels?.length
        }}
        Hotel Search Result
      </p>

      <el-col v-if="hotelsLoader == null">

        <el-alert title="" type="error " :closable="false" :description="'Error In Get Data'" />
      </el-col>

    </div>

    <div v-if="!!availbleHotels" v-for="(card, index) in availbleHotels?.data?.hotels" :key="card.id">
      <el-card :body-style="{ padding: '0px' }" class="my-5 sm:px-3 lg:md:px-0">
        <div class="flex sm:flex-col gap-4 lg:md:flex-row">
          <div>
            <img :src="card?.thumbnail" class="image hotel-img lg:md:w-60 sm:w-full" />
          </div>
          <div
            class="w-[20%] p-2 sm:pb-5 lg:border-b-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400">
            <h3 class="font-bold text-4">{{ card.name }}</h3>
            <div class="bottom">
              <span class="i-mdi-location text-3xl h-5 text-purple-800"></span>
              <span class="text-xs text-slate-500">{{ card.address }}</span>
              <div>
                <el-rate v-model="card.rating" size="large" disabled text-color="#ff9900" />
              </div>
              <div>
                <span class="i-mdi-wifi text-3xl h-5 text-purple-800"></span>
                <span class="i-mdi-pool text-3xl h-5 text-purple-800"></span>
                <span class="i-mdi-cup text-3xl h-5 text-purple-800"></span>
              </div>
            </div>
          </div>
          <div style="padding: 14px" class="lg:md:self-center m-auto sm:w-full lg:w-fit sm:self-start">
            <p class="text-#FF1E74 font-bold rounded-1 text-md p-1">
              <!-- TODO CUURENCY PRICE WAIT FOR IT GIVES NAN BECAUSE CONVERTER API  -->
              <span class="text-#FF1E74 text-md p-1">{{
                card.best_price?.supplements_fee?.currency
                ? card.best_price?.supplements_fee?.currency
                : currentCurrency
                }}</span>

              <!-- {{ claculatePrice(card.minRate) }} -->
              {{ Math.round(card?.best_price?.amount) }}
            </p>
            <div class="bottom lg:block sm:flex justify-between sm:w-full lg:w-fit">
              <!-- {{ card }} -->
              <div>
                <router-link :to="
                    '/HotelSearchResultsDetails/' +
                    card.name +
                    '/' +
                    availbleHotels.uuid +
                    '/' +
                    card.vervotech_id
                  " class="no-underline">
                  <el-button text class="button custom-button font-bold px-3 py-5 lg:md:mx-0 sm:mx-3">Select
                    Room</el-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <router-link to="/loyalty" class="router-style">
        <el-card v-if="shouldRenderStaticCard(index)" :key="'static-card-' + index" :body-style="{ padding: '0px' }"
          class="my-5 sm:px-3 lg:md:px-0 gradient-background">
          <div class="text-center">
            <p class="text-white text-6" v-if="profileData.id">
              You now have {{ loyaltyData.reminderNights }} free nights from the
            </p>
            <p class="text-white" v-else>
              Login into your Account and earn free nights from
            </p>
            <!-- <p
              class="text-white text-6 custom-extra-bold"
              v-if="profileData.id"
            >
             Rahhal Program
            </p> -->
            <p class="text-white text-6 custom-extra-bold">RAHAL PROGRAM</p>

            <el-progress v-if="profileData.id" :text-inside="true" :stroke-width="24"
              :percentage="Math.ceil((loyaltyData.reminderNights / 15) * 100)" color="#1CCF3D"
              class="w-[40%] m-auto pb-10" />
            <router-link v-else to="/login">
              <el-button class="bg-#1CCF3D p-5 text-white m-5">
                Login Now!
              </el-button>
            </router-link>

            <p class="text-xs text-white" v-if="!profileData.id">
              Don't have Account ?
              <router-link class="text-white" to="/Registration">sign up</router-link>
            </p>
            <p class="text-xs text-white pt-0 mt-0" v-else>
              Book remainig {{ 15 - loyaltyData.reminderNights }} nights to get
              <b>One free night</b>
            </p>
          </div>
          <div class="flex justify-between relative">
            <img src="../../assets/images/whitePlanelotalty.png"
              class="white-plan-img self-end absolute bottom-[-7px] left-[-7px]" />
            <img src="../../assets/images/grayCity.png" class="absolute bottom-[0px] right-[0px]" />
          </div>
        </el-card>
      </router-link>
    </div>

    <!--   <el-pagination v-model:current-page="currentPage" @update:current-page="handleChangePage" background
      layout="prev, pager, next" class="my-3 justify-center" :total="this.availbleHotels.hotelsCount"
      v-if="availbleHotels.hotelsCount" /> -->
  </el-col>


</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      thumbItem: ["box", "text"],
      parsedQuery: "",
      page: 1,
      value: 5,
      resultHotels: [],
      // currencyType: window.localStorage.getItem("CURR"),
      price: 0,
      currentPage: 1,
    };
  },

  watch: {
    "$route.query.page": {
      async handler(route) {
        if (!route) {
          await this.$router.replace({
            query: { ...this.$route.query, page: 1 },
          });
          return;
        }
        this.SET_PAGE(Number(route));
        if (!this.uuid) {
          this.fetchHotels(this.parsedQuery)
            .then(() => {
              // this.getVendorMargins(this.currencyType);
              this.$toast.show("Hotels fetched succsessfully");
            })
            .catch((e) => {
              this.$toast.error(
                "An error happened : " + e.response.data.message,
              );
            });
        }

        this.currentPage = Number(route);
      },
      deep: true,
      // immediate: true
    },
  },

  methods: {
    shouldRenderStaticCard(index) {
      // Check if the current index is a multiple of 3 (0, 3, 6, 9, etc.)
      return (index + 1) % 3 === 0;
    },
    ...mapActions("hotels", ["fetchHotels", "fetchAvailbleHotel"]),
    ...mapActions("loyalty", ["fetchLoyaltyData"]),

    ...mapMutations("hotels", [
      "SET_FULL_HOTEL_DETAILS",
      "SET_PAGE",
      "SET_AVAILABLE_HOTELS_LOADER",
    ]),
    handleChangePage(val) {
      console.log(val);
      this.$router.replace({ query: { ...this.$route.query, page: val } });
      this.SET_AVAILABLE_HOTELS_LOADER(true);
      let filters = {
        uuid: this.uuid,
        page: val,
      };
      console.log("filters", filters);
      console.log("filters", filters);
      this.fetchAvailbleHotel(filters).finally(() => {
        this.SET_AVAILABLE_HOTELS_LOADER(false);
      });
    },
    claculatePrice(price) {
      if (this.marginVendorData.type == "percentage") {
        // let amountBeforeVendorMargin = Number(
        //   price * this.currencyPrice + 0.01 * (price * this.currencyPrice)
        // );
        let amountAfterVendorMargin =
          price + (price * this.marginVendorData.amount) / 100;
        return Math.round(amountAfterVendorMargin);
      } else {
        //TODO :back end manifacture
        // let amountBeforeVendorMargin = Number(
        //   price * this.currencyPrice + 0.01 * (price * this.currencyPrice)
        // );
        let amountAfterVendorMargin = price + this.marginVendorData.amount;
        return Math.round(amountAfterVendorMargin);
      }
    },
    calculateTaxex(price) {},
    // getLeastPrice(room) {
    //   let leastPrice = Infinity;
    //   for (let key in room) {
    //     if (room.hasOwnProperty(key)) {
    //       const minRate = room[key].minRate;
    //       if (minRate < leastPrice) {
    //         leastPrice = minRate;
    //       }

    //       console.log("minRaterattttttttttes", minRate);
    //       var calculatedPrice = this.claculatePrice(Number(minRate));
    //       console.log("calculatedPrice", calculatedPrice);
    //     }
    //   }
    //   return calculatedPrice;
    //   // return leastPrice;
    // }
    // getCurrency(vendorCurrency) {
    //   this.convertCurrency({
    //     from: vendorCurrency,
    //     to: window.localStorage.getItem("CURR")
    //       ? window.localStorage.getItem("CURR")
    //       : "SAR"
    //   });
    // }
    // filterAvailableHotels() {
    //   let availbleHotelsCodes = this.availbleHotels?.hotels?.map(hotel =>
    //     Number(hotel.code)
    //   );
    //   let searchHoltels = this.searchHotels?.hotels?.data.filter(obj =>
    //     availbleHotelsCodes.includes(Number(obj.code))
    //   );
    //   this.resultHotels = searchHoltels;
    //   this.addPriceToSearchHotels();
    //   return this.resultHotels;
    // },
    // addPriceToSearchHotels() {
    //   for (let i = 0; i < this.resultHotels.length; i++) {
    //     for (let j = 0; j < this.availbleHotels?.hotels.length; j++) {
    //       if (
    //         Number(this.resultHotels[i].code) ===
    //         Number(this.availbleHotels?.hotels[j].code)
    //       ) {
    //         this.resultHotels[i].minRate = this.availbleHotels?.hotels[
    //           j
    //         ].minRate;
    //         this.resultHotels[i].rooms = this.availbleHotels?.hotels[j].rooms;
    //         break;
    //       }
    //     }
    //   }
    //   this.SET_FULL_HOTEL_DETAILS([...this.resultHotels]);
    // }
  },
  computed: {
    currentCurrency() {
      return window.localStorage.getItem("CURR") || "SAR";
    },
    ...mapState("userAccount", ["profileData"]),
    ...mapState("loyalty", ["loyaltyData"]),
    ...mapState("hotels", [
      "searchHotels",
      "availbleHotels",
      "hotelCurrency",
      "currencyPrice",
      "guestCurrency",
      "marginVendorData",
      "hotelsLoader",
      "uuid",
    ]),
    // getCurrencyType() {
    //   return this.currencyType ? this.currencyType : "SAR";
    // }
  },
  mounted() {
    this.fetchLoyaltyData();
    let decoded = decodeURIComponent(this.$route.query.x);
    this.parsedQuery = JSON.parse(decoded);
    this.$store.commit("payment/SET_SEARCH_FORM", this.parsedQuery);

    if (!this.uuid) {
      this.fetchHotels(this.parsedQuery)
        .then(() => {
          // this.getVendorMargins(this.currencyType);
        })
        .catch((e) => {
          this.$toast.error("An error happened : " + e.response.data.message);
        });
    }
  },
};
</script>
<style lang="scss">
.custom-button {
  background-color: #1ccf3d !important;
  color: white !important;
}

.hotel-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  align-content: center;
  display: flex;
}

.rahal-advertisment {
  background-color: blueviolet !important;
}

.white-plan-img {
  position: relative;
  /* padding: 0; */
  /* margin: 0; */
  height: 85px;
  right: 1%;
}

.gradient-background {
  background: rgb(134, 18, 234);
  background: linear-gradient(
    90deg,
    rgba(134, 18, 234, 1) 0%,
    rgba(134, 18, 234, 0.8156512605042017) 50%,
    rgba(111, 3, 223, 1) 100%
  );
}

.router-style {
  text-decoration: none;
}
</style>
