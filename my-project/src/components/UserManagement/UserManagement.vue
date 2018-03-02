<template>
  <div class="module">
    <b-container class="bv-example-row module_gray" style="padding: 5px 20px !important;">
      <b-row class="text-center module_body">
        <b-col cols="12" class="padding_15">
          <b-row class="text-center">
            <b-col cols="1">
              <span>用户管理</span>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="1">
              <img src="./user.png" alt="user" class="userImage">
            </b-col>
            <b-col cols="1">
              <div class="userInfo">
                <span class="userName">Admin</span>
                <span class="userPost">管理员</span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-table hover :items="items" :fields="fields"></b-table>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['时间', '操作', '访问 IP 地址', '结果'],
        fields: {
          time: {
            label: '时间',
            sortable: true
          },
          operate: {
            label: '操作',
            sortable: false
          },
          IP: {
            label: '访问 IP 地址',
            sortable: true
          },
          result: {
            label: '结果',
            sortable: true
          }
        },
        items: [{
            time: true,
            operate: 40,
            IP: 'Dickerson',
            result: 'Macdonald'
          },
          {
            time: true,
            operate: 40,
            IP: 'Dickerson',
            result: 'Macdonald'
          },
          {
            time: true,
            operate: 40,  
            IP: 'Dickerson',
            result: 'Macdonald'
          },
          {
            time: true,
            operate: 40,
            IP: 'Dickerson',
            result: 'Macdonald'
          },
        ]
      }
    },
    methods: {}
  }
</script>
<style scoped>
  .userImage {
    width: 100px;
    height: 100px;
    position: relative;
    left: -3px;
  }
  .userInfo {
    position: relative;
    top: 38px;
  }
  .userName {
    font-weight: 900;
    display: block;
    margin-bottom: 5px;
  }
</style>
