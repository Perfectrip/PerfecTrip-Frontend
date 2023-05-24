<template>
  <b-container class="mt-4" v-if="userInfo">
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
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron style="background-color: white;">
          <template #header>
            <img src="@/assets/profile.jpg" style="height: 200px; border-radius: 100%;"/>
          </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.id }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.name }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">나이</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.age }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" @click="goToInfoEdit" class="mr-1">정보수정</b-button>
          <b-button variant="danger" @click="delUser">회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapActions("memberStore", ["deleteUser"]),
  },

  methods: {
    goToInfoEdit() {
      this.$router.push({ name: "info-edit" });
    },
    async delUser() {
      // 회원 탈퇴 로직
      const confirmDelete = confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        await this.deleteUser();
      }
    }
  }
};
</script>

<style></style>
