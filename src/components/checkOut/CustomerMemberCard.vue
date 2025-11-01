<template>
  <el-card class="mt-10">
    <div class="px-3 md:px-5 pt-3 pb-2">
      <span class="font-bold">Customer Members details</span>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-10">
      <loading-card></loading-card>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!customerMembers || customerMembers.length === 0"
      class="text-center py-10"
    >
      <p class="text-slate-500">No customer members found</p>
    </div>

    <!-- Members list -->
    <div v-else class="px-3 md:px-5 py-3">
      <div
        v-for="(member, index) in customerMembers"
        :key="index"
        class="member-item"
      >
        <div class="flex items-center justify-between py-3 border-b">
          <div class="flex items-center gap-3">
            <span class="i-mdi-account-circle text-3xl text-violet-600"></span>
            <div>
              <p class="font-bold mb-1">
                {{ member.first_name }} {{ member.last_name }}
              </p>
              <div class="flex gap-2 text-xs text-slate-500">
                <span v-if="member.type">{{ member.type }}</span>
                <!-- <span v-if="member.gender">• {{ member.gender }}</span> -->
                <span v-if="member.age">• Age: {{ member.age }}</span>
              </div>
            </div>
          </div>
          <div class="text-right text-sm text-slate-600">
            <p v-if="member.email" class="mb-1">{{ member.email }}</p>
            <p v-if="member.mobile">{{ member.mobile }}</p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CustomerMemberCard",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("wallet", ["customerMembers"]),
  },
};
</script>

<style scoped>
.customer-member-card {
  border-radius: 1.5rem !important;
}

.member-item:last-child .flex {
  border-bottom: none;
}

.member-item:hover {
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}
</style>
