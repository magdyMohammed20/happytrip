<template>
  <div>
    <el-row class="justify-center bg-violet-50 custom-border">
      <el-col class :span="24" :lg="24" :md="24" :sm="24" :xs="24">
        <h3 class="font-thin p-3 mt-0 bg-violet-100 custom-border">
          Your Profile
        </h3>
        <el-form
          :model="userProfile"
          status-icon
          :rules="rules"
          ref="userProfile"
          label-position="top"
          class="demo-userProfile login-form w-11/12 text-4 mt-5 p-5 mx-auto rounded-3"
        >
          <div class="flex flex-wrap">
            <el-form-item
              label="First Name"
              prop="firstName"
              autocomplete="off"
              class="lg:w-1/4 sm:w-full"
            >
              <el-input
                v-model="userProfile.first_name"
                class="borderBotOnly"
              />
            </el-form-item>
            <el-form-item
              label="Middle Name"
              prop="middleName"
              autocomplete="off"
              class="lg:mx-6 sm:mx-0 lg:w-1/4 sm:w-full"
            >
              <el-input
                v-model="userProfile.middle_name"
                class="borderBotOnly"
              />
            </el-form-item>
            <el-form-item
              label="Last Name"
              prop="lastName"
              autocomplete="off"
              class="lg:w-1/4 sm:w-full"
            >
              <el-input v-model="userProfile.lastname" class="borderBotOnly" />
            </el-form-item>
            <el-form-item
              label="Email"
              prop="email"
              autocomplete="off"
              class="lg:w-11/28 sm:w-full"
            >
              <el-input v-model="userProfile.email" class="borderBotOnly" />
            </el-form-item>

            <el-form-item
              label="Nationality"
              prop="nationality"
              autocomplete="off"
              class="lg:mx-5 sm:mx-0 lg:w-11/28 sm:w-full"
            >
              <el-autocomplete
                :fetch-suggestions="querySearchNation"
                :trigger-on-focus="true"
                clearable
                class="borderBotOnly"
                v-model="userProfile.nationality"
                value-key="label"
                @select="handleSelectNation"
              >
                <template #default="{ item }">
                  <span class="label">{{ item.label }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item prop="gender" autocomplete="off" class="w-full">
              <div class="m-2 w-full flex">
                <el-radio class="w-1/6" v-model="userProfile.gender" label="1"
                  >Female</el-radio
                >
                <el-radio class="w-1/6" v-model="userProfile.gender" label="2"
                  >Male</el-radio
                >
              </div>
            </el-form-item>

            <el-form-item
              label="Address"
              prop="address"
              autocomplete="off"
              class="lg:w-11/28 sm:w-full"
            >
              <el-input v-model="userProfile.address" class="borderBotOnly" />
            </el-form-item>

            <el-form-item
              label="mobile number"
              prop="phone"
              autocomplete="off"
              class="lg:mx-5 sm:mx-0 lg:w-11/28 sm:w-full"
            >
              <el-input
                v-model="userProfile.mobile_num"
                class="borderBotOnly"
              />
            </el-form-item>
            <el-form-item
              prop="country"
              autocomplete="off"
              label="Country"
              class="w-full flex justify-center"
            >
              <el-autocomplete
                class="borderBotOnly lg:w-11/28 sm:w-full"
                v-model="userProfile.country"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item
              prop="currency"
              autocomplete="off"
              label="Currency"
              class="w-full flex justify-center"
            >
              <el-select
                class="borderBotOnly lg:w-11/28 sm:w-full"
                v-model="userProfile.currency"
                placeholder="Select Currency"
              >
                <el-option
                  v-for="item in currencies"
                  @click="saveCurrency(item)"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="image"
              autocomplete="off"
              label="Upload Profile Image"
              class="w-1/2 flex justify-center"
            >
              <input
                @input="logimg()"
                accept="image/jpeg, image/png, image/jpg"
                class="borderBotOnly lg:w-11/28 sm:w-full"
                id="image"
                type="file"
              />
            </el-form-item>
            <output id="preview"></output>

            <el-form-item
              prop="submit"
              autocomplete="off"
              class="w-1/2 flex justify-center"
            >
              <el-button
                text
                class="button custom-button font-bold px-7 py-5"
                @click="SET_TRAVELLERS_DIALOG(true)"
                >Manage My Travellers</el-button
              >
              <el-button
                text
                class="button custom-button font-bold px-7 py-5"
                @click="updateProfile()"
                :loading="loading"
                >Submit</el-button
              >
              <el-button
                text
                class="delete-btn font-bold py-5"
                @click="deleteDialog = true"
                :loading="loading"
                >Delete My Account</el-button
              >
            </el-form-item>
          </div>
          
        </el-form>
        
      </el-col>
      <div>
            <el-dialog
              v-model="deleteDialog"
              :close-on-press-escape="false"
              :draggable="true"
              :destroy-on-close="true"
              :close-on-click-modal="false"
              :show-close="true"
              class="border-rounded-xl text-center w-[30%]"
            >
              <!-- <el-card class="text-center"> -->
                <p>Are You sure you want to delete your Account ?</p>
                  <div class="dialog-footer">
                    <el-button @click="deleteAccount()" class="delete-btn"
                      >Delete</el-button
                    >
                    <el-button @click="deleteDialog = false">Cancel</el-button>
                  </div>
              <!-- </el-card> -->
            </el-dialog>
          </div>
    </el-row>
  </div>
  <travellers-dialog></travellers-dialog>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      nationalityObj: {
        label: "",
        code: "",
      },
      deleteDialog: false,
      loading: false,
      userProfile: {},
      imagePrev: {},
      // currencies: ["AED", "EGP", "SAR", "USD"]
    };
  },
  methods: {
    ...mapMutations("userAccount", ["SET_TRAVELLERS_DIALOG"]),
    ...mapActions("userAccount", [
      "fetchUserProfile",
      "updateUserProfile",
      "fetchUserTravellers",
    ]),
    ...mapActions("globalStore", ["fetchCountries", "fetchNationalities"]),
    saveCurrency(typeCurr) {
      // console.log(e);
      window.localStorage.setItem("CURR", typeCurr);
    },
    deleteAccount() {
      this.$axios.delete(`api/user/delete`).then((response) => {
        this.$toast.show("Your Account Is deleted Successfully");
        this.$router.push("/login");
        window.localStorage.removeItem("token");
      });
    },
    fetchData() {
      this.fetchUserProfile()
        .then(() => {
          this.userProfile = { ...this.profileData };
          console.log(this.userProfile);
        })
        .catch((e) => {
          for (const error in e.response.data.errors) {
            this.$toast.error(
              "Error in the " + error + " as " + e.response.data.errors[error]
            );
          }
        });
    },
    handleSelectNation(item) {
      this.nationalityObj = item;
      this.userProfile.destinationCode = item.value;
    },
    // handle an error event
    querySearchNation(queryString, cb) {
      // if(this.nationalities){
      var nationalities = this.nationalities.map(({ name_en, code }) => ({
        label: name_en,
        value: code,
      }));
      var results = queryString
        ? nationalities.filter(this.createFilter(queryString))
        : nationalities;
      // call callback function to return suggestions
      cb([...(results.length > 50 ? results.slice(0, 50) : results)]);
      // }
    },
    querySearch(queryString, cb) {
      var links = this.links.map(({ name }) => ({ value: name.common }));
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb([...results]);
    },
    createFilter(queryString) {
      return (link) => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return this.countries;
    },
    logimg() {
      document.querySelector("#preview").replaceChildren(); //remove old preview from output tag
      console.log(document.querySelector("#preview"));
      const input = document.querySelector("#image").files[0];
      this.userProfile.photo = input;
      this.handleProfileImagePreview(input);
    },
    handleProfileImagePreview(input) {
      let output = document.querySelector("#preview");
      const img = document.createElement("img");
      img.src = URL.createObjectURL(input);
      img.height = 80;
      img.setAttribute("class", "image-prev");
      img.onload = () => {
        URL.revokeObjectURL(img.src);
      };
      output.appendChild(img);
    },
    updateProfile() {
      this.loading = true;
      this.updateUserProfile(this.userProfile)
        .then(() => {
          this.$toast.show("Your Profile has been updated Successfully");
          this.fetchData();
        })
        .catch((e) => {
          for (const error in e.response.data.errors) {
            this.$toast.error(
              "Error in the " + error + " as " + e.response.data.errors[error]
            );
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapState("globalStore", ["countries", "nationalities", "currencies"]),
    ...mapState("userAccount", {
      profileData: (state) => {
        return {
          id: state.profileData?.id,
          email: state.profileData?.email,
          first_name: state.profileData?.first_name,
          middle_name: state.profileData?.middle_name,
          lastname: state.profileData?.lastname,
          gender: state.profileData?.gender,
          country: state.profileData?.country,
          address: state.profileData?.address,
          nationality: state.profileData?.nationality,
          photo: state.profileData?.photo,
          mobile_num: state.profileData?.mobile_num,
          currency: state.profileData?.currency,
        };
      },
    }),
  },

  mounted() {
    this.fetchUserTravellers();
    this.fetchData();
    this.fetchNationalities();
    this.fetchCountries().then(() => {
      this.loadAll();
      this.links = this.loadAll();
    });
  },
};
</script>
<style>
#preview:hover img {
  border-radius: 10px;
  transform: scale(2.1);
  transition: 0.5s ease-in-out;
  border: 1px solid rgb(213, 211, 211);
}
</style>
