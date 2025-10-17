<template>
  <!-- TODO this is not room details this is -->
  <!--  TODO  fullHotelDetails is nedd to send another request to fire  -->
  <!-- header card  -->

  <el-col
    v-if="!availbleHotelsDetails?.data?.hotel"
    class="relative lg:md:bottom-10 sm:bottom-10 lg:px-20 md:px-10 sm:px-5"
  >
    <!-- 45{{ JSON.stringify(!availbleHotelsDetails?.data?.hotel) }} -->
  </el-col>
  <el-col
    v-if="availbleHotelsDetails?.data?.hotel"
    class="relative lg:md:bottom-10 sm:bottom-10 lg:px-20 md:px-10 sm:px-5"
  >
    <!-- header card  -->
    <div
      class="lg:md:flex bg-white drop-shadow-md lg:p-10 sm:p-5 main-card custom-border"
    >
      <div class="lg:md:left-card">
        <div>
          <!-- <el-carousel :interval="4000" type="card" height="100px">
                            <el-carousel-item v-for="image in availbleHotelsDetails.images" :key="image">
                                <img :src="imageBaseURL + image.path" width="50%" />
                            </el-carousel-item>
          </el-carousel>-->
          <h3 class="font-extrabold" @click="log">Hotel Details</h3>

          <!--v-model="availbleHotelsDetails?.hotel?.rating"-->

          <el-rate
            v-model="availbleHotelsDetails.data.hotel.rating"
            disabled
            size="large"
            text-color="#ff9900"
          />
          <!-- <p class="small-purble-text inline">( Write Review )</p> -->
        </div>
        <h3 class="font-extrabold">
          {{ availbleHotelsDetails?.data?.hotel?.name }}
        </h3>
        <span
          class="i-mdi-map-marker-radius-outline text-3xl text-violet-600"
        ></span>

        <p class="subheader inline px-3">
          <!-- {{ availbleHotelsDetails.hotel.addressLine1 }} -->
          {{ availbleHotelsDetails?.data?.hotel?.address }}
        </p>
        <div class="py-5">
          <p
            class="text-slate-500 my-1 text-sm w-[100%]"
            v-for="paragraph in paragraphs"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
      <!-- <div class="lg:md:handle-right-card sm:w-full"> -->
      <!-- <div class="flex"> -->
      <!-- <div class="lg:px-10 sm:px-2 ">
                            <p class="lg:text-xl sm:text-base py-0 my-0 custom-extra-bold px-1 text-#FF1E74">
                                SAR
                            </p>
                            <p class="lg:text-xl sm:text-base py-0 my-0 custom-extra-bold px-1 text-#FF1E74">
                                {{ $route.params.price }}
                            </p>
          </div>-->
      <!-- <div class="px-5">
                            <p class="text-slate-300 py-0 my-0 lg:text-xl sm:text-base"
                                style="text-decoration: line-through;">SAR</p>
                            <p class="text-slate-300 py-0 my-0 lg:text-xl sm:text-base"
                                style="text-decoration: line-through;">300,00.00
                            </p>
          </div>-->
      <!-- <div
                            class="lg:px-5 sm:px-3 lg:m-0 sm:mx-2  lg:py-0 sm:py-2  custom-border font-bold text-#FF1E74 flex items-center text-xs bg-rose-100">
                            <p class="m-0 p-0">
                                Save 105 SAR
                            </p>
          </div>-->
      <!-- </div> -->
      <!-- <div class="lg:px-10 sm:px-2 py-5 w-full">
                    <div class="block inputs w-full">
                        <el-date-picker v-model="date" type="daterange" range-separator=":"
                            start-placeholder="Start date" class="lg:md:date-picker" end-placeholder="End date"
                            :size="size" />
                        <el-dropdown trigger="hover"
                            class="my-6 p-3 w-10/12 border-solid border-2 border-slate-200 custom-border">
                            <div class="el-dropdown-link">
                                <span class="i-mdi-account-badge-outline text-slate-400"></span>
                                <p class="subheader inline lg:px-5 sm:px-2 text-slate-400">
                                    2 Guests
                                </p>
                                <span class="i-mdi-music-note-whole text-rose-400"></span>
                                <p class="subheader inline lg:px-5 sm:px-2 text-slate-400">
                                    1 Room
                                </p>
                                <span class="i-mdi-arrow-down-drop-circle-outline text-slate-400"></span>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>1 Room and 1 Guest</el-dropdown-item>
                                    <el-dropdown-item>2 Room and 2 Guest</el-dropdown-item>
                                    <el-dropdown-item>3 Room and 3 Guest</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
</el-dropdown>

<el-dropdown trigger="hover" class="mb-6 p-3 border-solid w-10/12  border-2 border-slate-200 custom-border">
  <div class="el-dropdown-link ">
    <span class="i-mdi-bed-double-outline text-slate-400"></span>

    <p class="subheader inline px-5 text-slate-400">
      1 Standarad Double or Twin
    </p>
    <span class="i-mdi-arrow-down-drop-circle-outline text-slate-400"></span>

  </div>
  <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>1 Standarad Double</el-dropdown-item>
                                    <el-dropdown-item>
                                        1 Standarad Twin
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
</el-dropdown>

<div class="w-11/12">
  <el-button @click="dialogVisible = true"
    class="flex-grow-1 w-full text-white font-bold bg-#1CCF3D text-center py-5 custom-border  hover:bg-violet-700 ease-in-out duration-300">
    Book Now
  </el-button>
</div>
</div>

</div>-->
      <!-- </div> -->
    </div>
  </el-col>

  <el-dialog v-model="dialogVisible" class="dialog-sold-out" width="20%">
    <div class="text-center">
      <span class="i-mdi-home text-5xl text-rose-400"></span>
      <p class="text-rose-400 p-0 m-0">Sold Out</p>

      <h3 class="font-extrabold">Citymax Hotel Bur Dubai</h3>
      <span
        class="i-mdi-map-marker-radius-outline text-3xl text-violet-800"
      ></span>
      <span class="text-xs px-3 text-slate-500"
        >Jumeirah P.O. Box 75157 , UAE</span
      >
      <div>
        <el-rate
          class="p-1 py-2"
          v-model="value"
          size="large"
          disabled
          text-color="#ff9900"
        />
      </div>

      <el-button
        @click="dialogVisible = true"
        class="flex-grow-1 w-full text-white font-bold bg-#1CCF3D text-center py-5 custom-border hover:bg-violet-700 ease-in-out duration-300"
        >Try Other Hotel</el-button
      >
    </div>
  </el-dialog>
  <!--end of header card -->
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      imageBaseURL: "https://photos.hotelbeds.com/giata/original/",
      rate: 1,
      date: "",
      value: 5,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState("hotels", [
      "availbleHotelsDetails",
      "fullHotelDetails",
      "availbleHotels",
      "uuid",
    ]),
    paragraphs() {
      // Split the text into paragraphs based on line breaks or other criteria
      //return this.availbleHotelsDetails?.data?.hotel?.descriptions[0].Text.split("."); // Example: Split by line breaks
    },
  },
  mounted() {
    // !this.uuid ? this.fetchAvailbleHotel({uuid:this.uuid}) : ""
  },
  methods: {
    ...mapActions("hotels", ["fetchAvailbleHotel"]),
    log() {
      console.log("fulll", window.localStorage.getItem("uuid"));
    },
  },
};
</script>
<style>
.landing-image,
.map-image {
  height: 100%;
  object-fit: cover;
  object-position: 100% 0%;
}

.landing-image {
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
</style>
