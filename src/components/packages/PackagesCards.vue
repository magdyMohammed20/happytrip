<template>
  <!-- <el-row class="lg:px-20 package-container justify-center w-full"> -->
  <div
    v-if="packagesData.length > 0"
    v-for="offer in packagesData"
    class=" md:flex py-5 w-full"
  >
    <el-card class="w-full shadow-lg" body-style="padding: 0px;">
      <div class="h-[100%] h-[500px]">
        <div
          class="flex flex-wrap lg:justify-between md:justify-between md:w-[100%] md:flex-row lg:flex-col sm:flex-col sm:justify-around sm:flex-col"
        >
          <div
            class="flex justify-center items-center h-[250px] w-full inline-block overflow-hidden"
          >
            <img :src="offer.main_image" class="w-full h-full object-cover" />
          </div>
          <div
            class="sm:pb-5 md:border-b-0 lg:border-b-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400 px-5 py-6"
          >
            <h2 class="my-0">{{ offer.title }}</h2>
            <div class="my-3 h-[1px] w-full rounded bg-gray-200 -mx-1"></div>
            <div class="-my-3 divide-y divide-gray-100 py-4 text-sm leading-6">
              <div class="flex justify-between gap-y-2">
                <span class="text-black text-xl">From</span>
              </div>
              <div class="flex justify-between">
                <span class="text-black text-xl font-semibold">{{ offer.price }} SAR</span>
              
              </div>
            </div>
            <div class="flex justify-between mt-7">
              <span class="text-xl text-green">Installments are available</span>
              <router-link
                :to="/PackagesDetails/ + offer.id"
                class="no-underline"
              >
                <el-button
                  text
                  class="button custom-button font-bold px-3 py-5 w-full"
                >
                  View Package Details
                </el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
  <el-col
    v-else
    :span="24"
    :lg="18"
    :md="10"
    :sm="24"
    class="px-2 md:flex py-5 w-full"
  >
    <div class="text-center">
      <p class="text-slate text-center font-bold">
        Sorry but there is no data matches this Search , try another search
      </p>
    </div>
  </el-col>
  <!-- </el-row> -->
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currencyType: localStorage.getItem("CURR"),
    };
  },
  computed: {
    ...mapState("packages", ["packagesData"]),
    ...mapState("hotels", ["currencyPrice"]),
    getCurrencyType() {
      return this.currencyType ? this.currencyType : "SAR";
    },
  },
  methods: {
    calculateOfferPercentage(oldPrice, newPrice) {
      return Math.round(newPrice / oldPrice);
    },
  },
  created() {
    // this.changeCurrency()
  },
};
</script>
<style>
.packages-card-timeline > ul {
  padding: 0;
}

.old-price {
  text-decoration: line-through;
}

.review-card > .el-card__body {
  padding: 0;
  height: 100%;
}

.package-container {
  flex-wrap: wrap;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(217, 151, 229), rgb(189, 129, 229));
  color: white;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #d0afe8, #a589e6);
  right: 0;
  color: white;
}
</style>
