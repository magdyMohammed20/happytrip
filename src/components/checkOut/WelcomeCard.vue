<template>
  {{ this.computedManyRoomSelection }}
  <el-card v-if="!checkoutDataComputed?.bookingData">
    <loading-card></loading-card>
  </el-card>
  <div v-else>
    <el-card
      class="welcome-card mt-10"
      v-for="(roomPassenger, index) in checkoutDataComputed.bookingData.paxes"
      :key="index"
    >
      <template #header>
        <div class="card-header mb-3 p-3 md:px-5">
          <span class="mx-2 font-bold">Room {{ index + 1 }}</span>
        </div>
      </template>
      <div
        v-if="profileData.user_id && checkoutDataComputed.bookingData"
        class="bg-slate-100 lg:md:pt-0 rounded-xl lg:md:mt-0 sm:p-3 md:px-5 border-solid border-2 border-sky-500 items-center gap-4"
      >
        <el-row class="justify-between" align="middle">
          <el-col :md="7" class="mt-4">
            <p class="text-sm font-bold">
              Room {{ index + 1 }} : ({{ roomPassenger.Adults }} Adults &
              {{ roomPassenger.Children }} Kid)
            </p>
            <p class="text-xs text-slate-400">
              Select Travellers From MY Account
            </p>
          </el-col>
          <el-col :span="10">
            <div class="px-6">
              <el-select
                v-if="checkoutDataComputed.bookingData"
                :disabled="
                  (roomPassenger.Adults == '1') &
                  (roomPassenger.Children == '0') &
                  (checkoutDataComputed.bookingData.paxes.length < 2)
                "
                class="mt-4 w-full"
                @change="
                  travellersArrayValidations();
                  fetchSingleUser(travellers[index], index);
                "
                v-model="travellers[index]"
                @remove-tag="onRemoveTag"
              >
                <el-option value="">
                  <p
                    @click="addTravellerDialog = true"
                    class="travellerSelect pt-0 mt-0"
                  >
                    <span
                      class="i-mdi-plus text-2xl md:text-xl mr-3 ml-0 text-violet"
                    ></span>
                    Add Traveller
                  </p>
                </el-option>
                <el-option
                  v-for="item in userTravellers"
                  :key="item.id"
                  :label="item.first_name + ' ' + item.last_name"
                  :value="item.id"
                  :disabled="item.ishide"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="px-3 md:px-5">
        <el-form
          ref="formRef"
          :rules="rules"
          :model="singleTraveller[index]"
          v-if="singleTraveller[index]"
          class="demo-ruleForm"
        >
          <el-row class="flex justify-between w-full" :gutter="20">
            <el-col :md="8" :span="24" class="mt-5 flex flex-col text-center">
              <el-form-item prop="email" class="flex">
                <el-input
                  name="email"
                  v-if="singleTraveller[index]"
                  v-model="singleTraveller[index].email"
                  placeholder="Email"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :md="8" class="mt-5 flex flex-col text-center">
              <el-form-item prop="first_name" class="flex">
                <el-input
                  name="first_name"
                  v-if="singleTraveller[index]"
                  v-model="singleTraveller[index].first_name"
                  placeholder="First Name"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :md="8" class="mt-5 flex flex-col text-center">
              <el-form-item prop="last_name" class="flex">
                <el-input
                  v-if="singleTraveller[index]"
                  name="last_name"
                  v-model="singleTraveller[index].last_name"
                  placeholder="Last Name"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            v-if="singleTraveller[index]"
            label="Gender"
            class="d-block"
          >
            <el-radio-group v-model="singleTraveller[index].gender">
              <el-radio label="female" />
              <el-radio label="male" />
            </el-radio-group>
          </el-form-item>
          <el-form-item class="w-[30%] min-w-[200px] py-0">
            <!-- 
              v-model="form.mobile_num"
             -->
            <!-- <el-input
              
            > -->
            <vue-tel-input
              name="mobile_num"
              v-if="index == 0 && singleTraveller[index]"
              @input="comeFormPhone"
              mode="international"
              class="el-input__wrapper py-0"
              v-model="form.mobile_num"
            />
            <p
              v-if="index == 0 && singleTraveller[index]"
              class="text-xs text-red mx-1 mt-1"
            >
              *Phone number is required
            </p>
            <!-- </el-input> -->
          </el-form-item>

          <!-- Redeem adv -->
          <div
            class="mt-6 flex flex-col md:flex-row items-center"
            v-if="isAuthenticated"
          >
            <!-- <el-checkbox v-model="redeemChecked">Redeem loyalty points</el-checkbox> -->
          </div>
        </el-form>
        <!-- </FormWrapper> -->
      </div>
    </el-card>
  </div>

  <div
    v-if="isAuthenticated"
    class="coupon-card outline-dashed outline-2 outline-offset-2 outline-green-500 rounded-t-3xl"
  >
    <el-row align="middle" justify="center" class="w-full" :gutter="20">
      <el-col :sm="24" :lg="24" class="justify-center custom-col">
        <!-- Redeem adv -->
        <div class="mt-6 flex justify-between w-[80%] md:flex-row">
          <!-- <el-checkbox v-model="redeemChecked">Redeem loyalty points</el-checkbox> -->

          <label class="text-start mx-3 md:mr-5 pb-5 w-1/2">
            <span class="mr-3 cursor-pointer">Redeem Rahhal</span>
            <div v-if="redeemChecked">
              <p
                class="m-0 text-green-500 text-xs"
                v-if="redeemMessage"
                v-html="redeemMessage"
              ></p>
            </div>
            <div v-else class="inline">
              <p class="m-0 text-green-500 text-sm pb-5 inline">
                You have
                <strong>{{ this.form.redeemPoints || 0 }}</strong>
                points so far
              </p>
            </div>
          </label>
          <el-switch
            v-model="redeemChecked"
            :disabled="isWallet | (this.form.redeemPoints == 0) | isCoupon"
            active-color="#13ce66"
          ></el-switch>
        </div>
      </el-col>

      <el-col :sm="24" :lg="24" class="d-flex custom-col justify-center">
        <!-- Redeem adv -->
        <div
          class="text-start flex justify-between w-[80%] text-center md:flex-row items-center"
          v-if="isAuthenticated"
        >
          <!-- <el-checkbox v-model="redeemChecked">Redeem loyalty points</el-checkbox> -->

          <label class="md:mr-5 pb-5 mx-3 w-1/2">
            <span class="mr-3 cursor-pointer"
              >PAY {{ walletBalance }} from {{ this.roomSelected.net }} With
              Your Wallet</span
            >
          </label>
          <el-switch
            v-model="isWallet"
            active-color="#13ce66"
            :disabled="(walletBalance <= 0) | redeemChecked | isCoupon"
          ></el-switch>
        </div>
      </el-col>
    </el-row>
  </div>

  <div
    class="coupon-card outline-dashed outline-2 outline-offset-2 outline-green-500 rounded-b-3xl py-4"
  >
    <div class="d-flex px-4">
      <FormWrapper ref="form">
        <el-form :inline="true" :model="form" class="w-[80%] mx-auto">
          <h2 class="text-4 mb-3">Discount Code</h2>
          <div class="flex">
            <div class="w-[100%]">
              <el-input
                name="coupon_id"
                errorName="coupon"
                class="w-full"
                v-model.trim="form.coupon_id"
                placeholder="Enter your Coupon"
                @clear="clearCoupon"
                clearable
              >
              </el-input>
            </div>

            <div class="mx-3 w-[20%]">
              <el-button
                class="w-full custom-button md:m-0 font-bold"
                @click="applyCoupon"
                :disabled="redeemChecked | isWallet"
                >Apply</el-button
              >
            </div>

            <p class="m-3 text-gray-500 font-semibold" v-if="couponMessage">
              {{ couponMessage }}
            </p>
          </div>
        </el-form>
      </FormWrapper>
    </div>
  </div>
  <el-row>
    <el-col :span="24" class="mt-5">
      <el-button
        text
        class="button custom-button md:m-0 mx-3 font-bold px-2 w-full h-12 text-xl"
        @click="
          isWallet
            ? validateForRahhalWallet()
            : redeemChecked
            ? validateForRahhalWallet()
            : isAuthenticated
            ? validate()
            : checkMailValidity()
        "
        >PAY {{ userPayBalance }}</el-button
      >
    </el-col>
  </el-row>
  <!-- confirmPayDialog -->
  <el-dialog
    v-model="confirmPayDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    append-to-body
    @close="redeemChecked = false"
  >
    <el-card>
      <p class="text-slate-500 font-bold text-center py-3">
        You have enough {{ isWallet ? "wallet balance" : "Rahhal points" }} that
        will fully pay the cost of you reservation
      </p>
      <div class="w-full text-center">
        <el-button
          :loading="sendingBooking"
          @click="
            isWallet ? onWalletApply() : redeemChecked ? onLoyalityApply() : ''
          "
          class="button m-auto text-center lign-center custom-button mt-4 md:m-0 mx-3 font-bold px-2 py-8"
        >
          Confirm Payment
        </el-button>
      </div>
    </el-card>
  </el-dialog>

  <el-dialog
    v-model="dialogBook"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="false"
    append-to-body
    class="payment-information-diloag"
  >
    <div id="payment-form"></div>
  </el-dialog>
  <!-- PAY DIALOG -->
  <el-dialog
    v-model="payDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    append-to-body
    class="rounded-xl"
  >
    <el-col :span="24" class="mt-5 flex flex-col text-center">
      <div class="my-2">
        <el-button
          text
          class="button custom-button mt-4 md:m-0 mx-3 font-bold px-2 py-8 w-[50%]"
          @click="
            isCoupon ? onCouponPay() : submitForm();
            isTapPayment = true;
          "
          >PAY {{ userPayBalance }} Ordinary Payment</el-button
        >
      </div>
      <div class="my-2">
        <el-tooltip
          :visible="visible"
          :content="
            isWallet
              ? 'Sorry can\'t use wallet with Rahal Program'
              : redeemChecked
              ? 'Sorry can\'t use Rahal Program with Tabby'
              : form.coupon_id || couponPay
              ? 'Sorry can\'t use Coupon with Tabby'
              : ''
          "
          placement="top"
        >
          <el-button
            @mouseenter="
              isWallet || redeemChecked || form.coupon_id || couponPay
                ? (visible = true)
                : (visible = false)
            "
            @mouseleave="visible = false"
            class="p-5 w-[50%]"
            @click="payTabby"
            :disabled="disableTabby"
          >
            <img src="../../assets/images/tabby.png" alt="tabby" width="80" />
            Tabby Pay in 4 . No interset , no fees
          </el-button>
        </el-tooltip>
      </div>
    </el-col>
  </el-dialog>
  <el-dialog
    v-model="addTravellerDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    class="border-rounded-xl"
  >
    <el-form
      :model="travellerForm"
      class="p-5 m-5 border-1 border-slate rounded-2xl"
    >
      <el-form-item
        label="Traveller First Name"
        class="traveller-item"
        label-width="150"
      >
        <el-input
          v-model="travellerForm.first_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Traveller Last Name"
        class="traveller-item"
        label-width="150"
      >
        <el-input
          v-model="travellerForm.last_name"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Traveller Phone"
        class="traveller-item"
        label-width="150"
      >
        <el-input
          v-model="travellerForm.mobile"
          class="traveller-item"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Traveller Email"
        class="traveller-item"
        label-width="150"
      >
        <el-input v-model="travellerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Traveller Type"
        class="traveller-item"
        label-width="150"
      >
        <el-select class="mt-4 w-full" v-model="travellerForm.type">
          <el-option key="Adult" label="Adult" value="Adult"></el-option>
          <el-option
            key="children "
            label="children"
            value="children"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Gender" class="traveller-item d-block">
        <el-radio-group v-model="travellerForm.gender">
          <el-radio label="female" />
          <el-radio label="male" />
        </el-radio-group>
      </el-form-item>
      <span slot="footer" class="dialog-footer flex justify-end">
        <el-button
          type="primary"
          class="p-5"
          @click="
            addTravellerDialog = false;
            addTraveller();
          "
          >Add Traveller</el-button
        >
      </span>
    </el-form>
  </el-dialog>
  <el-dialog
    v-model="checkPhoneNumberDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    class="border-rounded-xl text-center w-[20%]"
  >
    <p>Enter phone number is required</p>
    <el-button
      @click="checkPhoneNumberDialog = false"
      class="button m-auto text-center lign-center custom-button mt-4 md:m-0 mx-3 font-bold px-2 py-8"
    >
      Confirm
    </el-button>
  </el-dialog>
</template>
<script>
import { VueTelInput } from "vue3-tel-input";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    checkoutData: {
      type: Object,
      default: null,
    },
  },
  components: {
    VueTelInput,
  },
  data() {
    return {
      checkPhoneNumberDialog: false,
      tabPublicKey: "",
      tappyPublicKey: "",
      sendingBooking: false,
      isTapPayment: false,
      confirmPayDialog: false,
      userBalance: 0,
      isWallet: false,
      singleTraveller: [],
      rulesTravelers: [
        { required: true, message: "this field is required", trigger: "blur" },
      ],
      travellerFormValidate: {
        traveller22: "",
      },
      visible: false,
      walletPay: false,
      couponPay: false,
      payDialog: false,
      rules: {
        email: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: ["blur", "change"],
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        first_name: {
          required: true,
          message: "Please input Activity name",
          trigger: ["blur", "change"],
        },
        last_name: {
          required: true,
          message: "Please input Activity name",
          trigger: ["blur", "change"],
        },
        // mobile_num: {
        //   required: true,
        //   message: "Please input your telephone",
        //   trigger: ["blur", "change"],
        // },
      },
      nameRules: [
        {
          required: true,
          message: "Please input your name",
          trigger: "blur",
        },
      ],
      traveller2: [],
      travellerForm: {},
      myTraveller: {},
      addTravellerDialog: false,
      travellers: [],
      isCoupon: 0,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        country: "",
        mobile_num: "",
        appType: "web",
        coupon_id: "",
        redeemPoints: "",
      },
      dialogBook: false,
      couponMessage: "",
      couponDiscount: 0,
      redeemChecked: false,
      redeemMessage: "",
      tapPaySetting: "",
      // walletBalance: 500,
    };
  },
  computed: {
    computedManyRoomSelection() {
      return this.handleManyRoomSelection();
    },
    userPayBalance() {
      console.log("this.roomSelected.net", this.roomSelected.net);
      let price = { ...this.roomSelected };
      let priceToShow = price.net;
      if (this.isWallet) {
        // return this.roomSelected.net <= this.walletBalance ? 0 : this.roomSelected.net
        if (this.redeemChecked) {
          if (
            this.form.redeemPoints + this.walletBalance >
            this.roomSelected.net
          ) {
            // this.confirmPayDialog = true;
            priceToShow = 0;
            return 0;
          } else {
            return (
              priceToShow -
              Math.ceil(this.form.redeemPoints + this.walletBalance)
            );
          }
        } else if (this.roomSelected.net <= this.walletBalance) {
          return 0;
        } else if (this.roomSelected.net > this.walletBalance) {
          return Math.ceil(priceToShow - this.walletBalance);
        } else {
          return this.roomSelected.net;
        }
      } else if (this.isCoupon) {
        return priceToShow - this.isCoupon;
      } else if (this.redeemChecked) {
        // this.confirmPayDialog = true;
        if (this.form.redeemPoints >= this.roomSelected.net) {
          // this.confirmPayDialog = true;
          priceToShow = 0;
          return 0;
        } else if (this.isWallet) {
          if (
            this.form.redeemPoints + this.walletBalance >
            this.roomSelected.net
          ) {
            // this.confirmPayDialog = true;
            priceToShow = 0;
            return 0;
          } else {
            return (
              priceToShow -
              Math.ceil(this.form.redeemPoints + this.walletBalance)
            );
          }
        } else {
          return priceToShow - this.form.redeemPoints;
        }
        // return this.form.redeemPoints >= this.roomSelected.net
        //   ? ((this.confirmPayDialog = true), (priceToShow = 0))
        //   : priceToShow - this.form.redeemPoints;
        // return this.roomSelected.net - this.redeemPoints;
      } else {
        return this.roomSelected.net;
      }
    },

    disableTabby() {
      if (this.isWallet || this.redeemChecked || this.form.coupon_id) {
        return true;
      } else {
        return false;
      }
    },
    /// state => hotels/availbleHotelsDetails ||
    ...mapState("wallet", ["walletBalance"]),
    ...mapState("hotels", ["currencyPrice"]),
    ...mapState("userAccount", ["singleTravellerData"]),
    ...mapState({
      roomSelected: (state) => state.payment.roomSelected,
      hotelDetails: (state) => {
        return Object.assign(
          {},
          state.payment.hotel,
          state.hotels.availbleHotelsDetails,
        );
      },
      bookingDetails: (state) => state.payment.searchForm,
      profileData: (state) => state.userAccount.profileData,
      userTravellers: (state) => state.checkout.userTravellers,
      userTravellersasly: (state) => state.checkout.userTravellersasly,
    }),
    // Use prop if provided, otherwise fall back to Vuex store
    checkoutDataComputed() {
      const data = this.checkoutData || this.$store.state.checkout.checkoutData;
      console.log("WelcomeCard - checkoutDataComputed:", data);
      return data;
    },
    currentCurrency() {
      return window.localStorage.getItem("CURR") || "SAR";
    },
    isAuthenticated() {
      return window.localStorage.getItem("status") == "authenticated";
    },
    formattedMobileNum() {
      return this.$refs["tel-input"].formattedNumber;
    },
  },
  methods: {
    nonFixedPayload(payload, loyalityObj, walletObj) {
      payload.is_free = walletObj.wallet || loyalityObj.loyality ? 1 : 0;
      payload.loyality = loyalityObj.loyality ? loyalityObj.loyality : 0;
      payload.wallet = walletObj.wallet ? walletObj.wallet : 0;
      console.log(payload);
      return payload;
    },
    allPayload() {
      let payload = {
        ...this.form,
      };
      payload.lastName = this.singleTraveller[0].last_name ?? " ";
      payload.email = this.singleTraveller[0].email ?? " ";
      payload.firstName = this.singleTraveller[0].first_name ?? " ";
      payload.redeemPoints = this.redeemChecked ? this.form.redeemPoints : 0;
      payload.uuid = this.roomSelected.uuid;
      payload.amount = this.roomSelected.net;
      payload.rateKey =
        this.checkoutDataComputed.hotel[0].provider == "DidaTravel"
          ? this.checkoutDataComputed.hotel[0].bookingCode
          : this.roomSelected.rateKey;
      payload.provider = this.checkoutDataComputed.hotel[0].provider;
      payload.hotelCode = JSON.stringify(
        this.checkoutDataComputed.hotel[0].hotelCode,
      );
      payload.totalFare = this.checkoutDataComputed.hotel[0].totalFare;
      payload.currency = this.checkoutDataComputed.hotel[0].currency;
      payload.paymentCurrency = this.checkoutDataComputed.hotel[0].currency;
      payload.is_free = this.checkoutDataComputed.hotel[0].is_free ? 1 : 0;
      payload.loyality = 0;
      payload.total = this.roomSelected.net;
      payload.payment_type = this.isTapPayment ? "tap_payment" : null;
      console.log("this.travellers", this.travellers);
      if (this.isOneTraveller()) {
        payload.rooms = [
          {
            CustomerNames: [
              {
                title: "Mr",
                FirstName: this.singleTraveller[0].first_name,
                LastName: this.singleTraveller[0].last_name,
                Type: "Adult",
                age: "30",
              },
            ],
          },
        ];
      } else {
        const mainTraveler = {
          title: "Mr",
          FirstName: this.singleTraveller[0].first_name,
          LastName: this.singleTraveller[0].last_name,
          Type: "Adult",
          age: "30",
        };

        const userTravelers = this.travellers.map((el, index) => {
          let roomTraveler = this.userTravellers.find((item) => item.id == el);
          return {
            Title: "Mr",
            FirstName: roomTraveler.first_name,
            LastName: roomTraveler.last_name,
            Type: roomTraveler.type,
            age: roomTraveler.age ?? "10",
          };
        });

        payload.rooms = [
          {
            CustomerNames: [mainTraveler, ...userTravelers],
          },
        ];
        console.log("pppppp", payload);
      }
      return this.nonFixedPayload(
        payload,
        { loyality: this.redeemChecked ? this.roomSelected.net : 0 },
        { wallet: this.isWallet ? this.roomSelected.net : 0 },
      );
      // return payload;
    },
    sendBookingRequest(payload) {
      this.$axios
        .post("/api/mapping/hotels/booking", {
          ...payload,
          status: "CAPTURED",
        })
        .then((res) => {
          this.$router.push({
            path: "/CheckOutPayment/" + res.data.bookingData.id,
          });
        })
        .catch((err) => {
          this.$toast.show("Something went wrong");
        });
    },
    onWalletApply() {
      this.sendingBooking = true;
      console.log("this.allPayload() : ", this.allPayload());
      if (this.isWallet & (this.walletBalance >= this.roomSelected.net)) {
        this.sendBookingRequest(this.allPayload()).finally(() => {
          this.sendingBooking = false;
        });
      } else if (this.isWallet & (this.walletBalance < this.roomSelected.net)) {
        if (this.redeemChecked) {
          this.loyalityWalletPay();
        } else {
          let endPrice = this.roomSelected.net - this.walletBalance;
          this.useTapPayment(endPrice, this.allPayload()).finally(() => {
            this.sendingBooking = false;
          });
        }
      }
    },
    onLoyalityApply() {
      this.sendingBooking = true;
      if (
        this.redeemChecked &
        (this.form.redeemPoints >= this.roomSelected.net)
      ) {
        // this.confirmPayDialog = true;
        this.sendBookingRequest(this.allPayload()).finally(() => {
          this.sendingBooking = false;
        });
      } else if (
        this.redeemChecked &
        (this.form.redeemPoints < this.roomSelected.net)
      ) {
        if (this.isWallet) {
          this.loyalityWalletPay().finally(() => {
            this.sendingBooking = false;
          });
        } else {
          let endPrice = this.roomSelected.net - this.form.redeemPoints;
          this.useTapPayment(endPrice, this.allPayload()).finally(() => {
            this.sendingBooking = false;
          });
        }
      }
    },
    useTapPayment(endPrice, payload) {
      console.log("end price : ", endPrice, "payload : ", payload);
      // let price = Math.round(Number(+payload.total)).toFixed(2);
      if (this.profileData.email === this.form.email) {
        this.dialogBook = true;
        this.goToPay(endPrice, payload);
        return;
      } else {
        this.checkMail()
          .then((data) => {
            this.dialogBook = true;
            this.goToPay(endPrice, payload);
          })
          .catch((err) => {
            this.$toast.show(err.message);
          });
      }
    },
    loyalityWalletPay() {
      if (
        this.form.redeemPoints + this.walletBalance >=
        this.roomSelected.net
      ) {
        this.sendBookingRequest(this.allPayload());
      } else {
        let endPrice =
          this.roomSelected.net - (this.form.redeemPoints + this.walletBalance);
        this.useTapPayment(endPrice, this.allPayload());
      }
    },
    onCouponPay() {
      if (this.isCoupon && this.isCoupon >= this.roomSelected.net) {
        this.sendBookingRequest(this.allPayload());
      } else if (this.isCoupon && this.isCoupon < this.roomSelected.net) {
        console.log(this.roomSelected.net - this.isCoupon);

        let endPrice = this.roomSelected.net - this.isCoupon;
        this.useTapPayment(endPrice, this.allPayload());
      }
    },

    handleManyRoomSelection() {
      if (this.checkoutDataComputed.bookingData?.paxes?.length > 1) {
        for (const pax of this.checkoutDataComputed.bookingData?.paxes) {
          console.log("handleManyRoomSelection");

          this.singleTraveller.push({
            first_name: "",
            last_name: "",
            email: "",
          });
        }
      } else if (this.checkoutDataComputed.bookingData?.paxes?.length == 1) {
        this.singleTraveller.push({
          first_name: "",
          last_name: "",
          email: "",
        });
      }
    },
    fetchSingleUser(id, index) {
      this.getSingleTraveller(id).then((data) => {
        // Create a copy of the singleTraveller array
        const updatedSingleTraveller = [...this.singleTraveller];
        // Update the element at the specified index with the fetched data
        updatedSingleTraveller[index] = { ...data.data.data };
        // Assign the updated array back to singleTraveller
        this.singleTraveller = updatedSingleTraveller;
      });
    },
    ...mapActions("userAccount", ["getSingleTraveller"]),
    ...mapActions("hotels", ["convertCurrency"]),
    ...mapActions("wallet", ["getWalletBalance"]),
    ...mapMutations({
      setRoom: "payment/SET_ROOM_SELECTED",
    }),
    isOneTraveller() {
      return this.checkoutDataComputed.bookingData.paxes[0].Adults == 1 &&
        this.checkoutDataComputed.bookingData.paxes[0].Children == "0"
        ? true
        : false;
    },

    payTabby() {
      // if (this.currencyType != "SAR") {
      //   this.convertCurrency({
      //     from: localStorage.getItem("CURR") || "SAR",
      //     to: "SAR",
      //   })
      //     .then(() => this.getAmountPrice(this.currencyPrice))
      //     .then(() => this.payWithTabby())
      //     .catch((e) => this.$toast.error(e));
      // } else {
      this.getAmountPrice(1); // send 1 inorder to not to call convertPrices api ageain if its already SAR
      this.payWithTabby();
      // }
    },
    getAmountPrice(priceCurr) {
      this.priceAmount = priceCurr * this.roomSelected.net;
    },
    payWithTabby() {
      this.allPayload();
      // let payload = {
      //   ...this.form,
      // };
      // payload.lastName = this.form.lastName ?? " ";
      // payload.redeemPoints = this.redeemChecked ? this.form.redeemPoints : 0;
      // payload.uuid = this.roomSelected.uuid;
      // payload.rateKey =
      //   this.checkoutData.hotel[0].provider == "DidaTravel"
      //     ? this.checkoutData.hotel[0].bookingCode
      //     : this.roomSelected.rateKey;
      // payload.provider = this.checkoutData.hotel[0].provider;
      // payload.hotelCode = JSON.stringify(this.checkoutData.hotel[0].hotelCode);
      // payload.totalFare = this.checkoutData.hotel[0].totalFare;
      // payload.currency = this.checkoutData.hotel[0].currency;
      // payload.is_free = this.checkoutData.hotel[0].is_free ? 1 : 0;
      // payload.loyality = 0;
      // payload.total = this.roomSelected.net;
      // payload.payment_type = this.isTapPayment ? "tap_payment" : null;
      // console.log("this.travellers", this.travellers);
      // if (this.isOneTraveller()) {
      //   payload.rooms = [
      //     {
      //       CustomerNames: [
      //         {
      //           title: "Mr",
      //           FirstName: this.form.firstName,
      //           LastName: this.form.lastName,
      //           Type: "Adult",
      //           age: "30",
      //         },
      //       ],
      //     },
      //   ];
      // } else {
      //   payload.rooms = this.travellers.map((el, index) => {
      //     let roomTravller = this.userTravellers.find((item) => item.id == el);

      //     return {
      //       CustomerNames: [
      //         {
      //           Title: "Mr",
      //           FirstName: roomTravller.first_name,
      //           LastName: roomTravller.last_name,
      //           Type: roomTravller.type,
      //           age: roomTravller.age ?? "10",
      //         },
      //       ],
      //     };
      //   });
      // }

      let queryPayload = JSON.stringify(this.allPayload());
      let data = {
        payment: {
          amount: parseFloat(this.priceAmount).toFixed(2),
          currency: localStorage.getItem("CURR"),
          order: {
            tax_amount: "0.00",
            shipping_amount: "0.00",
            discount_amount: "0.00",
            updated_at: "2019-08-24T14:15:22Z",
            reference_id: "string",
            items: [
              {
                title: "string",
                description: "string",
                quantity: 1,
                unit_price: "0.00",
                discount_amount: "0.00",
                reference_id: "string",
                image_url: "http://example.com",
                product_url: "http://example.com",
                gender: "Male",
                category: "string",
                color: "string",
                product_material: "string",
                size_type: "string",
                size: "string",
                brand: "string",
              },
            ],
          },
          buyer: {
            phone: this.form.mobile_num || "96599999999",
            email: this.singleTraveller[0].email || "cutomer@gmao.com",
            name: this.singleTraveller[0].first_name,
            dob: "2006-01-02",
          },
          shipping_address: {
            city: "string",
            address: "string",
            zip: "string",
          },
          buyer_history: {
            registered_since: "2019-08-24T14:15:22Z",
            loyalty_level: 0,
            wishlist_count: 0,
            is_social_networks_connected: true,
            is_phone_number_verified: true,
            is_email_verified: true,
          },
        },
        lang: "ar",
        merchant_code: "string",
        merchant_urls: {
          success:
            "https://happytbooking.com/PaymentSuccessPage?payload=" +
            queryPayload,
          cancel: "https://happytbooking.com",
          failure: "https://happytbooking.com",
        },
      };

      if (this.profileData.email === this.form.email) {
        this.payByTabby(data);
        return;
      } else {
        this.checkMail()
          .then(() => {
            this.payByTabby(data);
          })
          .catch((err) => {
            this.$toast.show(err.message);
          });
      }
    },

    payByTabby(data) {
      console.log("response WIIL SENT TO TABBY", data);
      this.$axios
        .post("api/payment_tabby", data)
        .then((result) => {
          console.log("result", result);
          return JSON.parse(result.data.response);
        })
        .then((response) => {
          if (!response.configuration.products.installments.is_available) {
            this.$toast.show(
              response.configuration.products.installments.rejection_reason,
            );
          } else {
            window.location.href =
              response.configuration.available_products.installments[0].web_url;
          }
          return response;
        })
        .catch((error) => this.$toast.show(error));
    },

    ...mapActions("checkout", ["fetchUserTravellers", "addUserTraveller"]),
    ...mapMutations({
      setRoom: "payment/SET_ROOM_SELECTED",
      SET_USER_TRAVELLERS: "checkout/SET_USER_TRAVELLERS",
      SET_USER_TRAVELLERS_asly: "checkout/SET_USER_TRAVELLERS_asly",
      SET_CHECKOUT_DATA: "checkout/SET_CHECKOUT_DATA",
    }),
    addTraveller() {
      this.addUserTraveller(this.travellerForm)
        .then(() => {
          this.$toast.show("Your Traveller added Succesfully to your list");
          this.fetchUserTravellers();
        })
        .catch((e) => {
          this.$toast.error(e);
        })
        .finally(() => {});
    },
    travellersArrayValidations(e) {
      console.log("user Id slected", e);
      console.log("userTravellersasly", this.userTravellers);
      // let myTravellers = JSON.parse(JSON.stringify(this.userTravellers));
      let result = this.userTravellers.map((element) => {
        return this.travellers.includes(element.id)
          ? { ...element, ishide: true }
          : { ...element, ishide: false };
      });
      this.SET_USER_TRAVELLERS(result);
    },
    comeFormPhone(objectNumber) {
      if (typeof objectNumber == "string") {
        // match only numbers
        let number = objectNumber.replace(/[^0-9]/g, "");
        this.form.mobile_num = number;
      }
    },
    async checkMail() {
      let payload = new FormData();
      payload.append("email", this.form.email);
      let { data } = await this.$axios.post("api/user/check-mail", payload);
      return new Promise((resolve, reject) => {
        if (data.is_valid) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    },
    async validateForRahhalWallet(formRef) {
      this.$refs["formRef"][0].validate().then((valid) => {
        if (valid) {
          if (!this.form.mobile_num) {
            this.checkPhoneNumberDialog = true;
          } else {
            if (
              this.roomSelected.net <=
              (this.form.redeemPoints | this.walletBalance)
            ) {
              this.confirmPayDialog = true;
            } else if (this.redeemChecked) {
              this.onLoyalityApply();
            } else if (this.isWallet) {
              this.onWalletApply();
            }
          }
          //
        } else {
          this.$toast.error("Please fill the required data first");
          this.$toast.error(
            "Your First name , Last name , Email and Phone is required",
          );
          document.getElementById("tel-input").innerText =
            "please input this text";
        }
      });
    },
    async validate(formRef) {
      console.log("this should run");
      this.$refs["formRef"][0]?.validate()?.then((valid) => {
        if (valid) {
          if (!this.form.mobile_num) {
            this.checkPhoneNumberDialog = true;
          } else {
            this.payDialog = true;
          }
        }
      });
    },
    submitForm(type, balance) {
      // this.$refs["formRef"].validate().then((valid) => {
      // if (valid) {
      // let payload = this.allPayload();
      let payload = {
        ...this.form,
      };
      payload.lastName = this.singleTraveller[0].last_name ?? " ";
      payload.firstName = this.singleTraveller[0].first_name ?? " ";
      payload.email = this.singleTraveller[0].email ?? " ";
      payload.redeemPoints = this.redeemChecked ? this.form.redeemPoints : 0;
      payload.uuid = this.roomSelected.uuid;
      payload.rateKey =
        this.checkoutDataComputed.hotel[0].provider == "DidaTravel"
          ? this.checkoutDataComputed.hotel[0].bookingCode
          : this.roomSelected.rateKey;
      payload.provider = this.checkoutDataComputed.hotel[0].provider;
      payload.hotelCode = JSON.stringify(
        this.checkoutDataComputed.hotel[0].hotelCode,
      );
      payload.totalFare = this.checkoutDataComputed.hotel[0].totalFare;
      payload.currency = this.checkoutDataComputed.hotel[0].currency;
      payload.is_free = this.checkoutDataComputed.hotel[0].is_free ? 1 : 0;
      payload.loyality = type == "loylity" ? balance : 0;
      payload.total = balance ? balance : this.roomSelected.net;
      payload.payment_type = this.isTapPayment ? "tap_payment" : null;
      if (this.isOneTraveller) {
        payload.rooms = [
          {
            CustomerNames: [
              {
                title: "Mr",
                FirstName: this.form.firstName,
                LastName: this.form.lastName,
                Type: "Adult",
                age: "30",
              },
            ],
          },
        ];
      } else {
        payload.rooms = this.travellers.map((el, index) => {
          let roomTravller = this.userTravellers.find((item) => item.id == el);
          let countOfAdults =
            this.checkoutDataComputed.bookingData.paxes[index].Adults;
          let countOfChildren =
            this.checkoutDataComputed.bookingData.paxes[index].Children;
          console.log("countOfAdults", countOfAdults);
          return {
            CustomerNames: Array.from(
              { length: +countOfAdults + +countOfChildren },
              (v, i) => ({
                Title: "Mr",
                FirstName: roomTravller.first_name + i,
                LastName: roomTravller.last_name + i,
                Type: roomTravller.type,
                age: roomTravller.age ?? "10",
              }),
            ),
          };
        });
      }

      console.log("payloadpayloadpayload", payload);
      let price = Math.round(Number(+payload.total)).toFixed(2);
      if (this.profileData.email === this.form.email) {
        this.dialogBook = true;
        this.goToPay(price, payload);
        return;
      } else {
        this.checkMail()
          .then((data) => {
            this.dialogBook = true;
            this.goToPay(price, payload);
          })
          .catch((err) => {
            this.$toast.show(err.message);
          });
      }
      // }
      // });
    },
    async goToPay(price, payload) {
      console.log("payload price price", payload, price);
      await this.initPaymentConfiguration(Number(price), payload);
      await goSell.openLightBox();
    },
    getPublicKey() {
      this.$axios
        .get(`api/payment/tapPay/getSetting`)
        .then((res) => {
          // Handle both array and object responses
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];

          if (Array.isArray(data)) {
            data.forEach((element) => {
              if (element.payment_type == "tap_payment") {
                this.tabPublicKey = element.web_token;
              } else {
                this.tappyPublicKey = element.web_token;
              }
            });
          } else if (data && typeof data === "object") {
            // Handle single object response
            if (data.payment_type == "tap_payment") {
              this.tabPublicKey = data.web_token;
            } else {
              this.tappyPublicKey = data.web_token;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching payment settings:", error);
        });
    },
    initPaymentConfiguration(price, payload) {
      console.log("this.currentCurrency", this.currentCurrency);
      this.$nextTick(() => {
        goSell.config({
          containerID: "payment-form",
          gateway: {
            publicKey: this.tabPublicKey,
            language: "en",
            contactInfo: true,
            supportedCurrencies: "all",
            supportedPaymentMethods: "all",
            saveCardOption: false,
            customerCards: true,
            notifications: "standard",
            callback: (response) => {
              console.log("response", response);
            },
            onClose: (er) => {
              this.dialogBook = false;
              console.log("er", er);
            },
            backgroundImg: {
              url: "",
              opacity: "0.9",
            },
            labels: {
              cardNumber: "Card Number",
              expirationDate: "MM/YY",
              cvv: "CVV",
              cardHolder: "Name on Card",
              actionButton: "Pay",
            },
            style: {
              base: {
                color: "#535353",
                lineHeight: "18px",
                fontFamily: "sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "rgba(0, 0, 0, 0.26)",
                  fontSize: "15px",
                },
              },

              invalid: {
                color: "red",
                iconColor: "#fa755a",
              },
            },
          },
          customer: {
            first_name: "Abdulrahman2",
            middle_name: "Mahmoud2",
            last_name: "G2h",
            email: "demo2@email.com",
            phone: {
              country_code: "965",
              number: "99999999",
            },
          },
          order: {
            amount: +price,
            currency: this.currentCurrency,
            shipping: null,
            taxes: null,
          },
          transaction: {
            mode: "charge",
            charge: {
              saveCard: false,
              threeDSecure: true,
              description: "Test Description",
              statement_descriptor: "Sample",
              reference: {
                transaction: "txn_00011",
                order: "ord_000112",
              },

              metadata: {},
              receipt: {
                email: false,
                sms: true,
              },
              redirect:
                window.location.origin +
                "/PaymentSuccessPage?payload=" +
                JSON.stringify(payload),
              post: null,
            },
          },
        });
      });
    },

    async applyCoupon() {
      try {
        const couponId = this.form.coupon_id;
        if (!couponId) {
          this.couponMessage = "Please enter coupon code";
          return;
        }
        const response = await this.$axios.get(`api/user/coupons/${couponId}`);
        if (response.data.data) {
          this.isCoupon = response.data.data.value;
          // this.roomSelected.net  = this.roomSelected.net - response.data.data.id
          console.log("this.roomSelected.net", this.roomSelected.net);
          // if (this.oldPrice >= response.data.data.min) {
          this.couponDiscount = response.data.data.value;
          const discount = this.couponDiscount;
          this.setRoom({
            ...this.roomSelected,
            net: this.roomSelected.net - response.data.data.value,
          });
          this.$toast.success("Coupon applied successfully");
          this.couponMessage = `Coupon applied successfully. Discount: ${discount}.`;
          // }
          // else {
          //   this.couponMessage = "Minimum price is " + response.data.data.min;
          //   this.$toast.error("Minimum price is " + response.data.data.min);
          // }
        } else {
          this.couponMessage = response.data.massage;
          this.$toast.error(response.data.massage);
        }
        this.couponPay = true;
        // } else {
        //   this.couponMessage = response.data.message;
        // }
      } catch (error) {
        this.couponPay = false;
        this.couponMessage = "Coupon not found";
      }
    },
    totalPriceAfterDiscount(discount) {
      let total = this.oldPrice; //room price
      let minDiscount = discount > 200 ? (discount = 200) : discount;
      // const newPrice = total;
      return total > 0 ? Math.round(newPrice) : 0;
    },
    clearCoupon() {
      this.couponDiscount = 0;
      this.couponMessage = "";
      this.form.coupon_id = "";
      this.setRoom({
        ...this.roomSelected,
        net: this.oldPrice,
      });
    },
    async checkMailValidity() {
      if (this.singleTraveller[0].email) {
        this.$axios
          .get(`api/chickAccount/${this.singleTraveller[0].email}?lang=ar`)
          .then((res) => {
            console.log(res.data.status);
            if (res.data.status) {
              this.validate();
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch((e) => {
            console.log("eeee", e);

            return false;
          });
      } else {
        this.validate();
      }
    },
  },
  watch: {
    checkoutDataComputed: {
      handler(val) {
        if (val?.bookingData?.paxes?.length > 1) {
          for (const pax in val.bookingData?.paxes?.length) {
            this.singleTraveller.push({
              first_name: "",
              last_name: "",
              email: "",
            });
          }
        }
      },
    },
    profileData: {
      handler(val) {
        console.log("vaaaaaaaal", val);
        if (Object.keys(val).length) {
          let info = {
            firstName: val.firstname,
            lastName: val.lastname,
            mobile_num: val.mobile_num,
            email: val.email,
            country: val.country,
            gender: val.gender,
          };
          this.form = { ...this.form, ...info };
        }
      },
      immediate: true,
    },
    async redeemChecked(checked) {
      console.log("checked", checked);
      try {
        const response = await this.$axios.get("api/user/loyalty-points");
        if (checked) {
          if (response.data.message === "success") {
            const redeemPoints = response.data.data.redeem;
            this.form.redeemPoints = redeemPoints;
            console.log("redeemPoints", redeemPoints);
            if (redeemPoints > 0) {
              this.setRoom({
                ...this.roomSelected,
                net: this.roomSelected.net,
              });
              this.form.redeemPoints =
                this.form.redeemPoints -
                (this.oldPrice - this.roomSelected.net);
              console.log("this.form.redeemPoints", this.form.redeemPoints);
              this.redeemMessage = `<strong>Redemption Successful!</strong> You can redeem up to <strong>${this.form.redeemPoints}</strong> points`;
              this.$toast.success("Redemption Successful!");
            } else {
              this.form.redeemPoints = 0;
              this.redeemMessage =
                "<strong>You don't have enough points to redeem!</strong>";
              this.$toast.show("No points to redeem");
            }
          } else {
            this.form.redeemPoints = 0;
            // Provide feedback to the user about the error
            console.error(`Failed to redeem points: ${response.data.message}`);
          }
        } else {
          const redeemPoints = response.data.data.redeem;
          this.form.redeemPoints = redeemPoints;
          this.setRoom({
            ...this.roomSelected,
            net: this.oldPrice,
          });
        }
      } catch (error) {
        this.form.redeemPoints = 0;
        console.error(`Failed to redeem points: ${error.message}`);
        this.$toast.error("Redemption Failed!");
      }
    },
  },
  mounted() {},
  created() {
    this.getPublicKey();
    this.$axios.get("api/user/loyalty-points").then((res) => {
      console.log("res looooooooooo", res);
      this.form.redeemPoints = res.data.data.redeem;
    });
    this.getWalletBalance();
    this.oldPrice = this.roomSelected.net;
    console.log("Created - this.oldPrice", this.oldPrice);
    this.fetchUserTravellers();

    // TODO : will come From API on production stage
    // this.$axios("api/payment/tapPay/getSetting").then(res=>{
    //   console.log("res",res)
    //   this.tapPaySetting = res.data.token
    //   console.log("obj", obj)
    // })

    new TabbyPromo({
      selector: "#TabbyPromo", // required, content of tabby Promo Snippet will be placed in element with that selector.
      currency: this.currentCurrency, // required, currency of your store.
      price: this.roomSelected.net, // required, price of your product.
      installmentsCount: 4, // Optional, for non-standard plans.
      lang: "en", // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
      source: "product", // Optional, snippet placement; `product` for product page and `cart` for cart page.
      publicKey: this.tappyPublicKey, // required, store Public Key which identifies your account when communicating with tabby.
      merchantCode: "333", // required
    });
  },
};
</script>
<style>
.custom-BTN {
  background-color: #1ccf3d !important;
  color: white !important;
  padding: 25px !important;
}
.traveller-item > .el-form-item__label {
  justify-content: flex-start;
}

.travellerSelect {
  cursor: pointer;
}

.coupon-card > .el-card__header,
.coupon-card > .el-card__body {
  padding: 0;
  background-color: white;
}

.coupon-card {
  margin-top: 20px !important;
}

.welcome-card > .el-card__header,
.welcome-card > .el-card__body {
  padding: 0;
  background-color: white;
  border-bottom: 1px rgb(255, 255, 255) solid;
}

.welcome-card {
  border-radius: 1.5rem !important;
}

.welcome-card > .el-card__header {
  padding-top: 2% !important;
  /* padding-bottom: 1%; */
}

.welcome-card .el-input__wrapper {
  background-color: #f9f9f9;
}

.coupon-card .el-input__wrapper {
  background-color: #f9f9f9;
}

.el-select .el-input__wrapper {
  background-color: #fff;
}

.input .vti__dropdown {
  padding: 6px;
}

.vue-tel-input:focus-within {
  outline: none;
  /* remove the outline */
}

.vti__dropdown-list.below {
  z-index: 9999 !important;
}

.custom-tel-input:hover {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.vue-tel-input {
  border: 0;
}

.vue-tel-input input {
  background-color: inherit;
}

.custom-tel-input:focus-within {
  box-shadow: 0 0 0 1px #5808d8 inset;
}
.custom-col {
  display: flex !important;
}
</style>
