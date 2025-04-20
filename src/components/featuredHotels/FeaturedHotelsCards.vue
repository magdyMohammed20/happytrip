<template>
  <el-row class="justify-center">
    <el-col :span="24" :lg="15" :md="15" :sm="24" class="lg:md:px-10 sm:px-2">
      <div class="flex justify-between">
        <div>
          <p
            class="font-bold text-xl pt-5 mt-1 px-1"
          >{{ featuredHotelsData.length }} Featured Hotels</p>
        </div>
        <div class="py-4 mt-1 px-1 w-[60%] flex">
          <!-- VCalender -->
          <!-- it assigns data to dateRangePicker from state -->
          <!-- after finishing use SET_DATE_RANGE({}) to reiniialize object -->
          <range-date-picker></range-date-picker>
          <el-button
            text
            class="button custom-button text-white text-md px-8 py-5 m-2 sm:mx-3"
            @click="filterFeaturedPackages"
          >Filter</el-button>
        </div>
      </div>
      <div v-if="!featuredHotelsLoader && featuredHotelsData.length > 0">
        <el-card
          v-for="card in featuredHotelsData"
          :key="card.id"
          :body-style="{ padding: '0px' }"
          class="my-5 sm:px-3 lg:md:px-0"
        >
          <div class="flex lg:md:justify-between sm:justify-around sm:flex-col lg:md:flex-row">
            <div>
              <img :src="card.min_image" class="image featured-images lg:md:w-60 sm:w-full h-full" />
            </div>
            <div
              class="sm:pb-5 lg:w-[40%] md:w-[60%] sm:w-[100%] lg:border-b-0 sm:border-b-1 self-center sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400"
            >
              <h3 class="font-bold p-2">{{ card.name }}</h3>
              <div class="bottom">
                <span class="i-mdi-location text-3xl h-5 text-purple-800"></span>
                <span class="text-xs text-slate-500">{{ card.addressLine1 }}</span>
                <div class="p-2">
                  <el-rate v-model="card.rating" size="large" disabled text-color="#ff9900" />
                </div>
                <!-- <div>
                <span class="i-mdi-wifi text-3xl h-5 text-purple-800"></span>
                <span class="i-mdi-pool text-3xl h-5 text-purple-800"></span>
                <span class="i-mdi-cup text-3xl h-5 text-purple-800"></span>
                </div>-->
              </div>
            </div>
            <div style="padding: 14px" class="lg:md:self-center sm:w-full lg:w-fit sm:self-start">
              <div class="bottom lg:block sm:flex justify-between sm:w-full lg:w-fit">
                <div>
                  <!-- <router-link
                    :to="'/HotelSearchResultsDetails/' + card.name + '/' + card.id"
                    class="no-underline"
                  >-->
                  <el-button
                    text
                    class="button custom-button text-white text-md px-8 py-5 lg:md:mx-0 sm:mx-3"
                    @click="featuredDialog = true; vervotech_id = card.vervotech_id; name=card.name "
                  >
                    Search for this Hotel
                    <span class="i-mdi-arrow-right px-1"></span>
                  </el-button>
                  <!-- </router-link> -->
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-col
        v-if="featuredHotelsLoader"
        class="lg:md:px-10 sm:px-2"
        :span="24"
        :lg="15"
        :md="15"
        :sm="24"
      >
        <loadingHotelComponent></loadingHotelComponent>
      </el-col>
    </el-col>
  </el-row>

  <el-dialog
    v-model="featuredDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    class="border-rounded-xl"
  >
    <featured-form-component :vervotech_id="vervotech_id" :name="name"></featured-form-component>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      vervotech_id: "",
      name: "",
      featuredDialog: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  methods: {
    ...mapMutations("hotels", ["SET_UUID"]),

    ...mapMutations("dateRangePicker", ["SET_DATE_RANGE"]),
    filterFeaturedPackages() {
      this.SET_UUID(0);
      this.SET_DATE_RANGE({});
    }
  },
  computed: {
    ...mapState("featuredHotels", [
      "featuredHotelsData",
      "featuredHotelsLoader"
    ]),
    ...mapState("dateRangePicker", ["datePickerForm"])
  }
};
</script>
<style scoped>
.featured-images {
  width: 200px;
  /* height: 200px; */
  object-fit: cover;
  align-content: center;
  display: flex;
}
</style>