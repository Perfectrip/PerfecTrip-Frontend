<template>
    <b-row class="mt-4 mb-4 text-center" style="background-color: #336600; height: 100px; align-items: center; justify-items: center;">
      <select-sido @select-sido="selectSido"></select-sido>
      <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>
      <b-col class="sm-4">
      <b-form-select v-model="selected" :options="options" @change="sendRequest"></b-form-select>
      </b-col>
      <!--<button style="width: 150px; height: 50px; margin-right: 20px;"></button>-->
    </b-row>
  </template>
  
  <script>
  import { mapActions, mapMutations } from "vuex";
  import SelectSido from "@/components/item/SelectSido.vue";
  import SelectGugun from "@/components/item/SelectGugun.vue";
  import axios from "axios";

  const itemStore = "itemStore";
  
  export default {
    name: "MainSearchBar",
    components: {
      SelectSido,
      SelectGugun,
    },
    data() {
      return {
            sidoCode: null,
            options: [
          { value: '100', text: '전체' },
          { value: '12', text: '관광지' },
          { value: '14', text: '문화시설' },
          { value: '15', text: '축제공연행사' },
          { value: '25', text: '여행코스' },
          { value: '28', text: '레포츠' },
          { value: '32', text: '숙박' },
          { value: '38', text: '쇼핑' },
          { value: '39', text: '음식점' },
          ],
          datalist:[],
      };
    },
    computed: {},
    created() {},
    methods: {
//      ...mapActions(mainStore, ["getHousList"]),
      ...mapActions(itemStore, ["getGugun"]),
      ...mapMutations(itemStore, ["CLEAR_GUGUN_LIST"]),
      selectSido(sidoCode) {
        this.CLEAR_GUGUN_LIST();
        // this.getGugun(sidoCode);
        this.sidoCode = sidoCode;
      },
      selectGugun(gugunCode) {
      console.log(this.sidoCode);
          if (gugunCode) {
            console.log(gugunCode);
            this.gugunCode = gugunCode;
          }
      },
      send_data(data_list) {
        console.log("emit보냄");
 //       console.log(data_list);
        this.$emit('data_send', data_list);
      },
      sendRequest() {
        console.log(this.sidoCode);
        console.log(this.gugunCode);
        const url = `http://localhost/attraction/searchContentType?sidoCode=${this.sidoCode}&gugunCode=${this.gugunCode}&contentTypeId=${this.selected}`;
      axios.get(url)
        .then(response => {
          // 요청에 대한 처리 로직 작성
          //console.log(response.data);
          this.datalist = response.data;
          //console.log(this.data);
          this.send_data(this.datalist);
        })
        .catch(error => {
          // 에러 처리 로직 작성
          console.error(error);
        });
      },
    },
  };
  </script>
  
  <style></style>
  