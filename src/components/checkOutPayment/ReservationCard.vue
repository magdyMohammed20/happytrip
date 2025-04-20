<template>
  <el-col :span="24" :lg="16" :sm="24" :md="17" :xs="24" class="pt-5 sm:px-1">
    <el-card
      id="my-receipt"
      :body-style="{ padding: '0px' }"
      class="text-sm md:text-base"
    >
      <div
        class="flex flex-wrap md:flex-nowrap bg-#1CCF3D p-3 md:px-6 lg:p-3 justify-between lg:justify-around print:hidden"
      >
        <div class="self-center flex mr-2 md:mr-0">
          <img
            class="hidden md:block h-max self-center"
            src="../../../src/assets/images/reservedLetter.png"
          />
          <div class="self-center mx-1 md:mx-6">
            <p class="font-bold p-0 m-0 text-white">
              Thank You {{ profileData.name }}
            </p>
            <p class="text-white p-0 m-0 font-xs">
              Your hotel reservation is confirmed
            </p>
          </div>
        </div>
        <div class="flex self-center my-3" v-if="reservation.pdf_urls">
          <a :href="reservation.pdf_urls.voucher" target="_blank">
            <el-button
              class="p-2 md:p-4 lg:p-5 xl:p-6 border-2 md:border-3 border-white bg-#1CCF3D text-white"
              >Print Confirmation</el-button
            >
          </a>
          <el-button
            class="p-2 md:p-4 lg:p-5 xl:p-6 xl:!ml-4 border-2 md:border-3 border-white bg-#1CCF3D text-white"
          >
            <a
              :href="`mailto:${profileData.email}`"
              class="no-underline text-white"
              >Email to guests</a
            >
          </el-button>
        </div>
      </div>
      <div
        class="flex flex-wrap justify-around py-3 border-b-1 border-slate-200 md:-ml-5"
      >
        <div>
          <p class="font-bold">
            Reference Code :
            <span class="font-light">{{ reservation.reference_code }}</span>
          </p>
          <p class="font-bold">
            Date of booking :
            <span class="font-light">
              {{ new Date(reservation.created_at).toDateString() }}
            </span>
          </p>
        </div>
        <div>
          <p class="font-bold mb-0.5">Booking Refernece Id</p>
          <p class="text-xl m-0">521541RP</p>
        </div>
      </div>
      <div class="flex flex-wrap justify-around pb">
        <div class="self-center lg:-mt-6">
          <p class="font-bold">Guest Details</p>
          <p class="p-0 m-0 pl-1 text-purple-700">{{ profileData.name }}</p>
          <p class="p-0 m-0 pl-1 text-purple-700">{{ profileData.email }}</p>
        </div>
        <div class="flex">
          <div class="py-1 text-center mx-4">
            <p class="font-bold">Check In</p>
            <div class="flex bg-green-100 rounded-3 p-1 align-middle">
              <p
                class="font-bold my-1 custom-extra-bold px-1 text-5xl text-green-500"
              >
                {{ new Date(reservation.check_in).getDate() }}
              </p>
              <div class="flex flex-col pr-1.5">
                <p class="font-light p-0 m-0 text-lg text-green-500">
                  {{
                    new Date(reservation.check_in).toLocaleString("default", {
                      month: "long",
                    })
                  }}
                </p>
                <p class="font-light p-0 m-0 text-lg text-green-500">
                  {{ new Date(reservation.check_in).getFullYear() }}
                </p>
              </div>
            </div>
          </div>
          <div class="py-1 text-center mx-4">
            <p class="font-bold">Check out</p>
            <div class="flex bg-rose-100 rounded-3 p-1 align-middle">
              <p
                class="font-bold my-1 custom-extra-bold px-1 text-5xl text-rose-500"
              >
                {{ new Date(reservation.check_out).getDate() }}
              </p>
              <div class="flex flex-col pr-1.5">
                <p class="font-light p-0 m-0 text-lg text-rose-500">
                  {{
                    new Date(reservation.check_out).toLocaleString("default", {
                      month: "long",
                    })
                  }}
                </p>
                <p class="font-light p-0 m-0 text-lg text-rose-500">
                  {{ new Date(reservation.check_out).getFullYear() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- alerts -->
    <div class="py-5">
      <!-- <el-alert
        :title="
          'We sent the confirmation email and booking details to' + profileData.email
        "
        type="info"
        closable="false"
        class="custom-border text-#4DABFF"
        show-icon
      />-->

      <div class="bg-green-100 flex items-center custom-border my-5">
        <span
          class="i-mdi-present text-2xl md:text-xl m-3 text-green-500"
        ></span>
        <p class="text-green-500 text-[12px] md:text-sm font-bold pr-1.25">
          You will earn 50 flying reward points with this booking
        </p>
        <div class="justify-end"></div>
      </div>
    </div>
  </el-col>
</template>
<script>
import { mapState } from "vuex";
import "element-plus/theme-chalk/display.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("userAccount", ["reservation", "profileData"]),
  },
  methods: {
    printReceipt() {
      // html2canvas(document.getElementById("my-receipt")).then(canvas => {
      //   const image = canvas.toDataURL("image/png");
      //   const pdf = new jsPDF();
      //   pdf.addImage(image, "JPEG", 15, 20, 180, 80);
      //   pdf.save("invoice.pdf");
      // });
    },
  },
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0.5rem;
}
</style>
