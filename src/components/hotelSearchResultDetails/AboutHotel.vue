<template>
  <el-col>
    <h3 class=" font-extrabold">ABOUT Hotel</h3>
    <h5 class=" font-extrabold">WELCOME TO {{ availbleHotelsDetails?.data?.hotel?.name }} ... A FUSION OF ENTERTAINMENT.
    </h5>
    <p class="text-sm text-slate-600">


      <!-- {{ availbleHotelsDetails?.data?.hotel?.descriptions[0]?.Text }} -->
      {{ availbleHotelsDetails?.data?.rooms[0].description }}
    </p>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    /* if (this.availbleHotelsDetails.hotel) {
      // console.log("heeeeeeyyy",this.availbleHotelsDetails.hotel.descriptions.text)

    } */
  },
  computed: {
    ...mapState("hotels", ["availbleHotelsDetails"])
  }
};
</script>