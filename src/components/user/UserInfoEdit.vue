<template>
    <div class="container">
        <div class="form">
        <h1>My page</h1>
            <form>
                <input type="hidden" name="action" value="update">
                <label for="id">아이디:</label>
                <input type="text" id="id" v-model="id">
                <label for="password">비밀번호:</label>
                <input type="password" id="password" v-model="password">
                <label for="email">이메일:</label>
                <input type="email" id="email" v-model="email">
                <label for="name">이름:</label>
                <input type="text" id="name" v-model="name">
                <label for="age">나이:</label>
                <input type="number" id="age" v-model="age">
                <div id = "buttons">
                <button @click="submit">수정하기</button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
<script>
import { mapState } from "vuex";
const memberStore = "memberStore";

  export default {
    data() {
      return {
        id: '',
        password: '',
        email: '',
        name: '',
        age: ''
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
      submit() {
        // 정보 수정 로직
        // 수정된 정보를 서버로 전송 등
  
        // 정보 수정 후 리다이렉트
        this.goToProfile();
      },
      goToProfile() {
        this.$router.push('/profile');
      },
      deleteUser() {
        // 회원 탈퇴 로직
      }
    }
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
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0
		rgba(0, 0, 0, 0.24);
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

.form #update:hover, .form #update:active, .form #update:focus {
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

.form #delete:hover, .form #delete:active, .form #delete:focus {
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

.form button:hover, .form button:active, .form button:focus {
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