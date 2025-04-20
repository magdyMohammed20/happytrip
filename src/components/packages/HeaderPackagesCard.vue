<template>
  <el-col :span="24" :lg="16" :md="10" :sm="24" class="px-2 py-5 w-full m-auto">
    <el-card class="w-full shadow-lg" body-style="padding: 0px;">
      <div
        class="flex relative h-[300px] w-full inline-block overflow-hidden flex-wrap lg:justify-between md:justify-between md:w-[100%] md:flex-row lg:flex-col sm:flex-col sm:justify-around sm:flex-col"
      >
        <img :src="packageDetails.main_image" class="w-full object-cover" />
        <div class="overlay">
          <div class="overlay-text"></div>
        </div>
      </div>
    </el-card>

    <el-card class="w-full shadow-lg mt-5" body-style="padding: 0px;">
      <div class="border-b-1 border-b-solid border-slate-300">
        <p class="text-2xl m-10 font-bold">Package Includes</p>
        <div class="flex m-10">
          <div class="pr-10 pt-5 mr-5">
            <div class="inline bg-violet-200/50 rounded-full md:p-3">
              <span class="i-mdi-building text-2xl mt-2 text-purple-800"></span>
            </div>
            <span class="text-xl font-light px-3">Meals</span>
          </div>
          <div class="pr-10 pt-5 mr-5">
            <div class="inline bg-violet-200/50 rounded-full md:p-3">
              <span class="i-mdi-building text-2xl mt-2 text-purple-800"></span>
            </div>
            <span class="text-xl font-light px-3">Transfers</span>
          </div>
          <div class="pr-10 pt-5 mr-5">
            <div class="inline bg-violet-200/50 rounded-full md:p-3">
              <span class="i-mdi-building text-2xl mt-2 text-purple-800"></span>
            </div>
            <span class="text-xl font-light px-3">Lodging</span>
          </div>
        </div>
      </div>

      <div class="border-b-1 border-b-solid border-slate-300">
        <p class="text-2xl m-10 font-bold">Suitable trip for</p>
        <div class="flex m-10">
          <div class="trip-for">
            <p>Family</p>
          </div>
          <div class="trip-for">
            <p>honeymoon</p>
          </div>
          <div class="trip-for">
            <p>Relaxation of nature</p>
          </div>
        </div>
      </div>

      <div  class="border-b-1 border-b-solid border-slate-300">
        <p class="text-2xl m-10 font-bold">Itinerary</p>
        <el-timeline class="timeline">
          <el-timeline-item
            type="primary"
            color="#1CCF3D"
            class="p-5"
            size="large"
            placement="top"
            v-for="details in packageDetails.scheduale"
          >
            <!-- <p class="text-md text-gray-400 my-0">
            Offer started at :
            {{ new Date(packageDetails.start).toDateString() }}
          </p> -->
            <div class="flex">
              <p class="text-xl w-[15%] p-2 font-bold mx-3 my-0">Day {{ details.day_num }}</p>

              <img
                :src="details.image"
                class="w-[15%] h-[15%] rounded-xl object-cover"
              />
              <div class="px-5">
                <p class="font-bold py-0 my-0">{{ details.title }}</p>
                <p class="w-[70%] py-0 my-0 text-slate-400">
                 {{ details.description }}
                </p>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="">
        <p class="text-2xl m-10 mb-3 font-bold">Overview</p>
        <p class="m-10 mt-0 text-slate-400">
          {{ packageDetails.description }}
        </p>
      </div>
    </el-card>

    <el-card class="w-full shadow-lg py-5 my-5" body-style="padding: 0px;">
      <div class="text-center">
        <p class="text-3xl font-bold m-auto">
          {{ Math.round(packageDetails.price) }} SAR
        </p>
        <p class="text-3xl font-bold py-3 m-auto text-#f71c52">
          <s>{{ Math.round(packageDetails.old_price) }} SAR</s>
        </p>
        <p class="text-xl py-0 my-0 text-slate-400">PER PERSON</p>
      </div>
    </el-card>
    <el-button
      :disabled="!profileData.id || packageDetails.status == 'pending'"
      :loading="loading"
      class="text-white font-bold bg-#1CCF3D text-center px-8 py-8 custom-border w-full hover:bg-violet-200 ease-in-out duration-300"
      @click="SET_RESERVE_CARD(true)"
    >
      Book Now
      <span v-if="!profileData.id" class="font-light text-xs px-2"
        >(login to book a package)</span
      >
      <span
        v-if="packageDetails.status == 'pending'"
        class="font-light text-xs px-2"
        >(your request is pending ...)</span
      >
    </el-button>
  </el-col>
  
  <reseve-package-dialog></reseve-package-dialog>
  <!--end of header card -->
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      imageBaseURL: "http://backend.happytbooking.com/storage/",
      loading: false,
      rate: 1,
      date: "",
      value: 5,
      dialogVisible: false,
      currencyType: localStorage.getItem("CURR"),
    };
  },
  computed: {
    ...mapState("packages", ["packageDetails"]),
    ...mapState("userAccount", ["profileData"]),
    ...mapState("hotels", ["currencyPrice"]),
    getCurrencyType() {
      return this.currencyType ? this.currencyType : "SAR";
    },
  },

  methods: {
    ...mapMutations("packages", ["SET_RESERVE_CARD"]),
    ...mapActions("hotels", ["convertCurrency"]),
    calculateOfferPercentage(oldPrice, newPrice) {
      return Math.round(newPrice / oldPrice);
    },
  },
  created() {
    // this.changeCurrency()
    if (window.localStorage.getItem("CURR") != "SAR") {
      this.convertCurrency({
        from: "SAR",
        to: window.localStorage.getItem("CURR"),
      });
    }
  },
};
</script>
<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #20002c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #cbb4d438,
    #20002c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #cbb4d435,
    #20002c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.trip-for {
  border: #ffffff 2px solid;
  padding: 0px 30px;
  margin-right: 30px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.trip-for > p {
  margin: 5px;
  padding: 5px;
}
.carsoul-landing-image {
  height: 100%;
  object-fit: fill;
  object-position: 100% 100%;
  width: 100%;
}

.handle-card {
  width: 80%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.date-picker {
  width: 87%;
}

.inputs > .el-date-editor.el-input__wrapper {
  width: 90% !important;
}

.main-card {
  /* width: 70%; */
  margin: auto;
}

.main-card > .left-card {
  width: 60%;
  border-right: #dbdbdb 2px dashed;
}

.handle-right-card {
  width: 40%;
}

.block {
  margin-top: 10%;
}

.book-btn {
  width: 79% !important;
}

.dialog-sold-out > .el-dialog__body {
  text-align: center !important;
}

.para-filter {
  width: 75%;
  margin: auto;
}

.demo-progress .el-progress--line {
  margin: 0px 0px;
  width: 70%;
}

.packages-card-timeline > ul {
  padding: 0;
}
</style>
