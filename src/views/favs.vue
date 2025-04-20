<template>
  <div class="grid grid-cols-1 rounded-3">
    <h3 class="font-thin p-3 mt-0 bg-violet-100 custom-border">Your Favourits</h3>
    <div v-if="favourites.length == 0">
      <p class="text-slate-400 text-center">You have no Favourites ...</p>
    </div>
    <el-card v-else v-for="(card, index) in favourites" :key="card" class="booking-card mt-2">
      <div class="card-header flex items-center border-b-1 border-slate-200 p-3">
        <span class="border-1 text-5 rounded-full py-1 px-3">{{ index + 1 }}</span>
        <span class="mx-2 text-sm">Review Hotel Details</span>
      </div>
      <div class="flex justify-evenly flex-wrap">
        <div class="px-2">
          <div class="pt-6">
            <img
              :src="card.hotel_data.min_image"
              class="image fav-image my-3 sm:w-full rounded-3xl"
            />
          </div>
          <!-- <el-tag type="error" class="p-4 w-full rounded-lg" effect="light">
            <p class="font-bold text-sm">
              Total invoice : {{ getTotalInvoice(card.total) }} {{
              currencyType
              }}
            </p>
          </el-tag>
          <div class="separator text-xs text-slate-300">see Details</div>-->
          <router-link :to="'/CheckOutPayment/' + card.id" class="no-underline flex">
            <el-button
              text
              class="button text-sm custom-button font-bold px-5 py-5 w-full"
            >View Book Details</el-button>
          </router-link>
        </div>

        <div
          class="sm:pb-5 flex lg:w-[50%] text-center sm:w-full self-end flex-col lg:border-b-0 lg:p-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400"
        >
          <div>
            <h3 class="font-bold text-6 pb-0 mb-0">{{ card.hotel_data.name }}</h3>
            <ul class="list-none pb-5 px-0 m-0">
              <li class="text-xs font-thin text-slate-800 py-1">Code : {{ card.code }}</li>
              <li class="text-xs font-thin text-slate-800 py-1">Hotel Id : {{ card.hotel_data.id }}</li>
            </ul>
            <el-rate
              v-model="card.hotel_data.ratingStars"
              size="small"
              disabled
              text-color="#ff9900"
            />
          </div>

          <div class="bottom">
            <!-- <p
              class="text-xs py-0 my-0 font-thin text-slate-800"
            >Transaction Date : {{ card.transaction_date }}</p>-->
            <!-- <p class="text-xs py-0 my-1 font-light">Booking Id: {{ card.customer_id }}</p> -->

            <!-- <span class="i-mdi-location text-3xl h-5 text-purple-800"></span> -->
            <!-- <span class="text-xs text-slate-500">{{ card.address }}</span> -->

            <div class>
              <ul class="list-none py-5 px-0 m-0">
                <li class="font-bold pb-0 mb-0 text-4">Address Details</li>

                <li
                  class="text-xs font-thin text-slate-800 py-1"
                >{{ card.hotel_data.address ? card.hotel_data.address : '--' }} ,{{ card.hotel_data.countryName }}</li>
              </ul>

              <el-button
                @click="unFav(card.code)"
                class="m-0 p-4 text-white bg-red rounded-2xl"
              >Remove From Favourites</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog v-model="dialogVisible" align-center title="Main Hotel Image" width="100%" draggable>
      <div class="w-full">
        <img class="w-full" src="/images/homePage/compoundView.png" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      imageBaseURL: "https://photos.hotelbeds.com/giata/original/",
      value: 5,
      dialogVisible: false,
      currencyType: window.localStorage.getItem("CURR")
    };
  },
  methods: {
    ...mapActions("userAccount", ["fetchFavs", "removeFromFavorite"]),
    ...mapActions("hotels", ["convertCurrency"]),
    unFav(code) {
      console.log("code", code);
      this.removeFromFavorite(code)
        .then(() => {
          this.$toast.show("Removed from favourites");
          this.fetchFavs();
        })
        .catch(error => {
          this.$toast.error("Error while removing from Favourites  ");
        });
    }
  },
  computed: {
    ...mapState("userAccount", ["favourites"]),
    ...mapState("hotels", ["currencyPrice"]),

    getTotalInvoice() {
      return invoiceTotal =>
        `${Math.round(Number(invoiceTotal * this.currencyPrice))}`;
    }
  },
  mounted() {
    this.fetchFavs()
      .then(() => {
        // this.$toast.show('favourites uploaded successfully ')
      })
      .catch(error => {
        this.$toast.error("Error while requesting Favourites  ");
      });
    this.convertCurrency({
      from: "SAR",
      to: window.localStorage.getItem("CURR")
        ? window.localStorage.getItem("CURR")
        : "SAR"
    });
  }
};
</script>
<style>
.booking-card > .el-card__body {
  padding-top: 0px !important;
}
.fav-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  align-content: center;
  display: flex;
}
</style>