<template>
  <div>
    <h1>Payment Successfulll</h1>
    <p>Your payment has been successfully processed.</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PaymentSuccess",
  data() {
    return {
      paymentInit: false,
    };
  },
  computed: {
    // ...mapState["payment"],
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
                console.log("iam token" , res.data.token);
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
div {
  text-align: center;
  margin: 5%;
}
</style>
