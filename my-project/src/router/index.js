import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login.vue'
import DataCollect from '../components/DataCollect/DataCollect.vue'
import DataCollctAll from '../components/DataCollect/DataCollctAll.vue'
import DataCollctNot from '../components/DataCollect/DataCollctNot.vue'
import DataCollctAlready from '../components/DataCollect/DataCollctAlready.vue'
import AgentManagement from '../components/AgentManagement/AgentManagement.vue'
import AgentManagementEsxi from '../components/AgentManagement/AgentManagementEsxi.vue'
import AgentManagementVcenter from '../components/AgentManagement/AgentManagementVcenter.vue'
import UserManagement from '../components/UserManagement/UserManagement.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/DataCollect/DataCollctAll',
        component: () => {
          var token = window.localStorage.getItem('token')
          if(token && token.length > 0) {
            router.replace({
              path: '/DataCollect'
            })
          } else {
            router.replace({
              path: '/Login'
            })
          }
        }
      },
  {
    path: '/Login',
    component: Login,
  }, 
  {
    path: '/DataCollect',
    component: DataCollect,
    meta: {
      requireAuth: true,
  },
    children: [
      {
        path: '/DataCollect/DataCollctAll',
        component: DataCollctAll,
        meta: {
          requireAuth: true,
      }},
      {
        path: '/DataCollect/DataCollctNot',
        component: DataCollctNot,
        meta: {
          requireAuth: true,
      }},
      {
        path: '/DataCollect/DataCollctAlready',
        component: DataCollctAlready,
        meta: {
          requireAuth: true,
      }}
    ]
  },
  {
      path: '/AgentManagement', 
      name:'AgentManagement',
      components:{
        default:AgentManagement,
        AgentManagementTable:AgentManagementVcenter,
      },
      meta: {
        requireAuth: true,
  },
    children: [
      {
        path: '/AgentManagement/AgentManagementVcenter',
        name:'AgentManagementVcenter',
        components: {
          AgentManagementTable:AgentManagementVcenter,
        },
        meta: {
          requireAuth: true,
      }},
      {
        path: '/AgentManagement/AgentManagementEsxi',
        name:'AgentManagementEsxi',
        components: {
          AgentManagementTable:AgentManagementEsxi,
        },
        meta: {
          requireAuth: true,
      }},
      {
        path: '/AgentManagement/AgentManagementVcenter',
        name:'AgentManagementVcenter',
        components: {
          AgentManagementTable:AgentManagementVcenter,
        },
        meta: {
          requireAuth: true,
      }},
    ]
  },
  {
    path: '/UserManagement',
    component: UserManagement,
    meta: {
        requireAuth: true,
  }}]
})
