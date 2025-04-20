<template>
  <div class="m-auto">
      <member-data></member-data>
    <el-row class="lg:md:px-20 sm:pr-3 py-5">
      <el-col :span="24" :sm="24" :xs="24" :lg="24" class="m-2 sm:order-2 lg:md:sm:order-1">
        <!-- <div class="py-3"> -->
          <!-- <h3 class="font-extrabold">
            Redeemed nights {{ collectedNights}}
            <span
              class="text-3 font-light text-slate-400"
            >Nights</span>
          </h3>-->
          <div v-if="loyaltyData.loyaltyHistory">
            <div class="demo-collapse">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item :title="' Redeemed Nights '" name="1">
                  <div v-if="loyaltyData.loyaltyHistory.history.length == 0">
                      <div class="font-bold text-slate">Sorry But There is no Redeemed nights</div>
                    </div>
                  <div
                    class="bg-slate-500/10 custom-border p-8 mt-3 flex justify-between"
                    v-for="history in loyaltyData.loyaltyHistory.history"
                    :key="history.id"
                  >
                      <div>
                        <p class="text-slate-600 font-bold text-5 pt-0 mt-0">
                          {{history.hotelName}} ({{ history.days_number > 0 ? history.days_number : 0}}
                          <span
                            class="text-3 font-light text-slate-400"
                          >Nights</span>)
                        </p>
                        <p class="text-slate-500 text-3 pt-0 mt-0">
                          {{history.address}}
                          <br />
                          From : {{checkout(history.booking.check_out)}}
                          <span
                            class="i-mdi-arrow-right px-1"
                          ></span>
                          To : {{checkout(history.booking.check_out)}}
                        </p>
                      </div>
                      <div class="flex-wrap flex items-center p-3">
                        <el-rate
                          v-model="history.rating"
                          size="large"
                          class="bg-slate-500/10 rounded-3xl px-4"
                          disabled
                          text-color="#ff9900"
                        />
                      </div>
                  

                    <!-- {{ loyaltyData.loyaltyHistory.history }} -->
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

            <!-- <div>
              <img src="../../src/assets/images/eclipse.png" />
            </div>-->
          </div>

          <!-- <div>
            <p class="text-xs text-slate-600 py-3">
              Missing nights? Already booked but can’t see the nights
              you’ll
              collect? Add your booking to your account before your stay to collect nights. Find your booking
            </p>
          </div> -->
        <!-- </div> -->

        <!-- <div class="py-3">
          <h3 class="font-extrabold">
            Free nights
            ({{loyalityFreeNights}}
            <span
              class="text-3 font-light text-slate-400"
            >Nights</span>)
          </h3>
          <div class="bg-slate-500/10 custom-border p-8 flex justify-around">
            <p class="text-slate-600 pt-5">
              The value of your free night will be the average price of the 15
              nights you collect
              <br />
              <span
                class
              >You have {{loyalityFreeNights}} nights equal to {{ loyaltyData.redeem }} {{ loyaltyData.currency }}</span>
            </p>

            <div>
              <img src="../../src/assets/images/eclipseOneMoon.png" />
            </div>
          </div>
          <div>
            <p class="text-xs font-bold text-violet-600 py-3">
              Find out how to redeem nights
              <span class="i-mdi-arrow-right text-violet-600"></span>
            </p>
          </div>
        </div> -->
        <progress-bar></progress-bar>
      </el-col>
      <!-- <el-col
        :span="24"
        :lg="10"
        :sm="23"
        :xs="23"
        :md="15"
        class="sm:order-1 lg:md:sm:order-2 lg:md:pl-0 sm:pl-2"
      > -->
        <!-- <div class="bg-white">
          <el-card
            class="display-flex flex-col justify-center p-2 items-center custom-border lg:md:w-11/14 sm:w-full mt-0 sm:mt-10 sm:mx-auto"
          >
            <div class="flex flex-col">
              <h3 class="font-bold px-10">
                Track your rewards activity
                on our app!
              </h3>
              <img src="../../src/assets/images/mobilePlusShadow.png" alt />
              <h3 class="text-green text-end p-0 m-0">Install Now</h3>
              <img src="../../src/assets/images/greenDownArrow.png" class="w-1/8 self-end mx-6" />
            </div>
            <div class="flex justify-between">
              <el-button class="lg:md:py-8 sm:py-6">
                <span class="i-mdi-android text-3xl text-slate-800"></span>
                <div>
                  <p class="text-xs font-bold p-0 m-0 text-slate-400">Download on the</p>
                  <p class="lg:md:text-xl sm:text-3 font-bold pl-2 m-0 text-slate-700">Google Play</p>
                </div>
              </el-button>
              <el-button class="lg:md:py-8 sm:py-6">
                <span class="i-mdi-apple text-3xl text-slate-800"></span>
                <div>
                  <p class="text-xs font-bold p-0 m-0 text-slate-400">Download on the</p>
                  <p class="lg:md:text-xl sm:text-3 font-bold pl-2 m-0 text-slate-700">App Store</p>
                </div>
              </el-button>
            </div>
          </el-card>
        </div> -->
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "2"
    };
  },
  methods: {
    ...mapActions("loyalty", ["fetchLoyaltyData", "fetchUserActivity"]),
    checkin(date) {
      return new Date(date).toDateString();
    },
    checkout(date) {
      return new Date(date).toDateString();
    }
  },
  computed: {
    ...mapState("loyalty", ["loyaltyData"]),
    loyalityFreeNights() {
      return this.loyaltyData.freeNights == 0
        ? " You have no free  "
        : this.loyaltyData.freeNights;
    },
    collectedNights() {
      return this.loyaltyData.loyaltyHistory?.totalDays > 0
        ? this.loyaltyData.loyaltyHistory?.totalDays
        : 0;
    }
  },
  mounted() {
    this.fetchLoyaltyData();
    this.fetchUserActivity()
      .then(() => {})
      .catch(e => {
        this.$toast.error(e);
      });
  }
};
</script>
<style >
.el-collapse-item__header {
  font-size: 1.17em !important;
  font-weight: 800 !important;
}
</style>