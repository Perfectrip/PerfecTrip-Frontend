<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
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

              <template #lead> 지금 인기있는 장소를 확인하세요 </template>

              <hr class="my-4" />

              <p></p>
              <p></p>
              <p></p>
            </b-jumbotron>
          </b-col>
          <b-col cols="5">
            <img src="@/assets/제주.jpg" height="350px" />
          </b-col>
          <b-col style="margin-bottom: 400px"></b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-container>
          <!--여행지 정보 보여주는 화면-->
          <b-row>
            <b-col>
              <b-row>
                <b-col>
                  <img
                    :src="`${detail.firstImage}`"
                    style="width: 450px; opacity: 85%"
                  />
                </b-col>
                <b-col>
                  <b-row class="text-right" style="">
                    <b-col>조회수 : {{ detail.readCount }}</b-col>
                  </b-row>
                  <b-row
                    class="text-left"
                    style="
                      margin-top: 10px;
                      margin-bottom: 20px;
                      font-size: 20px;
                      font-weight: 700;
                    "
                  >
                    <b-col>{{ detail.title }}</b-col>
                  </b-row>
                  <b-row class="text-left" style="">
                    <b-col>{{ detail.addr1 }}</b-col>
                  </b-row>
                  <b-row class="text-left" style="">
                    <b-col>{{ detail.tel }}</b-col>
                  </b-row>
                  <b-row
                    class="text-left"
                    style="margin-top: 30px;
                      margin-bottom: 20px;
                      font-size: 20px;
                      font-weight: 700;">
                    <b-col>날씨</b-col>
                  </b-row>
                  <b-row class="text-left" style="">
                    <b-col>날씨 : {{ sun }}</b-col>
                  </b-row>
                  <b-row class="text-left" style="">
                    <b-col>강수 확률 : {{ rain }}</b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row style="margin-top: 50px">
            <b-col>
              <b-tabs content-class="mt-3" align="right">
                <b-tab
                  title="지도"
                  class="text-center"
                  style="align-items: center; justify-content: center"
                  active
                >
                  <SmallKakaoMap :chargers="array_detail"></SmallKakaoMap>
                </b-tab>
                <b-tab title="정보"
                  ><p>{{ detail.overview }}</p></b-tab
                >
              </b-tabs>
            </b-col>
          </b-row>
        </b-container>
        <!--댓글입력창-->
        <b-container style="margin-top: 50px">
          <b-row>
            <b-col
              class="text-left"
              style="
                margin-left: 10px;
                margin-bottom: 30px;
                font-size: 25px;
                font-weight: 800;
              "
              >댓글({{ this.comments.length }})</b-col
            >
          </b-row>
          <b-row>
            <b-col cols="10">
              <b-form-textarea
                id="textarea"
                placeholder="댓글을 작성해주세요"
                v-model="commentText"
                rows="3"
              ></b-form-textarea>
            </b-col>
            <b-col cols="2">
              <b-button
                style="height: 85px; width: 80px; background-color: #336600"
                @click="addComment"
                >등록</b-button
              >
            </b-col>
          </b-row>
        </b-container>
        <b-container style="margin-top: 20px">
          <b-list-group>
            <b-list-group-item
              v-for="(comment, index) in comments"
              :key="index"
            >
              <b-row>
                <b-col cols="8" class="text-left">
                  <p v-if="!comment.isEditing">{{ comment.commentText }}</p>
                  <textarea v-model="comment.editedText" v-else></textarea>
                </b-col>
                <b-col cols="4">
                  <b-row>
                    <b-col>
                      <strong style="margin-right: 10px">{{
                        comment.userId
                      }}</strong>
                      <span>{{ comment.createdTime }}</span>
                    </b-col>
                    <b-col>
                      <b-button
                        variant="secondary"
                        style="margin: 5px"
                        @click="modifyComment(comment)"
                        v-if="
                          userInfo.id === comment.userId && !comment.isEditing
                        "
                      >
                        수정
                      </b-button>
                      <b-button
                        variant="secondary"
                        style="margin: 5px"
                        @click="modifyComment2(comment)"
                        v-if="
                          userInfo.id === comment.userId && comment.isEditing
                        "
                      >
                        수정
                      </b-button>
                      <b-button
                        variant="danger"
                        @click="deleteComment(comment.commentId)"
                        v-if="
                          userInfo.id === comment.userId && !comment.isEditing
                        "
                      >
                        삭제
                      </b-button>
                      <b-button
                        variant="danger"
                        @click="resetComment(comment)"
                        v-if="
                          userInfo.id === comment.userId && comment.isEditing
                        "
                      >
                        취소
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-container>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!--선택한 여행지 목록 들어갈 자리-->
    <b-row></b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const memberStore = "memberStore";
const hotPlaceStore = "hotPlaceStore";
import SmallKakaoMap from "@/components/SmallKakaoMap.vue";

export default {
  name: "HotPlaceView",
  components: {
    SmallKakaoMap,
  },
  data() {
    return {
      cid: null,
      detail: null,
      commentText: "",
      comments: [],
      array_detail: [],
      weather: {},
      sun: null,
      rain: null,
    };
  },
  props: {
    id: Object,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(hotPlaceStore, ["contentId", "placeInfo"]),
  },

  created() {
    window.scrollTo(0,0);
    // place 정보를 사용하여 추가적인 로직을 수행할 수 있습니다.
    this.cid = this.contentId;
    this.detail = this.placeInfo;
    // var today = new Date();
    // var year = today.getFullYear();
    // var month = ('0' + (today.getMonth() + 1)).slice(-2);
    // var day = ('0' + today.getDate()).slice(-2);
    //eslint-disable-next-line no-unused-vars
    var dateString = "20230525";
    console.log(dateString);
    const urlrain = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=' +
      'a%2B4EqZEUaO8VB1PqSIQilM2GjsSALMuAYDes%2FVu9qVV3LY7GX6LhOlHv%2F4B9RPXY8WTW9Q2Eu5ECsCLp%2BSjAHg%3D%3D'
      + '&pageNo=1&numOfRows=10&dataType=JSON&base_date=' +
      +dateString + '&base_time=0500&nx=' + this.detail.latitude.toFixed(0) + '&ny='+this.detail.longitude.toFixed(0);
    const url1 = `http://localhost/hotplace/${this.cid}`;
    axios.get(urlrain)
      .then((response) => {
        var sky = response.data.response.body.items.item[5].fcstValue;
        var pty = response.data.response.body.items.item[6].fcstValue;
        if (sky === '1') {
          this.weather.sun = '맑음';
        } else if (sky === '3') {
          this.weather.sun = '구름많음';
        } else {
          this.weather.sun = '흐림';
        }
        if (pty === '0') {
          this.weather.rain = '강수 확률 없음';
        } else if (pty === '1') {
          this.weather.rain = '비';
        } else if (pty === '2') {
          this.weather.rain = '비 혹은 눈';
        } else if (pty === '3') {
          this.weather.rain = '눈';
        } else {
          this.weather.rain = '소나기';
        }
        this.sun = this.weather.sun;
        this.rain = this.weather.rain;
        console.log(this.weather);
      });
    axios
      .get(url1)
      .then((response) => {
        // 요청에 대한 처리 로직 작성
        this.detail = response.data;
        // 여기서 for문 돌면서 isEditing 항목 추가 false로
        this.array_detail = [this.detail];
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
      });

    const url2 = `http://localhost/hotplace/comment/${this.cid}`;
    axios
      .get(url2)
      .then((response) => {
        // 요청에 대한 처리 로직 작성
        if (response.data !== "") {
          this.comments = response.data.map((item) => {
            return {
              ...item,
              isEditing: false,
            };
          });
          console.log("댓글 목록들", this.comments);
        }
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
      });
  },
  methods: {
    addComment() {
      if (this.commentText === "") {
        alert("댓글을 작성하세요.");
        return;
      }
      var today = new Date();
      var hours = ("0" + today.getHours()).slice(-2);
      var minutes = ("0" + today.getMinutes()).slice(-2);
      var seconds = ("0" + today.getSeconds()).slice(-2);
      var timeString = hours + ":" + minutes + ":" + seconds;

      const url = `http://localhost/hotplace/comment/`;
      const param = {
        contentId: this.cid,
        userId: this.userInfo.id,
        commentText: this.commentText,
        createdTime: timeString,
        isEditing: false,
      };

      axios
        .post(url, param)
        .then(() => {
          const url2 = `http://localhost/hotplace/comment/${this.cid}`;
          return axios.get(url2);
        })
        .then((response) => {
          if (response.data !== "") {
            this.comments = response.data.map((item) => {
              return {
                ...item,
                isEditing: false,
              };
            });
            console.log("댓글 목록들", this.comments);
          }
        })
        .catch((error) => {
          // 에러 처리 로직 작성
          console.error(error);
        });
      this.commentText = "";
    },
    modifyComment(comment) {
      comment.isEditing = true;
      comment.editedText = comment.commentText;

      console.log("수정중인 댓글", comment);
    },
    modifyComment2(comment) {
      if (comment.editedText === "") {
        alert("댓글을 작성하세요.");
        return;
      }
      comment.isEditing = false;
      comment.commentText = comment.editedText;
      comment.editedText = "";
      // put method
      const url = `http://localhost/hotplace/comment`;
      const param = {
        commentId: comment.commentId,
        contentId: this.cid,
        userId: this.userInfo.id,
        commentText: comment.commentText,
      };
      axios
        .put(url, param)
        .then(() => {})
        .catch((error) => {
          // 에러 처리 로직 작성
          console.error(error);
        });
      console.log("수정완료");
    },

    deleteComment(commentId) {
      var con_test = confirm("정말로 삭제하시겠습니까?");
      if (con_test == true) {
        const url = `http://localhost/hotplace/comment/${commentId}`;
        axios
          .delete(url)
          .then(() => {})
          .catch((error) => {
            // 에러 처리 로직 작성
            alert(error);
          });

        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].commentId === commentId) {
            this.comments.splice(i, 1);
            break;
          }
        }
        alert("삭제되었습니다.");
      }
    },
    resetComment(comment) {
      comment.isEditing = false;
    },
  },
};
</script>

<style></style>
