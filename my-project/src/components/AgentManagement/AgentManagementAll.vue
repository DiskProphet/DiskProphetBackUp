<template>
    <div class="table">
        <b-table :items="items" :fields="fields" class="AgentManagementTable">
            <template slot="vcenter_ip" slot-scope="row">
                                 <b-form-checkbox-group id="checkboxes2" v-model="selected" >
                                     <b-form-checkbox  :value="row.value" @change="showMsgAllFromChild(row.value)">
                                         {{row.value}}
                                     </b-form-checkbox>
                                 </b-form-checkbox-group>
</template>
        </b-table>  {{selected}}
    </div>
</template>


<script>
import axios from "axios";
export default {
  props: ["showMsgAllFromChild"],
  data() {
    return {
      testLive: "/",
      selected: [],
      fields: [
        {
          key: "vcenter_ip",
          label: "IP地址",
          sortable: true
        },
        {
          key: "All_system",
          label: "系统"
        },
        {
          key: "All_relationship",
          label: "从属关系"
        },
        {
          key: "vcenter_online",
          label: "状态"
        }
      ],
      items: []
    };
  },
  updated() {
    var element = document.querySelectorAll('[aria-colindex="4"]');
    for (let i = 0; i < element.length; i++) {
      if (element[i].textContent === "offline") {
        element[i].textContent = "离线";
        element[i].classList.add("outLine");
        element[i].style.color = "rgba(238, 0, 0, 0.6)";
        element[i].style.position = "relative";
        document.styleSheets[0].insertRule(
          '.outLine::before{content: " ";width: 13px;height: 13px;background:rgba(238, 0, 0, 0.6);position: absolute;border-radius:50%;left:3rem;top:30%;}',
          0
        );
        document.styleSheets[0].addRule(
          ".outLine::before",
          'content: " ";width: 13px;height: 13px;background:rgba(238, 0, 0, 0.6);position: absolute;border-radius:50%;left:3rem;top:30%;'
        );
      } else if (element[i].textContent === "online") {
        element[i].textContent = "在线";
        element[i].classList.add("onLine");
        element[i].style.color = "rgba(51, 204, 0, 0.6)";
        element[i].style.position = "relative";
        document.styleSheets[0].insertRule(
          '.onLine::before{content: " ";width: 13px;height: 13px;background:rgba(51, 204, 0, 0.6);position: absolute;border-radius:50%;left:3rem;top:30%;}',
          0
        );
        document.styleSheets[0].addRule(
          ".onLine::before",
          'content: " ";width: 13px;height: 13px;background:rgba(51, 204, 0, 0.6);position: absolute;border-radius:50%;left:3rem;top:30%;'
        );
      }
    }
  },
  created() {
    axios.get(`${this.testLive}vcenter/v1/`).then(response => {
      this.items = response.data.data.result;
    });
  }
};
</script>
<style scoped>
.AgentManagementTable {
  text-align: left;
}
</style>
