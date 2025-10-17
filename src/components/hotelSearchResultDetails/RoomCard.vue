<template>
  <el-card class="sm:w-75 md:w-85 lg:w-95" :body-style="{ padding: '0px' }">
    <img
      :src="room.images.thumbnail || hotelsDetails.data.hotel.thumbnail"
      alt="room image"
      class="w-full object-cover"
    />
    <div class="p-4 -mt-2">
      <h3 class="m-0">{{ room.name }}</h3>
      <!-- <p class="m-0">{{ room.description }}</p> -->
      <p class="text-sm font-semibold">
        Total price: {{ room.price.amount }} {{ room.price.currency }}
      </p>
      <el-button
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
};
</script>
