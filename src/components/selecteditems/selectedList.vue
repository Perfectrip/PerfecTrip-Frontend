<template>
    <b-container class="bv-example-row">
      <b-row class="mt-4 mb-4 text-center">
        <b-col>
          <selectedListItem v-for="(item, index) in items" :key="index" :item="item" />
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import selectedListItem from "./selectedListItem.vue";
  
  const selectedStore = "selectedStore";
  
  export default {
    name: "SelectedList",
    components: {
      selectedListItem,
    },
    computed: {
      ...mapState(selectedStore, ["items"]),
    },
  };
  </script>
  
  <style></style>