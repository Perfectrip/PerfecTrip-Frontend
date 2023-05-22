<template>
  <b-container class="bv-example-row">
    <b-row class="mt-3">
      <b-col cols="11" class="bg-light p-2 pl-5 text-left">
        <img :src=item.img style="opacity: 80%; height: 100px; width: 100px; border-radius: 20%; margin-right: 20px;"/>
        <span style="font-size: 20px; font-weight: 800; margin: 30px; ">{{ item.title }}</span>
        <span style="font-size: 15px;">{{item.add}}</span>
      </b-col>
      <b-col class="p-2"><b-button variant="danger"  @click="removeItem">X</b-button></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const selectedStore = "selectedStore";

export default {
  name: "SelectedListItem",
  props: {
    item: Object,
  },
  methods: {
    ...mapActions(selectedStore, ["deleteItem"]),
    removeItem() {
      console.log("deleteItem Call");
      this.deleteItem(this.item);
    }
  },
}

</script>
<style>
</style>