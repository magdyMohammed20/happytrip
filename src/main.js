import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios, { setVueInstance } from "@/plugins/axios";
import Toaster from "@meforma/vue-toaster";
import i18n from "./plugins/i18n";
// how inject axios to vue
import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
import {  DatePicker } from "v-calendar";
import "v-calendar/style.css";
// project style
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/dist/index.css";
import "virtual:uno.css";
import "@/assets/style/index.scss";

// import Swiper styles
import "@/plugins/vee-validate";
// import VSkeletonLoader from 'v-skeleton-loader';
import Loader from './components/reusable-component/LoadingCard.vue';
import { plugin, defaultConfig } from '@formkit/vue'


const app = createApp(App);
app.use(VueTelInput);
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;
app.use(store);
app.use(router);
app.use(Toaster);
app.use(plugin, defaultConfig)
// app.use(VSkeletonLoader);
// app.use(GoogleSignInPlugin, {
//   clientId:
//     "265126092370-5p3hhv8k0kcc682b654cuh77vr33v5a8.apps.googleusercontent.com",
// });
// Use plugin defaults (optional)
app.use(i18n);
// Use the components
app.component("VDatePicker", DatePicker);
setVueInstance(app) // passing value of vue instance to axios file 

// any vue file whaterver inside components folder will be registered as global component
// const ComponentRecursionContext = import.meta.globEager('./components/*/*.vue');
//./components/*/* how can make it recursive deeply
app.component('loader', Loader);
const ComponentContext = import.meta.glob('./components/*/*.vue' , { eager: true });


for (const path in ComponentContext) {
  let name = path.match(/\.\/components\/(.*)\/(.*)\.vue$/)[2];
  let asyncCmp = defineAsyncComponent(() => import(/* @vite-ignore */path));
  app.component(name, asyncCmp);
}
app.mount("#app");



