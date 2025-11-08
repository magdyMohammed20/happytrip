<template>
  <el-dialog
    v-model="editReservationDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    @close="SET_EDIT_RESERVATION_DIALOG(false)"
    width="500px"
    class="border-rounded-xl"
  >
    <el-form ref="formRef" :model="form">
      <el-row class="flex justify-between w-full" :gutter="20">
        <el-col :span="24" class="flex flex-col text-center">
          <h3>Edit Your Reservation Data</h3>
          <el-form-item prop="date_picker" class="flex">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="To"
              start-placeholder="Check-in"
              end-placeholder="Check-out"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              @change="handleDateChange"
              class="w-full"
            />
          </el-form-item>
          <div class="flex justify-center">
            <el-form-item prop="adults_num">
              <el-input-number
                v-model="form.adults_num"
                class="my-1"
                :min="0"
                :max="9"
                placeholder="Adults"
              />
            </el-form-item>
            <el-form-item prop="childern_num">
              <el-input-number
                v-model="form.children_num"
                class="m-1"
                :min="0"
                :max="9"
                placeholder="Kids"
              />
            </el-form-item>
            <el-form-item prop="room_num">
              <el-input-number
                v-model="form.room_num"
                class="m-1"
                :min="0"
                :max="9"
                placeholder="Room"
              />
            </el-form-item>
          </div>
          <el-button
            type="primary"
            class="p-5 font-bold"
            @click="editReservation"
          >
            Edit Reservation
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        check_in: "",
        check_out: "",
        adults_num: 1,
        children_num: 0,
        room_num: 1,
      },
      dateRange: [],
    };
  },
  computed: {
    ...mapState("userAccount", ["editReservationDialog", "reservation"]),
    ...mapState("checkout", ["checkoutData"]),
    rules() {
      return {
        room_num: [
          {
            required: true,
            message: "Please select a room number",
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    ...mapMutations("userAccount", ["SET_EDIT_RESERVATION_DIALOG"]),

    loadCheckoutData() {
      // Get data from localStorage filters
      const filters = JSON.parse(localStorage.getItem("filters") || "{}");

      console.log("Loading checkout data from filters:", filters);

      // Prefill form with checkout data
      if (filters && Object.keys(filters).length > 0) {
        this.form.adults_num = filters.rooms?.[0]?.adults_number || 1;
        this.form.children_num = filters.rooms?.[0]?.children_number || 0;
        this.form.room_num = 1;

        // Set dates
        const checkIn = filters.checkIn || "";
        const checkOut = filters.checkOut || "";

        if (checkIn && checkOut) {
          this.form.check_in = checkIn;
          this.form.check_out = checkOut;
          this.dateRange = [checkIn, checkOut];
        }
      }

      // If reservation data exists, use it (overrides filters)
      if (this.reservation && Object.keys(this.reservation).length > 0) {
        this.form.adults_num =
          this.reservation.adults_num || this.form.adults_num;
        this.form.children_num =
          this.reservation.children_num || this.form.children_num;
        this.form.room_num = this.reservation.room_num || this.form.room_num;

        if (this.reservation.check_in && this.reservation.check_out) {
          this.form.check_in = this.reservation.check_in;
          this.form.check_out = this.reservation.check_out;
          this.dateRange = [
            this.reservation.check_in,
            this.reservation.check_out,
          ];
        }
      }

      console.log("Loaded form data:", this.form);
      console.log("Date range:", this.dateRange);
    },

    handleDateChange(value) {
      if (value && value.length === 2) {
        this.form.check_in = value[0];
        this.form.check_out = value[1];
        console.log("Date changed:", {
          check_in: value[0],
          check_out: value[1],
        });
      } else {
        this.form.check_in = "";
        this.form.check_out = "";
      }
    },

    editReservation() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const booking_id = this.$route.params.id;
          const payload = {
            check_in: this.form.check_in,
            check_out: this.form.check_out,
            adults_num: this.form.adults_num,
            children_num: this.form.children_num,
            room_num: this.form.room_num,
          };

          console.log("Editing reservation with:", payload);

          this.$axios
            .post(`api/hotels/editBooking/${booking_id}`, payload)
            .then((res) => {
              this.SET_EDIT_RESERVATION_DIALOG(false);
              this.$toast.success(
                res.data.message || "Reservation updated successfully",
              );
            })
            .catch((err) => {
              console.error("Edit reservation error:", err);
              this.$toast.error(
                err.response?.data?.message || "Failed to update reservation",
              );
            });
        } else {
          this.$toast.error("Please fill all required fields");
        }
      });
    },
  },
  created() {
    this.loadCheckoutData();
  },
  watch: {
    editReservationDialog(val) {
      if (val) {
        // Reload data when dialog opens
        this.$nextTick(() => {
          this.loadCheckoutData();
        });
      }
    },
  },
};
</script>
