<template>
  <div class="w-full">
    <el-carousel
      :interval="4000"
      type="card"
      class="w-full pt-30 text-center align-center  sm:hidden lg:block md:block overflow-hidden coupon-cards"
      style="height: 50vh"
    >
      <el-carousel-item v-for="coupon in coupons" :key="item">
        <el-col class="para-filter flex">
          <el-card
            class="rounded-3 flex justify-center coupons-card m-auto items-center w-[50%]"
            :body-style="{
            padding: '0',
          }"
          >
            <div
              class="w-[100%] coupon-image h-[30vh]"
              :style="{ backgroundImage: `url(${coupon.image_path})` }"
            >
              <!-- <img :src="coupon.image_path" alt="deal"  /> -->
            </div>
            <div class="text-[12px] p-3">
              <span>{{ coupon.description }}</span>
              <div @click="getCoupunDetails(coupon.code)"
                class="text-#5808D8 mt-2 display-flex items-center justify-between">
                <span>EXPLORE OUR DEALS</span>
                <span class="i-mdi-arrow-right-circle-outline text-xl"></span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
    <div class="lg:hidden sm:block md:hidden my-5">
      <swiper :slides-per-view="1" :space-between="0">
        <swiper-slide v-for="coupon in coupons" :key="item">
          <el-col class="w-[80%] m-auto items-center">
            <el-card
              class="rounded-3 flex justify-center coupons-card m-auto items-center"
              :body-style="{
            padding: '0',
          }"
            >
              <div
                class="coupon-image h-[50vh] m-auto"
                :style="{ backgroundImage: `url(${coupon.image_path})` }"
              ></div>
              <div class="text-[12px] p-3">
                <span>Winter beach escapes 30% off</span>
                <div
                  @click="getCoupunDetails(coupon.code)"
                  class="text-#5808D8 mt-2 display-flex items-center justify-between"
                >
                  <span>EXPLORE OUR DEALS</span>
                  <span class="i-mdi-arrow-right-circle-outline text-xl"></span>
                </div>
              </div>
            </el-card>
          </el-col>
        </swiper-slide>
      </swiper>
    </div>

    <el-dialog v-model="dialogVisible" class width="65%">
      <div
        class="text-center flex"
        v-loading="loading"
        v-if="couponDetails != '' && couponMessage != 'Unauthenticated.'"
      >
        <div
          class="px-3 w-[35%] coupon-image rounded-3xl h-[35vh]"
          :style="{ backgroundImage: `url(${couponDetails.image})` }"
        >
          <!-- <img :src="couponDetails.image" alt="deal" class="" /> -->
        </div>
        <div class="flex flex-col text-justify px-3 m-3 w-fit">
          <div>
            <p class="inline font-bold text-4">CODE</p>
            <el-input
              class="w-[50%] px-3"
              v-on:focus="$event.target.select()"
              ref="clone"
              readonly
              :value="couponDetails.code"
            ></el-input>
            <el-button class="py-2 m-2" @click="copy">
              <span class="i-mdi-content-copy text-xl"></span>
            </el-button>
          </div>
          <div>
            <p class="font-bold">
              Description :
              <span class="text-xs font-light">{{ couponDetails.description }}</span>
            </p>
            <p class="font-bold">
              Name :
              <span class="text-xs font-light">{{ couponDetails.name }}</span>
            </p>
          </div>
          <div>
            <el-alert :title="couponMessage" type="success" :closable="false" />
          </div>
        </div>
        <div>
          <div class="py-1">
            <p class="font-bold text-justify">Expired date</p>
            <div class="flex bg-green-100 rounded-3 p-2">
              <p class="font-bold py-1 my-1 custom-extra-bold px-1 text-5xl text-green-500">
                {{ new
                Date(couponDetails.expiration).getDate() }}
              </p>
              <div class="flex flex-col px-2">
                <p class="font-light p-0 m-0 text-xl text-green-500">
                  {{
                  new Date(couponDetails.expiration).toLocaleString(
                  "default",
                  { month: "long" }
                  )
                  }}
                </p>
                <p class="font-light p-0 m-0 text-xl text-green-500">
                  {{ new Date(couponDetails.expiration).getFullYear()
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="couponDetails == '' & couponMessage != 'Unauthenticated.'">
        <el-alert
          title="This code is already used"
          type="warning "
          :closable="false"
          :description="couponMessage"
        />
      </div>
      <div v-else-if="couponMessage == 'Unauthenticated.'">
        <el-alert
          title="Sorry !"
          type="error"
          :closable="false"
          description="Please login in order to use coupons services"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      dialogVisible: false,
      loading: false
    };
  },
  computed: {
    ...mapState("coupons", ["coupons", "couponDetails", "couponMessage"])
  },
  methods: {
    ...mapActions("coupons", ["fetchCoupons", "fetchCouponDetails"]),
    ...mapMutations("coupons", ["SET_COUPON_MESSAGE"]),
    onSwiper() {
      console.log("swip");
    },
    copy() {
      this.$refs.clone.focus();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          this.$toast.success("Coupon code copied to clipboard!");
        } else {
          this.$toast.error("Unable to copy coupon code.");
        }
      } catch (err) {
        this.$toast.show(err);
      }
    },
    getCoupunDetails(code) {
      this.dialogVisible = !this.dialogVisible;
      this.loading = true;
      this.fetchCouponDetails(code)
        .catch(e => {
          this.SET_COUPON_MESSAGE(e.response.data.message);
          this.$toast.error("An error happened : " + e.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.fetchCoupons()
      .then(res => {})
  }
};
</script>
<style>
.coupon-image {
  background-repeat: no-repeat;
  background-size: cover;
}

.coupons-card > .el-card__body {
  width: 100%;
}
.coupon-cards>.el-carousel__container{
  height: 50vh;
}
</style>