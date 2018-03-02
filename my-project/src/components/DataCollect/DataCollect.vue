<template>
  <div class="module">
    <b-container class="bv-example-row module_gray" style="padding: 5px 20px !important;">
      <b-row class="text-center module_body">
        <b-col cols="12">
          <b-row class="text-center">
            <b-col cols="2" class="padding_15">
              <div class="module_header_green_button" @click="export_data"><span class="font_size_14">导出数据</span></div>
            </b-col>
            <b-col cols="3" class="padding_15 select_button_left_Data">
              <div class="topcoat-button-bar">
                <div class="topcoat-button-bar__item">
                  <router-link to="/DataCollect/DataCollctAll">
                    <button class="topcoat-button-bar__button" :class="dataCollectbutton_index===3?'current':''" v-on:click="dataCollectbutton_click(3)">全部</button>
                  </router-link>
                </div>
                <div class="topcoat-button-bar__item">
                  <router-link to="/DataCollect/DataCollctNot">
                    <button class="topcoat-button-bar__button" :class="dataCollectbutton_index===4?'current':''" v-on:click="dataCollectbutton_click(4)">未导出</button>
                  </router-link>
                </div>
                <div class="topcoat-button-bar__item">
                  <router-link to="/DataCollect/DataCollctAlready">
                    <button class="topcoat-button-bar__button" :class="dataCollectbutton_index===5?'current':''" v-on:click="dataCollectbutton_click(5)">已导出</button>
                  </router-link>
                </div>
              </div>
            </b-col>
            <b-col cols="7" class="padding_15"></b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="">
          <b-row class="text-center">
            <b-col cols="12" class="padding_15 table_body">
              <keep-alive>
                <router-view :showMsgFromDataCollectAllChild="showMsgFromDataCollectAllChild" :showMsgFromDataCollectNotChild="showMsgFromDataCollectNotChild"></router-view>
              </keep-alive>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      testLive:'/',
      dataCollectbutton_index: 3,
      MsgFromDataCollectAllChild: "",
      MsgFromDataCollectNotChild: "",
      selected: ""
    };
  },
  methods: {
    dataCollectbutton_click(index) {
      this.dataCollectbutton_index = index;
    },
    export_data() {
      window.open(`${this.testLive}down/v1/${this.selected}/`);
    },
    showMsgFromDataCollectAllChild(data) {
      if (data) {
        this.MsgFromDataCollectAllChild = data;
      }
    },
    showMsgFromDataCollectNotChild(data) {
      if (data) {
        this.MsgFromDataCollectNotChild = data;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      let currentButton = document.querySelector(
        ".topcoat-button-bar__button.current"
      );
      currentButton.click();
    });
  },
  watch: {
    MsgFromDataCollectAllChild() {
      this.selected = this.MsgFromDataCollectAllChild;
      console.log(this.selected, typeof this.selected);
    },
    MsgFromDataCollectNotChild() {
      this.selected = this.MsgFromDataCollectNotChild;
      console.log(this.selected, typeof this.selected);
    }
  }
  // computed: {
  //   select() {
  //     let arr = new Array();
  //     let All = (this.MsgFromDataCollectAllChild).pop();
  //     let Not = (this.MsgFromDataCollectNotChild).pop();
  //     let arrConcat = arr.concat(All, Not);
  //     for (var i = 0; i < arrConcat.length; i++) {
  //       if (arrConcat[i] !== undefined) {
  //          return this.selected.push(arrConcat[i])
  //       }
  //     }
  //   }
  // }
};
</script>
<style scoped>
.table_body {
  min-height: 32rem;
  max-height: 33rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
