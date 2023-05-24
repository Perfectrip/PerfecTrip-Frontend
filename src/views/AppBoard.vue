<template>
  <b-container class="bv-example-row mt-3 text-center">
    <MainHeader></MainHeader>
    <router-view></router-view>
  </b-container>
</template>
<script>
import MainHeader from "@/components/main/MainHeader.vue";
export default {
  name: "AppBoard",
  components: {
    MainHeader,
  }
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
</style>
