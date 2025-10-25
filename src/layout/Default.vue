<template>
  <div
    v-loading.fullscreen.lock="$store.state.globalStore.loading"
    element-loading-background="#fff"
    class="overflow-x-hidden"
  >
    <the-mobile-header class="lg:hidden sm:block" />
    <the-header class="sm:hidden lg:block" v-if="layoutAppearnce" />
    <el-main class="px-0 overflow-x-hidden">
      <slot></slot>
    </el-main>
    <el-footer
      v-if="layoutAppearnce"
      class="h-fit lg:px-20 md:px-15 sm:px-5 px-20 mx-auto shadow"
    >
      <the-footer />
    </el-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/Static/TheHeader.vue";
import TheFooter from "@/components/Static/TheFooter.vue";
export default {
  name: "DefaultLayout",
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      layoutAppearnce: false,
    };
  },
  created() {
    setTimeout(() => {
      this.layoutAppearnce = true;
    }, 1200);
  },
};
</script>

<style scoped>
.el-main {
  padding: 0 !important;
}
.shadow {
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>
