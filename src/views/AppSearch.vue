<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <MainHeader></MainHeader>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <planSearchBar
          :data_list="loc_list"
          @data_send="checkData"
        ></planSearchBar>
        <KeywordKakaoMap :chargers="loc_list"></KeywordKakaoMap>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!--선택한 여행지 목록 들어갈 자리-->
    <b-row></b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <selectedList></selectedList>
      </b-col>
      <b-col></b-col>
      <b-col cols="12">
        <router-link :to="{ name: 'plan' }">
          <b-button
            squared
            variant="success"
            style="width: 180px; margin: 50px; background-color: #336600"
            >여행경로 생성</b-button
          >
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import planSearchBar from "@/components/plan/planSearchBar.vue";
import KeywordKakaoMap from "@/components/KeywordKakaoMap.vue";
import MainHeader from "@/components/main/MainHeader.vue";
import selectedList from "@/components/selecteditems/selectedList.vue";

export default {
  name: "AppSearch",
  components: {
    planSearchBar,
    KeywordKakaoMap,
    MainHeader,
    selectedList,
  },
  data() {
    return {
      loc_list: null,
    };
  },
  methods: {
    checkData(data_list) {
      this.loc_list = data_list;
      // console.log(this.loc_list);
    },
  },
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
