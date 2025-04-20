<template>
  <el-dialog
    v-model="cancellationDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    @close="SET_CANCELLATION_DIALOG(false)"
    class="border-rounded-xl w-[25%]"
  >
  <div class="">
      <p class="pt-0 pb-0 m-0 text-xl font-bold mb-7 m-auto text-center">
        Cancellation Policy Details
      </p>
      <el-timeline  v-if="
         (cancellationDialogData.cancellationPolicies[0].type == 'unFree')
       ">
        <el-timeline-item>
          <p class="text-red font-bold">Non-refunduble</p>
        </el-timeline-item>
      </el-timeline>
      <el-timeline
       v-else
      >
        <el-timeline-item
          v-for="policy in cancellationDialogData.cancellationPolicies"
          center
          type="primary"
          color="indigo-200"
          size="large"
        >
          <p class="text-sm text-green-600 pt-2 my-0">
            Amount : {{ policy.amount }} {{ currency }}
            <!-- <span class="i-mdi-arrow-right"></span> -->
            Till : {{ policy.from }}
          </p>
        </el-timeline-item>
      </el-timeline>
      
    </div>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      currency : localStorage.getItem("CURR") ? localStorage.getItem("CURR") : 'SAR'
    };
  },
  computed: {
    ...mapState("hotels", [
      "cancellationDialogData", "cancellationDialog"
    ]),
  },
  methods: {
    ...mapMutations("hotels", ["SET_CANCELLATION_DIALOG",]),
  },
  // SET_CANCELLATION_DIALOG
};
</script>
