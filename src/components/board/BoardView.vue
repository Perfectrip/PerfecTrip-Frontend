<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.id === article.userId">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleNo}.
          ${article.title} [${article.hit}]</h3><div><h6>${article.userId}</div><div>${article.registerTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
            <h3>여행 경로</h3>
            <ViewKakaoMap :locations="attractions"></ViewKakaoMap>
            <ul>
              <li v-for="attraction in attractions" :key="attraction.id">
                <b-container class="bv-example-row">
                  <b-row class="mt-3">
                    <b-col cols="11" class="bg-light p-2 pl-5 text-left">
                      <img
                        :src="attraction.firstImage"
                        style="
                          opacity: 80%;
                          height: 100px;
                          width: 100px;
                          border-radius: 20%;
                          margin-right: 20px;
                        "
                      />
                      <span
                        style="font-size: 20px; font-weight: 800; margin: 30px"
                        >{{ attraction.title }}</span
                      >
                      <span style="font-size: 15px">{{
                        attraction.addr1
                      }}</span>
                    </b-col>
                    <b-col class="p-2"></b-col>
                  </b-row>
                </b-container>
              </li>
            </ul>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle, getAttraction } from "@/api/board";
// import { getAttraction } from "@/api/attaction"
import { mapState } from "vuex";
import ViewKakaoMap from "../ViewKakaoMap.vue";
const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  components: {
    ViewKakaoMap,
  },
  data() {
    return {
      article: {},
      attractions: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    message2() {
      if (this.article.order) return this.article.order.split("-").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.articleno;
    getArticle(
      param,
      ({ data }) => {
        this.article = data.article;
        console.log(this.article);
        // console.log(this.article.order)
        const orderList = this.article.order.split("-");
        //console.log(orderList);
        orderList.forEach((order) => {
          getAttraction(
            order,
            ({ data }) => {
              this.attractions.push(data);
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
    //console.log(this.article.order);
    //console.log(this.attractions);
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
