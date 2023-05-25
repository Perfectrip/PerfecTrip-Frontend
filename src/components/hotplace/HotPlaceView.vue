<template>
    <b-container class="bv-example-row mt-3 text-center">
      <b-row>
        <MainHeader></MainHeader>
      </b-row>
      <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-container>
          <!--여행지 정보 보여주는 화면-->
          <b-row>
            <b-col>
            <b-row >
              <b-col>
                <img :src="`${detail.firstImage}`" style="width: 450px; opacity: 85%;">
              </b-col>
              <b-col>
                <b-row class="text-right" style="">
                  <b-col>조회수 :  {{ detail.readCount}}</b-col>
                </b-row>
                <b-row class="text-left" style="margin-top:10px; margin-bottom: 20px; font-size: 20px; font-weight: 700;">
                  <b-col>{{ detail.title }}</b-col>
                </b-row>
                <b-row class="text-left" style="">
                  <b-col>{{ detail.addr1}}</b-col>
                </b-row>
                <b-row class="text-left" style="">
                  <b-col>{{ detail.tel}}</b-col>
                </b-row>
              </b-col>
            </b-row>
            </b-col>
          </b-row>
          <b-row style="margin-top: 50px;">
            <b-col>
              <b-tabs content-class="mt-3" align="right">
                <b-tab title="지도" class="text-center" style="align-items: center; justify-content: center;" active>
                  <SmallKakaoMap :chargers="[this.detail]"></SmallKakaoMap>
                </b-tab>
                <b-tab title="정보"><p>{{ detail.overview }}</p></b-tab>
              </b-tabs>
            </b-col>
          </b-row>
        </b-container>
        <!--댓글입력창-->
        <b-container style="margin-top: 50px;">
          <b-row>
            <b-col class="text-left" style="margin-left: 10px; margin-bottom: 30px; font-size: 25px; font-weight: 800;">댓글({{ this.comments.length }})</b-col>
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
              <b-button style="height: 85px; width: 80px; background-color: #336600;" @click="addComment">등록</b-button>
            </b-col>
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
        
      </b-col>
      <b-col></b-col>
    </b-row>
    </b-container>
    <!-- <p>{{ detail }}</p> -->
    <!-- <p>title : {{ detail.title }}</p>
    <p>addr1 : {{ detail.addr1 }}</p>
    <p>zipCode : {{ detail.zipCode }}</p>
    <p>tel : {{ detail.tel }}</p>
    <p>firstImage :  {{ detail.firstImage}}</p>
    <p>readCount : {{ detail.readCount }}</p>

    <p>lat : {{ detail.latitude }}</p>
    <p>lon : {{ detail.longitude }}</p>
    <p>overview : {{ detail.overview }}</p>

    <h2>댓글 작성</h2>
    <textarea v-model="commentText" rows="4" cols="50"></textarea>
    <button @click="addComment">댓글 작성</button>

    <h2>댓글 목록</h2>
    <b-list-group>
      <b-list-group-item v-for="(comment, index) in comments" :key="index">
        <div>
          <strong>{{ comment.userId }}</strong>
          <span>{{ comment.createdTime }}</span>
        </div>
        <p v-if=!isBeingFixed[index]>{{ comment.commentText }}</p>
        <textarea v-else></textarea>
        <button
          @click="modifyComment(comment.commentId, index)"
          v-if="userInfo.id === comment.userId"
        >
          댓글 수정
        </button>
        <button
          @click="deleteComment(comment.commentId)"
          v-if="userInfo.id === comment.userId"
        >
          댓글 삭제
        </button>
      </b-list-group-item>
    </b-list-group> -->

</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const memberStore = "memberStore";
const hotPlaceStore = "hotPlaceStore";
import MainHeader from "@/components/main/MainHeader.vue";
import SmallKakaoMap from "@/components/SmallKakaoMap.vue";
export default {
  name: "HotPlaceView",
  components: {
    MainHeader,
    SmallKakaoMap,
  },
  data() {
    return {
      cid: null,
      detail: null,
      commentText: "",
      comments: [],
      isBeingFixed: [],
    };
  },
  props: {
    id: Object,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(hotPlaceStore, ["contentId", "placeInfo"])
  },

  created() {
    // place 정보를 사용하여 추가적인 로직을 수행할 수 있습니다.
    this.cid = this.contentId;
    this.detail = this.placeInfo;

    const url1 = `http://localhost/hotplace/${this.cid}`;
    axios
      .get(url1)
      .then((response) => {
        // 요청에 대한 처리 로직 작성
        this.detail = response.data;
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
        if(response.data !== "") {
          this.comments = response.data;
          this.isBeingFixed = new Array(response.data.length).fill(false);
          console.log(this.isBeingFixed);
        }
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
      });
  },
  methods: {
    addComment() {
      if(this.commentText === "") {
        alert("댓글을 작성하세요.")
        return;
      }
      var today = new Date();   
      var hours = ('0' + today.getHours()).slice(-2); 
      var minutes = ('0' + today.getMinutes()).slice(-2);
      var seconds = ('0' + today.getSeconds()).slice(-2); 
      var timeString = hours + ':' + minutes  + ':' + seconds;

      const url = `http://localhost/hotplace/comment/`;
      const param = {
        contentId: this.cid,
        userId: this.userInfo.id,
        commentText: this.commentText,
        createdTime: timeString
      };

      axios
        .post(url, param)
        .then(() => {
          this.comments.unshift(param);

          const url2 = `http://localhost/hotplace/comment/${this.cid}`;
          return axios.get(url2);
        })
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          // 에러 처리 로직 작성
          console.error(error);
        });
      this.commentText = "";
    },
    modifyComment(commentId, index) {
      this.isBeingFixed[index] = true;
      console.log(this.isBeingFixed);
    },
    deleteComment(commentId) {
      const url = `http://localhost/hotplace/comment/${commentId}`;
      axios
        .delete(url)
        .then(() => {
        })
        .catch((error) => {
          // 에러 처리 로직 작성
          alert(error);
        });

      for(var i = 0; i < this.comments.length; i++){
        if (this.comments[i].commentId === commentId) { 
          this.comments.splice(i, 1);
          break;
        }
      }
    }
  },
};
</script>

<style></style>
