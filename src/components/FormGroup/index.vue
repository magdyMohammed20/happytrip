<template>
 
</template>

<script>
export default {
  inheritAttrs: false,
  components: {
  },
  props: {
    class: {
      type: String,
      default: "",
      required: false,
      description: "class for the form item",
    },
    label: {
      type: String,
      default: "",
      required: false,
      description: "label for the form item",
    },
  },
  computed: {},
};
</script>
