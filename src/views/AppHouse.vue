<template>
  <b-container class="bv-example-row mt-3 text-center">
    <main-header />
    <b-row cols="12" md="3">
      <b-card
        v-for="place in places"
        :key="place.contentId"
        v-bind:name="place.title"
        v-bind:no="place.contentId"
        tag="article"
        style="
          max-width: 20rem;
          margin-left: 30px;
          margin-right: 25px;
          margin-top: 30px;
        "
        class="mb-2"
      >
        <b-card-img
          :src="`${place.firstImage}`"
          style="height: 150px; opacity: 75%"
        ></b-card-img>
        <b-card-title
          style="font-size: 15px; font-weight: 800; margin-bottom: 20px"
          >{{ place.title }}</b-card-title
        >
        <b-card-text
          style="max-height: 80px; overflow: hidden; text-overflow: ellipsis"
        >
          {{ place.overview }}
        </b-card-text>
        <b-button
          href="#"
          variant="success"
          @click="showDetails(place)"
          style="background-color: #336600"
          >상세보기</b-button
        >
      </b-card>
      <infinite-loading @infinite="infiniteHandler" spinner="spiral">
        <div
          slot="no-more"
          style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px"
        >
          목록의 끝입니다
        </div>
      </infinite-loading>
    </b-row>
  </b-container>
</template>
<script>
import MainHeader from "@/components/main/MainHeader.vue";
//eslint-disable-next-line no-unused-vars
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

export default {
  name: "AppHouse",
  components: {
    MainHeader,
    InfiniteLoading,
  },
  created() {
    axios.get("http://localhost/hotplace?pg=1").then((res) => {
      //console.log(res.data);
      this.places = res.data;
      console.log(this.places);
    });
  },
  data() {
    return {
      places: [],
      limit: 2,
    };
  },
  methods: {
    showDetails(place) {
      console.log("이 장소에 대한 정보:", place);
      axios
        .get("http://localhost/hotplace/" + place.contentId)
        .then(() => {})
        .catch(() => {});
      this.$router.push({ name: "details", params: { id: place } });
    },
    infiniteHandler($state) {
      axios
        .get("http://localhost/hotplace?pg=" + this.limit)
        .then((res) => {
          console.log("추가로딩", res);
          setTimeout(() => {
            if (res.data.length) {
              this.places = this.places.concat(res.data);
              $state.loaded();
              this.limit += 1;
              console.log("after", this.places.length, this.limit);
              if (res.data.length / 20 < 1) {
                $state.complete();
              }
            } else {
              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(this.places);
    },
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
