<template>
  <div class="container">
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
  
            <template #lead> My Page </template>
  
            <hr class="my-4" />
  
            <p> </p>
            <p> </p>
            <p> </p>
          </b-jumbotron>
        </b-col>
        <b-col cols="5">
          <img src="@/assets/강릉.jpg" height="350px">
        </b-col>
        <b-col style="margin-bottom: 200px;"> <div></div></b-col>
      </b-row>
    </b-container>
    <div class="form">
      <form name="update-form" class="update-form" @submit.prevent="updateUser">
        <label for="id">아이디:</label>
        <input type="text" id="id" v-model="id" readonly />
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" />
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" readonly />
        <label for="name">이름:</label>
        <input type="text" id="name" v-model="name" />
        <label for="age">나이:</label>
        <input type="number" id="age" v-model="age" />
        <div id="buttons">
          <button type="submit">수정하기</button>
        </div>
      </form>
    </div>
  </b-row>
  </div>
</template>
  
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      id: "",
      password: "",
      email: "",
      name: "",
      age: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  created() {
    this.id = this.userInfo.id;
    this.email = this.userInfo.email;
    this.name = this.userInfo.name;
    this.age = this.userInfo.age;
  },
  methods: {
    ...mapActions(memberStore, ["updateUserInfo"]), // 추가

    updateUser() {
      // 정보 수정 로직
      // 수정된 정보를 서버로 전송 등
      const userData = {
        id: this.id,
        password: this.password,
        email: this.email,
        name: this.name,
        age: this.age,
      };
      // Vuex 상태 업데이트
      this.updateUserInfo(userData); // Vuex 액션 호출

      axios
        .put("http://localhost/user/update", userData)
        .then((response) => {
          // 회원정보 수정 성공 처리
          console.log(response.data); // 응답 데이터 출력 예시
          alert(response.data);

          // 정보 수정 후 리다이렉트
          this.goToMypage();
        })
        .catch((error) => {
          // 회원정보 수정 실패 처리
          console.error(error); // 에러 처리 예시
          alert(error);
        });
        window.scrollTo(0,0);
    },
    goToMypage() {
      this.$router.push({ name: "mypage" });
    },
  },
};
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

a {
  text-decoration: none;
  color: whitesmoke;
}

body {
  position: relative;
  min-height: 100vh;
}

/* header 태그 안에 CSS 속성 */
header {
  height: 70px;
  background-color: #53e3a6;
  color: white;
  line-height: 70px;
  padding: 0px 30px;
}

.header-nav {
  display: flex;
  justify-content: space-between;
}

.nav-menu {
  margin-right: 10px;
}

.content-user-list h1 {
  text-align: center;
}

.login-page {
  width: 800px;
  height: 800px;
  padding: 7% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 500px;
  margin: 0 auto 100px;
  margin-top: 20px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #fbfff7;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form #update {
  flex-direction: row;
  align-items: flex;
}

.form #update {
  margin: 0 0 15px;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #53e3a6;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form #update:hover,
.form #update:active,
.form #update:focus {
  background: #82befa;
}

.form #delete {
  flex-direction: row;
  align-items: flex;
}

.form #delete {
  margin: 0 0 15px;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #ff004c;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form #delete:hover,
.form #delete:active,
.form #delete:focus {
  background: #82befa;
}

.form button {
  margin: 0 0 15px;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #53e3a6;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffff00;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #82befa;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: green;
  text-decoration: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 100%;
  margin: 0 auto;
  height: auto;
  min-height: 100%;
  padding-bottom: 70px;
}

.content-user-list-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list-item {
  margin: 10px;
}

.user-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* footer 태그 안에 CSS 속성 */
footer {
  position: absolute;
  bottom: 0;
  background-color: #53e3a6;
  color: white;
  width: 100%;
  height: 70px;
  line-height: 70px;
}

.footer-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-list a {
  margin: 0px 10px;
}
</style>