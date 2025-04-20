<template>
  <div>
    <el-row class="lg:md:pl-20 justify-center bg-violet-50">
      <el-col :span="24" :lg="14" :md="18" :sm="24" :xs="24">
        <div class="separator text-slate-400 py-5">Sign up with</div>
        <div class="flex justify-center gap-10">
          <!-- <span
            class="i-mdi-apple text-2xl mt-2 text-balck cursor-pointer"
            @click="registerProcessBySocialApp('apple')"
          ></span> -->

          <span
            class="i-mdi-facebook text-2xl mt-2 text-blue-500 cursor-pointer"
            @click="registerProcessBySocialApp('facebook')"
          ></span>
          <span
            class="i-mdi-google text-2xl mt-2 text-red-500 cursor-pointer"
            @click="registerProcessBySocialApp('google')"
          ></span>
          <span
            class="i-mdi-twitter text-2xl mt-2 text-blue-500 cursor-pointer"
            @click="registerProcessBySocialApp('twitter')"
          ></span>
        </div>
        <div class="separator text-slate-400 py-5">Or with</div>
        <h3 class="font-light p-3">Registration Form</h3>
        <el-form
          :model="registrationForm"
          status-icon
          :rules="rules"
          ref="registrationForm"
          label-position="top"
          class="demo-registrationForm login-form w-11/12 text-4 mt-5 p-5 mx-auto rounded-3"
        >
          <div class="flex flex-wrap">
            <el-form-item prop="gender" autocomplete="off" class="w-full">
              <div class="m-2 w-full flex">
                <el-radio class="w-1/6" v-model="registrationForm.gender" label="1">Female</el-radio>
                <el-radio class="w-1/6" v-model="registrationForm.gender" label="2">Male</el-radio>
              </div>
            </el-form-item>
            <el-form-item
              label="First Name"
              prop="firstName"
              autocomplete="off"
              class="lg:w-1/4 sm:w-full"
            >
              <el-input v-model="registrationForm.first_name" class="borderBotOnly" />
            </el-form-item>
            <el-form-item
              label="Middle Name"
              prop="middleName"
              autocomplete="off"
              class="lg:mx-6 sm:mx-0 lg:w-1/4 sm:w-full"
            >
              <el-input v-model="registrationForm.middle_name" class="borderBotOnly" />
            </el-form-item>
            <el-form-item
              label="Last Name"
              prop="lastName"
              autocomplete="off"
              class="lg:w-1/4 sm:w-full"
            >
              <el-input v-model="registrationForm.last_name" class="borderBotOnly" />
            </el-form-item>
            <el-form-item
              label="Email"
              prop="email"
              autocomplete="off"
              class="lg:w-11/28 sm:w-full"
            >
              <el-input v-model="registrationForm.email" class="borderBotOnly" />
            </el-form-item>
            <!-- <el-form-item
              label="Nationality"
              prop="nationality"
              autocomplete="off"
              class="lg:mx-5 sm:mx-0 lg:w-11/28 sm:w-full"
            >
              <el-input
                v-model="registrationForm.nationality"
                class="borderBotOnly"
              />
            </el-form-item>-->
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
                class
                v-model="registrationForm.nationality"
                value-key="label"
                @select="handleSelectNation"
              >
                <template #default="{ item }">
                  <span class="label">{{ item.label }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item
              prop="country"
              autocomplete="off"
              label="Country"
              class="w-full flex justify-center"
            >
              <el-autocomplete
                class="borderBotOnly lg:w-11/28 sm:w-full"
                v-model="registrationForm.country"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item
              label="Address"
              prop="address"
              autocomplete="off"
              class="lg:w-11/28 sm:w-full"
            >
              <el-input v-model="registrationForm.address" class="borderBotOnly" />
            </el-form-item>

            <el-form-item
              label="mobile number"
              prop="phone"
              autocomplete="off"
              class="lg:mx-5 sm:mx-0 lg:w-11/28 sm:w-full"
            >
              <el-input v-model="registrationForm.mobile_num" class="borderBotOnly" />
            </el-form-item>
            <el-form-item label="Password" prop="pass" class="lg:w-11/28 sm:w-full">
              <el-input
                v-model="registrationForm.password"
                :type="password ? 'password' : 'text'"
                autocomplete="off"
                class="borderBotOnly"
              />
              <span @click="password = !password" class="text-3 text-blue">See Password</span>
            </el-form-item>
            <el-form-item
              label="Confirm password"
              prop="checkPass"
              class="lg:mx-5 sm:mx-0 lg:w-11/28 sm:w-full"
            >
              <el-input
                v-model="registrationForm.password_confirmation"
                :type="password ? 'password' : 'text'"
                autocomplete="off"
                class="borderBotOnly"
              />
            </el-form-item>
          </div>
          <div></div>
          <!-- </div> -->
          <el-button
            size="large"
            @click="register('registrationForm', registrationForm)"
            class="bg-#1CCF3D my-10 text-white font-bold shadow-xl px-15 w-fit"
          >Submit</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  OAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import firebaseConfig from "@/firebaseConfig.js";
export default {
  data() {
    return {
      password: true,
      links: [],
      registrationForm: {},
      nationalityObj: {
        label: "",
        code: ""
      },
      rules: {
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchNationalities()
    this.fetchCountries().then(() => {
      this.loadAll();
      this.links = this.loadAll();
    });
  },
  computed: {
    ...mapState("globalStore", ["countries", "nationalities"])
  },
  methods: {
    ...mapActions("registeration", ["registerUser", "socialSignUp"]),
    ...mapActions("globalStore", ["fetchCountries",'fetchNationalities']),
    ...mapActions("userAccount", ["fetchUserProfile"]),
    handleSelectNation(item) {
      this.nationalityObj = item;
      this.registrationForm.destinationCode = item.value;
    },
 
    // handle an error event
    querySearchNation(queryString, cb) {
      // if(this.nationalities){
        var nationalities = this.nationalities.map(({ name_en, code }) => ({
        label: name_en,
        value: code
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
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return this.countries;
    },

    register(formName, form) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerUser(form)
            .then(response => {
              this.$router.push("/");
              this.$toast.success(
                `you are Register into Happy Trip sucessfully`
              );
            })
            .catch(e => {
              console.log(e.response.data);
              for (const error in e.response.data.errors) {
                this.$toast.error(
                  " error in " +
                    error +
                    " while " +
                    e.response.data.errors[error]
                );
              }
            });
        } else {
          this.$toast.error(
            `Please make sure that you entered a valid Email and Password`
          );
          return false;
        }
      });
    },

    // setAppsShownInPopup(provider) {
    //   if (provider.length > 0) {
    //     this.eartoPlugin._client.options.enabledProviders = provider;
    //     // TODO : clear last provider
    //     // this.eartoPlugin._client.options.useRefreshTokens = false;
    //     // this.eartoPlugin._client.cacheLocation = ''
    //     // console.log(this.eartoPlugin._client.options);
    //   }
    // },
    async registerProcessBySocialApp(provider) {
      const auth = getAuth();
      let authProvider;
      if (provider == "google") {
        authProvider = new GoogleAuthProvider();
      } else if (provider == "twitter") {
        authProvider = new TwitterAuthProvider();
      } else if (provider == "facebook") {
        authProvider = new FacebookAuthProvider();
      } else if (provider == "apple") {
        authProvider = new OAuthProvider("apple.com");
      }
      await signInWithPopup(auth, authProvider)
        .then(({ user }) => {
          this.socialSignUp({
            name: user.displayName,
            email: user.email,
            provider: provider,
            provider_id: user.uid,
            photoUrl: user.photoURL,
          })
            .then((response) => {
              console.log("respossssssssssnse", response);
              this.$toast.success(response.data.message);
              this.$router.push("/");
              this.fetchUserProfile();
            })
            .catch((e) => {
              this.$toast.error(e.response.data.message);
            });

          // const user = result.user;
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
    }
  }
};
</script>
