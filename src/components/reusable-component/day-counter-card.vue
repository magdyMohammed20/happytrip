<template>
  <el-container :class="[$route.name == 'Home' ? '' : 'justify-end']">
    <el-row class="w-[95%]">
      <el-col :span="24" :sm="22" :xs="22" :lg="24">
        <el-card
          class="flex flex-col gradient-background justify-center items-center custom-border border-#8612ea sm:w-full lg:w-full mt-0 sm:mt-10 sm:mx-0 custom-card">
          <div>
            <h4 class="text-white text-6 font-bold text-center">
              I approached the reward &#128526;
            </h4>
          </div>
          <div class="flex sm:flex-col lg:md:flex-row justify-center">
            <div class="flex flex-col">
              <div class="w-70 px-2 ">
                <span class="mb-2 text-xl text-white font-bold text-center block mt-0">
                  {{ loyaltyData.reminderNights }} Nights Booked
                </span>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="
                  // Math.ceil((loyaltyData.reminderNights / 15) * 100)
                  50
                  " color="#1CCF3D" />
              </div>
            </div>
          </div>
          <div class="text-white font-bold text-center pt-2">
            <p class="font-light">
              {{ 15 - loyaltyData.reminderNights }} Days Left to get
            </p>
            <p class="font-bold text-5">Free Night</p>
          </div>
          <div class="mt-5" :class="[$route.name == 'Loyalty' ? 'block' : 'hidden']">
            <router-link to="/" class="no-underline">
              <el-button class="w-full py-6 z-5 text-white font-bold bg-#1CCF3D">Book Now</el-button>
            </router-link>
            <p class="text-center font-light text-sm text-white">
              You can collect nights within 24 months of the first night you book
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // loyaltyData: {
      //   allNights: 0,
      //   freeNights: 0,
      //   reminderNights: 5,
      //   redeem: 0,
      //   membershipNumber: "872157"
      // }
    };
  },
  methods: {},
  computed: {
    ...mapState("loyalty", ["loyaltyData"]),
  },
};
</script>
<style>
.custom-card>.el-card__header {
  padding: 0;
}

.gradient-background {
  background: rgb(134, 18, 234);
  background: linear-gradient(90deg,
      rgba(134, 18, 234, 1) 0%,
      rgba(134, 18, 234, 0.8156512605042017) 50%,
      rgba(111, 3, 223, 1) 100%);
}
</style>
