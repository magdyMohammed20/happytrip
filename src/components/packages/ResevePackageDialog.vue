<template>
  <el-dialog
    v-model="reserveCard"
    title="Book Package"
    :close-on-press-escape="false"
    :draggable="true"
    :destroy-on-close="true"
    @close="SET_RESERVE_CARD(false)"
    :close-on-click-modal="false"
    class="sm:w-full md:w-[90%] lg:w-[60%] custom-border"
  >
    <div class="flex flex-wrap justify-between">
      <el-input dense v-model="form.firstname" placeholder="FIRST NAME" class="m-2 w-1/4" />
      <el-input dense v-model="form.middlename" placeholder="MIDDLE NAME" class="m-2 w-1/4" />
      <el-input dense v-model="form.lastname" placeholder="LAST NAME" class="m-2 w-1/4" />
    </div>

    <el-input dense v-model="form.email" placeholder="EMAIL" class="my-2" />
    <el-input dense v-model="form.phone" placeholder="PHONE" class="my-2" />
    <div class="flex flex-wrap justify-between">
      <el-input
        dense
        v-model="form.checkin"
        @click="calander_dialog = !calander_dialog"
        placeholder="Choose checkin and checkout date"
        class="m-2 w-[40%]"
      />
      <p class="inline-flex px-1" v-if="form.checkout!=''">to</p>
      <el-input
        v-model="form.checkout"
        v-if="form.checkout!=''"
        placeholder="Choose checkin and checkout date"
        class="my-2 w-[40%]"
      />
    </div>

    <el-input v-model="form.note" :rows="5" type="textarea" placeholder="NOTE..." />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="SET_RESERVE_CARD(false)">Cancel</el-button>
          <el-button
            @click="requestBookPackage();"
            type="primary"
            :disabled="!profileData.id || packageDetails.status=='pending'"
            :loading="loading"
            class="text-white font-bold bg-#1CCF3D text-center py-5 custom-border hover:bg-violet-200 ease-in-out duration-300"
          >
            Book Now
            <span
              v-if="!profileData.id"
              class="font-light text-xs px-2"
            >(login to book a package)</span>
            <span
              v-if="packageDetails.status=='pending'"
              class="font-light text-xs px-2"
            >(your request is pending ...)</span>
          </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="calander_dialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="false"
    append-to-body
    class="w-fit rounded-3xl text-center"
  >
    <VDatePicker color="pink" v-model.range="dates" :masks="masks" />
    <div>
      <el-button
        @click="calander_dialog = false;"
        size="large"
        class="flex-grow-1 rounded-3 text-pink-500 font-bold hover:bg-pink-200 hover:text-pink-500 mt-2 border-none mx-1"
      >Done</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      form: {
        checkin: "",
        checkout: ""
      },
      masks: {
        modelValue: "YYYY-MM-DD"
      },
      calander_dialog: false,
      inputValue: "",
      dates: {
        start: "2023-01-21",
        end: "2023-01-25"
      },
      date: "",
      attrs: [
        {
          key: "test",
          highlight: true,
          dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) }
        }
      ]
    };
  },
  computed: {
    ...mapState("packages", ["reserveCard", "packageDetails"]),
    ...mapState("userAccount", ["profileData"])
  },
  methods: {
    ...mapActions("packages", ["bookPackage", "fetchPackagesDetails"]),

    ...mapMutations("packages", ["SET_RESERVE_CARD"]),
    separateDates() {
      // checkin date formate
      const day = this.dates.start
        .getDate()
        .toString()
        .padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const month = (this.dates.start.getMonth() + 1)
        .toString()
        .padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const year = this.dates.start.getFullYear(); // get the year (4 digits)

      const formattedDate = `${year}-${month}-${day}`; // format the date as a string
      // checkout date formate
      const checkoutDay = this.dates.end
        .getDate()
        .toString()
        .padStart(2, "0"); // get the day of the month (1-31), convert to string and add leading zero if needed
      const checkoutMonth = (this.dates.end.getMonth() + 1)
        .toString()
        .padStart(2, "0"); // get the month (0-11), add 1 and leading zero if needed to get the correct month number (01-12)
      const checkoutYear = this.dates.end.getFullYear(); // get the year (4 digits)

      const checkoutFormattedDate = `${checkoutYear}-${checkoutMonth}-${checkoutDay}`; // format the date as a string
      this.form.checkin = formattedDate;
      this.form.checkout = checkoutFormattedDate;
      console.log(formattedDate);
    },
    requestBookPackage() {
      this.$router.push({ path: '/userAccount/userBookings', query: { activeName: 'package' } })
      this.loading = true;
      this.form.customer_id = this.profileData.id;
      this.form.package_id = this.packageDetails.id;
      this.form.booking_date = new Date();
      this.bookPackage(this.form)
        .then(() => {
          this.$toast.show(
            "you booked this package ...  our sales team will cotact you"
          );
          this.fetchPackagesDetails({
            id: this.$route.params.id,
            customer_id: this.profileData.id
          });
        })
        .catch(e => {
          this.$toast.error(e);
        })
        .finally(() => {
          this.loading = false;
          this.SET_RESERVE_CARD(false);
        });
    }
  },
  watch: {
    dates: {
      handler() {
        this.separateDates();
      },
      deep: true
    }
  },
};
</script>