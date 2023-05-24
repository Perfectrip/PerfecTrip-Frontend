<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col></b-col>
      <b-col cols="20">
        <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      >
      <b-carousel-slide>
        <b-container>
        <h1>PerfecTrip</h1>
        <h2>떠나보세요</h2>
        </b-container>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/강릉.jpg"
            alt="image slot"
          >
          
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <b-container>
        <h1>PerfecTrip</h1>
        <h2>떠나보세요</h2>
        </b-container>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/제주.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <b-container>
        <h1>PerfecTrip</h1>
        <h2>떠나보세요</h2>
        </b-container>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/한옥.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
        </b-carousel>
      <b-col>
        <MainSearchBar :data_list="loc_list"
                        @data_send="checkData"></MainSearchBar>
      </b-col>
        <TheKakaoMap :chargers="loc_list"></TheKakaoMap>
      </b-col>
      <b-col>
        <b-row cols="12" md="3">
          <div v-for="loc in loc_list" :key="loc.contentId" 
          class="card-item effect11 left_to_right"
          @click="showDetails(loc)">
            <a>
            <div class ="img">
              <img :src="`${ loc.firstImage }`" alt="img">
            </div>
            <div class="info">
              <h3>{{loc.title}} </h3>
            </div>
          </a>
          </div>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MainSearchBar from "@/components/main/MainSearchBar.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import { mapActions } from "vuex";

const hotPlaceStore = "hotPlaceStore";
export default {
  name: "AppMain",
  components: {
    MainSearchBar,
    TheKakaoMap,
},
  data() {
    return {
      loc_list: null,
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    ...mapActions(hotPlaceStore, ['updateValue']),
    showDetails(place) {
      console.log("이 장소에 대한 정보:", place);
      this.updateValue(place);
      this.$router.push({ name: "details", params: { id: place } });
    },
    //eslint-disable-next-line no-unused-vars
    onSlideStart(slide) {
        this.sliding = true
    },
      //eslint-disable-next-line no-unused-vars
      onSlideEnd(slide) {
        this.sliding = false
      },
    checkData(data_list) {
      this.loc_list = data_list;
      console.log(this.loc_list);
    }
  }
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
.card-item {
    position: relative;
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;
  }
  .card-item img {
    width: 100%;
    height: 100%;
  }
  
  .card-item{
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
  }
  .card-item .img {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
  }
  .card-item .img:before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 16px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.3);
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
  }
  .card-item .info {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
.effect11 {
    -webkit-perspective: 900px;
    -moz-perspective: 900px;
    perspective: 900px;
  }
.effect11 .img {
    opacity: 1;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -o-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
  }
.effect11.colored .info {
    background: #1a4a72;
  }
.effect11 .info {
    background: #333333;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all 0.35s ease 0.35s;
    -moz-transition: all 0.35s ease 0.35s;
    transition: all 0.35s ease 0.35s;
  }
.effect11 .info h3 {
    color: #fff;
    text-transform: uppercase;
    position: relative;
    letter-spacing: 2px;
    font-size: 22px;
    margin: 0 30px;
    padding: 55px 0 0 0;
    height: 110px;
    text-shadow: 0 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.3);
  }
.effect11 .info p {
    color: #bbb;
    padding: 10px 5px;
    font-style: italic;
    margin: 0 30px;
    font-size: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
.effect11 a:hover .img {
    opacity: 0;
  }
.effect11 a:hover .info {
    visibility: visible;
    opacity: 1;
  }
  
.effect11.left_to_right .img {
    -webkit-transform: translateZ(0) rotateY(0);
    -moz-transform: translateZ(0) rotateY(0);
    -ms-transform: translateZ(0) rotateY(0);
    -o-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
.effect11.left_to_right .info {
    -webkit-transform: translateZ(-1000px) rotateY(-90deg);
    -moz-transform: translateZ(-1000px) rotateY(-90deg);
    -ms-transform: translateZ(-1000px) rotateY(-90deg);
    -o-transform: translateZ(-1000px) rotateY(-90deg);
    transform: translateZ(-1000px) rotateY(-90deg);
  }
.effect11.left_to_right a:hover .img {
    -webkit-transform: translateZ(-1000px) rotateY(90deg);
    -moz-transform: translateZ(-1000px) rotateY(90deg);
    -ms-transform: translateZ(-1000px) rotateY(90deg);
    -o-transform: translateZ(-1000px) rotateY(90deg);
    transform: translateZ(-1000px) rotateY(90deg);
  }
.effect11.left_to_right a:hover .info {
    -webkit-transform: translateZ(0) rotateY(0);
    -moz-transform: translateZ(0) rotateY(0);
    -ms-transform: translateZ(0) rotateY(0);
    -o-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
  
.effect11.right_to_left .img {
    -webkit-transform: translateZ(0) rotateY(0);
    -moz-transform: translateZ(0) rotateY(0);
    -ms-transform: translateZ(0) rotateY(0);
    -o-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
.effect11.right_to_left .info {
    -webkit-transform: translateZ(-1000px) rotateY(90deg);
    -moz-transform: translateZ(-1000px) rotateY(90deg);
    -ms-transform: translateZ(-1000px) rotateY(90deg);
    -o-transform: translateZ(-1000px) rotateY(90deg);
    transform: translateZ(-1000px) rotateY(90deg);
  }
.effect11.right_to_left a:hover .img {
    -webkit-transform: translateZ(-1000px) rotateY(-90deg);
    -moz-transform: translateZ(-1000px) rotateY(-90deg);
    -ms-transform: translateZ(-1000px) rotateY(-90deg);
    -o-transform: translateZ(-1000px) rotateY(-90deg);
    transform: translateZ(-1000px) rotateY(-90deg);
  }
.effect11.right_to_left a:hover .info {
    -webkit-transform: translateZ(0) rotateY(0);
    -moz-transform: translateZ(0) rotateY(0);
    -ms-transform: translateZ(0) rotateY(0);
    -o-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
  
.effect11.top_to_bottom .img {
    -webkit-transform: translateZ(0) rotateX(0);
    -moz-transform: translateZ(0) rotateX(0);
    -ms-transform: translateZ(0) rotateX(0);
    -o-transform: translateZ(0) rotateX(0);
    transform: translateZ(0) rotateX(0);
  }
.effect11.top_to_bottom .info {
    -webkit-transform: translateZ(-1000px) rotateX(90deg);
    -moz-transform: translateZ(-1000px) rotateX(90deg);
    -ms-transform: translateZ(-1000px) rotateX(90deg);
    -o-transform: translateZ(-1000px) rotateX(90deg);
    transform: translateZ(-1000px) rotateX(90deg);
  }
.effect11.top_to_bottom a:hover .img {
    -webkit-transform: translateZ(-1000px) rotateX(-90deg);
    -moz-transform: translateZ(-1000px) rotateX(-90deg);
    -ms-transform: translateZ(-1000px) rotateX(-90deg);
    -o-transform: translateZ(-1000px) rotateX(-90deg);
    transform: translateZ(-1000px) rotateX(-90deg);
  }
.effect11.top_to_bottom a:hover .info {
    -webkit-transform: translateZ(0) rotateX(0);
    -moz-transform: translateZ(0) rotateX(0);
    -ms-transform: translateZ(0) rotateX(0);
    -o-transform: translateZ(0) rotateX(0);
    transform: translateZ(0) rotateX(0);
  }
  
.effect11.bottom_to_top .img {
    -webkit-transform: translateZ(0) rotateX(0);
    -moz-transform: translateZ(0) rotateX(0);
    -ms-transform: translateZ(0) rotateX(0);
    -o-transform: translateZ(0) rotateX(0);
    transform: translateZ(0) rotateX(0);
  }
.effect11.bottom_to_top .info {
    -webkit-transform: translateZ(-1000px) rotateX(-90deg);
    -moz-transform: translateZ(-1000px) rotateX(-90deg);
    -ms-transform: translateZ(-1000px) rotateX(-90deg);
    -o-transform: translateZ(-1000px) rotateX(-90deg);
    transform: translateZ(-1000px) rotateX(-90deg);
  }
.effect11.bottom_to_top a:hover .img {
    -webkit-transform: translateZ(-1000px) rotateX(90deg);
    -moz-transform: translateZ(-1000px) rotateX(90deg);
    -ms-transform: translateZ(-1000px) rotateX(90deg);
    -o-transform: translateZ(-1000px) rotateX(90deg);
    transform: translateZ(-1000px) rotateX(90deg);
  }
.effect11.bottom_to_top a:hover .info {
    -webkit-transform: translateZ(0) rotateX(0);
    -moz-transform: translateZ(0) rotateX(0);
    -ms-transform: translateZ(0) rotateX(0);
    -o-transform: translateZ(0) rotateX(0);
    transform: translateZ(0) rotateX(0);
  }
</style>
