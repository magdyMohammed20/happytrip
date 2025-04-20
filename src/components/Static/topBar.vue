<template>
  <el-row class="flex">
    <el-col :span="24" :lg="24" :md="24">
      <el-card class="box-card lg:md:px-20 sm:px-0">
        <div class="lg:md:flex justify-between">
          <div class="flex items-center">
            <div class="bg-yellow-400 inline h-10 w-10 text-center rounded-full sm:hidden lg:block">
              <span :class="icon" class="pt-5 text-4xl text-white"></span>
            </div>
            <div class="inline px-3">
              <p class="mt-0 mb-0 font-bold">{{ header }}</p>
              <p class="mt-0 mb-0 font-thin">{{ city }}</p>
              <p class="mt-0 mb-0 font-thin">Review {{ title }}</p>
            </div>
          </div>
          <div>
            <!-- <router-link to="/FeaturedHotels" class="no-underline"> -->
              <el-button type="success" @click="toDestination" class="px-10 my-5 text-xs font-bold">
                <span class="i-mdi-arrow-left"></span>
                Search for another hotels
              </el-button>
            <!-- </router-link> -->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ["header", "title", "icon", "city","toPath"],
  methods:{
    toDestination(){
      this.$router.push(this.toPath)
    }
  }
};
</script>