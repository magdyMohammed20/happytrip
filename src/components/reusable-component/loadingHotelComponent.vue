<template>
  <el-skeleton class="py-8" :rows="1" animated />
  <el-card v-for="skeleton in 6" class="my-5 sm:px-3 lg:md:px-0">
    <el-skeleton :loading="true" animated>
      <template #template>
        <el-skeleton-item variant="p" />

        <div class="flex">
          <el-skeleton-item variant="image" style="width: 240px; height: 140px" />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <div
              style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
            </div>
            <div
              class="my-2"
              style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-right: 16px" />
            </div>
            <el-skeleton-item variant="p" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>