<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>

    <b-container class="bv-example-row mt-3">
      <b-row class="align-self-center mb-2">
        <b-col md="2" class="text-start">
          <b-button variant="outline-primary" size="sm" @click="moveWrite"
            >글쓰기</b-button
          >
        </b-col>
        <b-col md="7" offset-md="3">
          <b-form class="d-flex" id="form-search" @submit.prevent="search">
            <input type="hidden" name="pgno" value="1" />
            <b-form-select
              v-model="searchCondition"
              class="form-select-sm ms-5 me-1 w-50"
            >
              <option value="" disabled selected>검색조건</option>
              <option value="user_id">작성자</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </b-form-select>
            <b-input-group>
              <b-form-input v-model="searchKeyword" placeholder="검색어..." />
              <b-button variant="dark" type="submit">검색</b-button>
            </b-input-group>
          </b-form>
        </b-col>
      </b-row>
      <!-- 글 목록 테이블 등의 코드 -->
    </b-container>

    <b-row v-if="articles.length > 0">
      <b-col>
        <b-table
          striped
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle"
        >
          <template #cell(subject)="data">
            <router-link
              :to="{
                name: 'boardview',
                params: { articleNo: data.item.articleNo },
              }"
            >
              {{ data.item.title }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-model="pg"
          :total-rows="totalRows"
          :per-page="spp"
          align="center"
          size="sm"
          class="mt-3"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],

      searchCondition: "title",
      searchKeyword: "",
      pg: 1,
      spp: 20,
      totalRows: 0,
    };
  },
  created() {
    this.getSizeOfArticles();
    this.fetchArticles();
  },
  methods: {
    getSizeOfArticles() {
      // 전체 게시글 개수 정보 가지고 오기
      let param = {
        pg: 1,
        spp: 1000,
        key: this.searchCondition,
        word: this.searchKeyword,
      };
      listArticle(
        param,
        ({ data }) => {
          this.totalRows = data.length;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    fetchArticles() {
      let param = {
        pg: this.pg,
        spp: this.spp,
        key: this.searchCondition,
        word: this.searchKeyword,
      };
      listArticle(
        param,
        ({ data }) => {
          this.articles = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    search() {
      this.getSizeOfArticles();
      this.pg = 1;
      this.fetchArticles();
    },
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleNo },
      });
    },
  },
  watch: {
    pg() {
      // pg 값이 변경될 때마다 호출되는 로직 구현
      // 예: 다음 게시글을 가져오는 API 호출 등
      this.fetchArticles();
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
