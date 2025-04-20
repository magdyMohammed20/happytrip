<template>
  <top-bar icon="i-mdi-present" toPath="/" title="Available Packages"></top-bar>
  <packages-categories-cards></packages-categories-cards>
</template>
  <script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("packages", ["fetchPackageCategories"])
    },
    mounted() {
        this.fetchPackageCategories();
    },
};
</script>
