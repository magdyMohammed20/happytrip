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
      <customer-member-card :loading="loading"></customer-member-card>
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

  <!-- Large Pay Button -->
  <el-row
    v-if="isCheckoutDataReady && active != 3"
    class="lg:md:px-20 sm:px-4 pb-10"
  >
    <el-col class="w-full flex justify-center" :span="24">
      <el-button
        type="primary"
        class="custom-button font-bold text-xl py-8"
        @click="handlePayment"
        :loading="paymentLoading"
      >
        PAY NOW
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
import CustomerMemberCard from "@/components/checkOut/CustomerMemberCard.vue";

export default {
  components: {
    CustomerMemberCard,
  },
  data() {
    return {
      active: 2,
      loading: false,
      paymentLoading: false,
    };
  },
  computed: {
    ...mapState("checkout", ["checkoutData"]),
    ...mapState("userAccount", ["profileData"]),
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
    // Get total amount directly from totalFare
    totalAmount() {
      const hotelData = this.checkoutData?.hotel?.[0] || null;
      return parseFloat(hotelData?.totalFare) || 0;
    },
    currency() {
      const hotelData = this.checkoutData?.hotel?.[0] || null;
      return (
        hotelData?.currency || window.localStorage.getItem("CURR") || "SAR"
      );
    },
  },
  created() {
    // Fetch checkout data on component creation
    this.loadCheckoutData();
  },
  methods: {
    ...mapActions("checkout", ["fetchCheckoutData"]),
    ...mapActions("wallet", ["getWalletBalance", "getCustomerMembers"]),
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

        // Fetch customer members after wallet balance
        await this.getCustomerMembers();
        console.log("Customer members fetched successfully");
      } catch (e) {
        console.error("Error fetching checkout data:", e);
        this.$toast.error("Failed to load checkout data. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    async handlePayment() {
      this.paymentLoading = true;
      try {
        // First, get payment settings
        const settingsResponse = await this.$axios.get(
          "api/payment/tapPay/getSetting",
        );
        console.log("Payment settings:", settingsResponse.data);

        // Get user data from Vuex store
        const userData = this.profileData;

        // Get amount directly from totalFare
        const amount = this.totalAmount;

        console.log("=== PAYMENT DATA ===");
        console.log("User data:", userData);
        console.log("Total amount:", amount);
        console.log("Currency:", this.currency);
        console.log("=== END PAYMENT DATA ===");

        if (!amount || amount <= 0) {
          this.$toast.error("Invalid payment amount. Please try again.");
          return;
        }

        // Prepare charge data with proper user info
        const fullName =
          userData.name ||
          `${userData.first_name || userData.firstname || ""} ${
            userData.middle_name || ""
          } ${userData.lastname || ""}`.trim();

        const chargeData = {
          name: fullName || "Guest",
          email: userData.email || "guest@example.com",
          amount: amount,
          currency: this.currency,
        };

        console.log("Creating charge with data:", chargeData);

        // Create charge
        const chargeResponse = await this.$axios.post(
          "api/payment/tapPay/creatCharge",
          chargeData,
        );

        console.log("Charge created:", chargeResponse.data);
        this.$toast.success("Payment initiated successfully");

        // Handle the charge response and navigate to the payment URL
        const paymentUrl = chargeResponse.data?.transaction?.url;

        if (paymentUrl) {
          console.log("Navigating to payment URL:", paymentUrl);
          window.location.href = paymentUrl;
        } else {
          console.warn("No payment URL found in response");
          this.$toast.warning(
            "Payment initiated but no payment page available",
          );
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        this.$toast.error(
          error.response?.data?.message || "Failed to process payment",
        );
      } finally {
        this.paymentLoading = false;
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
