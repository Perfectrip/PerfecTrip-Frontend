<template>
  <div>
    <p>{{ detail }}</p>

    <h2>댓글 작성</h2>
    <textarea v-model="commentText" rows="4" cols="50"></textarea>
    <button @click="addComment">댓글 작성</button>

    <h2>댓글 목록</h2>
    <b-list-group>
      <b-list-group-item v-for="comment in comments" :key="comment.id">
        <div>
          <strong>{{ comment.userId }}</strong>
          <span>{{ comment.createdTime }}</span>
        </div>
        <p>{{ comment.commentText }}</p>
        <button
          @click="deleteComment(comment.id)"
          v-if="userInfo.id === comment.userId"
        >
          댓글 삭제
        </button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "HotPlaceView",
  data() {
    return {
      detail: null,
      commentText: "",
      comments: [],
    };
  },
  props: {
    id: Object,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  created() {
    // place 정보를 사용하여 추가적인 로직을 수행할 수 있습니다.
    this.detail = this.$route.params.id;
    console.log(this.detail);
    const url = `http://localhost/hotplace/comment/${this.detail.contentId}`;
    axios
      .get(url)
      .then((response) => {
        // 요청에 대한 처리 로직 작성
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error(error);
      });
  },
  methods: {
    addComment() {
      const url = `http://localhost/hotplace/comment/`;
      const param = {
        contentId: this.detail.contentId,
        userId: this.userInfo.id,
        commentText: this.commentText,
      };
      axios
        .post(url, param)
        .then((response) => {
          // 요청에 대한 처리 로직 작성
          console.log(response);
          this.comments.unshift(response.data);
          //this.datalist = response.data;
          //console.log(this.data);
          // this.send_data(this.datalist);
        })
        .catch((error) => {
          // 에러 처리 로직 작성
          console.error(error);
        });
      this.commentText = "";
    },
  },
};
</script>

<style></style>
