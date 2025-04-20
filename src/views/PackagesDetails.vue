<template>
  <top-bar
    icon="i-mdi-cloud-percent"
    toPath="/"
    title="Available Package Details"
  ></top-bar>
  <!-- <el-col :span="24" :lg="24" class="lg:flex sm:hidden">
            <el-carousel indicator-position="outside" class="w-full h-full bg-carsoul hotel-carsoul">
                <el-carousel-item v-for="image in packageDetails.scheduale" :key="image">
                    <img :src=" imageBaseURL + image.image"
                        @error="handleImageFailure(image.path)" class="landing-image w-full" />
                </el-carousel-item>
            </el-carousel>
            <img src="../assets/images/mapImage.png" class="map-image sm:hidden  lg:block md:hidden" />
        </el-col> -->

  <header-packages-card></header-packages-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      imageBaseURL: "http://backend.happytbooking.com/storage/",
      rate: 5,
      date: "",
      value: 5,
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions("packages", ["fetchPackagesDetails"]),
  },
  created() {
    this.fetchPackagesDetails(this.$route.params.id);
  },
  watch: {
    profileData: {
      handler: function (newVal, oldVal) {
        if (newVal.id) {
          this.fetchPackagesDetails({
            id: this.$route.params.id,
            customer_id: newVal.id,
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState("packages", ["packageDetails"]),
    ...mapState("userAccount", ["profileData"]),
  },
};
</script>
<style>
.el-carousel__container {
  height: 100%;
}

.el-carousel--horizontal {
  overflow: hidden;
}
</style>
