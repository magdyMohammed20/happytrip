<template>
  <div>
    <el-row>
      <el-col :span="24" :lg="24" :md="24">
        <el-card class="box-card lg:md:px-20">
          <div>
            <p>Happytrip → Contact Us</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="lg:md:pl-20 justify-between">
      <el-col :span="24" :lg="7" :md="7" :sm="24" :xs="24">
        <h3 class="font-light p-3">Contact Us</h3>
        <div class="flex flex-wrap">
          <el-input v-model="form.name" placeholder="Name" class="borderBotOnly p-3" />
          <el-input v-model="form.email" placeholder="Email" class="borderBotOnly p-3" />
          <el-input v-model="form.subject" placeholder="Subject" class="borderBotOnly p-3" />
          <el-input
            type="textarea"
            rows="5"
            v-model="form.message"
            placeholder="Message"
            class="borderBotOnly p-3"
          />
        </div>
        <el-button
          @click="send(form)"
          size="large"
          class="bg-#1CCF3D my-10 text-white font-bold shadow-xl px-15 lg:md:w-full sm:w-1/2 sm:mx-3"
        >Submit</el-button>
      </el-col>
      <el-col :span="24" :lg="5" :md="8" :sm="24" :xs="24">
        <div class>
          <ul class="list-none">
            <h3 class="font-light p-2">Your personal Info.</h3>
            <li class="text-xs text-slate-500 p-2 leading-loose">
              <span class="i-mdi-map-marker-radius-outline text-xl"></span>
              {{profileData.address}}
            </li>
            <li class="text-xs text-slate-500 p-2">
              <span class="i-mdi-phone-outline text-xl"></span>
              {{profileData.mobile_num}}
            </li>
            <li class="text-xs text-slate-500 p-2">
              <span class="i-mdi-email-outline text-xl"></span>
              {{profileData.email}}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="5" class="overflow-x-hidden sm:hidden lg:block">
        <div class>
          <img
            src="../../src/assets/images/yelloRocket.png"
            class="w-11/14 relative left-20 top-10 rotate--19"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {}
    };
  },
  computed: {
    ...mapState({
      profileData: state => state.userAccount.profileData
    })
  },
  methods: {
    ...mapActions("contactUs", ["sendContactMessage"]),
    send(form) {
      this.sendContactMessage(form)
        .then(() => {
          this.$toast.show("Data sent");
        })
        .catch(e => {
         for (const error in e.response.data.errors) {
          this.$toast.error(e.response.data.errors[error])
        }

        });
    }
  }
};
</script>