<template>
  <el-row class="lg:md:px-20 sm:px-5 py-10">
    <el-col>
      <el-steps
        :space="300"
        process-status="finish"
        :active="active"
        align-center
        finish-status="success"
        class="justify-center"
      >
        <el-step title="Review Hotel Details" />
        <el-step title="Traveller Details" />
        <el-step title="Payment" />
      </el-steps>
    </el-col>
  </el-row>

  <!-- Show loading if checkout data is not ready -->
  <el-row
    v-if="!isCheckoutDataReady"
    class="lg:md:px-20 sm:px-4 pb-10 justify-center"
  >
    <el-col>
      <el-card>
        <loading-card></loading-card>
      </el-card>
    </el-col>
  </el-row>

  <!-- Show content when checkout data is ready -->
  <el-row
    v-else
    class="lg:md:px-20 sm:px-4 pb-10 justify-between"
    v-if="active != 3"
  >
    <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24">
      <review-card :checkout-data="checkoutData"></review-card>
      <welcome-card :checkout-data="checkoutData"></welcome-card>
    </el-col>
    <el-col
      :span="24"
      :lg="7"
      :sm="24"
      :md="7"
      :xs="24"
      class="sm:mt-10 lg:md:mt-0"
    >
      <check-out-right-card
        :checkout-data="checkoutData"
      ></check-out-right-card>
    </el-col>
    <!-- <payment-card></payment-card> -->
  </el-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      active: 2,
      loading: false,
    };
  },
  computed: {
    ...mapState("checkout", ["checkoutData"]),
    // Ensure checkout data is ready before rendering components
    isCheckoutDataReady() {
      const ready = !!(
        this.checkoutData &&
        this.checkoutData.bookingData &&
        this.checkoutData.hotel &&
        Array.isArray(this.checkoutData.hotel) &&
        this.checkoutData.hotel.length > 0 &&
        Object.keys(this.checkoutData.bookingData).length > 0
      );
      console.log("CheckOut - isCheckoutDataReady:", ready, this.checkoutData);
      return ready;
    },
  },
  created() {
    // Fetch checkout data on component creation
    this.loadCheckoutData();
  },
  methods: {
    ...mapActions("checkout", ["fetchCheckoutData"]),
    ...mapActions("wallet", ["getWalletBalance"]),
    async loadCheckoutData() {
      this.loading = true;
      try {
        await this.fetchCheckoutData();
        console.log("=== CHECKOUT DATA FROM VUEX ===");
        console.log(
          "Full checkoutData object:",
          JSON.parse(JSON.stringify(this.checkoutData)),
        );
        console.log(
          "checkoutData.bookingData:",
          this.checkoutData?.bookingData,
        );
        console.log("checkoutData.hotel:", this.checkoutData?.hotel);
        console.log(
          "checkoutData.hotel length:",
          this.checkoutData?.hotel?.length,
        );
        console.log(
          "checkoutData.bookingData keys:",
          Object.keys(this.checkoutData?.bookingData || {}),
        );
        console.log("=== END CHECKOUT DATA ===");

        // Fetch wallet balance after checkout data is loaded
        await this.getWalletBalance();
        console.log("Wallet balance fetched successfully");
      } catch (e) {
        console.error("Error fetching checkout data:", e);
        this.$toast.error("Failed to load checkout data. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.el-card.is-always-shadow {
  box-shadow: var(--el-box-shadow-light);
}
@media (max-width: 550px) {
  .el-step__title {
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }
}
</style>
