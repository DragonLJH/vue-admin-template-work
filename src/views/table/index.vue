<template>
  <div>
    <EditModalBoxes @openEditModalBoxes="openModal" :list="item"></EditModalBoxes>
  </div>
</template>

<script>
import EditModalBoxes from "@/components/controller/EditModalBoxes";
export default {
  data() {
    return {
      item: {},
    };
  },
  methods: {
    openModal() {},
  },
  components: {
    EditModalBoxes,
  },
};
</script>

<style scoped>
</style>