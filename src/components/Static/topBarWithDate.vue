<template>
  <el-col v-loading.fullscreen.lock="fullscreenLoading" :span="24" :lg="24" :md="24">
    <el-card class="box-card lg:md:px-20 sm:px-0">
      <div class="lg:md:flex justify-between">
        <div class="flex">
          <div class="bg-yellow-400 inline h-10 w-10 text-center rounded-full sm:hidden lg:block">
            <span class="i-mdi-building pt-5 text-4xl text-white"></span>
          </div>
          <div class="inline px-3">

            <!-- 111-{{ JSON.stringify(availbleHotels?.data?.hotel) }} -->
            <!-- <p class="mt-0 mb-0 font-thin">SEARCH SUMMERY</p> -->
            <P class="font-bold mb-0 mt-0" v-if="availbleHotels">
              <!--    {{
              availbleHotels.destination
            }} -->
              {{ availbleHotels?.data?.hotel?.address }}
            </P>
            <div class="flex align-center" v-if="availbleHotels">

              <span class="text-xs font-bold mt-0 mb-0 text-slate-500">from :
                {{ filterData.checkIn }}
                <!-- {{ availbleHotels.check_in }} --></span>
              <!-- music-note-whole -->

              <span class="text-xs font-bold mt-0 px-1 text-slate-500 flex align-center">
                <span class="i-mdi-music-note-whole text-red text-sm"></span>
                to:{{ filterData.checkOut }} <!-- {{ availbleHotels.checkOut }} -->
              </span>
              <span class="text-xs font-bold pl-5 mt-0 mb-0 text-slate-500">
                {{ filterData.adults_num }}
                <!-- {{ availbleHotels.adults }} --> Adult &
                <!-- {{ availbleHotels.children }} -->
                {{ filterData.children_num }}
                Kid
              </span>
              <!-- music-note-whole -->

              <span class="text-xs font-bold mt-0 px-1 text-slate-500 flex align-center">
                <span class="i-mdi-music-note-whole text-sm text-red"></span>
                <!-- {{ availbleHotels.rooms_count }} -->
                {{ availbleHotels?.data?.rooms_count }}Room
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
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["availbleHotels"],
  data() {
    return {};
  },
  computed: {
    filterData() {
      return JSON.parse(localStorage.getItem('filters'))
    }
  }
};
</script>
