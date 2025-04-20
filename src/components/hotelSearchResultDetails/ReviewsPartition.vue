<template>
  <div>
    <h3 class="font-extrabold">
      REVIEWS
      <span class="text-slate-400">({{ reviews.length }})</span>
    </h3>
    <div class="w-full" v-if="reviews.length !=0">
      <el-col class="lg:md:flex sm:block justify-start my-3" v-for="rev in reviews">
        <div class="lg:w-1/6 sm:w-1/2 md:w-1/2">
          <img class="p-0 m-0" src="../../assets/images/user.jpeg" width="40" />
          <p class="p-0 m-0 font-extrabold">{{rev.customer_name}}</p>
          <!-- <p class="p-0 m-0 text-slate-500 font-sm">1 Night Trip</p> -->
          <!-- <div class="demo-progress my-2">
                    <el-progress percentage="80" />
          </div>-->
          <div>
            <el-rate v-model="rev.rate" size="large" disabled text-color="#ff9900" />
          </div>
          <small class="text-slate-400 p-0 m-0">{{new Date(rev.date).toLocaleDateString()}}</small>
        </div>
        <div>
          <!-- <h5>Great ambience BUT Improve on your service</h5> -->
          <p class="text-sm text-slate-400">{{ rev.comment }}</p>
        </div>
      </el-col>
    </div>
    <div v-else class="text-sm text-slate-400 w-full my-5">There is no reviews available for hotel {{ $route.params.name }}</div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("hotels", ["reviews"])
  },
  methods: {
    ...mapActions("hotels", ["fetchHotelReviews"])
  },
  mounted() {
    this.fetchHotelReviews(this.$route.params.vervotech_id);
  }
};
</script>
<style scoped>
.landing-image,
.map-image {
  height: 100%;
  object-fit: cover;
  object-position: 100% 0%;
}

.landing-image {
  width: 100%;
}

.handle-card {
  width: 80%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.main-card {
  /* width: 70%; */
  margin: auto;
}

.main-card > .left-card {
  width: 60%;
  border-right: #dbdbdb 2px dashed;
}

#date-picker {
  width: 89% !important;
}

.right-card {
  width: 40%;
}

.block {
  margin-top: 10%;
}

.book-btn {
  width: 79% !important;
}

.dialog-sold-out > .el-dialog__body {
  text-align: center !important;
}

.para-filter {
  width: 75%;
  margin: auto;
}

.demo-progress .el-progress--line {
  margin: 0px 0px;
  width: 70%;
}
</style>