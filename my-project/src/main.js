// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon'



import 'vue-awesome/icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// bootstrap-vue 报错兼容代码
let originalVueComponent = Vue.component;
Vue.component = function (name, definition) {
  if (Array.isArray(definition.components) && definition.components.length === 1) {
    definition.components = {
      [name]: definition.components[0]
    }
  }
  originalVueComponent.apply(this, [name, definition])
}
// bootstrap-vue 报错兼容代码
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.component('icon', Icon)



Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App),
  router
})

