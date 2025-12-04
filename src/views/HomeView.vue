<template class="relative z-0">
  <!-- form component in beggining of homw page  -->
  <el-row class="flex lg:px-20 md:px-15 sm:px-2 max-sm:p-1">
    <form-component></form-component>
  </el-row>
  <!-- purble rohmbus -->
  <div class="overflow-hidden sm:hidden lg:block mt-0 rohmbus">
    <div class="-z-1 bg-#8612EA w-[62%] h-180 absolute right--8% top--30% radius rotate-36 overflow-hidden">
      <div class="bg-no-repeat w-full h-full rounded-3xl relative top-21% rotate--35 overflow-hidden" style="background-image: url('/images/homePage/houseImage.png');
  					opacity: 20%;
  				"></div>
      <div class="relative bottom-[37%] left-46%">
        <img src="../../src/assets/images/homePage/whitePlane.png" class="w-61% rotate--35" />
      </div>
    </div>
  </div>
  <!-- multi card component -->
  <el-row class="mb-10 h-fit">
    <card-component></card-component>
  </el-row>

  <el-row class="lg:mb-10 sm:mb-1 design-column lg:px-20 md:px-20">
    <el-col :span="24" :md="13" :sm="15" :xs="15"
      class="display-flex justify-space-around flex-col m-auto items-start h-15 sm:mx-auto line-height">
      <h2 class="text-#FF1E74 font-thin w-55 lg:text-center">
        Login to see
        <hr class="horizontal-line sm:hidden" />
      </h2>
      <h2 class="text-#FF1E74 font-thin w-55 lg:md:text-center mt-0">
        your free nights
        <hr class="horizontal-line" />
      </h2>
      <div class="relative left-15% w-full">
        <img src="@/assets/images/program.png" class="w-30 hidden lg:block" />
      </div>
    </el-col>
    <el-col :span="24" :md="12" class="px-4 py-2 display-flex justify- items-center">
      <DayCounterCard />
    </el-col>

    <el-col :span="24" :md="12" :sm="19" :xs="19" class="text-#42436A sm:px-0 lg:pl-7 py-2 sm:mx-auto lg:md:mx-0">
      <h1 class="lg:md:w-60 sm:w-full pb-4 text-7 leading-10">
        Happy Trip Loyality Program
        <hr class="heder-line" />
      </h1>
      <p class="leading-6 mb-8 lg:md:w-11/12 sm:w-full text-justify">
        As the world's largest student and youth travel company, we've been booking
        affordable adventures for awesome humans since 1979. Experts in Round the World
        flights, tours, accommodation and good vibes - whatever your adventure, it starts
        right here. As the world's largest student and youth travel company, we've been
        booking affordable adventures for awesome humans since 1979. Experts in Round the
        World flights, tours, accommodation and good vibes - whatever your adventure, it
        starts right here. As the world's largest student and youth travel company, we've
        been booking affordable adventures for awesome good vibes - whatever your
        adventure, it starts right here.
      </p>

      <el-button @click="handleRedirect" size="large" class="bg-#1CCF3D text-white font-bold shadow-xl mb-2">Explore
        More</el-button>
    </el-col>
  </el-row>
  <el-container>
    <el-row class="mb-20 text-white sm:w-full lg:px-20 sm:pt-10 bg-gradient-to-r from-#8612EA to-#4406D1">
      <el-col :span="20" :md="12" :sm="24" :lg="12" class="lg:pt-10 sm:pt-5">
        <div class="sm:py-5 sm:px-2 sm:w-full">
          <h2>Get the Happy Trip App !</h2>
          <p class="w-full lg:w-80 sm:w-full leading-6">
            Looking to manage your flight and hotel needs efficiently? BlazeBe does
            exactly that for you in a few simple taps with artistic user interface and
            secure payment channels.
          </p>
          <el-button class="bg-transparent text-white my-8 px-10 py-8">Get the app</el-button>
        </div>
      </el-col>
      <el-col :span="12" :md="12" class="relative flex">
        <div class="flex justify-end relative sm:hidden md:lg:block">
          <img src="@/assets/images/homePage/XO.png" alt class="sm:w-50 absolute right-30% lg:md:w-full" />
          <img src="@/assets/images/getAppDevice1.png" alt="AppDevice" class="absolute top-20% right-35%" />
          <img src="@/assets/images/getAppDevice2.png" alt="AppDevice"
            class="sm:w-50 lg:md:w-full relative right--38%" />
        </div>
      </el-col>

      <img src="@/assets/images/getApp.png" alt class="w-40 absolute bottom-0 left-0 sm:hidden md:lg:block" />
    </el-row>
  </el-container>

  <el-row class="mb-10 lg:px-20 sm:px-2">
    <el-col :span="24" :md="12" :sm="24" class="mb-10">
      <el-card class="rounded-l-0 rounded-r-3 border-l-3 border-l-#55acee my-10 relative overflow-visible w-11/15"
        :body-style="{
          padding: '10px 10px 10px 20px',
        }">
        <h4 class="text-[14px] text-#55acee">Superior Booking Experience</h4>
        <p class="text-[14px]">
          Ease of booking, fantastic products and competitive
          pricing makes the booking experience amazing
        </p>
      </el-card>
      <el-card
        class="my-10 lg:md:ml-20 sm:ml-10 rounded-l-0 rounded-r-3 border-l-3 border-l-#dc4e41 relative overflow-visible w-11/15"
        :body-style="{
          padding: '10px 10px 10px 20px',
        }">
        <h4 class="text-[14px] text-#dc4e41">Superior Booking Experience</h4>
        <p class="text-[14px]">
          Ease of booking, fantastic products and competitive
          pricing makes the booking experience amazing
        </p>
      </el-card>
      <el-card class="my-10 rounded-l-0 rounded-r-3 border-l-3 border-l-#3b5998 relative overflow-visible w-11/15"
        :body-style="{
          padding: '10px 10px 10px 20px',
        }">
        <h4 class="text-[14px] text-#3b5998">Superior Booking Experience</h4>
        <p class="text-[14px]">
          Ease of booking, fantastic products and competitive
          pricing makes the booking experience amazing
        </p>
      </el-card>
    </el-col>

    <el-col :span="24" :md="12" class="text-#42436A lg:px-4 py-2 self-center">
      <div class="sm:w-11/13 pl-2">
        <h1 class="66 leading-10">Why work with us?</h1>
        <p class="leading-6 mb-15">
          You are unique, and so is your trip. When you book with Liberty Travel, we match
          you with an expert best suited to design a vacation just for you.
        </p>
      </div>
    </el-col>
  </el-row>
  <SignupComponent></SignupComponent>
</template>
<script lang="jsx">
import { mapActions, mapState } from "vuex";
import formComponent from "../components/homePage/form-component.vue";
import cardComponent from "../components/homePage/card-component.vue";
import DayCounterCard from "../components/reusable-component/day-counter-card.vue";
import SignupComponent from "../components/homePage/signup-component.vue";
export default {
  data() {
    return {
      url: "../assets/images/homePage/whitePlane.png"
    };
  },
  components: {
    formComponent,
    cardComponent,
    DayCounterCard
  },
  computed: {
    ...mapState('userAccount', ['isAuthorized','profileData']),
  },
  methods: {
    ...mapActions("userAccount", ["fetchUserProfile"]),
    handleRedirect(){
      if(this.profileData.user_id){
        this.$router.push("/loyalty")
      }else{
        this.$router.push("/login")
      }
    }
  },
  // mounted() {
  //   this.isAuthorized ?
  //     this.fetchLoyaltyData()
  //       .then(() => { })
  //       .catch(e => {
  //         this.$toast.error(e);
  //       }) : ""
  // }
  // mounted(){
  //   this.fetchUserProfile().then(()=>{
  //     this.$toast.show('Welcome at Happy Trip we wish you have a greate experience')
  //   }).catch(()=>{
  //     this.$toast.error('error while loading the site')
  //   })
  // }
};
</script>

<style scoped>
.radius {
  border-radius: 135px;
}

.design-column {
  background-image: url(../../src/assets/images/homePage/secondBubble.png);
  background-size: cover;
  /* background-size: contain; */
  background-repeat: no-repeat;
}

.horizontal-line {
  width: 34%;
  border: none;
  color: pink;
  background-color: #ffbac6;
  border-color: pink;
  height: 52%;
  margin-top: 3px;
  opacity: 35%;
}

.line-height {
  line-height: 1px;
}
</style>
