<template>
  <!-- <div class="py-3">
    <h3 class="font-extrabold">Your progress</h3>
    <div class="bg-slate-500/10 custom-border p-8 flex justify-around">
      <div>
        <p class="text-bold">
          {{ loyaltyData.allNights > 0  ? loyaltyData.allNights : 0 }}
          nights collected
        </p>
        <p class="text-slate-600">Collect 10 nights by Apr 8, 2020 to become a Silver member.</p>
      </div>
      <div>
        <img src="../../../src/assets/images/eclipseOneMoon.png" />
      </div>
    </div>
    <el-progress v-if="loyaltyData.reminderNights>0 ? loyaltyData.reminderNights : 0" :text-inside="true" :stroke-width="22" :percentage="calculatedPercentage" status="success" />
  </div>
  <div class="py-3">
    <h3 class="text-bold p-0 m-0">Want more information?</h3>
    <p class="p-0 m-0">
      Find out everything you need to know about Hotels.com™ Rewards, including how it works and the
      benefits of being a Silver and Gold member.
    </p>
  </div> -->

  <div class="py-3">
    <div class="demo-collapse" v-if="userActivities.length > 0">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="Your Membership Activity" name="1">
    <div >
      <div class="bg-slate-500/4 custom-border p-8 custom-time-line">
        <el-timeline>
          <el-timeline-item
            v-for="activity in userActivities"
            center
            type="primary"
            color="indigo-200"
            size="large"
          >
            <p class="pt-5 pb-0 m-0">
              Thank you for booking with happy trip
              <span v-if="activity.hotel" class="text-3">({{ activity.hotel.name }}).</span>
            </p>
            <p class="text-xs text-gray-400 py-0 my-0">
              From : {{checkin(activity.check_in)}}
              <span class="i-mdi-arrow-right"></span>
              To : {{checkout(activity.check_out)}}
            </p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    </el-collapse-item>
    </el-collapse>
    </div>
    <div v-else>
      <div class="bg-slate-500/2 custom-border px-8">
        <p class="text-gray-500 text-xl py-0 my-0">You have no Activities</p>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      activeName:'2'
    }
  },
  computed: {
    ...mapState("loyalty", ["userActivities", "loyaltyData"]),
    calculatedPercentage(){
      return Math.round((100 * this.loyaltyData.reminderNights / 15))
    }
  },
  methods: {
    checkin(date) {
      return new Date(date).toDateString();
    },
    checkout(date) {
      return new Date(date).toDateString();
    }
  }
};
</script>
<style>
.custom-time-line > .el-timeline > .el-timeline-item > .el-timeline-item__tail {
  left: 1px;
  height: 100%;
  border: 4px solid #ebebeb;
  border-radius: 15px;
}
</style>