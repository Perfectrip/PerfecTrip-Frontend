<template>
  <b-container class="bv-example-row mt-3">
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
  
            <template #lead> Login </template>
  
            <hr class="my-4" />
  
            <p> </p>
            <p> </p>
            <p> </p>
          </b-jumbotron>
        </b-col>
        <b-col cols="5">
          <img src="@/assets/강릉.jpg" height="350px">
        </b-col>
        <b-col style="margin-bottom: 100px;"></b-col>
      </b-row>
    </b-container>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <div class="login-page">
          <b-form class="form">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group class="register-form" label="" label-for="userid">
              <b-form-input
                class="id"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
            <b-row>
              <b-col>
                <b-button
                  style="background-color: #ffffff; color: #53e3a6;"
                  variant="outline-primary"
                  class="new"
                  @click="movePage"
                  >회원가입</b-button>
              </b-col>
              <b-col>
                <b-button
                  style="background-color: #ffffff; color: #53e3a6;"
                  variant="outline-primary"
                  class="new"
                  @click="findPassword"
                  >비밀번호찾기</b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
  data() {
    return {
      // isLoginError: false,
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);
        alert("로그인 성공!");
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
    findPassword() {
      this.$router.push({ name: "findPassword" });
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
    width: 360px;
    padding: 2% 0 0;
    margin: auto;
  }
  
  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    height: 50px;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
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
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .form button .new{
    margin: 0 0 15px;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #ffffff;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: #50a3a2;
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

