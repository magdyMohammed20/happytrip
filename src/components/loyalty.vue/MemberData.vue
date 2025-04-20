<template>
  <el-col class="lg:md:pl-20 sm:pl-5 py-10 lg:md:flex flex-col sm:block justify-center">
    <h3 class=" p-0 m-0 font-bold ">Rahhal {{profileData.name}}</h3>
    <p class="text-slate-400 font-bold">Because you deserve, we made rahal program...</p>

    <!-- <div>
      <h3 class="text-white p-0 m-0 font-bold">{{profileData.name}}</h3>
      <p class="text-white p-0 m-0 text-xs">happyt.com</p>
    </div>
    <div>
      <p class="text-white text-sm font-bold">Membership details</p>
      <div class="flex p-2">
        <div class="inline bg-violet-200/50 rounded-full p-3">
          <span class="i-mdi-card-account-details-outline text-2xl text-white"></span>
        </div>
        <div class="p-1">
          <p class="text-slate-300 text-sm p-0 m-0">Membership number:</p>
          <p class="text-white font-bold p-0 m-0">{{ loyaltyData.membershipNumber }}</p>
        </div>
      </div>
      <div class="flex p-2">
        <div class="inline bg-violet-200/50 rounded-full p-3">
          <span class="i-mdi-moon-waning-crescent rotate--30 text-2xl text-white"></span>
        </div>
        <div class="p-1">
          <p class="text-slate-300 text-sm p-0 m-0">Last collected or redeemed nights on:</p>
          <p class="text-white font-bold p-0 m-0">{{ loyalityFreeNights }}</p>
        </div>
      </div>
    </div>
    <div class="sm:hidden md:hidden lg:block">
      <img src="../../../src/assets/images/moon.png" />
    </div> -->
    <div class="w-[40%] self-center">
      <day-counter-card></day-counter-card>
      <!-- <img src="../../../src/assets/images/trees.png" class="w-1/4 self-end sm:hidden lg:md:block" /> -->
    </div>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("userAccount", ["profileData"]),
    ...mapState("loyalty", ["loyaltyData"]),
    loyalityFreeNights() {
      return this.loyaltyData.freeNights == 0
        ? "You have no free nights"
        : this.loyaltyData.freeNights + " Day";
    }
  }
};
</script>