<template>
    <b-container class="bv-example-row mt-3 text-center">
      <b-row>
        <MainHeader></MainHeader>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="10">
            <div style="background-color: #336600; height: 100px; margin-bottom: 20px; padding: 30px;">
                <h3 style="color: aliceblue;"> PerfecTrip이 추천하는 경로 </h3>
            </div>
          <FindKakaoMap :locations="this.items"></FindKakaoMap>
          <div style="background-color: #336600; height: 100px; margin-bottom: 20px;"></div>
        </b-col>
        <b-col></b-col>
      </b-row>
      <!--선택한 여행지 목록 들어갈 자리-->
      <b-row></b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="10">
            <b-form-input placeholder="제목"></b-form-input>
            <b-form-textarea
                id="textarea"
                placeholder="내용"
                rows="12"
                max-rows="12"
    ></b-form-textarea>
        <b-button type="submit" variant="success" style="width: 180px; margin: 50px; background-color: #336600;">여행경로 등록</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import MainHeader from "@/components/main/MainHeader.vue";
  import FindKakaoMap from "@/components/FindKakaoMap.vue";
  import { mapState } from "vuex";

  const selectedStore = "selectedStore";

  export default {
    name: "AppSearch",
    components: {
      FindKakaoMap,
      MainHeader,
    },
    data() {
      return {
      }
    },
    created() {
      //console.log(this.items);
    },
    computed: {
      ...mapState(selectedStore, ["items"]),
    },
    methods: {
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
  