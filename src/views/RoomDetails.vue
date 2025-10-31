<template>
  <div class="min-h-screen bg-gray-50 overflow-x-hidden">
    <!-- Header Section -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <button
            @click="$router.go(-1)"
            class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span class="i-mdi-arrow-left text-2xl"></span>
            <span>Back</span>
          </button>
          <h1 class="text-2xl font-bold text-gray-800">Room Details</h1>
          <div class="w-20"></div>
          <!-- Spacer for centering -->
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 max-w-7xl overflow-x-hidden">
      <!-- Room Details Section -->
      <div
        v-if="roomDetails"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
      >
        <!-- Room Images -->
        <div class="space-y-4">
          <div class="aspect-video rounded-lg overflow-hidden">
            <img
              :src="
                roomDetails.images?.thumbnail ||
                roomDetails.images?.main ||
                '/images/room-placeholder.jpg'
              "
              :alt="roomDetails.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Additional Images Grid -->
          <div
            v-if="roomDetails.images?.gallery"
            class="grid grid-cols-3 gap-2"
          >
            <div
              v-for="(image, index) in roomDetails.images.gallery.slice(0, 6)"
              :key="index"
              class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              @click="selectedImage = image"
            >
              <img
                :src="image"
                :alt="`${roomDetails.name} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Room Information -->
        <div class="space-y-6">
          <!-- Room Title and Price -->
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ roomDetails.name }}
            </h2>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-2 text-lg">
                <span class="i-mdi-hotel text-2xl text-blue-600"></span>
                <span class="font-semibold">{{
                  roomDetails.meal_plan?.name
                }}</span>
              </div>
            </div>
            <div class="text-3xl font-bold text-#FF1E74">
              {{ roomDetails.price?.amount }} {{ roomDetails.price?.currency }}
            </div>
            <p class="text-gray-600 mt-2">Total price for your stay</p>
          </div>

          <!-- Room Features -->
          <div v-if="roomDetails.amenities" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-800">Room Features</h3>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="amenity in roomDetails.amenities"
                :key="amenity"
                class="flex items-center gap-2 text-gray-700"
              >
                <span class="i-mdi-check text-green-500"></span>
                <span>{{ amenity }}</span>
              </div>
            </div>
          </div>

          <!-- Cancellation Policy -->
          <div v-if="roomDetails.cancellation_policy" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-800">
              Cancellation Policy
            </h3>
            <div
              v-if="roomDetails.cancellation_policy.is_refundable"
              class="bg-green-50 p-4 rounded-lg"
            >
              <div class="flex items-center gap-2 text-green-700 mb-2">
                <span class="i-mdi-check-circle text-xl"></span>
                <span class="font-semibold">Free Cancellation</span>
              </div>
              <p class="text-sm text-green-600">
                Cancel until {{ formatDate(roomDetails.cancel?.[0]?.to) }} for a
                full refund
              </p>
            </div>
            <div v-else class="bg-red-50 p-4 rounded-lg">
              <div class="flex items-center gap-2 text-red-700">
                <span class="i-mdi-close-circle text-xl"></span>
                <span class="font-semibold">Non-refundable</span>
              </div>
            </div>
          </div>

          <!-- Room Description -->
          <div v-if="roomDetails.description" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-800">Description</h3>
            <p class="text-gray-700 leading-relaxed">
              {{ roomDetails.description }}
            </p>
          </div>

          <!-- Room Size and Capacity -->
          <div class="grid grid-cols-2 gap-4">
            <div v-if="roomDetails.size" class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <span class="i-mdi-ruler text-xl text-blue-600"></span>
                <span class="font-semibold">Room Size</span>
              </div>
              <p class="text-gray-700">{{ roomDetails.size }} sq ft</p>
            </div>
            <div v-if="roomDetails.capacity" class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <span class="i-mdi-account-group text-xl text-blue-600"></span>
                <span class="font-semibold">Capacity</span>
              </div>
              <p class="text-gray-700">{{ roomDetails.capacity }} guests</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Sections -->
      <div
        v-if="roomDetails"
        class="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 md:gap-6 justify-center"
      >
        <!-- User Details Section -->
        <div
          class="bg-white rounded-lg shadow-md p-4 md:p-6 w-full md:w-1/2 lg:flex-1 max-w-sm md:max-w-none mx-auto md:mx-0"
        >
          <h3
            class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
          >
            <span class="i-mdi-account text-2xl text-blue-600"></span>
            Traveller Details
          </h3>

          <!-- Profile Data Notice -->
          <div class="bg-blue-50 p-3 rounded-lg mb-4">
            <div class="flex items-center gap-2 text-sm text-blue-700">
              <span class="i-mdi-account-check text-lg"></span>
              <span>Details filled from your profile</span>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Full Name</label
              >
              <el-input
                v-model="travellerDetails.fullName"
                placeholder="Your name will be filled from profile"
                class="w-full"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <el-input
                v-model="travellerDetails.email"
                type="email"
                placeholder="Your email will be filled from profile"
                class="w-full"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Phone Number</label
              >
              <el-input
                v-model="travellerDetails.phone"
                placeholder="Your phone will be filled from profile"
                class="w-full"
                disabled
              />
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="i-mdi-information text-lg"></span>
              <span>Contact details will be used for booking confirmation</span>
            </div>

            <!-- Edit Profile Button -->
            <div class="pt-2">
              <el-button
                type="text"
                @click="$router.push('/UserAccount/profile')"
                class="text-blue-600 hover:text-blue-800"
              >
                <span class="i-mdi-pencil text-lg mr-1"></span>
                Edit Profile Details
              </el-button>
            </div>
          </div>
        </div>

        <!-- Coupon Code Section -->
        <div
          class="bg-white rounded-lg shadow-md p-4 md:p-6 w-full md:w-1/2 lg:flex-1 max-w-sm md:max-w-none mx-auto md:mx-0"
        >
          <h3
            class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
          >
            <span class="i-mdi-ticket-percent text-2xl text-green-600"></span>
            Coupon Code
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Enter Coupon Code</label
              >
              <div class="flex gap-2">
                <el-input
                  v-model="couponCode"
                  placeholder="Enter coupon code"
                  class="flex-1"
                  :disabled="couponApplied"
                />
                <el-button
                  type="primary"
                  :loading="couponLoading"
                  :disabled="!couponCode.trim() || couponApplied"
                  @click="applyCoupon"
                  class="px-6"
                >
                  {{ couponApplied ? "Applied" : "Apply" }}
                </el-button>
              </div>
            </div>

            <!-- Coupon Message -->
            <div
              v-if="couponMessage"
              :class="couponError ? 'text-red-600' : 'text-green-600'"
              class="text-sm flex items-center gap-2"
            >
              <span
                :class="
                  couponError ? 'i-mdi-close-circle' : 'i-mdi-check-circle'
                "
              ></span>
              {{ couponMessage }}
            </div>

            <!-- Applied Coupon Details -->
            <div
              v-if="appliedCoupon && !couponError"
              class="bg-green-50 p-3 rounded-lg"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-semibold text-green-800">
                    {{ appliedCoupon.code }}
                  </p>
                  <p class="text-sm text-green-600">
                    {{ appliedCoupon.description }}
                  </p>
                </div>
                <el-button
                  type="text"
                  @click="removeCoupon"
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </el-button>
              </div>
            </div>

            <div class="text-sm text-gray-500">
              <p>Save more with our exclusive coupon codes</p>
            </div>
          </div>
        </div>

        <!-- Booking Summary Section -->
        <div
          class="bg-white rounded-lg shadow-md p-4 md:p-6 w-full md:w-full lg:flex-1 max-w-sm md:max-w-none mx-auto md:mx-0"
        >
          <h3
            class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
          >
            <span class="i-mdi-receipt text-2xl text-purple-600"></span>
            Booking Summary
          </h3>

          <div class="space-y-4">
            <!-- Room Details -->
            <div class="border-b pb-4">
              <h4 class="font-semibold text-gray-800 mb-2">
                {{ roomDetails.name }}
              </h4>
              <div class="text-sm text-gray-600 space-y-1">
                <div class="flex justify-between">
                  <span>Room Type:</span>
                  <span>{{ roomDetails.type || "Standard Room" }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Meal Plan:</span>
                  <span>{{ roomDetails.meal_plan?.name || "Room Only" }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Nights:</span>
                  <span>{{ nightsCount || 1 }}</span>
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Room Rate ({{ nightsCount || 1 }} nights):</span>
                <span
                  >{{ roomDetails.price?.amount * (nightsCount || 1) }}
                  {{ roomDetails.price?.currency }}</span
                >
              </div>

              <div
                v-if="appliedCoupon && !couponError"
                class="flex justify-between text-sm text-green-600"
              >
                <span>Coupon Discount:</span>
                <span
                  >-{{ couponDiscount }} {{ roomDetails.price?.currency }}</span
                >
              </div>

              <div v-if="taxes" class="flex justify-between text-sm">
                <span>Taxes & Fees:</span>
                <span>{{ taxes }} {{ roomDetails.price?.currency }}</span>
              </div>
            </div>

            <!-- Total Price -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-gray-800"
                  >Total Amount:</span
                >
                <span class="text-2xl font-bold text-#FF1E74">
                  {{ totalAmount }} {{ roomDetails.price?.currency }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3 pt-4">
              <button
                @click="proceedToCheckout"
                class="w-full bg-#1CCF3D text-white font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="i-mdi-credit-card text-xl"></span>
                Proceed to Checkout
              </button>
            </div>

            <!-- Cancellation Info -->
            <div class="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
              <p class="flex items-center gap-2">
                <span class="i-mdi-information text-lg"></span>
                Free cancellation until
                {{ formatDate(roomDetails.cancel?.[0]?.to) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex items-center justify-center min-h-96">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-#1CCF3D mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Loading room details...</p>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <el-dialog
      v-model="showImageModal"
      :title="roomDetails?.name"
      width="80%"
      center
    >
      <div class="aspect-video">
        <img
          :src="selectedImage"
          :alt="roomDetails?.name"
          class="w-full h-full object-contain"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomDetails",
  data() {
    return {
      roomDetails: null,
      selectedImage: null,
      showImageModal: false,
      // Traveller details
      travellerDetails: {
        fullName: "",
        email: "",
        phone: "",
      },
      // Coupon data
      couponCode: "",
      couponApplied: false,
      couponLoading: false,
      couponMessage: "",
      couponError: false,
      appliedCoupon: null,
      couponDiscount: 0,
      // Booking data
      nightsCount: 1,
      taxes: 0,
    };
  },
  created() {
    this.loadRoomDetails();
    this.loadUserProfile();
  },
  watch: {
    selectedImage(newImage) {
      if (newImage) {
        this.showImageModal = true;
      }
    },
  },
  computed: {
    ...mapState("userAccount", ["profileData", "isAuthorized"]),
    totalAmount() {
      if (!this.roomDetails?.price?.amount) return 0;
      const baseAmount = this.roomDetails.price.amount * this.nightsCount;
      const discount = this.couponDiscount || 0;
      const taxAmount = this.taxes || 0;
      return Math.max(0, baseAmount - discount + taxAmount);
    },
    isFormValid() {
      // Form is valid if profile data is loaded
      return (
        this.travellerDetails.fullName.trim() &&
        this.travellerDetails.email.trim() &&
        this.travellerDetails.phone.trim()
      );
    },
  },
  methods: {
    ...mapActions("userAccount", ["fetchUserProfile"]),
    async loadUserProfile() {
      try {
        // Always try to fetch profile data
        if (!this.profileData?.id) {
          await this.fetchUserProfile();
        }

        if (this.profileData?.id) {
          this.populateTravellerDetails();
        } else {
          // Profile data not available - this shouldn't happen for logged-in users
          console.error("Profile data not available");
          this.$message.error(
            "Unable to load profile data. Please try refreshing the page.",
          );
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        this.$message.error(
          "Failed to load profile data. Please check your connection and try again.",
        );
      }
    },

    populateTravellerDetails() {
      if (this.profileData) {
        // Combine first name and last name for full name
        const firstName =
          this.profileData.first_name || this.profileData.firstname || "";
        const lastName =
          this.profileData.lastname || this.profileData.last_name || "";
        const fullName = `${firstName} ${lastName}`.trim();

        this.travellerDetails = {
          fullName: fullName || "",
          email: this.profileData.email || "",
          phone: this.profileData.mobile || this.profileData.mobile_num || "",
        };
      }
    },
    async loadRoomDetails() {
      // Get room details from route params
      const roomId = this.$route.params.roomId;

      if (!roomId) {
        console.error("No room ID provided");
        this.$router.go(-1);
        return;
      }

      try {
        // Fetch room details by ID from API
        const roomData = await this.$store.dispatch(
          "hotels/fetchRoomById",
          roomId,
        );

        this.roomDetails = roomData.data || roomData;

        // Build checkout object on page load once room details are available
        this.buildCheckout();

        if (!this.roomDetails) {
          console.error("Room not found");
          this.$router.go(-1);
        }
      } catch (error) {
        console.error("Error loading room details:", error);
        // Fallback to query params if API fails (for backward compatibility)
        this.roomDetails = this.$route.query.roomData
          ? JSON.parse(this.$route.query.roomData)
          : null;

        if (!this.roomDetails) {
          this.$router.go(-1);
        }
        // If we have room details from query, still build checkout
        if (this.roomDetails) {
          this.buildCheckout();
        }
      }
    },

    buildCheckout() {
      // console.log("this.hotelDetails", this.hotelDetails);
      console.log("this roomDetails", this.roomDetails);
      try {
        const availbleHotels = JSON.parse(
          localStorage.getItem("availbleHotels") || "{}",
        );
        const filters = JSON.parse(localStorage.getItem("filters") || "{}");
        const hotelDetails =
          JSON.parse(localStorage.getItem("hotelDetails")).data.hotel || {};
        const cacheKey = availbleHotels.data && availbleHotels.data.cache_key;
        const checkoutObj = {
          uuid: cacheKey,
          vervotech_id: hotelDetails?.vervotech_id,
          provider: hotelDetails?.provider_name || "HotelBeds",
          rateKey: this.roomDetails?.vendor_data?.rate_key,
          searchData: {
            ...filters,
            rooms: [
              {
                Adults: filters.rooms[0].adults_number,
                Children: filters.rooms[0].children_number,
                ChildrenAges: filters.rooms[0].children_ages || [],
              },
            ],
            nationality: "EG",
          },
          rate_base_id: hotelDetails?.rate_base_id,
        };

        localStorage.setItem("checkout", JSON.stringify(checkoutObj));
      } catch (e) {
        console.error("Failed to persist checkout object", e);
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },

    selectRoom() {
      // Store the selected room in the store
      if (this.roomDetails) {
        this.$store.commit("payment/SET_ROOM_SELECTED", this.roomDetails);
        this.$router.push({ name: "CheckOut" });
      }
    },

    addToFavorites() {
      // Add room to favorites
      this.$message.success("Room added to favorites!");
    },

    async applyCoupon() {
      if (!this.couponCode.trim()) return;

      this.couponLoading = true;
      this.couponError = false;
      this.couponMessage = "";

      try {
        const couponData = await this.$store.dispatch(
          "coupons/fetchCouponDetails",
          this.couponCode.trim(),
        );
        this.appliedCoupon = couponData;
        this.couponApplied = true;
        this.couponMessage = "Coupon applied successfully!";

        // Calculate discount (assuming percentage discount for now)
        if (couponData.discount_type === "percentage") {
          this.couponDiscount =
            (this.roomDetails.price.amount *
              this.nightsCount *
              couponData.discount_value) /
            100;
        } else {
          this.couponDiscount = couponData.discount_value;
        }

        this.$message.success("Coupon applied successfully!");
      } catch (error) {
        this.couponError = true;
        this.couponMessage =
          error.response?.data?.message || "Invalid coupon code";
        this.appliedCoupon = null;
        this.couponDiscount = 0;
      } finally {
        this.couponLoading = false;
      }
    },

    removeCoupon() {
      this.couponCode = "";
      this.couponApplied = false;
      this.couponMessage = "";
      this.couponError = false;
      this.appliedCoupon = null;
      this.couponDiscount = 0;
      this.$message.info("Coupon removed");
    },

    proceedToCheckout() {
      // Store traveller details and room selection
      const bookingData = {
        room: this.roomDetails,
        traveller: this.travellerDetails,
        coupon: this.appliedCoupon,
        nightsCount: this.nightsCount,
        totalAmount: this.totalAmount,
        discount: this.couponDiscount,
      };

      // Store in payment store for checkout
      this.$store.commit("payment/SET_ROOM_SELECTED", this.roomDetails);
      this.$store.commit(
        "payment/SET_TRAVELLER_DETAILS",
        this.travellerDetails,
      );
      this.$store.commit("payment/SET_COUPON_DATA", {
        coupon: this.appliedCoupon,
        discount: this.couponDiscount,
      });

      // Navigate to checkout
      this.$router.push({
        name: "CheckOut",
        query: {
          q: encodeURIComponent(JSON.stringify(bookingData)),
        },
      });
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
