<template>
  <div class="lg:mt-5%">
    <el-row
      class="login-bg h-full justify-center content-center lg:overflow-hidden"
    >
      <video autoplay muted loop id="bgVideo" class="lg:block sm:hidden">
        <source src="../../src/assets/videos/intro.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <el-col
        :span="24"
        :xl="13"
        :lg="15"
        :sm="24"
        :xs="24"
        class="login-card-container"
      >
        <el-card class="login-card">
          <div class="flex lg:flex-row sm:flex-col lg:gap-x-12 sm:gap-y-4">
            <div class="flex flex-col w-full sm:w-11/12 self-center">
              <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                label-position="top"
                label-width="100px"
                class="demo-loginForm login-form w-full lg:px-8 pt-3 text-4"
              >
                <el-form-item label="Email" prop="email" autocomplete="off">
                  <el-input
                    v-model="loginForm.email"
                    autocomplete="off"
                    placeholder="Email"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="Password"
                  prop="password"
                  autocomplete="off"
                >
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="Password"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="w-full text-4 mx-auto"
                    :loading="loading"
                    @click="submitForm('loginForm', this.loginForm)"
                    >Submit</el-button
                  >
                  <div class="w-full flex flex-row justify-between py-7">
                    <RouterLink
                      class="cursor-pointer no-underline"
                      to="/ForgetPassword"
                    >
                      <div class="text-#5808d8">Forget Password ?</div>
                    </RouterLink>
                    <div class="flex flex-row" style="align-items: baseline">
                      <div class="text-sm text-gray-500 mr-1">
                        Not a member?
                      </div>
                      <RouterLink
                        class="cursor-pointer no-underline"
                        to="/registration"
                      >
                        <div
                          class="text-#5808d8"
                          @click="resetForm('loginForm')"
                        >
                          Sign Up
                        </div>
                      </RouterLink>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
              <div class="separator text-slate-400 py-4">Sign in with</div>
              <div class="flex justify-center gap-10">
                <!-- <GoogleSignInButton
                  @success="handleLoginSuccess"
                  @error="handleLoginError"
                ></GoogleSignInButton> -->

                <!-- <template> -->
                <!-- <span class="i-mdi-twitter text-2xl mt-2 text-blue-500 cursor-pointer"> -->
                <!--  </span> -->
                <!-- </template> -->
                <!-- <span class="i-mdi-google text-2xl mt-2 text-red-500 cursor-pointer"></span> -->
                <span
                  class="i-mdi-apple text-2xl mt-2 text-balck cursor-pointer"
                  @click="loginProcessBySocialApp('apple')"
                ></span>

                <span
                  class="i-mdi-facebook text-2xl mt-2 text-blue-500 cursor-pointer"
                  @click="loginProcessBySocialApp('facebook')"
                ></span>
                <span
                  class="i-mdi-google text-2xl mt-2 text-red-500 cursor-pointer"
                  @click="loginProcessBySocialApp('google')"
                ></span>
                <span
                  class="i-mdi-twitter text-2xl mt-2 text-blue-500 cursor-pointer"
                  @click="loginProcessBySocialApp('twitter')"
                ></span>
              </div>
            </div>
            <div class="flex flex-col lg:w-11/12 sm:w-full sm:mt-5">
              <img
                src="../../src/assets/images/mobileScreen.png"
                class="w-11/12 lg:block sm:hidden"
              />
              <el-button type="primary" class="lg:w-11/12 m-auto mt-4 text-lg"
                >Download App for better experience</el-button
              >
            </div>
          </div>
        </el-card>
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
      logout: null,
      loading: false,
      isLogin: false,
      loginForm: {
        password: "",
        email: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: ["blur", "change"],
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    async loginProcessBySocialApp(provider) {
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
          this.socialLogin({
            email: user.email,
            provider: provider,
            provider_id: user.uid,
          })
            .then((response) => {
              this.fetchUserProfile();
              this.$toast.success(`you are logged into happyTrip sucessfully`);
            })
            .catch((e) => {
              this.$toast.error(e.response.data.data);
            });
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
    },

    submitForm(formName, loginForm) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginUser(loginForm)
            .then((response) => {
              this.fetchUserProfile();
              // this.$router.replace("/");
              this.$toast.success(`you are logged into happyTrip sucessfully`);
              localStorage.setItem("status", "authenticated");
            })
            .catch((e) => {
              this.$toast.error(e.response.data.data);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$toast.error(
            `Please make sure that you entered a valid Email and Password`
          );
          this.loading = false;
          return false;
        }
      });
    },

    ...mapActions("logUser", ["loginUser", "socialLogin"]),
    ...mapActions("userAccount", ["fetchUserProfile"]),
    async logOut() {
      const result = await this.$gAuth.signOut();
      this.isLogin = false;
      console.log(`result`, result);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
#bgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  /* width: 100%; */
  z-index: -1;
}

.login-bg {
  background: #ffffff;
  background-size: cover;
  min-height: 80vh;
  width: 100%;
  z-index: 5;
}

.login-card {
  /* min-height: 40vh !important; */
  background-color: #ffffffd8;
}

/* .login-card>.el-card__body {
    display: flex;
}

.login-card-lg>.el-card__body {
    display: flex;
    flex-direction: row;
} */

.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label-wrap
  > .el-form-item__label:before {
  display: none !important;
}

button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}

button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>
