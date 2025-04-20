<template>
  <div v-if="currentTab.length === 0">
    <p class="text-slate-400 text-4 text-center">You have no {{ tabName }} Package Reservations ...</p>
  </div>
  <!-- currentTab{{ currentTab }} -->
  <el-card v-for="(card, index) in currentTab" :key="card" class="review-card mt-5">
    <div class="card-header flex items-center border-b-1 border-slate-200 p-3">
      <span class="border-1 text-5 rounded-full py-1 px-3">{{ index + 1 }}</span>
      <span class="mx-2 text-sm">Review Package Details</span>
    </div>
    <div class="pt-6 p-8">
      <div
        class="flex flex-wrap lg:md:justify-between sm:justify-around sm:flex-col lg:md:flex-row"
      >
     
        <div class="flex flex-col">
          <img
            :src="card.main_image"
            class="image text-sm image-booking-package lg:md:w-70 my-3 sm:w-full rounded-3xl"
            alt="package image"
          />

          <el-tag type="error" class="p-4 rounded-lg" effect="light">
            <p class="text-4">
              Total invoice : {{ card.price }} {{
              currencyType
              }}
            </p>
          </el-tag>
          <div class="separator text-3 text-slate-300">see Details</div>

          <router-link :to="'/PackagesDetails/' + card.id" class="no-underline">
            <el-button
              text
              class="button custom-button font-bold px-3 py-5 w-full"
            >View Package Details</el-button>
          </router-link>
        </div>
        <div class="bottom w-[20%]">
          <p class="text-4">Details :</p>
          <p class="text-xs font-thin  text-slate-800">{{ card.description.split(' ').slice(0,40).join(' ') }}<router-link :to="'/PackagesDetails/' + card.id" class="no-underline"><span class="text-blue">..... READ MORE</span></router-link></p>
          <p class="text-xs font-light">offer : {{ card.package_offer }}</p>
        </div>

        <div
          class="sm:pb-5 flex self-end lg:border-b-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400"
        >
          <div class="lg:md:self-end sm:self-start">
            <div class="bottom ">
              <div class="pt-3 flex flex-col">
                <div class="pr-2">
                  <p class="font-bold text-4">Started at</p>
                  <div class="flex bg-green-100 rounded-3 p-2">
                    <p class="font-bold py-1 my-1 custom-extra-bold px-1 text-5xl text-green-500">
                      {{ new
                      Date(card.start).getDate() }}
                    </p>
                    <div class="flex flex-col px-2">
                      <p class="font-light p-0 m-0 text-xl text-green-500">
                        {{ new Date(card.start).toLocaleString('default',
                        { month: 'long' }) }}
                      </p>
                      <p
                        class="font-light p-0 m-0 text-xl text-green-500"
                      >{{ new Date(card.start).getFullYear() }}</p>
                    </div>
                  </div>
                </div>
                <div class="pl-2">
                  <p class="font-bold text-4">Ended at</p>
                  <div class="flex bg-rose-100 rounded-3 p-2">
                    <p class="font-bold py-1 my-1 custom-extra-bold px-1 text-5xl text-rose-500">
                      {{ new
                      Date(card.end).getDate() }}
                    </p>
                    <div class="flex flex-col px-2">
                      <p class="font-light p-0 m-0 text-xl text-rose-500">
                        {{ new Date(card.end).toLocaleString('default', {
                        month: 'long'
                        }) }}
                      </p>
                      <p
                        class="font-light p-0 m-0 text-xl text-rose-500"
                      >{{ new Date(card.end).getFullYear() }}</p>
                    </div>
                  </div>
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
  props: ["currentTab", "tabName"],
  data() {
    return {
      imageBaseURL: "http://backend.happytbooking.com/storage/",
      currencyType: window.localStorage.getItem("CURR")
    };
  },
  computed: {
    ...mapState("hotels", ["currencyPrice"]),
    getTotalInvoice() {
      return invoiceTotal =>
        `${Math.round(Number(invoiceTotal * this.currencyPrice))}`;
    }
  },
  methods: {
    ...mapActions("hotels", ["convertCurrency"])
  },
  mounted() {
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
.image-booking-package {
  width: 300px !important;
  height: 200px;
  object-fit: cover;
  align-content: center;
  display: flex;
}
.border-rad {
  border-radius: 15px !important;
}

.review-card > .el-card__body {
  padding-top: 0px !important;
}
</style>