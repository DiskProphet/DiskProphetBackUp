<template>
  <div class="header">
    <b-navbar toggleable="md" type="dark" class="padding_top">
      <b-navbar-brand href="#"><img src="../header/logo.png" class="logo"><span class="fisrt">DISK</span><span class="second">PROPHET</span></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" class="padding_top">
        <b-navbar-nav>
          <b-nav-item>
            <div class="button_1 header_title">LOCALSERVER</div>
          </b-nav-item>
          <b-nav-item href="#" :class="header_button_index===1?'button_active':''" v-on:click="header_button_click(1)">
            <router-link to="/DataCollect/DataCollctAll" class="nav-item">
              <div class="button_1 button_text">数据采集</div>
            </router-link>
          </b-nav-item>
          <b-nav-item href="#" :class="header_button_index===2?'button_active':''" v-on:click="header_button_click(2)">
            <router-link to="/AgentManagement/AgentManagementVcenter" class="nav-item">
              <div class="button_1 button_text">Agent 管理</div>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="reload">
            <icon name="repeat"></icon>
          </b-nav-item>
          <b-nav-item-dropdown class="user">
            <template slot="button-content" left><icon name="user-circle"></icon> &nbsp;<em class="font_size_12"></em>
</template>
              <b-dropdown-item  to="/UserManagement">
               账户管理
              </b-dropdown-item>
            <b-dropdown-item>退出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        header_button_index: 1,
        accountInformation: {},
      };
    },
    methods: {
      header_button_click(index) {
        this.header_button_index = index;
      },
      onReceive(content) {
        this.accountInformation = content;
      },
      LogeOute() {
        localStorage.removeItem('token');
        location.reload(["/Login"]);
      },
      reload() {
        window.location.reload()
      }
    },
    computed: {
      accountName() {
        if (this.accountInformation === undefined) {
          return "Hi"
        }
        return this.accountInformation.name;
      }
    },
    // created() {
    //   this.$bus.$on('accountInfo', this.onReceive);
    // },
  };
</script>

<style scoped>
  .nav-item {
    color: #fff;
  }
  .header {
    background-color: #000;
    height: 75px;
  }
  .header .padding_top {
    padding-top: 10px;
  }
  .header .padding_top .navbar-brand {
    position: relative;
    top: 2px;
  }
  .header #nav_collapse {
    position: relative;
    top: -8px;
  }
  .logo {
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    margin-left: 6.2rem;
    padding-right: 10px;
    vertical-align: -webkit-baseline-middle;
  }
  .fisrt {
    font-family: "SourceHanSansCN-Light";
    color: #fff;
    font-weight: 100;
    margin-left: 1rem;
    font-size: 15px;
  }
  .second {
    font-family: "SourceHanSansCN-Heavy";
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  }
  .button_1 {
    background: #000;
    border-color: #000;
    min-width: 70px;
  }
  .button_text {
    font-family: "SourceHanSansCN-Light";
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
  }
  .button_text:hover {
    color: rgba(255, 255, 255, 1);
  }
  .header_title {
    font-family: "SourceHanSansCN-Light";
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 0px 10px;
    cursor: default;
  }
  .nav-item:hover {
    text-decoration: none;
  }
  .header .nav-item div {
    line-height: 26px;
  }
  .header .nav-link .nav-item div:hover,
  .button_active .nav-link .nav-item div {
    background-color: rgba(255, 255, 255, 0.15);
    width: 70px;
    height: 26px;
    border-radius: 13px;
    box-shadow: 0px 0px 0px 0px transparent;
    color: #fff;
    font-family: "SourceHanSansCN-Heavy";
  }
  .button_active .nav-link .nav-item,
  .button_active .nav-link .nav-item:hover {
    font-weight: bold;
    font-family: "SourceHanSansCN-Heavy";
  }
  .ml-auto {
    margin-right: 75px;
    position: relative;
    top: -2px;
  }
  .ml-auto .nav-item {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
  .ml-auto .nav-item .nav-link {
    width: 100%;
    height: 100%;
    margin-left: -4px;
    margin-top: -6px;
    padding: 10px;
  }
  .ml-auto .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  .ml-auto .nav-item:hover .nav-link svg {
    color: rgba(255, 255, 255, 1);
  }
  .ml-auto .b-nav-dropdown .dropdown-menu {
    left: -45px !important;
  }
  .user svg {
    top: -3px !important;
    position: relative !important;
  }
  .user em {
    top: -6px !important;
    position: relative !important;
    font-style: normal;
  }
  .user .nav-item {
    color: #000;
  }
  .user>>>.dropdown-toggle::after {
    top: -3px !important;
    position: relative !important;
  }
  .ml-auto .b-nav-dropdown {
    width: 100%;
    margin-left: 10px;
  }
  .ml-auto .b-nav-dropdown:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.15);
    height: 26px;
    border-radius: 13px;
  }
  .user_name {
    display: inline-block;
    height: 26px;
  }
  .disable:hover {
    cursor: not-allowed;
  }
  .header .nav-link .nav-item .disable:hover,
  .button_active .nav-link .nav-item .disable {
    background: #000 !important;
    color: rgba(255, 255, 255, 0.5) !important;
  }
  .button_active .nav-link .nav-item .disable,
  .button_active .nav-link .nav-item:hover .disable {
    font-weight: normal;
  }
  .dropdown-item:focus,
  .dropdown-item:hover {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
  }
  .dropdown-item,
  .dropdown-item {
    color: #16181b;
    text-decoration: none;
    background-color: #fff;
  }
</style>
