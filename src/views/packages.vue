<template>
  <top-bar icon="i-mdi-present" toPath="/" title="Available Packages"></top-bar>
  <!-- Search & filters -->
  <el-row class="pr-20 flex">
    <el-col :span="24" :lg="6" :sm="24" class="h-full">
      <div class="flex flex-col">
        <p class="font-bold text-center">Filter by</p>
        <div class="px-10 pt-5 text-center">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="Start date"
            size="default"
          />
        </div>
        <div class="px-10 py-5 text-center">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="End date"
            size="default"
          />
        </div>
        <div class="filter-bar slider-demo-block px-10">
          <p class="text-md">Price range</p>
          <el-slider
            v-model="form.priceRange"
            @input="formatePriceRange(form.priceRange)"
            :show-tooltip="false"
            :min="min"
            :max="max"
            range
            class
          />
          <div class="flex justify-between">
            <p class="inline text-xs text-slate-400">{{ first }}</p>
            <p class="inline text-xs text-slate-400">{{ last }}</p>
          </div>
        </div>
        <div class="text-center py-5">
          <el-button
            class="flex-grow-1 text-white font-bold bg-#1CCF3D text-center p-5 rounded-xl hover:bg-violet-700 ease-in-out duration-300"
            @click="filterData(form)"
            >Filter</el-button
          >
        </div>
      </div>
    </el-col>

    <!-- end search and filters -->
    <el-col :span="24" :lg="16" :sm="24" class="m-auto">
      <packages-cards></packages-cards>
    </el-col>
  </el-row>
  <el-row> </el-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        startDate: null,
        endDate: null,
        category: this.$route.params.id,
        priceRange: [0, 1000000],
      },
      min: 200,
      max: 9997,
    };
  },
  methods: {
    ...mapActions("packages", ["fetchpackages"]),

    formatePriceRange(value) {
      this.first = value[0] + " " + "SAR";
      this.last = value[1] + " " + "SAR";
      return this.first;
    },
    filterData(form) {
      form.priceRange = this.form.priceRange[0] + "," + this.form.priceRange[1];
      this.fetchpackages(form);
    },
  },
  mounted() {
    this.form.priceRange =
      this.form.priceRange[0] + "," + this.form.priceRange[1];
    this.fetchpackages(this.form);
  },
};
</script>
<style scoped>
.filter-bar {
  flex: 1;
}
</style>
