<template>
  <div class="payment-wrapper">
    <div class="container">
      <div class="card">
        <!-- Success Icon -->
        <div class="icon">✓</div>

        <!-- Success Message -->
        <h1>Payment Successful!</h1>
        <p>Your payment has been processed successfully.</p>

        <!-- Buttons -->
        <div class="buttons">
          <!-- Loading Button -->
          <button v-if="loading" class="btn-primary btn-loading" disabled>
            <div class="spinner-small"></div>
            Processing Booking...
          </button>

          <!-- View Booking Button (after processing) -->
          <button
            v-else-if="bookingId"
            @click="viewBooking"
            class="btn-primary"
          >
            View Booking
          </button>

          <!-- Home Button -->
          <button @click="goHome" class="btn-secondary">Home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PaymentSuccessPageNew",
  data() {
    return {
      bookingId: null,
      loading: true,
    };
  },
  computed: {
    ...mapState("checkout", ["checkoutData", "userTravellers"]),
    ...mapState("userAccount", ["profileData", "travellers"]),
    ...mapState("payment", ["travellerDetails", "couponData", "roomSelected"]),
  },
  async created() {
    await this.processPayment();
  },
  methods: {
    async processPayment() {
      try {
        const query = this.$route.query;

        // Fetch user data from API
        await this.fetchUserData();

        // Get data from localStorage
        const filters = JSON.parse(localStorage.getItem("filters") || "{}");
        const checkoutObj = JSON.parse(
          localStorage.getItem("checkout") || "{}",
        );

        // Build booking payload
        const payload = this.buildBookingPayload(query, filters, checkoutObj);

        console.log("Booking Payload:", payload);

        // Submit booking
        const response = await this.$axios.post(
          "/api/mapping/hotels/booking",
          payload,
        );

        if (response.data.token) {
          localStorage.setItem("guest_token", response.data.token);
        }

        this.bookingId = response.data.bookingData?.id;
        this.loading = false;
        this.$toast.success("Payment successful!");

        // Clean URL
        this.$router.replace({ path: "/PaymentSuccessPage", query: {} });
      } catch (error) {
        console.error("Payment error:", error);
        this.$toast.error("Payment processing failed");
        setTimeout(() => this.$router.push("/"), 3000);
      }
    },

    async fetchUserData() {
      try {
        // Fetch checkout data (this includes hotel, booking details, amounts, etc.)
        await this.$store.dispatch("checkout/fetchCheckoutData");
        console.log("Checkout data fetched:", this.checkoutData);

        // Fetch user profile data
        const profileResponse = await this.$axios.get("/api/user/profile-data");
        this.$store.commit(
          "userAccount/SET_PROFILE_DATA",
          profileResponse.data.customerInfo,
        );

        // Fetch user travellers
        const travellersResponse = await this.$axios.get(
          "api/user/customer-member/all",
        );
        this.$store.commit(
          "checkout/SET_USER_TRAVELLERS",
          travellersResponse.data.data,
        );

        console.log("All user data fetched successfully");
      } catch (error) {
        console.log(
          "Failed to fetch user data, continuing with existing data:",
          error,
        );
        // Continue with existing data if fetch fails
      }
    },

    buildBookingPayload(query, filters, checkoutObj) {
      // Parse query payload if exists
      const queryPayload = query.payload ? JSON.parse(query.payload) : {};

      // Log query params for debugging
      console.log("Query params:", query);
      console.log("tap_id:", query.tap_id);
      console.log("payment_id:", query.payment_id);

      // Get checkout data from Vuex store (this has all the booking data)
      const hotelData = this.checkoutData?.hotel?.[0] || {};
      const bookingData = this.checkoutData?.bookingData || {};

      // Get user info from profileData
      const userEmail = this.profileData?.email || "";
      const userFirstName =
        this.profileData?.first_name || this.profileData?.firstname || "";
      const userLastName = this.profileData?.lastname || "";

      // Debug mobile number
      console.log("ProfileData mobile fields:", {
        mobile_num: this.profileData?.mobile_num,
        mobile: this.profileData?.mobile,
        phone: this.profileData?.phone,
      });

      const userMobile = (
        this.profileData?.mobile_num ||
        this.profileData?.mobile ||
        this.profileData?.phone ||
        ""
      ).substring(0, 20);

      // Get currency - use from checkoutData first
      const currency =
        hotelData.currency || localStorage.getItem("CURR") || "SAR";

      // Build the payload matching the curl structure
      const payload = {
        // Hotel & Booking Info (from checkoutData)
        uuid: bookingData.uuid || checkoutObj.uuid,
        rateKey: bookingData.rateKey || checkoutObj.rateKey,
        provider: hotelData.provider || "HotelBeds",
        hotelCode:
          typeof hotelData.hotelCode === "string"
            ? hotelData.hotelCode
            : JSON.stringify(hotelData.hotelCode),
        totalFare: hotelData.totalFare,

        // User Info
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        mobile_num: userMobile,

        // App Info
        appType: "web",
        apple_token: null,

        // Payment Info (from checkoutData)
        total: hotelData.totalFare,
        amount: hotelData.totalFare,
        coupon_id: this.couponData?.coupon?.id || "",
        loyality: 0,
        wallet: 0,
        chg_id: this.$route.query.tap_id ,
        paymentCurrency: currency,
        currency: currency,
        status: "CAPTURED",
        payment_type: this.$route.query.tap_id ? "tap_payment" : "tap_payment",
        is_free: 0,
        platForm: "web",

        // Search Data (from checkoutData or filters)
        searchData:
          bookingData.searchData || this.buildSearchData(filters, checkoutObj),

        // Rooms & Customer Info
        rooms: this.buildRoomsData(filters, userFirstName, userLastName),
      };

      return payload;
    },

    buildSearchData(filters, checkoutObj) {
      const searchData = checkoutObj.searchData || {};

      return {
        checkIn: filters.checkIn || searchData.checkIn,
        checkOut: filters.checkOut || searchData.checkOut,
        rooms: [
          {
            Adults:
              filters.rooms?.[0]?.adults_number ||
              searchData.rooms?.[0]?.Adults ||
              2,
            Children:
              filters.rooms?.[0]?.children_number ||
              searchData.rooms?.[0]?.Children ||
              0,
            ChildrenAges:
              filters.rooms?.[0]?.children_ages ||
              searchData.rooms?.[0]?.ChildrenAges ||
              [],
          },
        ],
        children_num: (filters.rooms?.[0]?.children_number || 0).toString(),
        adults_num: (filters.rooms?.[0]?.adults_number || 2).toString(),
        room_num: "1",
        nationality: filters.nationality || searchData.nationality || "SAR",
        currency: filters.currency || "SAR",
        cancellationPolicies: filters.cancellationPolicies || [],
      };
    },

    buildRoomsData(filters, userFirstName, userLastName) {
      // Build from Vuex traveller data or defaults
      const adultsCount = filters.rooms?.[0]?.adults_number || 2;
      const childrenCount = filters.rooms?.[0]?.children_number || 0;
      const customerNames = [];

      // Add main user/traveller
      customerNames.push({
        Title: this.profileData?.title || "Mr",
        FirstName: userFirstName || "Guest",
        LastName: userLastName || "User",
        Type: "Adult",
        date_of_birth: this.profileData?.dob || "1995-08-08 12:00",
      });

      // Add additional travellers from userTravellers if available
      if (this.userTravellers && this.userTravellers.length > 0) {
        for (
          let i = 1;
          i < adultsCount && i < this.userTravellers.length + 1;
          i++
        ) {
          const traveller = this.userTravellers[i - 1];
          customerNames.push({
            Title: traveller.title || "Mr",
            FirstName: traveller.first_name || traveller.firstname || "Guest",
            LastName: traveller.last_name || traveller.lastname || "User",
            Type: traveller.type || "Adult",
            date_of_birth:
              traveller.dob || traveller.date_of_birth || "1995-08-08 12:00",
          });
        }
      }

      // Fill remaining adults if needed
      while (customerNames.length < adultsCount) {
        customerNames.push({
          Title: "Mr",
          FirstName: "Guest",
          LastName: "User",
          Type: "Adult",
          date_of_birth: "1995-08-08 12:00",
        });
      }

      // Add children if any
      const childrenAges = filters.rooms?.[0]?.children_ages || [];
      for (let i = 0; i < childrenCount; i++) {
        customerNames.push({
          Title: "Miss",
          FirstName: "Child",
          LastName: "User",
          Type: "Child",
          date_of_birth: this.calculateChildDob(childrenAges[i] || 10),
        });
      }

      return [{ CustomerNames: customerNames }];
    },

    calculateChildDob(age) {
      const today = new Date();
      const birthYear = today.getFullYear() - age;
      return `${birthYear}-${String(today.getMonth() + 1).padStart(
        2,
        "0",
      )}-${String(today.getDate()).padStart(2, "0")} 12:00`;
    },

    viewBooking() {
      if (this.bookingId) {
        this.$router.push(`/CheckOutPayment/${this.bookingId}`);
      }
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.payment-wrapper {
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 50px 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
  background: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 50px;
  font-weight: bold;
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

button {
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-loading {
  cursor: not-allowed;
  opacity: 0.8;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

@media (max-width: 600px) {
  .payment-wrapper {
    width: 100vw;
  }

  .container {
    padding: 10px;
  }

  .card {
    padding: 30px 20px;
    width: 100%;
    border-radius: 10px;
  }

  .buttons {
    flex-direction: column;
    width: 100%;
  }

  button {
    width: 100%;
  }

  h1 {
    font-size: 24px;
  }

  .icon {
    width: 70px;
    height: 70px;
    font-size: 40px;
  }
}
</style>
