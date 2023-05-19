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
        <h1>여행 어쩌고</h1>
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
    </b-carousel>
      <b-col>
        <MainSearchBar :data_list="loc_list"
                        @data_send="checkData"></MainSearchBar>
      </b-col>
        <TheKakaoMap :chargers="loc_list"></TheKakaoMap>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MainSearchBar from "@/components/main/MainSearchBar.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
export default {
  name: "AppMain",
  components: {
    MainSearchBar,
    TheKakaoMap,
},
  data() {
    return {
      loc_list:null,
    }
  },
  methods: {
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
</style>
