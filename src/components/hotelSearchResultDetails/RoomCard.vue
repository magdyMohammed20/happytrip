<template>
  <el-card class="sm:w-75 md:w-85 lg:w-95" :body-style="{ padding: '0px' }">
    <img
      :src="room.images.thumbnail || hotelsDetails.data.hotel.thumbnail"
      alt="room image"
      class="w-full object-cover"
    />
    <div class="p-4 -mt-2">
      <h3 class="m-0">{{ room.name }}</h3>
      <div
        class="flex justify-between items-center gap-2 text-sm font-semibold"
      >
        <p>
          <span class="i-mdi-hotel text-2xl -mt-1"></span>
          {{ room.meal_plan.name }}
        </p>
        <p class="text-#FF1E74">
          Total price: {{ room.price.amount }} {{ room.price.currency }}
        </p>
      </div>
      <p
        class="flex items-center gap-2 text-#1CCF3D"
        v-if="room.cancellation_policy.is_refundable"
      >
        Free cancellation till:
        {{ room.cancel?.[0]?.to }}
        <span
          class="i-mdi-info text-xl bg-gray cursor-pointer hover:text-blue-500"
          @click="showCancellationDialog = true"
        ></span>
      </p>

      <el-dialog
        v-model="showCancellationDialog"
        title="Cancellation Policy"
        width="500px"
      >
        <div class="space-y-4">
          <div>
            <h4 class="font-bold text-lg mb-2">Free Cancellation</h4>
            <p class="text-gray-700">
              You can cancel this booking free of charge until:
            </p>
            <p class="text-lg font-semibold text-#FF1E74 mt-2">
              {{ formatDate(room.cancel?.[0]?.to) }}
            </p>
          </div>
          <div v-if="room.cancel?.[0]?.from" class="pt-4 border-t">
            <p class="text-sm text-#FF1E74">
              From {{ formatDate(room.cancel?.[0]?.from) }} you will be charged
              {{ room.cancel?.[0]?.amount }} {{ room.price?.currency }}
            </p>
          </div>
        </div>
        <template #footer>
          <el-button @click="showCancellationDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-button
        @click="navigateToRoomDetails"
        class="w-full text-white font-bold bg-#1CCF3D text-center mt-3 no-underline p-5 rounded-xl hover:bg-violet-700 hover:text-white ease-in-out duration-300 justify-center items-center"
      >
        Select Room
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "RoomCard",
  props: {
    room: {
      type: Object,
      required: true,
    },
    hotelsDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showCancellationDialog: false,
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },
    navigateToRoomDetails() {
      // Generate a unique room ID if not available
      const roomId = this.room.id || this.room.room_id;

      // Pass room data as query parameter for the room details page
      const roomData = JSON.stringify(this.room);

      this.$router.push({
        name: "RoomDetails",
        params: {
          roomId: roomId,
        },
        query: {
          roomData: roomData,
        },
      });
    },
  },
};
</script>
