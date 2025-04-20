<template>
  <top-bar icon="i-mdi-building" title="Featured Hotels" toPath="/"></top-bar>
  <featured-hotels-cards></featured-hotels-cards>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("featuredHotels", ["fetchFeaturedHotels"])
  },
  mounted() {
    this.fetchFeaturedHotels();
  }
};
</script>