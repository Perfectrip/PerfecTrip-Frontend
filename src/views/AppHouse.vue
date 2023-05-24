<template>
  <b-container class="bv-example-row mt-3 text-center">
    <main-header/>
    <b-row cols="12" md="3">
        <b-card
          v-for="place in places[0]" :key="place.contentId"
          v-bind:name="place.title" v-bind:no="place.contentId"
          v-bind:followState="place.followState"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
    <b-card-img :src="`${ place.firstImage }`" style="height: 150px;"></b-card-img>
    <b-card-title style="font-size: 20px; font-weight: 800; margin-bottom: 20px;">{{place.title}}</b-card-title>
    <b-card-text style="max-height: 80px; overflow: hidden; text-overflow: ellipsis;">
      {{ place.overview }}
    </b-card-text>
    <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="no-more" style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;">목록의 끝입니다</div>
    </infinite-loading>
    </b-row>
  </b-container>
</template>
<script>
import MainHeader from "@/components/main/MainHeader.vue";
//eslint-disable-next-line no-unused-vars
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
export default {
  name: "AppHouse",
  components: {
    MainHeader,
    InfiniteLoading,
  },
  created() {
    axios.get('http://localhost/hotplace?pg=1')
      .then(res => {
        //console.log(res.data);
        this.places.push(res.data);
        console.log(this.places);
      })
  },
  data() {
    return {
      places: [],
      limit: 1,
    }
  },
  methods: {
    infiniteHandler($state) {
      axios.get('http://localhost/hotplace?pg=' + (this.limit+1))
        .then(res => {
          console.log('추가로딩',res);
          setTimeout(() => {
            if (res.data.length) {
              this.places = this.places.concat(res.data);
              console.log('place에 추가됨');
              $state.loaded();
              if (res.data.length / 20 < 1) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
          }, 1000)
        }).catch(err => {
          console.error(err);
        })
      console.log(this.places);
    }
  }
}
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
