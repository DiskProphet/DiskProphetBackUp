<template>
  <div class="Login">
    <div class="LoginInPadding" v-show="ifSubmited">
      <div class="spinner">
        <div class="spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
    </div>
    <canvas id="particlesCanvas"></canvas>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="auto">
          <div><img src="../header/logo.png" class="logo"><span class="fisrt">DISK</span> <span class="second">PROPHET</span> </div>
          <b-form @submit="onSubmit">
            <b-form-group id="usernameGroup2" label-for="usernameInput2">
              <b-form-input id="usernameInput2" type="text" v-model="form.email" required placeholder="请输入用户名" />
            </b-form-group>
            <b-form-group id="passwordGroup3" label-for="passwordInput3">
              <b-form-input id="passwordInput3" type="password" required v-model="form.password" autocomplete="new-password" @keyup.enter="submit" placeholder="请输入密码" />
              <b-input-group-button class="submit_button">
                <b-button type="submit" class="login-icon login-icon-enter-white"></b-button>
              </b-input-group-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import axios from "axios";
  import bgJS from './bg.js'
  export default {
    data() {
      return {
        testLive:'/',
        form: {
          email: '',
          password: ''
        },
        passError: false,
        ifSubmited: false,
        accountData: {}
      };
    },
    mounted() {
      bgJS()();
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.ifSubmited = true;
        axios.post(`${this.testLive}login`, this.form, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(val => {
          window.localStorage.setItem('token', val.data.Authentication);
          this.$router.replace({
            path: "/UserInfo"
          });
        }, err => {
          var addClass = function(element, oClass) {
            if (!hasClass(element, oClass))
              element.className += ' ' + oClass;
          };
          var hasClass = function(element, oClass) {
            return element.className.match(new RegExp('(^|\\s)' + oClass + '(\\s|$)'));
          };
          var removeClass = function(element, oClass) {
            var cls = new RegExp('(^|\\s)' + oClass + '(\\s|$)');
            if (hasClass(element, oClass)) {
              element.className = element.className.replace(cls, '')
            }
          };
          var passwordInput = document.querySelector('#passwordInput3');
          var submitButton = document.querySelector('.submit_button');
          addClass(passwordInput, 'shake');
          addClass(submitButton, 'submit_button_none');
          setTimeout(function() {
            removeClass(passwordInput, 'shake');
            removeClass(submitButton, 'submit_button_none')
          }, 1000)
        });
       
      },
      display_passError() {
        this.passError = false
      }
    }
  }
</script>

<style scoped>
  html {
    overflow: hidden;
  }
  @font-face {
    font-family: "SourceHanSansCN-Heavy";
    src: url('/static/fonts/SourceHanSansCN-Light.otf');
  }
  .Login {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #2b1848;
  }
  .bv-example-row {
    position: absolute;
    left: 50%;
    top: 55%;
    height: 50%;
    transform: translate(-50%, -50%);
  }
  .mb-2 {
    color: #fff;
  }
  .mb-2 .card-body {
    background-color: rgba(54, 54, 54, 0.6)
  }
  #particlesCanvas {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right top, #411445, #181d4b);
  }
  .errorinfo {
    display: block;
    padding: 10px;
  }
  .login_card {
    border: 0px solid rgba(0, 0, 0, 0.125);
  }
  .justify-content-md-center>>>.form-control {
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 1.3rem;
    border-radius: 8px;
    padding: 10px;
  }
  input[placeholder],
  [placeholder],
  *[placeholder] {
    color: #3c3645 !important;
  }
   ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #3c3645 !important;
  }
   :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #3c3645 !important;
  }
   ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #3c3645 !important;
  }
   :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #3c3645 !important;
  }
  .justify-content-md-center>>>.form-control:focus {
    background-color: rgba(255, 255, 255, 1);
  }
  #usernameInput2,
  #passwordInput3 {
    border: 1.5px solid transparent;
    position: relative;
    font-family: "SourceHanSansCN-Light";
  }
  .submit_button {
    position: absolute;
    top: 43%; 
    transform: translateY(-43%);
    right: 10%;
  }
  .submit_button>>>.btn-secondary {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .login-icon {
    position: relative;
    margin-left: -37px;
    padding-left: 7px;
    border-radius: 50% !important;
  }
  .login-icon::before {
    content: ' ';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }
  .login-icon-enter-white:before {
    background-image: url('../../svg/enter-white.svg')
  }
  .submit_button_none {
    display: none;
  }
  .logo {
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    margin-left: 0.5rem;
    padding-right: 10px;
    vertical-align: -webkit-baseline-middle;
  }
  .fisrt {
    font-family: "SourceHanSansCN-Light";
    color: #fff;
    font-weight: 100;
    margin-left: 1rem;
    font-size: 1.4rem;
  }
  .second {
    font-family: "SourceHanSansCN-Heavy";
    color: #fff;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .shake {
    border: 1.5px solid red !important;
    -webkit-animation: bounce 1s infinite;
    animation: bounce 1s infinite;
    -webkit-transition: border 150ms ease-in-out, -webkit-transform 300ms ease-in;
    transition: border 150ms ease-in-out, -webkit-transform 300ms ease-in;
    transition: border 150ms ease-in-out, transform 300ms ease-in;
    transition: border 150ms ease-in-out, transform 300ms ease-in, -webkit-transform 300ms ease-in;
  }
  @-webkit-keyframes bounce {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10% {
      -webkit-transform: translateX(-15%);
      transform: translateX(-15%);
    }
    20% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    30% {
      -webkit-transform: translateX(-10%);
      transform: translateX(-10%);
    }
    40% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    30% {
      -webkit-transform: translateX(-5%);
      transform: translateX(-5%);
    }
    60% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    70% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    80% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes bounce {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10% {
      -webkit-transform: translateX(-15%);
      transform: translateX(-15%);
    }
    20% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    30% {
      -webkit-transform: translateX(-10%);
      transform: translateX(-10%);
    }
    40% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    30% {
      -webkit-transform: translateX(-5%);
      transform: translateX(-5%);
    }
    60% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    70% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    80% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  .LoginInPadding {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    position: absolute;
    z-index: 10;
  }
  .LoginInPadding .spinner {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    position: absolute;
  }
  .container1>div,
  .container2>div,
  .container3>div {
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }
  .container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
  .circle1 {
    top: 0;
    left: 0;
  }
  .circle2 {
    top: 0;
    right: 0;
  }
  .circle3 {
    right: 0;
    bottom: 0;
  }
  .circle4 {
    left: 0;
    bottom: 0;
  }
  .container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
  @-webkit-keyframes bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0.0)
    }
    40% {
      -webkit-transform: scale(1.0)
    }
  }
  @keyframes bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
