<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-container class="bv-example-row mt-3 text-center">
      <b-row>
        <b-col></b-col>
        <b-col cols="5">
          <b-jumbotron
            bg-variant="white"
            text-variant="dark"
            border-variant="white"
          >
            <template #header>PerfecTrip</template>
  
            <template #lead> 모두의 여행 계획을 확인해보세요 </template>
  
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
    </b-container>
    <router-view></router-view>
  </b-container>
</template>
<script>

export default {
  name: "AppBoard",
  components: {
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
