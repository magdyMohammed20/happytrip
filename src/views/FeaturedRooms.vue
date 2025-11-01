<template>
  <el-col :span="24" class="flex justify-between">
    <!-- <div>
        <p class="text-slate-500 text-sm lg:px-20 sm:px-5">
          Happytrip → Hotels Booking → {{ $route.params.name }}
        </p>
    </div>-->
    <div class="w-full" v-if="featuredHotelsRooms.hotel">
      <top-bar
        icon="i-mdi-building"
        :city="featuredHotelsRooms.hotel.city_name"
        header="Featured Hotels"
        toPath="/FeaturedHotels"
        :title="$route.params.name"
      ></top-bar>
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
  <el-row class="p-20">
    <room-choices-cards></room-choices-cards>
  </el-row>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("featuredHotels", [
      "featuredHotelsRooms",
      "featuredHotelsLoader",
    ]),
  },
  methods: {
    ...mapMutations("hotels", ["SET_AVAILABLE_HOTELS_DETAILS"]),
    ...mapMutations("featuredHotels", ["SET_FEATURED_HOTELS_LOADER"]),
    ...mapActions("featuredHotels", ["fetchFeaturedHotelsRooms"]),
  },
  created() {
    console.error(
      "this.$route.querythis.$route.querythis.$route.query",
      this.$route.query,
    );
    let decoded = decodeURIComponent(this.$route.query.x);
    let parsedQuery = JSON.parse(decoded);
    this.fetchFeaturedHotelsRooms(parsedQuery).then((res) => {
      this.SET_AVAILABLE_HOTELS_DETAILS(this.featuredHotelsRooms);
    });
  },
};
</script>
