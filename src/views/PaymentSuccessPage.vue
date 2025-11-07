<template class="payment-success-container">
  <div class="success-card">
    <!-- Success Icon -->
    <div class="icon">✓</div>

    <!-- Success Message -->
    <h1>Payment Successful!</h1>
    <p>Your payment has been successfully processed.</p>

    <!-- Loading Indicator -->
    <div v-if="paymentInit" class="loading">
      <div class="spinner"></div>
      <p>Processing your booking...</p>
    </div>

    <!-- Additional Info -->
    <div v-else class="info-message">
      <p>You will be redirected to your booking details shortly.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { goSell } from "gosell-sdk-vue";

export default {
  name: "PaymentSuccess",
  data() {
    return {
      paymentInit: false,
    };
  },
  computed: {
    ...mapState(["payment"]),
  },
  async created() {
    await goSell.showResult({
      callback: ({ callback }) => {
        console.log(callback);
        let details = JSON.parse(this.$route.query.payload);
        let payload = {
          ...details,
          amount: callback.amount,
          paymentCurrency: callback.currency,
          status: callback.status,
          chg_id: callback.id,
          customer_id: callback.customer.id,
        };
        // clear query params
        this.$router.push({
          path: "/PaymentSuccessPage",
        });
        if (payload.status === "CAPTURED") {
          console.log(payload.status);
          this.paymentInit = true;
          this.$router.push({
            path: "/PaymentSuccessPage",
            query: {
              payload: JSON.stringify(payload),
            },
          });
        } else {
          this.$router.push({
            path: "/",
          });
          this.$toast.error("Payment Failed");
        }
      },
    });
  },
  watch: {
    "$route.query": {
      handler(val) {
        if (val.payload && this.paymentInit) {
          console.log(val);
          console.log(this.paymentInit);
          let payload = JSON.parse(val.payload);
          this.$axios
            .post("/api/mapping/hotels/booking", payload)
            .then((res) => {
              if (res.data.token) {
                localStorage.setItem("token", res.data.token);
              }
              this.$router.push({
                path: "/CheckOutPayment/" + res.data.bookingData.id,
              });
            })
            .catch((err) => {
              console.log(err);
              this.$router.push("/");
              this.$toast.error("Something wrong from server");
            });
          this.$toast.show("Payment Successfull");
        } else if (val.payment_id) {
          // TABBY PAYMENT
          let payload = JSON.parse(val.payload);
          payload.chg_id = val.payment_id;
          payload.payment_type = "tabby";
          payload.paymentCurrency = payload.currency;
          this.$axios
            .post("/api/mapping/hotels/booking", payload)
            .then((res) => {
              console.log(res);
              if (res.data.token) {
                window.localStorage.setItem("guest_token", res.data.token);
                console.log("iam token", res.data.token);
              }
              this.$router.push({
                path: "/CheckOutPayment/" + res.data.bookingData.id,
              });
            })
            .catch((err) => {
              console.log(err);
              this.$router.push("/");
              this.$toast.error("Something wrong from server, try again later");
            });
          this.$toast.show("Payment Successfull");
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // created() {
  //   goSell.showResult({
  //     callback: ({ callback }) => {
  //       this.paymentInit = true;
  //       let details = callback.metadata;
  //       console.log("callback.metadata", callback.metadata);
  //       let payload = {
  //         rateKey: details.rateKey,
  //         email: details.email,
  //         firstName: details.firstName,
  //         lastName: details.lastName,
  //         mobile_num: details.mobile_num,
  //         appType: details.appType,
  //         total: details.total,
  //         coupon_id: details.coupon_id,
  //         loyality: details.redeemPoints,
  //         chg_id: callback.id,
  //         amount: callback.amount,
  //         paymentCurrency: callback.currency,
  //         status: callback.status,
  //         currency: details.currency,
  //         payment_type: "tap_payment",
  //       };
  //       if (payload.status === "CAPTURED") {
  //         this.sendBookingReq(payload);
  //       } else {
  //         this.$router.push({
  //           path: "/",
  //         });
  //         this.$toast.error("Payment Failed");
  //       }
  //     },
  //   });
  //   if(this.paymentInit) return;
  //   fetch(`https://ubahthebuilder.tech/posts/${tabbyId}`)
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((res) => {
  //       this.sendBookingReq();
  //     })
  //     .catch((e) => this.$toast.error(e));
  // },
};
</script>

<style scoped>
.payment-success-container {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 50px 40px;
  max-width: 500px;
  width: 100%;
  margin: auto;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  flex-shrink: 0;
  animation: scaleIn 0.5s ease-out 0.3s both;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;
  word-wrap: break-word;
}

p {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

.loading {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading p {
  color: #667eea;
  font-weight: 500;
  margin: 0;
}

.info-message {
  padding: 15px;
  background: #e8f5e9;
  border-radius: 8px;
  margin-top: 10px;
}

.info-message p {
  color: #2e7d32;
  font-size: 14px;
  margin: 0;
}

@media (max-width: 600px) {
  .payment-success-container {
    padding: 15px;
  }

  .success-card {
    padding: 40px 25px;
    max-width: 100%;
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

@media (max-width: 400px) {
  .success-card {
    padding: 30px 20px;
  }

  h1 {
    font-size: 22px;
  }
}
</style>
