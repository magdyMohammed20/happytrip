<template>
  <el-col v-loading.fullscreen.lock="fullscreenLoading" :span="24" :lg="24" :md="24">
    <el-card class="box-card lg:md:px-20 sm:px-0">
      <div class="lg:md:flex justify-between">
        <div class="flex">
          <div class="bg-yellow-400 inline h-10 w-10 text-center rounded-full sm:hidden lg:block">
            <span class="i-mdi-building pt-5 text-4xl text-white"></span>
          </div>
          <div class="inline px-3">

            <p class="mt-0 mb-0 font-thin">SEARCH SUMMERY</p>
            <P class="font-bold mb-0 mt-0" v-if="!hotelsLoader">{{ availbleHotels.destination }}</P>
            <div class="flex align-center" v-if="!hotelsLoader">

              <span v-if="availbleHotels" class="text-xs font-bold mt-0 mb-0 text-slate-500">from :{{ availbleHotels?.checkIn ?
                availbleHotels?.checkIn : availbleHotels?.data?.hotel_search?.check_in }} </span>
              <!-- music-note-whole -->

              <span class="text-xs font-bold mt-0 px-1 text-slate-500 flex align-center">
                <span class="i-mdi-music-note-whole text-red text-sm"></span>
                to:{{ availbleHotels?.checkOut ? availbleHotels?.checkOut : availbleHotels?.data?.hotel_search?.check_out
                }}
              </span>


              <!-- <span class="text-xs font-bold pl-5 mt-0 mb-0 text-slate-500">
                {{ availbleHotels.adults ? availbleHotels.adults : availbleHotels.data.hotel_search.content.adults_num
                }} Adult &
                {{ availbleHotels.children ? availbleHotels.children :
                  availbleHotels.data.hotel_search.content.children_num }} Kid
              </span> -->

              <!--   <pre>
                {{ availbleHotels.data.hotel_search }}
              </pre> -->
              <span class="text-xs font-bold pl-5 mt-0 mb-0 text-slate-500">
                {{ availbleHotels?.data?.hotel_search?.content?.adults_num
                }} Adult <!-- {{
                  availbleHotels.data.hotel_search.content.kids_nums }} -->

                {{ kids_nums }} Kid
              </span>


              <!-- music-note-whole -->

              <span class="text-xs font-bold mt-0 px-1 text-slate-500 flex align-center">
                <span class="i-mdi-music-note-whole text-sm text-red"></span>
                <!-- {{ availbleHotels.roomCount ? availbleHotels.roomCount :
                rooms_nums }}  -->
                {{
                  rooms_nums }}
                Room
              </span>
            </div>
          </div>
        </div>
        <div>
          <router-link to="/" class="no-underline">
            <el-button type="success" class="px-10 my-5 text-xs font-bold">Modify</el-button>
          </router-link>
        </div>
      </div>
    </el-card>
  </el-col>

  <el-col :span="24" :lg="6" :md="6">
    <el-card class="box-card side-card pl-15 h-[95%]">
      <div class="sm:block lg:md:hidden">
        <p class="inline text-sm text-slate-400">Filters</p>
      </div>
      <div class="demo-collapse">
        <div class="py-5">
          <p class="font-bold text-md">
            Sort by
            <span class="text-blue font-light text-xs cursor-pointer" @click="
              filters.sort = '';
            onSearch();
            ">(Clear this filter)</span>
          </p>

          <el-radio v-model="filters.sort" :disabled="!enableFilters" label="rating" class="block"
            @change="onSearch('rate')">Rate</el-radio>
          <el-radio v-model="filters.sort" :disabled="!enableFilters" label="price"
            @change="onSearch('price')">Price</el-radio>
        </div>
        <div class="py-5">
          <p class="font-bold text-md">
            Hotel Search
            <span class="text-blue font-light text-xs cursor-pointer" @click="
              filters.hotel_name = '';
            onSearch();
            ">(Clear this filter)</span>
          </p>
          <el-input v-model="filters.hotel_name" placeholder="Search" :disabled="!enableFilters"
            @input="onSearch('name')" class="borderBotOnly" />
        </div>
        <div></div>

        <div class="slider-demo-block py-5">
          <p class="font-bold text-md">
            Search by Price
            <span class="text-blue font-light text-xs cursor-pointer" @click="clearPrices()">(Clear this filter)</span>
          </p>
          <div v-if="availbleHotels?.data">



            {{
              availbleHotels?.data?.max_price ? formatePriceRange(filters.price) : '' }}
            <el-slider v-if="availbleHotels?.data?.max_price" :disabled="!enableFilters" show-input
              @change=" formatePriceRange(filters.price); onSearch('price_range')" v-model="filters.price"
              :min="storageHotels.data.min_price ? Number(storageHotels.data.min_price) : (Number(availbleHotels?.data?.min_price))"
              :max="storageHotels.data.max_price ? Number(storageHotels.data.max_price) : (Number(availbleHotels?.data?.max_price))"
              range class />


            <div class="flex justify-between">
              <p class="inline text-xs text-slate-400">{{ first }}</p>
              <p class="inline text-xs text-slate-400">{{ last }}</p>
            </div>
          </div>

        </div>




        <div class="slider-demo-block  mx-auto py-5">
          <p class="font-bold text-md">
            Search Rating
            <!-- <span class="text-blue font-light text-xs cursor-pointer" @click="
              filters.rating = [];
            onSearch();
            ">(Clear this filter)</span> -->
          </p>



          <div v-if="availbleHotels?.data?.rates">

            <div v-for="(rate, index) in availbleHotels.data.rates.length" :key="rate" class="py-2">
              <el-checkbox @change="onSearch('rating')" v-model="filters.rating" :name="rate"
                :label="availbleHotels?.data?.rates[index]?.rate" class="check-box-color inline pt-0 mt-0"
                size="large" />
              <p class="inline px-1"> Star</p>
              <p class="inline text-slate text-3">({{ availbleHotels?.data?.rates[index]?.rateCount }} Hotels)</p>
            </div>
          </div>

          <!-- <el-rate v-model="star" size="large" :max="7" text-color="#ff9900" /> -->
        </div>
        <!-- ADVANCED SEARCH -->
        <!-- <div class="flex flex-col py-5">
          <p class="font-bold text-md">Search by Hotel Facilities</p>
          <el-checkbox
            v-model="wifi"
            class="m-1 w-11/12 checkbox-input custom-border"
            label="Pool"
            size="large"
            border
          >
            <span class="i-mdi-wifi text-3xl h-8 text-vilot"></span>
            <p class="inline px-2 text-black font-light">High speed wifi</p>
          </el-checkbox>
          <el-checkbox
            v-model="pool"
            class="m-1 w-11/12 checkbox-input custom-border"
            label="Pool"
            size="large"
            border
          >
            <span class="i-mdi-pool text-3xl h-8 text-vilot"></span>
            <p class="inline px-2 text-black font-light">Swimming pools</p>
          </el-checkbox>
         
          <el-checkbox
            v-model="Restaurant"
            class="m-1 w-11/12 checkbox-input custom-border checkbox-input"
            label="Pool"
            size="large"
            border
          >
            <span class="i-mdi-silverware-variant text-3xl h-8 text-vilot"></span>
            <p class="inline px-2 text-black font-light">Hotel Restaurant</p>
          </el-checkbox>
          <el-checkbox
            v-model="Parking"
            class="m-1 w-11/12 checkbox-input custom-border"
            label="Pool"
            size="large"
            border
          >
            <span class="i-mdi-parking text-3xl h-8 text-vilot"></span>
            <p class="inline px-2 text-black font-light">Parking</p>
          </el-checkbox>
          <el-checkbox
            v-model="club"
            class="m-1 w-11/12 checkbox-input custom-border"
            label="Pool"
            size="large"
            border
          >
            <p class="inline px-2 text-black font-light">Night club</p>
          </el-checkbox>
        </div>
        <div class="flex flex-col py-5">
          <p class="font-bold text-md">Search by District</p>
          <el-checkbox
            v-model="checked1"
            label="Deira"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked2"
            label="Deira"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked3"
            label="Deira"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked4"
            label="Deira"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked5"
            label="Deira"
            class="check-box-color"
            size="large"
          />
        </div>
        <div class="flex flex-col py-5">
          <p class="font-bold text-md">Search by Chain</p>
          <el-checkbox
            v-model="checked11"
            label="Independent"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked22"
            label="Independent"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked33"
            label="Independent"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked44"
            label="Deira"
            class="check-box-color"
            size="large"
          />
          <el-checkbox
            v-model="checked55"
            label="Deira"
            class="check-box-color"
            size="large"
          />
        </div>-->
      </div>
    </el-card>
  </el-col>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      kids_nums: null,
      rooms_nums: null,
      fullscreenLoading: false,
      disableSort: true,
      userInput: "",
      userChangesTimeOut: null,
      activeName: [],
      value: 0,
      min: 15,
      max: 100,
      first: 0,
      last: 0,
      star: 3,
      pool: true,
      wifi: false,
      checked1: true,
      checked2: true,
      query: {},
      sorting: "",
      hotelName: "",
      filters: {
        max_price: 0,
        min_price: 0,
        rating: [],
        sort: "",
        hotel_name: "",
        price: [0, 500000]
      }
    };
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const encodedX = params.get('x');

    if (encodedX) {
      try {
        const decodedX = decodeURIComponent(decodeURIComponent(encodedX));
        const parsedX = JSON.parse(decodedX);
        const roomNum = parsedX.room_num;
        const kids = parsedX.children_num;


        this.rooms_nums = roomNum
        this.kids_nums = kids
      } catch (error) {
        console.error('Failed to parse x:', error);
      }
    }
  },
  methods: {
    onSearch(attr) {

      //this.SET_AVAILABLE_HOTELS_LOADER(true);
      console.log("attr", attr);
      console.log(this.availbleHotels)
      console.log(this.hotels)

      if (attr) {
        if (attr == 'name') {
          this.filters = {
            ...this.filters,
            hotel_name: this.filters.hotel_name,
            rating: this.filters.rating ? this.filters.rating : [],
            min: this.filters?.price.length != 0 ? this.filters.price[0] : 0,
            max: this.filters?.price.length > 1 ? this.filters.price[1] : 500000
          }

        }
        else if (attr == 'price') {
          this.filters = {
            ...this.filters,
            hotel_name: this.filters.hotel_name,
            sort_by_price: 'asc'
          }
        } else if (attr == 'rate') {
          this.filters = {
            ...this.filters,
            hotel_name: this.filters.hotel_name,
            sort_by_rating: 'asc'
          }
        } else if (attr == 'price_range') {

          this.filters = {
            ...this.filters,
            min: this.filters.price[0],
            max: this.filters.price[1]
          }
          /* this.filters.price_range = {
            min: this.filters.price[0],
            max: this.filters.price[1],
          }; */


        } else {
          this.filters = {
            ...this.filters,
            rating: this.filters.rating,
            min: this.filters.price[0],
            max: this.filters.price[1]
          }
        }


      }

      // Sanitize
      const { max_price, min_price, price, ...sanFilters } = this.filters
      console.log("this.filters Before Send", sanFilters);
      console.log("avail", this.availbleHotels);
      //console.log("this.filters", this.filters);
      this.fetchFilteredHotels(sanFilters)
        .finally(() => {
          //this.SET_AVAILABLE_HOTELS_LOADER(false);
        });










      /* this.fetchFilteredHotels(this.filters).finally(() => {
        this.SET_AVAILABLE_HOTELS_LOADER(false);
      }); */


      /* console.log("iam search function  ");
      if (this.userChangesTimeOut) {
        clearTimeout(this.userChangesTimeOut);
      }
      this.userChangesTimeOut = setTimeout(() => {
        this.filters.uuid = this.uuid;
        this.filters.min_price = 0;
        this.filters.max_price = 50000;
        this.SET_AVAILABLE_HOTELS_LOADER(true);
        this.fetchAvailbleHotel(this.filters).finally(() => {
          this.SET_AVAILABLE_HOTELS_LOADER(false);
        });
      }, 500); */
    },
    ...mapMutations("hotels", ["SET_AVAILABLE_HOTELS_LOADER", "SET_AVAILABLE_HOTELS"]),
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 200);
    },
    clearPrices() {
      this.filters.max_price = 0;
      this.filters.min_price = 0;
      this.prices = [0, 500000];
      this.onSearch();
    },

    formatePriceRange(value) {
      if (this.availbleHotels?.data?.max_price && Array.isArray(value)) {
        this.first = value[0] + " SAR";
        this.last = value[1] + " SAR";
      }
    },

    ...mapActions("hotels", ["fetchAvailbleHotel"]),
    ...mapActions("hotels", ["fetchFilteredHotels"]),
    handleChange: val => {
      console.log(val);
    }
  },
  computed: {
    ...mapState("hotels", [
      "availbleHotels",
      "uuid",
      "enableFilters",
      "hotelsLoader"
    ]),

    rates() {
      if (this.availbleHotels.rates) {
        console.log("this.availbleHotels.rates", this.availbleHotels.rates);
        let count = this.availbleHotels.rates;
        return count;
      } else {
        return [];
      }
    },
    storageHotels() {
      let storage = localStorage.getItem("availbleHotels");
      if (storage) {
        return JSON.parse(storage);
      } else {
        return null;
      }
    }
  },
  created() {
    this.SET_AVAILABLE_HOTELS({});
    let decoded = decodeURIComponent(this.$route.query.x);
    let parsed = JSON.parse(decoded);
    this.query = parsed;
  },
  watch: {}
};
</script>
<style scoped>
.el-collapse {
  border-top-color: transparent;
}

.side-card {
  border-top: none !important;
  box-shadow: none;
  border-radius: 0px;
}

.checkbox-input>.el-checkbox__input {
  display: none !important;
}

/* .el-checkbox__input {
} */

.el-checkbox.is-bordered.is-checked {
  border: 3px solid #5808d8;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px !important;
}

.el-checkbox.is-bordered.is-checked,
.el-checkbox.is-bordered.el-checkbox--large {
  padding: 11%;
}

.rounded-style {
  width: 40px;
  height: 40px;
  display: inline-block;
  text-align: center;
  margin: auto;
}

.rounded-style2 {
  width: 40px;
  /* height: 40px; */
  display: inline-block;
  text-align: center;
  margin: auto;
}

.check-box-color>.el-checkbox__input.is-checked>.el-checkbox__inner {
  background-color: #000000 !important;
}

.check-box-color>.el-checkbox__label {
  color: #000000 !important;
}

.last-item>div>div,
.last-item>.el-collapse-item__wrap {
  border-bottom: 0px solid;
}

.el-card.is-always-shadow {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

.title-collapse>div>div {
  font-weight: 800;
  color: #000000 !important;
}
</style>
