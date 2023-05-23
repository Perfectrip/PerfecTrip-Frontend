<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <MainHeader></MainHeader>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <div
          style="
            background-color: #336600;
            height: 100px;
            margin-bottom: 20px;
            padding: 30px;
          "
        >
          <h3 style="color: aliceblue">PerfecTrip이 추천하는 경로</h3>
        </div>
        <FindKakaoMap
          :locations="this.items"
          :result="tmpStr"
          @way_list="getOrder"
          :send_route = "tmproute"
          @route_list = "getRoute"
        ></FindKakaoMap>
        <b-container class="bv-example-row mt-3 text-center" style="height: 200px;">
          <b-row style="margin:15px;">
            <b-col style="font-size: large; font-weight: 700;" cols="2">경로</b-col>
            <b-col cols="10">{{tmproute.route}}</b-col>
          </b-row>
          <b-row style="margin:15px;">
            <b-col style="font-size: large; font-weight: 700;" cols="2">이동 거리</b-col>
            <b-col cols="10">{{tmproute.meter}} km</b-col>
          </b-row>
          <b-row style="margin:15px;">
            <b-col style="font-size: large; font-weight: 700;" cols="2">소요 시간</b-col>
            <b-col cols="10">{{tmproute.time}}</b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!--선택한 여행지 목록 들어갈 자리-->
    <b-row></b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-form @submit="onSubmit">
          <b-form-group id="subject-group" label="" label-for="subject">
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="" label-for="content">
            <b-form-textarea
              id="content"
              v-model="article.content"
              placeholder="내용 입력..."
              required
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>
          <b-button
            type="submit"
            variant="success"
            style="width: 180px; margin: 50px; background-color: #336600"
            @click="removeAll"
            >여행경로 등록</b-button
          >
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
  
<script>
import { writeArticle } from "@/api/board";
import MainHeader from "@/components/main/MainHeader.vue";
import FindKakaoMap from "@/components/FindKakaoMap.vue";
import { mapState, mapActions } from "vuex";

const selectedStore = "selectedStore";
const memberStore = "memberStore";
export default {
  name: "AppSearch",
  components: {
    FindKakaoMap,
    MainHeader,
  },
  data() {
    return {
      tmpStr: "",
      tmproute: {},
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        order: "",
        content: "",
      },
    };
  },
  created() {
    //console.log(this.items);
    this.article.userid = this.userInfo.id;
  },
  computed: {
    ...mapState(selectedStore, ["items"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(selectedStore, ["deleteAll"]),
    //방금 하던 부분
    removeAll() {
      this.deleteAll(this.items);
    },
    getOrder(str) {
      this.tmpStr = str;
      this.article.order = str;
      console.log("에밋으로받음", this.article.order);
    },
    getRoute(route) {
      this.tmproute.time = route.time;
      this.tmproute.meter = route.meter;
      this.tmproute.route = route.route;
      console.log("에밋으로받음", this.tmproute.route);
    },
    onSubmit(event) {
      event.preventDefault();
      this.registArticle();
    },
    registArticle() {
      let param = {
        userId: this.article.userid,
        title: this.article.subject,
        order: this.article.order,
        content: this.article.content,
      };
      writeArticle(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
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
  