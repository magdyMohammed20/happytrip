<template>
  <el-col :span="24" :lg="16" :sm="24" :md="16" :xs="24">
    <el-card class="review-card">
      <template #header>
        <div class="flex border-b-2 p-3 border-slate-200">
          <div class="card-header">
            <span class="border-1 rounded-full py-1 px-3">3</span>
            <span class="mx-3">How would you like to pay</span>
          </div>
          <div>
            <img src="../../assets/images/AmericanExpress.png" class="mx-1" />
            <img src="../../assets/images/Mastercard.png" class="mx-1" />
            <img src="../../assets/images/PayPal.png" class="mx-1" />
            <img src="../../assets/images/Visa.png" class="mx-1" />
          </div>
        </div>
      </template>
      <div>
        <p class="font-bold p-0 m-0">Card Payment</p>
        <p class="text-slate-400 text-xs p-0 m-0 font-bold">
          Enter your card details to continue payment process
        </p>
      </div>
      <div class="py-5 lg:md:flex justify-between">
        <div class="lg:md:w-1/3 sm:w-full">
          <p class="font-bold text-sm">Card Number</p>
          <el-input
            v-model="middleName"
            placeholder="Card Number"
            class="borderBotOnly w-full"
          />
        </div>
        <div class="lg:md:w-1/3 sm:w-full">
          <p class="font-bold text-sm">Card Holder Name</p>
          <el-input
            v-model="middleName"
            placeholder="Holder Name"
            class="borderBotOnly w-full"
          />
        </div>
      </div>
      <div class="py-5 lg:md:flex justify-between">
        <el-dropdown
          @command="handleCommand"
          class="lg:md:px-6 py-3 mt-5 border-b-1 border-#9d9d9d w-full bg-white custom-border"
        >
          <span class="el-dropdown-link text-#abaeb5"> Expiry Date </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Action 1</el-dropdown-item>
              <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item>
              <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
              <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown
          @command="handleCommand"
          class="lg:md:px-6 py-3 mt-5 border-b-1 border-#9d9d9d w-full bg-white custom-border lg:md:mx-3"
        >
          <span class="el-dropdown-link text-#abaeb5"> Expiry Year </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Action 1</el-dropdown-item>
              <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item>
              <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
              <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown
          @command="handleCommand"
          class="lg:md:px-6 py-3 mt-5 border-b-1 border-#9d9d9d w-full bg-white custom-border"
        >
          <span class="el-dropdown-link text-#abaeb5 mx-3"> CVV </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Action 1</el-dropdown-item>
              <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item>
              <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
              <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex flex-wrab">
        <el-checkbox v-model="checked1" size="large" />
        <span class="m-3 text-3"
          >Save Your Card detials for Quick pay. (We do not save CVV Details)</span
        >
        <p class="text-xs text-blue">Know More</p>
      </div>
    </el-card>
  </el-col>
  <!-- <el-col :span="24" :lg="16" :md="16" :xs="24" :sm="24" class="py-10">
        <el-alert
            title="By Completing this booking, You have  reviewed and accepted the conditions for above rules and restrictions"
            type="success" class="m-3" />
        <div class="flex justify-end">
            <el-button text class="button custom-button font-bold px-3 py-5 my-3">Pay 205 SAR</el-button>
        </div>
    </el-col> -->
</template>
<script></script>
