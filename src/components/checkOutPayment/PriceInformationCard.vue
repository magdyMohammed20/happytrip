<template>

  {{ getPriceInformation }}
  <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24" class="px-1">
    <!-- <el-card :body-style="{ padding: '25px' }"> -->
    <el-card class="p-1 lg:p-3">
      <div class="border-b-1 border-slate-200 font-bold sm:text-center lg:md:text-left">
        <p>Price Information</p>
        <!-- </div>
      <div>
        <div
          class="border-b-1 py-5 lg:md:w-1/2 sm:w-11/12 border-slate-200 sm:mx-auto lg:md:mx-0"
        >
          <div class="flex justify-around">
            <p>Room Fare:</p>
            <p>10 Sar</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>Service Fee:</p>
            <p>102 SAR</p>
          </div>
          <div class="flex justify-around">
            <p class="font-bold">Total Price:</p>
            <p class="font-bold">402 SAR</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>VAT :</p>
            <p>402 SAR</p>
          </div>
        </div>
      </div>
      <div> -->
        <!-- <div
          class="border-b-1 py-5 lg:md:w-1/2 sm:w-11/12 border-slate-200 sm:mx-auto lg:md:mx-0"
        >
          <div class="flex justify-around">
            <p>Room Fare:</p>
            <p>10 Sar</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>Service Fee:</p>
            <p>102 SAR</p>
          </div>
          <div class="flex justify-around">
            <p class="font-bold">Total Price:</p>
            <p class="font-bold">402 SAR</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>VAT :</p>
            <p>402 SAR</p>
          </div>
        </div> -->
      </div>
      <div>
        <div
          class="border-b-1 py-5 lg:md:w-1/2 sm:w-11/12 border-slate-200 mx-auto lg:md:mx-0 text-sm md:text-base"
        >
          <div class="flex justify-around">
            <p>Room Fare:</p>
            <p>0 {{ currency }}</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>Service Fee:</p>
            <p>0 {{ currency }}</p>
          </div>
          <div class="flex justify-around">
            <p class="font-bold">Price:</p>
            <p class="font-bold">{{ subPrice.toFixed()}}  {{ currency }}</p>
          </div>
          <div class="flex justify-around bg-slate-50 custom-border">
            <p>VAT :</p>
            <!-- <p>{{ subPrice.toFixed()}}  {{ currency }} </p> -->
            <p>0 {{ currency }} </p>
            
          </div>
        </div>

        <div class="flex justify-around md:w-1/2 sm:mx-auto lg:md:mx-0">
          <p class="lg:md:text-xl sm:text-md font-bold">Total Price:</p>
          <p class="text-purple-800 lg:md:text-xl self-center font-bold">
            {{totalPrice.toFixed()}} {{ currency }}
          </p>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "PriceInformationCard",
  data() {
    return {
      num: 412.35,
      totalPrice: 0,
      subPrice: 0,
      currency:""
    };
  },
  computed:{
    ...mapState("userAccount",["bookings"]),
    getPriceInformation(){
      if (this.bookings.comingReservations) {
        this.bookings.comingReservations.forEach(element => {
        console.log("elementelementelementelement",element.id)
        if (element.id == this.$route.params.id) {
          this.totalPrice = element.total
          this.subPrice = element.subtotal
          // subPrice
          this.currency = element.booking_currency
          console.log("elementelementelementelement",element)
        }
      })
    }
    if (this.bookings.cancelledReservations) {
      this.bookings.cancelledReservations.forEach(element => {
        console.log("elementelementelementelement",element.id)
        if (element.id == this.$route.params.id) {
          this.totalPrice = element.total
          this.subPrice = element.subtotal
          this.currency = element.booking_currency
          console.log("elementelementelementelement",element)
        }
      })
    }
    if (this.bookings.previuosReservations) {
      this.bookings.previuosReservations.forEach(element => {
        console.log("elementelementelementelement",element.id)
        if (element.id == this.$route.params.id) {
          this.currency = element.booking_currency
          this.totalPrice = element.total
          this.subPrice = element.subtotal

          console.log("elementelementelementelement",element)
        }
      })
      }
    
      return '';
    }
  }
};
</script>
