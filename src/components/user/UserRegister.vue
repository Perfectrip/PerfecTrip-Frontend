<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <MainHeader></MainHeader>
    </b-row>
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="login-page">
          <!-- <h1>Welcome</h1> -->
          <div class="form">
            <form name="register-form" class="register-form" @submit.prevent="registerUser">
              <input v-model="id" type="text" placeholder="id" required />
              <input v-model="password" type="password" placeholder="password" required />
              <input v-model="email" type="email" placeholder="email address" required />
              <input v-model="name" type="text" placeholder="name" required />
              <input v-model="age" type="number" placeholder="age" required />
              <button type="submit">회원 등록</button>
            </form>
          </div>
        </div>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegister",
  data() {
    return {
      id: "",
      password: "",
      email: "",
      name: "",
      age: null,
    };
  },
  methods: {
    registerUser() {
      const userData = {
        id: this.id,
        password: this.password,
        email: this.email,
        name: this.name,
        age: this.age,
      };
      // 회원 등록 로직을 작성하세요.
      // 서버로 데이터를 전송하고 응답을 처리하는 부분입니다.
      // axios나 fetch 등을 사용하여 AJAX 요청을 보낼 수 있습니다.
      // 필요한 경우 데이터 유효성 검사를 추가하세요.
      // 입력된 데이터를 서버로 전송하고 응답을 처리하는 로직을 작성하세요.
      axios.post('http://localhost/user/join', userData)
        .then(response => {
          // 회원 등록 성공 처리
          console.log(response.data); // 응답 데이터 출력 예시
          alert(response.data);
          this.$router.push({ name: "main" });
        })
        .catch(error => {
          // 회원 등록 실패 처리
          console.error(error); // 에러 처리 예시
          alert(error);
        });
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
