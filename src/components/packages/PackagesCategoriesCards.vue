<template>
  
  <el-container class="justify-center">
    <el-row
      v-if="packagesCategoriesData.length == 0"
      class="lg:px-20 package-container justify-center"
    >
      <el-col :span="24" :lg="24" :md="24" :sm="24" class="px-2 md:flex py-5">
        <div class="h-[100%]">
          <p class="text-slate font-bold">
            Sorry There is no Available packages now may by later
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row class="lg:px-20 package-container flex">
      <el-col
        v-for="category in packagesCategoriesData"
        :span="24"
        :lg="10"
        :md="24"
        :sm="24"
        class="px-2 flex py-5 justify-between align-center"
      >
      <router-link class="w-full h-[300px] shadow-lg" :to="'/Packages/'+ category.id">
        <el-card
          class="w-full h-[300px] shadow-lg p-0 m-0 packages-categories-card"
        >
          <div class="relative h-[300px] w-full inline-block overflow-hidden">
            <img :src="category.image" class="w-full object-cover" />
            <div class="overlay">
              <div class="overlay-text">{{ category.name }}</div>
            </div>
          </div>
        </el-card>
      </router-link>
        <!-- <el-card class="w-full shadow-lg"  body-style="padding: 0px;">
          <div class="h-[100%] h-[500px]">
            <div
              class="flex flex-wrap  lg:justify-between md:justify-between  md:w-[100%] md:flex-row lg:flex-col sm:flex-col sm:justify-around sm:flex-col ">
              <div class="flex justify-center items-center h-[250px] w-full inline-block overflow-hidden">
                   <img :src="category.image" 
                   class="w-full h-full object-cover"
                />
              </div>
              <div
                class="sm:pb-5 md:border-b-0 lg:border-b-0 sm:border-b-1 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-dashed sm:border-slate-400 px-5 py-6">
                <h2 class="my-0">Your summer in Spain</h2>
                <div class="my-3 h-[1px] w-full rounded bg-gray-200 -mx-1"></div>
                <div class="-my-3 divide-y divide-gray-100 py-4 text-sm leading-6">
                  <div class="flex justify-between gap-y-2  ">
                    <span class="text-black text-xl">From</span>
                    <span class="text-black text-xl font-bold"> icon 09 night</span>
                  </div>
                  <div class="flex justify-between ">
                    <span class="text-black text-xl font-semibold">300 SAR</span>
                   <span class="text-black text-xl font-semibold">icon 09 night</span>
                  </div>
                </div>
                <div class="flex justify-between mt-7">
                    <span class="text-xl text-green">Installments are available</span>
                    <button class="text-xl  bg-green text-white rounded-lg px-3 py-2 border border-0">View Package Details </button>
                </div>
              </div>
       
      
            </div>
          </div>
        </el-card> -->
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("packages", ["packagesCategoriesData"]),
  },
};
</script>
<style>
.image-categories {
  width: 300px !important;
  height: 200px;
  object-fit: cover;
  align-content: center;
  display: flex;
}
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

.overlay-text {
  /* text-align: center; */
  width: 100%;
  position: absolute;
  bottom: 0; /* Position at the bottom */
  left: 0;
  color: #fff; /* Set the text color */
  padding: 10px 20px; /* Add some padding to the text */
  font-size: 20px; /* Adjust the font size */
}
.packages-categories-card > .el-card__body {
  padding: 0 !important;
  cursor: pointer;
}
.package-container {
  flex-wrap: wrap;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(217, 151, 229), rgb(189, 129, 229));
  color: white;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #d0afe8, #a589e6);
  right: 0;
  color: white;
}
</style>
