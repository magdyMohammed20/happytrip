<template>
  <el-dialog
    v-model="editReservationDialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="true"
    @close="SET_EDIT_RESERVATION_DIALOG(false)"
    class="border-rounded-xl w-[40%]"
  >

    <el-form ref="formRef" :model="form">
      <el-row class="flex justify-between w-full" :gutter="20">
        <el-col :span="24" class="flex flex-col text-center">
          <h3>Edit Your Reservation Data</h3>
          <el-form-item prop="destination_code">
            <el-select
              v-model="destinationObj.code"
              filterable
              :trigger-on-focus="true"
              remote
              clearable
              reserve-keyword
              placeholder="Select Destination"
              :remote-method="fetchCountriesWithCodes"
              remote-show-suffix
              class="w-full"
              @change="form.destinationCode = destinationObj.code"
            >
              <el-option
                v-for="item in countriesWithCodes"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="date_picker" :rules="nameRules" class="flex">
            <range-date-picker></range-date-picker>
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
          <el-button type="primary" class="p-5 font-bold" @click="editReservation">
            Edit Reservation
          </el-button >
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      destinationObj: {
        label: "",
        code: "",
      },
      form: {},
    };
  },
  computed: {
    ...mapState("dateRangePicker", ["datePickerForm"]),
    ...mapState("globalStore", ["countriesWithCodes"]),
    ...mapState("userAccount", ["editReservationDialog"]),
    rules() {
      return {
        destinationCode: [
          {
            required: true,
            message: "Please select a destination",
            trigger: "change",
          },
        ],
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
    ...mapActions("globalStore", ["fetchCountriesWithCodes"]),
    ...mapMutations("userAccount", ["SET_EDIT_RESERVATION_DIALOG"]),
    editReservation(){
      let booking_id = this.$route.params.id
      this.$axios
        .post(`api/hotels/editBooking/${booking_id}`)
        .then((res)=>{
          this.SET_EDIT_RESERVATION_DIALOG(false)
          this.$toast.show(res.data.message)
        })
    }
  },
  created() {
    this.fetchCountriesWithCodes();
  },
  watch: {
    datePickerForm: {
      handler(val) {
        this.form.check_in = val.checkIn;
        this.form.check_out = val.checkOut;
        console.log(val);
      },
    },
  },
};
</script>
