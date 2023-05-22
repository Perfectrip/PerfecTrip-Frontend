<template>
  <div class="row justify-content-center">
	<div class="col-lg-8 col-md-10 col-sm-12">
		<h2 class="my-3 py-3 shadow-sm bg-light text-center">
			<mark class="sky">글목록</mark>
		</h2>
	</div>
	<div class="col-lg-8 col-md-10 col-sm-12">
		<div class="row align-self-center mb-2">
			<div class="col-md-2 text-start">
				<button type="button" id="btn-mv-register"
					class="btn btn-outline-primary btn-sm">글쓰기</button>
			</div>
			<div class="col-md-7 offset-3">
				<form class="d-flex" id="form-search" action="">
					<input type="hidden" name="pgno" value="1" /> <select name="key"
						id="key" class="form-select form-select-sm ms-5 me-1 w-50"
						aria-label="검색조건">
						<option selected>검색조건</option>
						<option value="subject">제목</option>
						<option value="userid">작성자</option>
					</select>
					<div class="input-group input-group-sm">
						<input type="text" name="word" id="word" class="form-control"
							placeholder="검색어..." />
						<button id="btn-search" class="btn btn-dark" type="button">검색</button>
					</div>
				</form>
			</div>
		</div>
		<table class="table table-hover">
			<thead>
				<tr class="text-center">
					<th scope="col">글번호</th>
					<th scope="col">제목</th>
					<th scope="col">작성자</th>
					<th scope="col">조회수</th>
					<th scope="col">작성일</th>
				</tr>
			</thead>
			<tbody>
				<!-- <c:forEach var="article" items="${articles}">
					<tr class="text-center">
						<th scope="row">${article.articleNo}</th>
						<td class="text-start"><a href="#"
							class="article-title link-dark" data-no="${article.articleNo}"
							style="text-decoration: none"> ${article.subject} </a></td>
						<td>${article.userId}</td>
						<td>${article.hit}</td>
						<td>${article.registerTime}</td>
					</tr>
				</c:forEach> -->
			</tbody>
		</table>
	</div>
</div>
</template>

<script>
import { listArticle } from "@/api/board";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      searchKey: '',
      searchWord: '',
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
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
  methods: {
    search() {
      // Implement your search logic here
      // Use this.searchKey and this.searchWord to get the selected search key and search word
    },
    goToRegister() {
      let form = document.querySelector("#form-param");
      form.setAttribute("action", "${root}/article/write");
      form.submit();
    },

    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleno },
      });
    },
    mounted() {
    // Add your code for event listeners here
    let titles = document.querySelectorAll(".article-title");
    titles.forEach((title) => {
      title.addEventListener("click", () => {
        document.querySelector("#articleno").value = title.getAttribute("data-no");
        document.querySelector("#form-no-param").submit();
      });
    });

    let pages = document.querySelectorAll(".page-link");
    pages.forEach((page) => {
      page.addEventListener("click", () => {
        console.log(page.parentNode.getAttribute("data-pg"));
        document.querySelector("#p-pgno").value = page.parentNode.getAttribute("data-pg");
        document.querySelector("#p-key").value = this.searchKey;
        document.querySelector("#p-word").value = this.searchWord;
        let form = document.querySelector("#form-param");
        form.setAttribute("action", "${root}/article/list");
        form.submit();
      });
    });
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
