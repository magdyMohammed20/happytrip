<template>
  <el-row
    class="text-#42436A px-0 sm:px-0 h-80 py-2 flex flex-col justify-center mb-10 p-20"
  >
    <el-carousel :interval="5000" arrow="always" class="sm:hidden lg:md:block h-80 sm:px-0">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="container-layer">
          <img
            src="../../../src/assets/images/homePage/compoundView.png"
            class="w-full"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-col
      :span="24"
      :md="24"
      :xs="18"
      :sm="20"
      :lg="24"
      class="text-#42436A px-4  form drop-shadow-md py-2"
    >
      <h1 class="leading-10 md:!text-8 sm:!text-6">Sign up for weekly Deals*</h1>

      <p class="leading-6 mb-5 sm:max-w-fit lg:w-80">
        Subscribe to our newsletter so we can spam you with offers and discounts.
      </p>
      <div class="flex">
        <!-- <el-input
          autosize
          size="large"
          v-model="data"
          placeholder="Enter your Email"
          class="drop-shadow-2xl lg:md:w-80 sm:w-100 pr-5"
        /> -->
        <div class="">
          <el-button class="w-15 py-5 z-5 text-white font-bold bg-#1CCF3D"
            >send</el-button
          >
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script></script>
<style>
.btn-shadow {
  box-shadow: 10px 10px 35px 6px rgba(28, 207, 61, 0.3);
  -webkit-box-shadow: 10px 10px 35px 6px rgba(28, 207, 61, 0.3);
  -moz-box-shadow: 10px 10px 35px 6px rgba(28, 207, 61, 0.3);
}

.bg-img {
  /* background-image: url(../../assets/images/homePage/compoundView.png); */
  background-size: cover;
  /* background-image: linear-gradient(rgba(194, 194, 194, 0.5),rgba(114, 114, 114, 0.5)), url(../../assets/images/homePage/compoundView.png); */
  background-image: linear-gradient(rgb(255 255 255 / 50%), rgb(255 255 255 / 50%)),
    url(/src/assets/images/homePage/compoundView.png);
}

.form {
  position: absolute;
  top: 50% !important;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1% 1%;
  border-radius: 0.75rem;
}
.container-layer {
  opacity: 0.5;
}
</style>
