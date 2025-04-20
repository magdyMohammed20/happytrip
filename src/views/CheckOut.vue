<template>
  <el-row class="lg:md:px-20 sm:px-5 py-10">
    <el-col>
      <el-steps
        :space="300"
        process-status="finish"
        :active="active"
        align-center
        finish-status="success"
        class="justify-center"
      >
        <el-step title="Review Hotel Details" />
        <el-step title="Traveller Details" />
        <el-step title="Payment" />
      </el-steps>
    </el-col>
  </el-row>

  <el-row class="lg:md:px-20 sm:px-4 pb-10 justify-between" v-if="active != 3">
    <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24">
      <review-card></review-card>
      <welcome-card></welcome-card>
    </el-col>
    <el-col :span="24" :lg="7" :sm="24" :md="7" :xs="24" class="sm:mt-10 lg:md:mt-0">
      <check-out-right-card></check-out-right-card>
    </el-col>
    <!-- <payment-card></payment-card> -->
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      active: 2
    };
  },
  created() {
    let decoded = decodeURIComponent(this.$route.query.q);
    let parsedQuery = JSON.parse(decoded);
    console.log("parsedQueryyyyyyyyyy", parsedQuery);
    this.fetchCheckoutData(parsedQuery)
      .then(() => this.$toast.show("Success"))
      .catch(e => this.$toast.error(e));
  },
  methods: {
    ...mapActions("checkout", ["fetchCheckoutData"])
  }
};
</script>

<style>
.el-card.is-always-shadow {
  box-shadow: var(--el-box-shadow-light);
}
@media (max-width: 550px) {
  .el-step__title {
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }
}
</style>
