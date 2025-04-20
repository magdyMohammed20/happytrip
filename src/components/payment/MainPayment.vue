<template>
  <el-col
    :span="24"
    :lg="20"
    :sm="24"
    :xs="24"
    class="bg-slate-100 lg:md:p-15 sm:p-5 rounded-3xl"
  >
    <div class="flex sm:flex-col px-5 lg:md:flex-row justify-center py-3">
      <el-button
        size="large"
        class="bg-#1CCF3D my-5 text-white font-bold shadow-xl px-15"
      >
        Sign in for Account Benefits</el-button
      >
    </div>
    <div class="separator text-slate-300">Or</div>
    <div class="m-4 pt-5">
      <h5 class="my-5 px-2">Fill Informations</h5>
      <div class="m-2 flex lg:md:flex-row sm:flex-col">
        <el-radio class="lg:md:w-1/6 sm:1/2" v-model="gender" label="1">Female</el-radio>
        <el-radio class="lg:md:w-1/6 sm:1/2" v-model="gender" label="2">Male</el-radio>
      </div>

      <div class="flex lg:md:flex-row sm:flex-col justify-between pt-5">
        <div>
          <el-input
            v-model="firstName"
            placeholder=" First Name"
            class="borderBotOnly m-2"
          />
        </div>

        <div>
          <el-input
            v-model="middleName"
            placeholder=" Middle Name"
            class="borderBotOnly m-2"
          />
        </div>
        <div>
          <el-input
            v-model="lastName"
            placeholder=" Last Name"
            class="borderBotOnly m-2"
          />
        </div>
        <div>
          <el-input v-model="email" placeholder=" Email" class="borderBotOnly m-2" />
        </div>
        <div>
          <el-input v-model="phone" placeholder=" phone" class="borderBotOnly m-2" />
        </div>
      </div>
    </div>
    <div class="separator text-slate-300 pt-8">Optional Voucher Code</div>

    <div class="flex pt-5 p-5 w-full">
      <div class="lg:w-1/5 sm:w-11/13">
        <el-input
          v-model="voucherCode"
          placeholder=" Voucher Code(optional)"
          class="borderBotOnly m-2 w-full"
        />
      </div>
    </div>
    <div class="separator text-slate-300">Payment Amount</div>
    <div class="flex justify-between px-10">
      <p class="lg:md:text-5 sm:text-3 font-bold">Total Amount</p>
      <p class="lg:md:text-5 sm:text-3 font-bold">SAR 204</p>
    </div>
    <div class="flex sm:flex-col px-5 lg:md:flex-row justify-end py-3">
      <el-button size="large" class="bg-#1CCF3D my-5 text-white font-bold shadow-xl px-5">
        Pay Now</el-button
      >
    </div>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      gender: "",
    };
  },
};
</script>
<style scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #cbd5e1;
  /*adding border after and before dev that is centered*/
  margin: 15px;
}

.separator:not(:empty)::after {
  margin: 15px;
}
</style>
