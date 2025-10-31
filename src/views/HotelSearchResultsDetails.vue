<template>
  <el-row class>
    <!-- header -->
    <el-col @click="log" :span="24" :lg="24" class="flex justify-between">
      <!-- <div>
        <p class="text-slate-500 text-sm lg:px-20 sm:px-5">
          Happytrip → Hotels Booking → {{ $route.params.name }}
        </p>
      </div>-->

      <!-- 2223- {{ availbleHotelsDetails?.data?.hotel }} -->
      <top-bar-with-date
        :availbleHotels="availbleHotelsDetails"
      ></top-bar-with-date>

      <div class="w-full" v-if="availbleHotelsDetails.hotel">
        <!-- <top-bar
          icon="i-mdi-building"
          toPath="/"
          city=""
          :header="availbleHotelsDetails.hotel.city_name"
          :title="$route.params.name"
        ></top-bar> -->
      </div>

      <!-- <div>
        <p class="text-violet-500 font-bold text-sm lg:px-20 sm:px-5">
          <span class="i-mdi-arrow-left-thin">
            <span class="i-mdi-bed-double-outline text-3xl text-slate-400"></span>
          </span>
          Back To Search Results
        </p>
      </div>-->
    </el-col>

    <el-col v-if="roomsLoader" :span="24" :lg="24" class="lg:flex sm:hidden">
      <div class="w-full h-[200px]">
        <loading-card class="h-[100vh]"></loading-card>
      </div>
    </el-col>
    <el-col
      v-else
      :span="24"
      :lg="24"
      class="lg:flex h-[500px] cursor-pointer hover:opacity-80"
      @click="showGallery = false"
    >
      <!--
         <el-carousel indicator-position="outside" class="w-full h-full bg-carsoul hotel-carsoul">
              <el-carousel-item v-for="image in imagesUrls" :key="image">
                  <img :src="image" @error="handleImageFailure(image)" class="landing-image" />
                </el-carousel-item>
              </el-carousel>
       <img src="../assets/images/mapImage.png" class="map-image sm:hidden lg:block md:hidden" />
       -->
      <el-row class="h-full w-full">
        <!-- <pre>
        {{ availbleHotelsDetails.data }}
       </pre> -->
        <!--  <el-col :lg="12" class="h-full w-full">
          <el-row class="h-full w-full">

            <el-col :lg="12" class="lg:h-[50%]" v-for="(img, index) in hotelImages?.slice(0, 4)" :key="index">

              <img :src="img.Links[0].ProviderHref" class="object-cover w-full h-full" />
            </el-col>
          </el-row>
        </el-col> -->
        <el-col :lg="48" class="h-full w-full">
          <!--  <el-row class="h-full w-full"> -->
          <!--    <el-col :lg="index == 0 ? 24 : 8" class="lg:h-[50%]" v-for="(img, index) in hotelImages?.slice(4, 7)"
              :key="index">
              <img :src="img.Links[0].ProviderHref" class="object-cover w-full h-full" />
            </el-col> -->

          <img
            :src="availbleHotelsDetails?.data?.hotel?.thumbnail"
            class="object-cover w-full h-full"
          />

          <!--  <el-col :lg="12" class="lg:h-[100%]">

          </el-col> -->
          <!-- </el-row> -->
        </el-col>
      </el-row>
      <!--      <pre>
       111- {{ JSON.stringify(filterSelected) }}
      </pre> -->
    </el-col>

    <!-- ✅ -->
    <header-room-details-card></header-room-details-card>
  </el-row>
  <el-row class="lg:px-20 sm:px-10">
    <!-- ✅ -->
    <room-choices-cards></room-choices-cards>
  </el-row>

  <el-row class="p-20 my-20 bg-slate-200">
    <!-- ✅ -->
    <about-hotel></about-hotel>
  </el-row>

  <!-- cards of recommeded hotels -->
  <!-- <el-row class="lg:px-40 sm:px-5 mb-2 py-15">
    <recommended-hotels-cards></recommended-hotels-cards>
  </el-row> -->
  <!-- end cards of recommeded hotels -->
  <!-- commented till come from back end -->
  <!-- <el-row class="lg:px-40 sm:px-10 py-15 flex justify-between">
    <hotel-amenities></hotel-amenities>
  </el-row> -->

  <!-- reviews section -->
  <!-- <el-row class="lg:px-40 sm:px-10">
    <reviews-partition></reviews-partition>
  </el-row> -->
  <!-- end of reviews section -->
  <hotel-images-slide
    v-if="showGallery"
    v-model="showGallery"
    :images="hotelImages.map((el) => el.Links[0].ProviderHref)"
  >
  </hotel-images-slide>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { convertStringValuesToObjects } from "@/utils/helpers";
export default {
  data() {
    return {
      imagesUrls: [],
      imageErrorBaseURL: "../../src/assets/images/noProfilePic.png",
      rate: 5,
      date: "",
      value: 5,
      dialogVisible: false,
      showGallery: false,
    };
  },
  methods: {
    ...mapActions("hotels", ["fetchAvailbleHotelRooms"]),
    ...mapMutations("hotels", ["SET_ROOM_LOADING"]),
    handleImageFailure(serverPath) {
      serverPath = "";
    },
  },
  mounted() {
    this.SET_ROOM_LOADING(true);

    const filtersData = JSON.parse(localStorage.getItem("filters"));

    const { id, vendor } = this.filterSelected;
    //console.log('23445', this.filterSelected.target)
    /*    const payload = {
         provider_hotel_id: JSON.stringify(id),
         vervotech_id: this.$route.params.vervotech_id,
         provider_name: vendor,
   
         ...filtersData,
         check_in: filtersData.checkIn,
         check_out: filtersData.checkOut
   
       } */

    const payload = {
      provider_hotel_id: JSON.stringify(id),
      vervotech_id: this.$route.params.vervotech_id,
      provider_name: vendor,
      check_in: filtersData.checkIn,
      check_out: filtersData.checkOut,
      nationality: filtersData.nationality,
      currency: filtersData.currency,

      rooms: [
        {
          adults_number: filtersData.rooms[0].adults_number,
          children: filtersData.rooms[0].children_ages?.map((item) => {
            return { age: item };
          }),
        },
      ],
    };

    this.fetchAvailbleHotelRooms({
      payload,
      /* uuid: this.$route.params.uuid, */
      /* vervotech_id: this.$route.params.vervotech_id, */
    })
      .catch((e) => {
        this.$toast.error(e);
      })
      .finally(() => {
        this.SET_ROOM_LOADING(false);
      });
  },
  computed: {
    ...mapState("hotels", [
      "availbleHotelsDetails",
      "roomsLoader",
      "availbleHotels",
    ]),
    hotelImages() {
      //console.log('5555555', this.availbleHotelsDetails)
      return this.availbleHotelsDetails.hotel
        ? convertStringValuesToObjects(this.availbleHotelsDetails.hotel).images
        : [];
    },

    filterSelected() {
      const parsedAvailableHotels = JSON.parse(
        localStorage.getItem("availbleHotels"),
      );

      //alert(JSON.stringify(this.availbleHotels) == {})
      //console.log('111123', JSON.parse(this.availbleHotels))
      //console.log('111123', this.availbleHotels?.data)
      const obj = this.availbleHotels?.data
        ? this.availbleHotels.data.hotels.filter(
            (item) => item.vervotech_id == this.$route.params.vervotech_id,
          )
        : parsedAvailableHotels.data.hotels.filter(
            (item) => item.vervotech_id == this.$route.params.vervotech_id,
          );

      return JSON.parse(JSON.stringify(obj))[0];
    },
  },
};
</script>
<style lang="scss">
.landing-image,
.map-image {
  height: 100%;
  object-fit: cover;
  object-position: 100% 0%;
}

.landing-image {
  width: 100%;
  height: 100%;
}

.el-carousel__container,
.bg-carsoul {
  height: 100%;
  overflow: hidden !important;
}
</style>
