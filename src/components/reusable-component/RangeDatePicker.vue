<!-- this component expose variable datePickerForm as  { "checkOut": "2023-09-29", "checkIn": "2023-09-28" } -->
<template>
  <el-row class="justify-between mb-4 w-full">
    <el-col :span="24" class="flex w-full relative">
      <el-input
        dense
        v-model="form.checkIn"
        placeholder="Choose checkin and checkout date"
        class="my-2"
        @click="showCalender = !showCalender"
      />
      <VDatePicker
        @update:modelValue="showCalender = false"
        color="pink"
        v-model.range="dates"
        :masks="masks"
        v-if="showCalender"
        class="absolute top-15 left-0 z-50"
      />
      <p class="inline-flex px-1" v-if="form.checkOut">to</p>

      <el-input
        v-model="form.checkOut"
        v-if="form.checkOut"
        placeholder="Choose checkin and checkout date"
        class="my-2"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      showCalender: false,
      form: {
        checkOut: "",
        checkIn: "",
      },
      dates: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  methods: {
    ...mapMutations("dateRangePicker", ["SET_DATE_RANGE"]),
    separateDates() {
      // checkin date formate

      const day = this.dates.start.getDate().toString().padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const month = (this.dates.start.getMonth() + 1)
        .toString()
        .padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const year = this.dates.start.getFullYear(); // get the year (4 digits)

      const formattedDate = `${year}-${month}-${day}`; // format the date as a string
      // checkout date formate
      const checkoutDay = this.dates.end.getDate().toString().padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const checkoutMonth = (this.dates.end.getMonth() + 1)
        .toString()
        .padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const checkoutYear = this.dates.end.getFullYear(); // get the year (4 digits)

      const checkoutFormattedDate = `${checkoutYear}-${checkoutMonth}-${checkoutDay}`; // format the date as a string
      this.form.checkIn = formattedDate;
      this.form.checkOut = checkoutFormattedDate;
      console.log(formattedDate);
    },
  },
  computed: {
    ...mapState("dateRangePicker", ["datePickerForm"]),
  },
  watch: {
    dates: {
      handler() {
        this.separateDates();
        this.SET_DATE_RANGE(this.form);
        this.form = { ...this.datePickerForm };
      },
      deep: true,
    },
    datePickerForm: {
      handler(newVal) {
        this.form = newVal;
      },
      deep: true,
    },
  },
};
</script>
