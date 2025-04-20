<template>

  <el-row class="justify-center">
    <el-col :span="18" class="mb-3">
      <h1 class="text-#42436A font-adj">Search for Featured Hotels</h1>

      <!-- <div class="w-full my-5">
        <el-autocomplete
          :fetch-suggestions="querySearch"
          :trigger-on-focus="true"
          clearable
          placeholder="Select Destination"
          class="w-full"
          v-model="destinationObj.label"
          value-key="label"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <span class="label">{{ item.label }}</span>
          </template>
        </el-autocomplete>
      </div> -->
      <div>
        <range-date-picker></range-date-picker>
      </div>
      <div>
        <span class="mb-2">Rooms Choices</span>
        <el-select
          v-model="roomCount"
          class="my-3 w-full"
          @change="handleChangeCountOfRooms(roomCount)"
        >
          <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <!-- ROOM DATA -->
      <div v-for="(room, index) in form.rooms" :key="room">
        <p class="text-xs text-slate-400 pb-0 mb-0">Room {{ index+1 }}</p>
        <div class="flex">
          <el-input-number
            v-model="room.Adults"
            class="my-1"
            :min="0"
            :max="9"
            placeholder="Adults"
          />
          <el-input-number
            v-model="room.Children"
            class="m-1"
            :min="0"
            :max="9"
            placeholder="Kids"
            @change="handleChangeCountOfKids(index, room.Children)"
          />
        </div>
        <div class="flex m-1 gap-3 w-80 flex-wrap">
          <!-- [Number(childRoom) -1] in orderto add in index zero of  room.ChildrenAges array not on index 1 -->
          <el-select
            v-for="childRoom in Number(room.ChildrenAges.length)"
            :key="childRoom"
            v-model="room.ChildrenAges[Number(childRoom) - 1]"
            placeholder="Kid Age"
            style="width: 140px"
          >
            <el-option v-for="item in 16" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </div>
      <!-- vervotech_id -->
      <el-button
        :span="24"
        class="w-full text-white font-bold bg-#1CCF3D text-center mt-3 no-underline p-5 rounded-xl hover:bg-violet-700 hover:text-white ease-in-out duration-300 justify-center items-center"
        @click="toSearchResults"
      >Check Availibility</el-button>
    </el-col>
  </el-row>

  <el-dialog
    v-model="calander_dialog"
    destroy-on-close
    :close-on-click-modal="false"
    :show-close="false"
    append-to-body
    class="w-fit rounded-3xl text-center"
  >
    <VDatePicker
      @update:modelValue="calander_dialog = false"
      color="pink"
      v-model.range="dates"
      :masks="masks"
    />
    <div></div>
  </el-dialog>
</template>
  
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: ["vervotech_id","name"],
  data() {
    return {
      uuid:0,//because it is featured hotels 
      roomCount: 1,
      currencyType: window.localStorage.getItem("CURR"),
      masks: {
        modelValue: "YYYY-MM-DD"
      },
      showCalender: false,
      inputValue: "",
      dates: {
        start: new Date(),
        end: new Date()
      },
      date: "",
      form: {
        checkOut: "",
        adults_num: 0,
        children_num: 0,
        room_num: 0,
        children_ages: [],
        destinationCode: "",
        nationality: "EG",
        rooms: [
          { "Adults": null, "Children": null, "ChildrenAges": [] }
        ]
      },
      roomDetails: [{}],
      attrs: [
        {
          key: "test",
          highlight: true,
          dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) }
        }
      ],
      destinationObj: {
        label: "",
        code: ""
      },
      url: "../assets/images/homePage/whitePlane.png",
      isHotel: true,
      // flights
      data: "",
      activeTab: null
    };
  },
  methods: {
    toPage() {
      // delete this.form.rooms;
      const path = `/FeaturedRooms/${this.name}/${this.vervotech_id}`;
      // console.log('{ path:path , query:`${formStr}&${rooms}` }' , { path:path , query:`${formStr}&${rooms}` });
      // return
      let enCodeQuery = encodeURIComponent(JSON.stringify(this.form));
      this.$router.push({
        path: path,
        query: { x: enCodeQuery }
      });
    },
    formCounters() {
      this.form.room_num = this.form.rooms.length;
      this.form.rooms.forEach(element => {
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
        for (let i = this.form.rooms.length; i < value; i++) {
          this.form.rooms.push({
            Adults: null,
            Children: null,
            ChildrenAges: []
          });
        }
      }
    },
    handleChangeCountOfKids(roomIndex, numberOfKids) {
      let childrenAgesCount = this.form.rooms[roomIndex].ChildrenAges.length;
      if (numberOfKids > childrenAgesCount) {
        // if user add kid will add another input of null without adding nulls in all arrays
        let diff = numberOfKids - childrenAgesCount;
        for (let i = 0; i < diff; i++) {
          this.form.rooms[roomIndex].ChildrenAges.push(null);
        }
      } else if (numberOfKids < childrenAgesCount) {
        // if user remove kid will remove input without adding nulls in all arrays
        let diff = childrenAgesCount - numberOfKids;
        for (let i = 0; i < diff; i++) {
          this.form.rooms[roomIndex].ChildrenAges.pop();
        }
      } else {
        // handle first input
        // fill the array with null values
        this.form.rooms[roomIndex].ChildrenAges = Array(numberOfKids).fill(
          null
        );
      }
    },
    ...mapMutations("dateRangePicker", ["SET_DATE_RANGE"]),
    ...mapActions("globalStore", ["fetchCountriesWithCodes"]),
    toSearchResults() {
      this.formCounters();
      this.form.checkIn = this.datePickerForm.checkIn;
      this.form.checkOut = this.datePickerForm.checkOut;
      this.form.currency = this.currentCurrency;
      this.form.vervotech_id = this.vervotech_id;
      //   add to route to fetch it from details

      //   this.$store.commit("payment/SET_SEARCH_FORM", this.form);
      this.toPage();
      this.SET_DATE_RANGE({});
    },
    querySearch(queryString, cb) {
      var countries = this.countriesWithCodes.map(({ name, code }) => ({
        label: name,
        value: code
      }));
      var results = queryString
        ? countries.filter(this.createFilter(queryString))
        : countries;
      // call callback function to return suggestions
      cb([...(results.length > 50 ? results.slice(0, 50) : results)]);
    },
    createFilter(queryString) {
      return link => {
        return (
          link.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.destinationObj = item;
      this.form.destinationCode = item.value;
    }
  },
  mounted() {
    this.fetchCountriesWithCodes();
  },
  computed: {
    ...mapState("globalStore", ["countriesWithCodes"]),
    ...mapState("dateRangePicker", ["datePickerForm"]),
    roomNum() {
      let roomNums = [];
      for (let i = 1; i < 9; i++) {
        roomNums.push({ label: i, value: i });
      }
      return roomNums;
    },
    currentCurrency() {
      return this.currencyType ? this.currencyType : "SAR";
    },
    kidsAges() {
      let kidsAges = [];
      for (let i = 1; i < 16; i++) {
        kidsAges.push({ label: i, value: i });
      }
      console.log(kidsAges);
      // roomNums = []
      return kidsAges;
    }
  },
  watch: {}
};
</script>
  