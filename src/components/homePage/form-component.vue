<template>
  <el-row>
    <el-col :span="18" class="mb-3 flex">
      <el-card shadow="never" :body-style="{
        padding: '10px',
      }" class="rounded-3 w-[90%]">
        <div class="flex">
          <div class="w-full">
            <el-button size="large" :type="isHotel ? 'primary' : 'default'"
              class="flex-grow-1 rounded-3 w-full border-none mx-1" @click="isHotel = true">Hotel</el-button>
          </div>

          <div class="w-full">
            <el-button disabled size="large" :type="isHotel ? 'default' : 'primary'"
              class="flex-grow-1 w-full rounded-3 border-none mx-1" @click="isHotel = false">Flight</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :span="18" class="mb-3">
      <el-form ref="ruleFormRef" :rules="rules" :model="form" class="w-100">
        <h1 class="text-#42436A font-adj">Looking For Hotels?</h1>

        <div class="w-full my-5">
          <el-form-item prop="destinationCode">
            <el-select v-model="destinationObj.code" filterable :trigger-on-focus="true" remote clearable
              reserve-keyword placeholder="Select Destination" :remote-method="fetchCountriesWithCodes"
              remote-show-suffix class="w-full" @change="form.destinationCode = destinationObj.code">
              <el-option v-for="item in countriesWithCodes" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </div>
        <div>
          <range-date-picker></range-date-picker>
        </div>
        <div>
          <span class="mb-2">Rooms Choices</span>
          <el-form-item prop="room_num">
            <el-select v-model="roomCount" class="my-3 w-full" @change="handleChangeCountOfRooms(roomCount)">
              <el-option v-for="item in 4" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- ROOM DATA -->
        <div v-for="(room, index) in form.rooms" :key="room">
          <p class="text-xs text-slate-400 pb-0 mb-0">Room {{ index + 1 }}</p>
          <div class="flex">
            <el-input-number v-model="room.Adults" class="my-1" :min="0" :max="9" placeholder="Adults" />
            <el-input-number v-model="room.Children" class="m-1" :min="0" :max="9" placeholder="Kids"
              @change="handleChangeCountOfKids(index, room.Children)" />
          </div>
          <div class="flex m-1 gap-3 w-80 flex-wrap">
            <!-- [Number(childRoom) -1] in orderto add in index zero of  room.ChildrenAges array not on index 1 -->
            <el-select v-for="childRoom in Number(room.ChildrenAges.length)" :key="childRoom"
              v-model="room.ChildrenAges[Number(childRoom) - 1]" placeholder="Kid Age" style="width: 140px">
              <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </div>

        <el-button :span="24"
          class="w-full text-white font-bold bg-#1CCF3D text-center mt-3 no-underline p-5 rounded-xl hover:bg-violet-700 hover:text-white ease-in-out duration-300 justify-center items-center"
          @click="toSearchResults()">{{ isHotel ? "Check Availibility" : "Search Flights" }}</el-button>
        <div class="separator text-slate-300 my-3">Or</div>
        <router-link to="/packagesCategories">
          <el-button size="large"
            class="w-full text-white font-bold bg-#1CCF3D text-center no-underline p-2 rounded-xl hover:bg-violet-700 hover:text-white ease-in-out duration-300">Check
            Packages</el-button>
        </router-link>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      label: "",
      userChangesTimeOut: null,
      roomCount: 1,
      currencyType: window.localStorage.getItem("CURR"),
      showCalender: false,
      inputValue: "",
      date: "",
      form: {
        checkOut: "",
        adults_num: 0,
        children_num: 0,
        room_num: 1,
        children_ages: [],
        destinationCode: "",
        nationality: "EG",
        rooms: [
          {
            Adults: 2,
            Children: null,
            ChildrenAges: [],
          },
        ],
        checkIn: "",
        checkOut: "",
      },
      roomDetails: [{}],
      attrs: [
        {
          key: "test",
          highlight: true,
          dates: {
            start: new Date(2019, 3, 15),
            end: new Date(2019, 3, 19),
          },
        },
      ],
      destinationObj: {
        label: "",
        code: "",
      },
      url: "../assets/images/homePage/whitePlane.png",
      isHotel: true,
      // flights
      data: "",
      activeTab: null,
    };
  },

  methods: {
    toPage() {
      const path = "/HotelSearchResult";
      let enCodeQuery = encodeURIComponent(JSON.stringify(this.form));
      this.$router.push({
        path: path,
        query: {
          x: enCodeQuery,
        },
      });
      this.uuid
        ? this.fetchHotels(this.form)
          .then(() => { })
          .catch((e) => {
            this.$toast.error(e);
          })
        : "";
    },
    formCounters() {
      this.form.room_num = this.form.rooms.length;
      this.form.rooms.forEach((element) => {
        !element.Adults ? (element.Adults = 0) : element.Adults;
        !element.Children ? (element.Children = 0) : element.Children;
        this.form.adults_num += Number(element.Adults);
        this.form.children_num += Number(element.Children);
      });
      this.form.room_num = this.form.rooms.length;
    },
    handleChangeCountOfRooms(value) {
      // If Current value is less than the previous value, remove the last element from the array
      if (this.form.rooms.length > value) {
        this.form.rooms.splice(value);
      } else {
        // If Current value is greater than the previous value, add values to the array
        for (let i = this.form.rooms.length;i < value;i++) {
          this.form.rooms.push({
            Adults: null,
            Children: null,
            ChildrenAges: [],
          });
        }
      }
    },
    handleChangeCountOfKids(roomIndex, numberOfKids) {
      let childrenAgesCount = this.form.rooms[roomIndex].ChildrenAges.length;
      if (numberOfKids > childrenAgesCount) {
        // if user add kid will add another input of null without adding nulls in all arrays
        let diff = numberOfKids - childrenAgesCount;
        for (let i = 0;i < diff;i++) {
          this.form.rooms[roomIndex].ChildrenAges.push(null);
        }
      } else if (numberOfKids < childrenAgesCount) {
        // if user remove kid will remove input without adding nulls in all arrays
        let diff = childrenAgesCount - numberOfKids;
        for (let i = 0;i < diff;i++) {
          this.form.rooms[roomIndex].ChildrenAges.pop();
        }
      } else {
        // handle first input
        // fill the array with null values
        this.form.rooms[roomIndex].ChildrenAges =
          Array(numberOfKids).fill(null);
      }
    },
    ...mapMutations("dateRangePicker", ["SET_DATE_RANGE"]),
    ...mapActions("globalStore", ["fetchCountriesWithCodes"]),
    ...mapActions("hotels", ["fetchHotels"]),

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
    toSearchResults() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return;
        if (!this.datePickerForm.checkIn) {
          this.$toast.error("Please Select Checkin Date");
          return;
        }
        this.formCounters();
        this.form.checkIn = this.datePickerForm.checkIn;
        this.form.checkOut = this.datePickerForm.checkOut;
        this.form.currency = this.currentCurrency;
        this.$store.commit("payment/SET_SEARCH_FORM", this.form);
        this.toPage();
        this.SET_DATE_RANGE({});
      });
    },
  },
  mounted() {
    alert(1)
    this.fetchCountriesWithCodes();
  },
  computed: {
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
    ...mapState("hotels", ["uuid"]),
    ...mapState("globalStore", ["countriesWithCodes"]),
    ...mapState("dateRangePicker", ["datePickerForm"]),
    roomNum() {
      let roomNums = [];
      for (let i = 1;i < 9;i++) {
        roomNums.push({
          label: i,
          value: i,
        });
      }
      return roomNums;
    },
    currentCurrency() {
      return this.currencyType ? this.currencyType : "SAR";
    },
    kidsAges() {
      let kidsAges = [];
      for (let i = 1;i < 16;i++) {
        kidsAges.push({
          label: i,
          value: i,
        });
      }
      console.log(kidsAges);
      // roomNums = []
      return kidsAges;
    },
  },
};
</script>
