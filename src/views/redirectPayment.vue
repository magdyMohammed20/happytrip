<template>
  <el-row class="lg:md:px-20 py-5 justify-between">
    <re-reservation-card></re-reservation-card>
    <re-help-card></re-help-card>

    <re-room-details-card></re-room-details-card>

    <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24" class="px-1">
      <div class="bg-#00D8FD flex custom-border my-5 justify-around">
        <div class="self-center">
          <div class="flex">
            <div class="self-center mr-2">
              <span class="i-mdi-sticker-emoji text-5xl text-white"></span>
            </div>
            <div>
              <p class="text-white font-bold pb-0 mb-0">
                Let the world know how you flet
              </p>
              <p class="text-white text-sm font-light pt-0 mt-0">
                Click to rate your experience
              </p>
            </div>
          </div>
        </div>

        <div class="self-center w-1/4 m-2 sm:hidden lg:md:block">
          <img src="../../src/assets/images/lineDashed.png" class="w-full" />
        </div>
        <div class="self-center m-2">
          <span class="i-mdi-star text-3xl text-white"></span>
          <span class="i-mdi-star text-3xl text-white"></span>
          <span class="i-mdi-star text-3xl text-white"></span>
          <span class="i-mdi-star text-3xl text-white"></span>
          <span class="i-mdi-star text-3xl text-white"></span>
        </div>
      </div>
    </el-col>

    <re-price-information-card></re-price-information-card>
  </el-row>
</template>

// <script>
// export default {
//   created() {
//     goSell.showResult({
//       callback: ({ callback }) => {
//         let details = callback.metadata;
//         let payload = {
//           rateKey: details.rateKey,
//           email: details.email,
//           firstName: details.firstName,
//           lastName: details.lastName,
//           mobile_num: details.mobile_num,
//           appType: details.appType,
//           total: details.total,
//           coupon_id: details.coupon_id,
//           loyality: details.redeemPoints,
//           chg_id: callback.id,
//           amount: callback.amount,
//           paymentCurrency: callback.currency,
//           status: callback.status,
//           currency: details.currency,
//         };
//         if (payload.status === "CAPTURED") {
//           this.$axios
//             .post("/api/hotels/booking", payload)
//             .then((res) => {
//               console.log(res);
//               this.$router.push({
//                 path: "/CheckOutPayment/" + res.data.bookingData.id,
//               });
//             })
//             .catch((err) => {
//               console.log(err);
//               this.$router.push("/");
//               this.$toast.error(err.response.data.message);
//             });
//           this.$toast.show("Payment Successfull");
//         } else {
//           this.$router.push({
//             path: "/",
//           });
//           this.$toast.error("Payment Failed");
//         }
//       },
//     });
//   },
// };
// </script>
