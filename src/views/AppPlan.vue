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
        ></FindKakaoMap>
        <div
          style="background-color: #336600; height: 100px; margin-bottom: 20px"
        ></div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!--선택한 여행지 목록 들어갈 자리-->
    <b-row></b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-form @submit="onSubmit">
          <b-form-group id="subject-group" label="제목:" label-for="subject">
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
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
import { mapState } from "vuex";

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
    getOrder(str) {
      this.tmpStr = str;
      this.article.order = str;
      console.log("에밋으로받음", this.article.order);
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
  