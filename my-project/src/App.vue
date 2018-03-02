<template>
  <div id="app">
    <div class="overlay"></div>
    <my-header v-show="!ifLogIn"></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer v-show="!ifLogIn"></my-footer>
  </div>
</template>

<script>
  import header from "./components/header/header.vue";
  import footer from "./components/footer/footer.vue"
  export default {
    data() {
      return {};
    },
    components: {
      "my-header": header,
      "my-footer": footer
    },
    computed: {
      ifLogIn() {
        return this.$route.path === "/Login"
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    z-index: 5;
    display: none;
  }
  .module {
    background-color: #000000;
    min-height: 607px;
  }
  .module_body {
    background: #fff;
    border-radius: 6px;
  }
  .padding_5 {
    padding: 5px !important;
  }
  .padding_10 {
    padding: 10px;
  }
  @font-face {
    font-family: "SourceHanSansCN-Light";
    src: url('/static/fonts/SourceHanSansCN-Light.otf');
  }
  @font-face {
    font-family: "SourceHanSansCN-Heavy";
    src: url('/static/fonts/SourceHanSansCN-Heavy.otf');
  }
  .font_size_14 {
    font-family: "SourceHanSansCN-Light";
    font-size: 14px;
  }
  .font_size_12 {
    font-family: "SourceHanSansCN-Light";
    font-size: 12px;
    color: #666666;
  }
  .font_size_22_bold {
    font-size: 22px;
    font-weight: bold;
    font-family: "SourceHanSansCN-Heavy";
  }
  .font_size_48 {
    font-size: 48px;
  }
  .module_gray {
    background-color: #666666;
    border-radius: 7px;
  }
  @media (min-width: 1200px) {
    .module .container {
      max-width: 1320px !important;
    }
  }
  .padding {
    padding: 5px;
  }
  .echarts {
    width: 100% !important;
    max-height: 180px;
  }
  .left_12 {
    float: left;
  }
  .card-body {
    padding: 15px !important;
  }
  .padding_15 {
    padding: 15px !important;
  }
  .panel_shadow {
    box-shadow: 0px 0px 10px 0px rgba(102, 102, 102, 1)
  }
  .heght_85 {
    border: 1px solid #CCCCCC;
    padding: 6px;
    border-radius: 10px;
  }
  .heght_85 .card-body {
    height: 85px;
    border-radius: 6px;
    border: 1px solid #E4E4E4;
  }
  .mt-2 .bg-success {
    background-color: rgba(51, 204, 0, 0.6) !important;
  }
  .mt-1 .bg-success {
    background-color: rgba(51, 204, 0, 0.6) !important;
  }
  .margin_top_15 {
    margin-top: 15px;
  }
  .margin_left_15 {
    margin-left: 15px;
  }
  .margin_left_25 {
    margin-left: -35px;
  }
  .top_10 {
    position: relative;
    top: 10px;
  }
  .float_42 {
    float: left;
    margin-left: 2.5rem !important;
  }
  .module_header_green_button {
    background-color: rgba(51, 204, 0, 0.2);
    width: 130px;
    height: 32px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 5px;
    position: relative;
  }
  .module_header_green_button:hover {
    background: rgba(102, 153, 255, 0.2);
    cursor: pointer;
  }
  .module_header_green_button span {
    font-weight: bold;
    text-align: center;
    position: relative;
    top: 10%;
  }
  .module_header_select_button>.btn.btn-secondary {
    font-family: "SourceHanSansCN-Light";
    background-color: #fff;
    color: #666666;
    border-color: #ccc;
    font-size: 12px;
    height: 32px;
    line-height: 19px;
    padding: 0.375rem 1.83rem !important;
    box-shadow: 0px 0px 5px 0px transparent inset !important;
  }
  .module_header_select_button>.btn.btn-secondary:hover {
    background: rgba(102, 153, 255, 0.2)
  }
  .module_header_select_button>.currect.btn.btn-secondary {
    color: #000;
    background-color: #F2F2F2;
    font-weight: bold;
    box-shadow: 0px 0px 5px 0px #CCCCCC inset !important;
  }
  .module_header_select_button>.btn.btn-secondary:active {
    box-shadow: 0px 0px 0px 0px transparent;
  }
  .select_button_left_Data {
    left: -6%;
  }
  .select_button_left_Agent {
    left: -6.0%;
  }
  .search_button_left_Agent {
    left: -8.3%;
  }
  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 630px !important;
      margin: 30px auto;
    }
  }
  .my-icon {
    position: relative;
    margin-left: -37px;
    padding-left: 7px;
  }
  .my-icon::before {
    content: ' ';
    width: 12px !important;
    height: 12px !important;
    position: absolute;
    left: -14px;
    top: 1px;
    display: block;
  }
  .my-icon-cluster:before {
    background-image: url('./svg/cluster.svg')
  }
  .my-icon-cpu:before {
    background-image: url('./svg/cpu.svg')
  }
  .my-icon-enter:before {
    background-image: url('./svg/enter.svg')
  }
  .my-icon-hdd:before {
    background-image: url('./svg/hdd.svg')
  }
  .my-icon-host:before {
    background-image: url('./svg/host.svg')
  }
  .my-icon-load:before {
    background-image: url('./svg/load.svg')
  }
  .my-icon-monitor:before {
    background-image: url('./svg/monitor.svg')
  }
  .my-icon-network:before {
    background-image: url('./svg/network.svg')
  }
  .my-icon-packup:before {
    background-image: url('./svg/packup.svg')
  }
  .my-icon-prediction:before {
    background-image: url('./svg/prediction.svg')
  }
  .my-icon-prediction-history:before {
    background-image: url('./svg/prediction-history.svg')
  }
  .my-icon-refresh:before {
    background-image: url('./svg/refresh.svg')
  }
  .my-icon-memory:before {
    background-image: url('./svg/memory.svg')
  }
  .my-icon-return:before {
    background-image: url('/return.svg')
  }
  .my-icon-search:before {
    background-image: url('./svg/search.svg')
  }
  .my-icon-setting:before {
    background-image: url('./svg/setting.svg')
  }
  .my-icon-ssd:before {
    background-image: url('./svg/ssd.svg')
  }
  .my-icon-storage:before {
    background-image: url('./svg/storage.svg')
  }
  .my-icon-unfold:before {
    background-image: url('./svg/unfold.svg')
  }
  .my-icon-unfold-white:before {
    background-image: url('./svg/unfold-white.svg')
  }
  .my-icon-user:before {
    background-image: url('./svg/user.svg')
  }
  .table_body {
    min-height: 32rem;
    max-height: 33rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
  button:focus {
    outline-color: transparent;
    outline-style: none;
  }
  button:hover {
    background-color: rgba(102, 153, 255, 0.2);
  }
  .topcoat-button-bar__item {
    display: table-cell;
    width: auto;
    border-radius: 0;
  }
  .topcoat-button-bar__item:first-child>a {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .topcoat-button-bar__item:last-child>a {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .topcoat-button-bar__item:first-child>a {
    border-right: none;
    position: relative;
    left: 0.5px;
  }
  .topcoat-button-bar__item:last-child>a {
    border-left: none;
  }
  .button,
  .topcoat-button-bar__button {
    position: relative;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    background-clip: padding-box;
    color: inherit;
    vertical-align: top;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: inherit;
    cursor: default;
    user-select: none;
  }
  .topcoat-button-bar__button {
    cursor: pointer;
    padding: 0 1rem;
    border: 1px solid #a5a8a8;
    border-radius: inherit;
    background-color: #fff;
    box-shadow: inset 0 1px #fff;
    color: #454545;
    text-shadow: 0 1px #fff;
    line-height: 32px;
    height: 32px;
    font-size: 14px;
  }
  .current {
    border: 1px solid #ccc;
    z-index: 1;
    color: #000;
    background-color: #F2F2F2 !important;
    font-weight: bold;
    box-shadow: 0px 0px 5px 0px #CCCCCC inset !important;
  }
</style>
