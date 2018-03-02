<template>
    <div class="table">
        <b-table :items="items" :fields="fields" class="AgentManagementEsxiTable">
            <template slot="esxi_ip" slot-scope="row">
                <b-form-checkbox-group id="checkboxes2" v-model="selected">
                    <b-form-checkbox   :value="row.value" @change="showMsgFromEsxiChild(row.value)">{{row.value}}
                    </b-form-checkbox>
                </b-form-checkbox-group>
            </template>
             <template slot="esxi_os" slot-scope="row" >
               {{row.value}}
            </template>
            <template slot="esxi_status" slot-scope="row" >
                <span :class="(row.value).replace(/\s+/g,'')" :title="statusObject[row.value]==='连接失败'||statusObject[row.value]==='删除失败'?'请检查网络/账户信息':''" class="mouseOver">{{statusObject[row.value]}}</span>
            </template>
        </b-table>
    </div>
</template>


<script>
import axios from "axios";
function insertRule(sheet, selectorText, cssText, position) {
  if (sheet.insertRule) {
    sheet.insertRule(selectorText + "{" + cssText + "}", position);
  } else if (sheet.addRule) {
    sheet.addRule(selectorText, cssText, poistion);
  }
}
export default {
  props: ["showMsgFromEsxiChild", "singleEsxiInfo"],
  data() {
    return {
      testLive: "/",
      statusObject: {
        offline: "离线",
        online: "在线",
        no: "连接中",
        "install error": "连接失败",
        "del error": "删除失败"
      },
      selected: [],
      fields: [
        {
          key: "esxi_ip",
          label: "IP地址",
          sortable: true
        },
        {
          key: "esxi_os",
          label: "系统"
        },
        {
          key: "esxi_vcenter_ip",
          label: "所属 vCenter"
        },
        {
          key: "esxi_status",
          label: "状态"
        }
      ],
      items: []
    };
  },
  //   updated() {
  //     setTimeout(() => {
  //       var element = document.querySelectorAll('[aria-colindex="4"]');
  //       for (let i = 0; i < element.length; i++) {
  //         if (element[i].textContent === "offline") {
  //           element[i].textContent = "离线";
  //           element[i].classList.add("outLine");
  //           element[i].style.color = "rgba(238, 0, 0, 0.6)";
  //           element[i].style.position = "relative";
  //           insertRule(
  //             document.styleSheets[0],
  //             ".outLine::before",
  //             "content: '';width: 13px;height: 13px;background:rgba(238, 0, 0, 0.6);position: absolute;border-radius:50%;left:85px;top:30%;",
  //             0
  //           );
  //         } else if (element[i].textContent === "online") {
  //           element[i].textContent = "在线";
  //           element[i].classList.add("onLine");
  //           element[i].style.color = "rgba(51, 204, 0, 0.6)";
  //           element[i].style.position = "relative";
  //           insertRule(
  //             document.styleSheets[0],
  //             ".onLine::before",
  //             'content: " ";width: 13px;height: 13px;background:rgba(51, 204, 0, 0.6);position: absolute;border-radius:50%;left:85px;top:30%;',
  //             0
  //           );
  //         } else if (element[i].textContent === "no") {
  //           element[i].textContent = "安装中";
  //           element[i].classList.add("EsxinotInstall");
  //           element[i].style.color = "rgba(30,144,255, 0.6)";
  //           element[i].style.position = "relative";
  //           insertRule(
  //             document.styleSheets[0],
  //             ".EsxinotInstall::before",
  //             'content: " ";width: 13px;height: 13px;background:rgba(30,144,255, 0.6);position: absolute;75px;border-radius:50%;left:85px;top:30%;',
  //             0
  //           );
  //         } else if (element[i].textContent === "install error") {
  //           element[i].textContent = "安装失败";
  //           element[i].classList.add("EsxinInstallError");
  //           element[i].style.color = "rgba(238, 0, 0, 0.6)";
  //           element[i].style.position = "relative";
  //           element[i].style.cursor = "pointer";
  //           element[i].title = "请检查网络/账户信息";
  //           insertRule(
  //             document.styleSheets[0],
  //             ".EsxinInstallError::before",
  //             'content: " ";width: 13px;height: 13px;background:rgba(238, 0, 0, 0.6);position: absolute;border-radius:50%;left:85px;top:30%;',
  //             0
  //           );
  //         } else if (element[i].textContent === "del error") {
  //           element[i].textContent = "删除失败";
  //           element[i].classList.add("EsxinDelError");
  //           element[i].style.color = "rgba(238, 0, 0, 0.6)";
  //           element[i].style.position = "relative";
  //           element[i].style.cursor = "pointer";
  //           element[i].title = "请检查网络/账户信息";
  //           insertRule(
  //             document.styleSheets[0],
  //             ".EsxinDelError::before",
  //             'content: " ";width: 13px;height: 13px;background:rgba(238, 0, 0, 0.6);position: absolute;border-radius:50%;left:85px;top:30%;',
  //             0
  //           );
  //         }
  //       }
  //     }, 100);
  //   },
  created() {
    axios.get(`${this.testLive}esxi/v1/`).then(response => {
      this.items = response.data.data.result;
    });
  },
  watch: {
    singleEsxiInfo() {
      if (this.singleEsxiInfo === undefined) {
        return;
      } else {
        this.items = new Array(this.singleEsxiInfo);
      }
    }
  }
};
</script>

<style scoped>
.AgentManagementEsxiTable {
  text-align: left;
}
.offline {
  color: rgba(238, 0, 0, 0.6);
  position: relative;
}
.offline::before {
  content: " ";
  width: 13px;
  height: 13px;
  background: rgba(238, 0, 0, 0.6);
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 10%;
}
.online {
  color: rgba(51, 204, 0, 0.6);
  position: relative;
}
.online::before {
  content: " ";
  width: 13px;
  height: 13px;
  background: rgba(51, 204, 0, 0.6);
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 10%;
}
.no {
  color: rgba(30, 144, 255, 0.6);
  position: relative;
}
.no::before {
  content: " ";
  width: 13px;
  height: 13px;
  background: rgba(30, 144, 255, 0.6);
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 10%;
}
.installerror {
  color: rgba(238, 0, 0, 0.6);
  position: relative;
}
.installerror::before {
  content: " ";
  width: 13px;
  height: 13px;
  background: rgba(238, 0, 0, 0.6);
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 10%;
}
.delerror {
  color: rgba(238, 0, 0, 0.6);
  position: relative;
}
.delerror::before {
  content: " ";
  width: 13px;
  height: 13px;
  background: rgba(238, 0, 0, 0.6);
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 10%;
}
.mouseOver {
  cursor: pointer;
}
</style>
