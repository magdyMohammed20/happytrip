<template>
  <div class="container mx-auto mt-10">
    <div class="mb-5">
      <h2 class="mx-auto">
        Total Balance: {{ updateTotalBalance }} <span class="text-base"> {{ CURR }}</span>
      </h2>
      <!-- <el-tabs type="border-card" class="demo-tabs account-tabs"> -->
      <el-tabs v-model="activeTab" class="demo-tabs account-tabs custom-tab-border">
        <el-tab-pane label="Charge" name="charge">
          <div class="p-10">
            <el-form
              ref="walletFormRef"
              :model="walletForm"
              label-width="120px"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item
                label="Currency"
                prop="currency"
                :rules="[
                  { required: true, message: 'Please select currency', trigger: 'blur' },
                ]"
              >
                <div class="flex items-center w-35">
                  <el-select v-model="walletForm.currency" placeholder="Select currency">
                    <el-option label="USD" value="USD"></el-option>
                    <el-option label="SAR" value="SAR"></el-option>
                    <el-option label="AED" value="AED"></el-option>
                    <el-option label="EGP" value="EGP"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <div class="flex items-center mb-3">
                <el-form-item
                  label="Amount"
                  prop="amount"
                  :rules="[
                    { required: true, message: 'Please input amount', trigger: 'blur' },
                    { type: 'number', message: 'Amount must be a number', min: 1 },
                  ]"
                >
                  <el-input
                    v-model.number="walletForm.amount"
                    placeholder="Enter amount"
                  ></el-input>
                </el-form-item>
              </div>
              <!-- submit -->
              <el-form-item>
                <el-button
                  class="button custom-button"
                  @click="submitChargeForm('walletFormRef')"
                  >Charge</el-button
                >
                <el-button type="primary" @click="resetForm('walletFormRef')"
                  >Reset</el-button
                >
              </el-form-item>

              <!-- <div class="text-center">
                <el-button type="primary" @click.prevent="charge">Charge</el-button>
              </div> -->
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="Transaction" name="transaction">
          <div class="p-8">
            <form>
              <div class="flex items-center mb-3 w-2/3 justify-around m-auto">
                <label class="mr-4 text-xl">Search:</label>
                <el-input
                  v-model="search"
                  placeholder="Search by date"
                  class="w-2/3"
                ></el-input>
                <el-button type="primary" @click.prevent="searchTransactions"
                  >Search</el-button
                >
              </div>
            </form>
          </div>
          <div>
            <div class="flex justify-center items-center">
              <span class="text-xl text-slate-500">Don't have any transaction yet</span>
            </div>
          </div>
        </el-tab-pane> -->
        <el-tab-pane label="Transaction" name="transaction">
          <div class="p-10">
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item
                class="items-center !m-0"
                label="Transaction Period:"
                prop="checkin"
              >
                <el-input
                  dense
                  clearable
                  v-model="searchForm.checkin"
                  placeholder="Search by date"
                  class="my-2 w-auto"
                  @click="showCalender = !showCalender"
                />
                <VDatePicker
                  @update:modelValue="showCalender = false"
                  color="pink"
                  v-model.range="dates"
                  :masks="masks"
                  v-if="showCalender"
                  class="absolute top-15 left-0 z-50"
                />
                <p class="inline-flex px-2" v-if="searchForm.checkout != null">to</p>
                <el-form-item prop="checkout">
                  <el-input
                    clearable
                    v-model="searchForm.checkout"
                    v-if="searchForm.checkout != null"
                    placeholder="To Date"
                    class="my-2 w-auto"
                  />
                </el-form-item>
              </el-form-item>
              <el-collapse>
                <el-collapse-item id="adv_filter" title="Advanced Filter" name="1">
                  <el-form-item label="Filter Type" prop="type">
                    <el-radio-group v-model="searchForm.type">
                      <el-radio
                        v-for="type in transactionTypes"
                        :key="type.id"
                        :label="type.value"
                        >{{ type.name_en }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="Filter Source" prop="source">
                    <el-radio-group v-model="searchForm.source">
                      <el-radio
                        v-for="source in transactionSources"
                        :key="source.id"
                        :label="source.value"
                        >{{ source.name_en }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
              <el-form-item class="my-4">
                <el-button
                  class="button custom-button"
                  @click="getTransactions('searchFormRef')"
                  >Search</el-button
                >
                <el-button type="primary" @click="resetForm('searchFormRef')"
                  >Reset</el-button
                >
              </el-form-item>
            </el-form>
            <!-- <div class="text-center">
              <el-button type="primary" @click="searchTransactions">Search</el-button>
            </div> -->

            <div class="mt-8">
              <h2 class="text-xl font-semibold mb-4">Transaction History</h2>

              <div v-if="transactions.length == 0">
                <p class="text-slate-400 text-center">You have no Transactions yet.</p>
              </div>
              <div v-else>
                <el-card
                  :body-style="{ padding: '0px' }"
                  class="transaction-card my-5 p-3"
                  v-for="transaction in transactions"
                  :key="transaction.id"
                >
                  <div
                    class="flex flex-wrap items-center justify-around sm:flex-col lg:md:flex-row"
                  >
                    <div class="flex items-center">
                      <div class="inline bg-gray-100 rounded-md p-1 flex items-center">
                        <span
                          v-if="transaction.type !== 'deposit'"
                          class="i-mdi-arrow-right text-3xl text-orange-500"
                        ></span>
                        <span v-else class="i-mdi-plus text-3xl text-green-600"></span>
                      </div>
                      <span class="mx-2 text-base">{{ transaction.type }}</span>
                    </div>
                    <div class="text-sm text-slate-600 min-w-20">
                      {{ transaction.source }}
                    </div>
                    <div class="text-sm text-slate-700">
                      {{ transaction.available_at }}
                    </div>
                    <el-tag
                      :type="transaction.type !== 'deposit' ? 'error' : 'success'"
                      class="p-4 rounded-lg"
                      effect="light"
                    >
                      <p class="font-bold text-sm">Amount : {{ transaction.amount }}</p>
                    </el-tag>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <el-dialog
    v-model="dialogBook"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="false"
    append-to-body
    class="payment-information-diloag"
  >
    <div id="charge-form"></div>
  </el-dialog>
</template>

<script>
export default {
  name: "UserWallet",
  data() {
    return {
      masks: {
        modelValue: "YYYY-MM-DD",
      },
      dates: {
        start: new Date(),
        end: new Date(),
      },
      dialogBook: false,
      showCalender: false,
      activeTab: "charge",
      walletForm: {
        amount: "",
        currency: "",
        // charge_id: "chg_TS073720221354Ps891011892",
      },
      searchForm: {
        checkin: null,
        checkout: null,
        source: null,
        type: null,
      },
      transactions: [],
      transactionTypes: [],
      transactionSources: [],
      totalBalance: "",
      CURR: "",
    };
  },
  created() {
    this.getTotalBalance();
    this.getTransactionType();
    this.getTransactionSource();
    // ShowResults
    goSell.showResult({
      callback: ({ callback }) => {
        let details = callback.metadata;
        let payload = {
          charge_id: callback.id,
          amount: details.amount,
          status: callback.status,
          currency: details.currency,
        };
        console.log("-------------NOTE: Show Results -----------------: ", payload);
        if (payload.status === "CAPTURED") {
          let walletForm = {
            amount: payload.amount,
            currency: payload.currency,
            ch_id: payload.charge_id,
          };

          // const queryString = Object.keys(walletForm)
          //   .map(
          //     (key) => encodeURIComponent(key) + "=" + encodeURIComponent(walletForm[key])
          //   )
          //   .join("&");
          this.chargeWallet(walletForm);
        }
      },
    });
  },
  mounted() {
    this.getTransactions();
  },
  methods: {
    getTotalBalance() {
      this.CURR = localStorage.getItem("CURR")
      this.$axios
        .get("/api/user/wallet-balance" + '/' +  this.CURR)
        .then((response) => {
          this.totalBalance = Math.round((+response.data.balance));

          // get currency from local storage
          console.log(`Total balance: ${this.totalBalance}`);
        })
        .catch((error) => {
          this.$toast.error("Error fetching total balance");
          console.log(error);
        });
    },
    submitChargeForm() {
      this.$refs.walletFormRef.validate((valid) => {
        if (valid) {
          // integrate with Tap Payment Gateway for charge and get charge_id
          let payload = { ...this.walletForm };
          this.dialogBook = true;
          this.goToPay(payload);
          console.log("NOTE1: After gotoPay");
        } else {
          console.log("Charge failed");
          return false;
        }
      });
    },
    async goToPay(payload) {
      await this.initPaymentConfiguration(payload);
      await goSell.openLightBox();
    },
    initPaymentConfiguration(payload) {
      this.$nextTick(() => {
        goSell.config({
          containerID: "charge-form",
          gateway: {
            publicKey: "pk_test_mtn8ZafsoGEykTxSUl7ChYAj",
            language: this.$i18n?.locale ?? "en",
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
            first_name: "Abdulrahman",
            middle_name: "Mahmoud",
            last_name: "Ghazal",
            email: "demo@email.com",
            phone: {
              country_code: "965",
              number: "99999999",
            },
          },
          order: {
            amount: payload.amount,
            currency: payload.currency,
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
                transaction: "txn_0001",
                order: "ord_0001",
              },
              metadata: {
                ...payload,
              },
              receipt: {
                email: false,
                sms: true,
              },
              // * redirect to the same page
              // redirect: window.location.href,
              redirect: null,
              post: null,
            },
          },
        });
      });
    },

    chargeWallet(queryString) {
      console.log("OPEN: Charge wallet");
      const response = this.$axios
        .post("api/user/wallet-deposit", null, {
          params: queryString,
        })
        .then((response) => {
          if (response.data.message == "success") {
            this.$toast.success("Charge success");
            console.log("Charge success");
            this.totalBalance = response.data.balance;
          }
        })
        .catch((error) => {
          this.$toast.error("Charge failed");
          console.log(error);
        });
      this.resetForm("walletFormRef");
    },
    // Transaction Section
    getTransactions() {
      // handle search logic here
      this.$axios
        .get("/api/user/wallet-transactions", {
          params: {
            date_from: this.searchForm.checkin,
            date_to: this.searchForm.checkout,
            source: this.searchForm.source,
            type: this.searchForm.type,
          },
        })
        .then((response) => {
          this.transactions = response.data.data;
          console.log("Transactions: ", this.transactions);
          console.log("Search form: ", this.searchForm);
        })
        .catch((error) => {
          this.$toast.error("Error fetching transactions");
          console.log(error);
        });
    },
    resetForm(formName) {
      if (!this.$refs[formName]) return;
      this.$refs[formName].resetFields();
      if (formName == "searchFormRef") {
        this.getTransactions();
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
    separateDates() {
      // checkin date formate

      const day = this.dates.start.getDate().toString().padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const month = (this.dates.start.getMonth() + 1).toString().padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const year = this.dates.start.getFullYear(); // get the year (4 digits)

      const formattedDate = `${year}-${month}-${day}`; // format the date as a string
      // checkout date formate
      const checkoutDay = this.dates.end.getDate().toString().padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const checkoutMonth = (this.dates.end.getMonth() + 1).toString().padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const checkoutYear = this.dates.end.getFullYear(); // get the year (4 digits)

      const checkoutFormattedDate = `${checkoutYear}-${checkoutMonth}-${checkoutDay}`; // format the date as a string
      this.searchForm.checkin = formattedDate;
      this.searchForm.checkout = checkoutFormattedDate;
      console.log(formattedDate);
    },
    getTransactionType() {
      this.$axios
        .get("/api/user/transaction-types")
        .then((response) => {
          this.transactionTypes = response.data.types;
          console.log("Transaction types: ", this.transactionTypes);
        })
        .catch((error) => {
          this.$toast.error("Error fetching transaction types");
          console.log(error);
        });
    },
    getTransactionSource() {
      this.$axios
        .get("/api/user/transaction-sources")
        .then((response) => {
          this.transactionSources = response.data.sources;
          console.log("Transaction sources: ", this.transactionSources);
        })
        .catch((error) => {
          this.$toast.error("Error fetching transaction sources");
          console.log(error);
        });
    },
    submitSearch() {
      this.$refs.searchFormRef.validate((valid) => {
        if (valid) {
          console.log("Search form is valid");
          this.getTransactions();
          console.log("Transaction Form", this.transactions);
        } else {
          console.log("Search form is not valid");
          return false;
        }
      });
    },
  },
  computed: {
    updateTotalBalance() {
      return this.totalBalance;
    },
  },
  watch: {
    dates: {
      handler() {
        this.separateDates();
      },
      deep: true,
    },
  },
};
</script>

<style>
.custom-tab-border .el-tabs__nav-scroll {
  border-bottom: 1px solid #b9babe;
}
#adv_filter {
  width: fit-content;
  margin: -1rem 2rem 0;
}
#adv_filter .el-collapse-item__header {
  color: #5808d8;
}
#adv_filter i {
  display: none;
}
</style>
, d()
