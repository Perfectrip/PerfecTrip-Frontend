<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-jumbotron
          bg-variant="white"
          text-variant="dark"
          border-variant="white"
        >
          <template #header>Enjoy Trip</template>

          <template #lead> 나만의 여행계획을 짜보세요 </template>

          <hr class="my-4" />

          <p> </p>
          <p> </p>
          <p> </p>
        </b-jumbotron>
      </b-col>
      <b-col cols="5">
        <img src="@/assets/제주.jpg" height="350px">
      </b-col>
      <b-col style="margin-bottom: 400px;"></b-col>
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
export default {
  name: "AppSearch",
  components: {
    MainSearchBar,
    TheKakaoMap
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
