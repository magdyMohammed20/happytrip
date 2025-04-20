<template>
  <div>
    <el-row :gutter="20" justify="space-between" class="pt-5">
      <el-col :span="24" :sm="18" :md="6" :lg="6">
        <div>
          <div style="font-weight: bold; color: black" class="mb-3">CONTACT</div>
          <div class="my-0 bb-0">
            <p class="text-gray-600 font-extrabold mb-0 mt-5">1234 567 890</p>
          </div>
          <div class="sm:mb-10 lg:md:mb-0">
            <p class="text-gray-600 font-extrabold">happytrip@sales.com</p>
          </div>
          <div class="sm:pt-2 lg:pt-15 md:pt-5">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
      </el-col>

      <el-col :span="6" :sm="6" :md="6" :lg="6">
        <div>
          <div class="text-gray-900 font-bold mb-5">USEFUL LINKS</div>
          <div class="text-gray-500 mb-4">Flights</div>
          <div class="text-gray-500 mb-4">Hotels</div>
          <div class="text-gray-500 mb-4">Deals</div>
          <div class="text-gray-500 mb-4">Discounts</div>
        </div>
      </el-col>

      <el-col :span="24" :sm="6" :xs="6" :md="6" :lg="6">
        <div>
          <div class="text-gray-900 font-bold mb-5">SOCIAL</div>
          <div class="text-gray-500 mb-4">Facebook</div>
          <div class="text-gray-500 mb-4">Twitter</div>
          <div class="text-gray-500 mb-4">Instagram</div>
          <div class="text-gray-500 mb-4">Snapchat</div>
        </div>

      </el-col>

      <el-col :span="24" :sm="6" :xs="6" :md="6" :lg="6">
        <div>
          <div class="text-gray-900 font-bold mb-5">OTHER INFO</div>
          <div class="text-gray-500 mb-4">About</div>
          <div class="text-gray-500 mb-4">Contact</div>
          <div class="text-gray-500 mb-4">Help</div>
          <div class="text-gray-500 mb-4">Sitemap</div>
        </div>

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="15" style="color: black" class="mt-2 mb-5">
        &copy; 2022 Happytrip
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data() {
    return {
      language: null,
    };
  },
};
</script>

<style scoped>
.el-col {
  font-size: 13px;
}
</style>
