<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <MainHeader></MainHeader>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <MainSearchBar></MainSearchBar>
        <TheKakaoMap></TheKakaoMap>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!--선택한 여행지 목록 들어갈 자리-->
    <b-row></b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="12">
        <b-button squared variant="success" style="width: 180px; margin: 50px; background-color: #336600;">여행경로 생성</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MainSearchBar from "@/components/main/MainSearchBar.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import MainHeader from "@/components/main/MainHeader.vue";
export default {
  name: "AppSearch",
  components: {
    MainSearchBar,
    TheKakaoMap,
    MainHeader
  }
};
</script>

<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(56, 233, 40, 0.3) 30%
  );
}
</style>
