<template>
  <component :is="currentLayout">

    <RouterView />
  </component>
</template>
<script>
import DefaultLayout from "@/layout/Default.vue";
import AuthLayout from "@/layout/Auth.vue";
import loading from "@/components/reusable-component/LoadingCard.vue";
import { mapActions,mapMutations } from "vuex";
import { resolveTransitionHooks } from "vue";
// const defaultLayout = () => ({
//   component: import('@/layout/Default.vue'),
//   // show this component during load
//   loading:loading,
// })
export default {
  components: {
    // defaultLayout,
    DefaultLayout,
    AuthLayout
  },
  computed: {
    currentLayout() {
      const layout = this.$route.meta.layout || "default";
      return layout + "Layout";
    }
  },
  created() {
    this.fetchData()
    this.autoLogin()
    this.fetchCurrencies()
  },
  methods: {
    ...mapMutations("userAccount" , ["SET_AUTHORIZATION"]),
    ...mapActions("userAccount", ["fetchUserProfile"]),
    ...mapActions("loyalty", ["fetchLoyaltyData"]),
    ...mapActions("logUser", ["autoLogin"]),
    ...mapActions("globalStore", ["fetchCurrencies"]),

    fetchData() {
      // this.SET_LOADING(true);
      this.fetchUserProfile()
        .then((res) => {
          console.log("res from user", res)
          this.fetchLoyaltyData();
        })
        .catch(e => {
          for (const error in e.response.data.errors) {
            this.$toast.error(
              "Error in the " + error + " as " + e.response.data.errors[error]
            );
          }
        })
        .catch((error) => {
          this.SET_AUTHORIZATION(false);
          return error;
        }).catch((e)=>{
          this.$toast.error(e);
        }).finally(() => {
          // this.SET_LOADING(false);
        })
    }
  }
};
</script>

<style scoped></style>
