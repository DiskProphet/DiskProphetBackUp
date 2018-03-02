<template>
  <div class="module">
    <b-container class="bv-example-row module_gray" style="padding: 5px 20px !important;">
      <div class="submit_success" v-show="form_submit_Success">
        <div class="ui-success">
          <svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-3" transform="translate(2.000000, 2.000000)"><circle id="Oval-2" stroke="rgba(165, 220, 134, 0.2)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle><circle  class="ui-success-circle" id="Oval-2" stroke="#A5DC86" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle><polyline class="ui-success-path" id="Path-2" stroke="#A5DC86" stroke-width="4" points="19 38.8036813 31.1020744 54.8046875 63.299221 28"></polyline></g></g></svg>
        </div>
        <span>提交成功</span>
      </div>
      <div class="submit_error" v-show="form_submit_Error">
        <div class="ui-error">
          <svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-2" transform="translate(2.000000, 2.000000)"><circle id="Oval-2" stroke="rgba(252, 191, 191, .5)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle><circle  class="ui-error-circle" stroke="#F74444" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle><path class="ui-error-line1" d="M22.244224,22 L60.4279902,60.1837662" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path><path class="ui-error-line2" d="M60.755776,21 L23.244224,59.8443492" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path></g></g></svg>
        </div>
        <span>{{error_MSG}}</span>
      </div>
      <b-row class="text-center module_body">
        <b-col cols="12">
          <b-row class="text-center">
            <b-col cols="2" class="padding_15">
              <div class="module_header_green_button" @click="showModal"><span class="font_size_14">添加 AGENT</span></div>
            </b-col>
            <b-col cols="2" class="padding_15 select_button_left_Agent">
              <div class="topcoat-button-bar__item">
                <router-link to="/AgentManagement/AgentManagementVcenter">
                  <button class="topcoat-button-bar__button" :class="Agentbutton_index===6?'current':''" v-on:click="Agentbutton_button_click(6)">vCenter</button>
                </router-link>
              </div>
              <div class="topcoat-button-bar__item">
                <router-link to="/AgentManagement/AgentManagementEsxi">
                  <button class="topcoat-button-bar__button" :class="Agentbutton_index===7?'current':''" v-on:click="Agentbutton_button_click(7)">ESXi</button>
                </router-link>
              </div>
            </b-col>
            <b-col cols="2" class="padding_15 search_button_left_Agent">
              <b-form @submit="onSubmit">
                <b-form-input id="exampleInput1" type="text" placeholder="搜索" v-model.trim="form.search">
                </b-form-input>
                <span class="clear" @click="clearForm" v-show="isClear">清空</span>
                <b-input-group-button class="submit_button">
                  <b-button type="submit" class="login-icon my-icon-search"></b-button>
                </b-input-group-button>
              </b-form>
            </b-col>
            <b-col cols="4" class="padding_15"></b-col>
            <b-col cols="1" class="padding_15">
              <div class="module_header_edit_button" @click="EditAgentOverlay" id="exButton3" v-show="ifVcenter"><span class="font_size_14">修改</span></div>
            </b-col>
            <b-col cols="1" class="padding_15">
              <div class="module_header_remove_button" @click="removeAgent" id="exButton2"><span class="font_size_14">移除</span></div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="12" class="padding_15 table_body">
              <keep-alive v-if="isActiveLive">
                <router-view name="AgentManagementTable" :showMsgAllFromChild="showMsgAllFromChild" :showMsgFromEsxiChild="showMsgFromEsxiChild" :showMsgFromVcenterChild="showMsgFromVcenterChild" :singleVcenterInfo="singleVcenterInfo" :singleEsxiInfo="singleEsxiInfo"></router-view>
              </keep-alive>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-modal centered title="添加 AGENT" ref="myModalRef" hide-footer size="md" class="modal_body">
      <b-row class="text-center">
        <b-col cols="12">
          <b-card no-body class="modalTab">
            <b-tabs card small pills lazy class="modaltabs">
              <b-tab title="vCenter" active class="modaltab">
                <b-row class="text-center">
                  <b-col cols="12">
                    <b-form @submit="Vcenter_modal_onSubmit" class="modal_form">
                      <div class="Vcenter_span">
                        <b-form-input id="Vcenter_modal_exampleInput1" type="text" required placeholder="IP 地址" v-model="VcenterForm.vcenter_ip" class="mt-3 Vcenter_form_input">
                        </b-form-input>
                        <span class="font_size_12">添加多个 IP 地址时，请以逗号隔开。</span>
                      </div>
                      <div class="Vcenter_span">
                        <b-form-input id="Vcenter_modal_exampleInput2" type="text" required placeholder="vcenter user" v-model="VcenterForm.vcenter_user" class="mt-3 Vcenter_form_input">
                        </b-form-input>
                      </div>
                      <div class="Vcenter_span">
                        <b-form-input id="Vcenter_modal_exampleInput3" type="password" required placeholder="vcenter password" v-model="VcenterForm.vcenter_password" class="mt-3 Vcenter_form_input">
                        </b-form-input>
                      </div>
                      <div class="modal_footer_button">
                        <b-btn class="modal_submit" type="submit">添加</b-btn>
                      </div>
                    </b-form>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="ESXI" class="modaltab">
                <b-row class="text-center">
                  <b-col cols="12">
                    <b-form @submit="Esxi_modal_onSubmit" class="modal_form">
                      <div class="Esxi_span">
                        <b-form-select v-model="EsxiForm.esxi_vcenter_ip" :options="EsxiOptions" class="modal_form_select">
                          <template slot="first"><option :value="null">选择所属 vCenter</option>
</template>
                        </b-form-select>
                      </div>
                      <div class="Esxi_span">
                        <b-form-input id="Esxi_modal_exampleInput1" type="text" required placeholder="IP 地址" v-model="EsxiForm.esxi_ip" class="mt-3 Esxi_form_input">
                        </b-form-input>
                        <span class="font_size_12">添加多个 IP 地址时，请以逗号隔开。</span>
                      </div>
                      <div class="Esxi_span">
                        <b-form-input id="Esxi_modal_exampleInput2" type="text" required placeholder="esxi user" v-model="EsxiForm.esxi_user" class="mt-3 Esxi_form_input">
                        </b-form-input>
                      </div>
                      <div>
                        <b-form-input id="Esxi_modal_exampleInput3" type="password" required placeholder="esxi password" v-model="EsxiForm.esxi_password" class="mt-3 Esxi_form_input">
                        </b-form-input>
                      </div>
                      <div class="modal_footer_button">
                        <b-btn class="modal_submit" type="submit">添加</b-btn>
                      </div>
                    </b-form>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal ref="editUserPassword" hide-footer title="修改用户名及密码">
                <b-row>
                  <b-col cols="12">
                    <b-form @submit="EditAgent_Submit" class="modal_form">
                      <div class="Vcenter_span">
                        <div class="editVcenter">已选 vCenter ip: {{MsgFromVcenterChildSelected[0]}}</div>
                      </div>
                      <div class="Vcenter_span">
                        <b-form-input id="edit_vCenter_modal_exampleInput2" type="text" required placeholder="请输入新用户名" v-model="EditVcenterForm.vcenter_user" class="mt-3 Esxi_form_input">
                        </b-form-input>
                      </div>
                      <div class="Vcenter_span">
                        <b-form-input id="edit_vCenter_modal_exampleInput3" type="password" required placeholder="请输入新密码" v-model="EditVcenterForm.vcenter_password" class="mt-3 Esxi_form_input">
                        </b-form-input>
                      </div>
                      <div class="modal_footer_button">
                        <b-btn class="modal_submit" type="submit">确认</b-btn>
                         <b-btn class="modal_cancel" @click="hideModal" variant="outline-danger">取消</b-btn>
                      </div>
                    </b-form>
                  </b-col>
      </b-row>
    </b-modal>
    <b-modal ref="removeAleartModal" hide-footer centered>
      <div class="d-block text-center">
        <h4>提示：点击确认后，该操作不可撤销,是否确认移除？</h4>
      </div>
      <b-row>
        <b-col cols="8"></b-col>
         <b-col cols="2">
           <b-btn class="mt-3" variant="outline-success" block @click="removeShowModal">确认</b-btn>
        </b-col>
         <b-col cols="2">
           <b-btn class="mt-3" variant="outline-danger" block @click="removeHideModal">取消</b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      testLive:'/',
      selected: [],
      MsgFromEsxiChildSelected: [],
      MsgFromVcenterChildSelected: [],
      path: "",
      Agentbutton_index: 6,
      form_submit_Success: false,
      form_submit_Error: false,
      error_MSG: "",
      VcenterEsxi: "",
      singleVcenterInfo: {},
      singleEsxiInfo: {},
      isClear: false,
      isActiveLive: true,
      ifVcenter: true,
      form: {
        search: ""
      },
      VcenterForm: {
        vcenter_ip: "",
        vcenter_user: "",
        vcenter_password: ""
      },
      EsxiForm: {
        esxi_vcenter_ip: null,
        esxi_ip: "",
        esxi_user: "",
        esxi_password: ""
      },
      EditVcenterForm: {
        vcenter_user: "",
        vcenter_password: ""
      },
      EsxiSelected: null,
      EsxiOptions: []
    };
  },
  methods: {
    //点击切换按钮开始
    Agentbutton_button_click(index) {
      this.Agentbutton_index = index;
      this.modal_button_index = index;
      if (this.Agentbutton_index === 6) {
        this.ifVcenter = true;
      } else {
        this.ifVcenter = false;
      }
    },
    //点击切换按钮结束
    //Vcenter overlay 点击确认发送数据开始
    Vcenter_modal_onSubmit(evt) {
      evt.preventDefault();
      axios.post(`${this.testLive}vcenter/v1/`, this.crosser(this.VcenterForm)).then(req => {
        if (req.data.code !== 0) {
          this.submit_modal_Error_show();
        } else {
          this.submit_modal_Success_show();
          this.getEsxiVcenterIp();
        }
        this.error_MSG = req.data.msg;
      });
      setTimeout(() => {
        this.VcenterForm.vcenter_ip = "";
        this.VcenterForm.vcenter_user = "";
        this.VcenterForm.vcenter_password = "";
      }, 3000);
    },
    //Vcenter overlay 点击确认发送数据结束
    // EsxiOptions 数据去重开始
    getEsxiVcenterIp() {
      axios.get(`${this.testLive}vcenter/v1/`).then(response => {
        let esxi_vcenter_ip_Array = new Array();
        if (response.data.data.result) {
          for (var i = 0; i < response.data.data.result.length; i++) {
            esxi_vcenter_ip_Array.push(response.data.data.result[i].vcenter_ip);
          }
          let set = Array.from(new Set(esxi_vcenter_ip_Array));
          this.EsxiOptions = set;
        }
      });
    },
    // EsxiOptions 数据去重结束
    //Esxi overlay 点击确认发送数据开始
    Esxi_modal_onSubmit(evt) {
      evt.preventDefault();
      axios.post(`${this.testLive}esxi/v1/`, this.crosser(this.EsxiForm)).then(req => {
        if (req.data.code !== 0) {
          this.submit_modal_Error_show();
        } else {
          this.submit_modal_Success_show();
        }
        this.error_MSG = "该 Esxi IP 已存在";
      });
      setTimeout(() => {
        this.EsxiForm.esxi_vcenter_ip = null;
        this.EsxiForm.esxi_ip = "";
        this.EsxiForm.esxi_user = "";
        this.EsxiForm.esxi_password = "";
      }, 3000);
    },
    //Esxi overlay 点击确认发送数据结束
    // 成功时的动画效果开始
    submit_modal_Success_show() {
      this.form_submit_Success = true;
      this.modal_body_color_show();
      this.isActiveLive = false;
      this.$nextTick(() => (this.isActiveLive = true));
      setTimeout(() => {
        this.submit_Success_hide();
        this.modal_body_color_hide();
      }, 3000);
    },
    // 成功时的动画效果结束
    // 失败时的动画效果开始
    submit_modal_Error_show() {
      this.form_submit_Error = true;
      this.modal_body_color_show();
      this.isActiveLive = false;
      this.$nextTick(() => (this.isActiveLive = true));
      setTimeout(() => {
        this.submit_Error_hide();
        this.modal_body_color_hide();
      }, 3000);
    },
    // 失败时的动画效果结束
    // 公用点击确认成功时开始
    submit_Success_show() {
      this.form_submit_Success = true;
      this.app_body_color_show();
      setTimeout(() => {
        this.submit_Success_hide();
        this.app_body_color_hide();
      }, 3000);
    },
    // 公用点击确认成功时结束
    // 公用点击确认失败时开始
    submit_Error_show() {
      this.form_submit_Error = true;
      this.app_body_color_show();
      setTimeout(() => {
        this.submit_Error_hide();
        this.app_body_color_hide();
      }, 3000);
    },
    // 公用点击确认失败时结束
    submit_Success_hide() {
      this.form_submit_Success = false;
    },
    submit_Error_hide() {
      this.form_submit_Error = false;
    },
    app_body_color_show() {
      let app_body = document.querySelector(".overlay");
      app_body.style.display = "block";
    },
    app_body_color_hide() {
      let app_body = document.querySelector(".overlay");
      app_body.style.display = "none";
    },
    modal_body_color_show() {
      let modal_body = document.querySelector(".modal.fade.show.d-block");
      modal_body.style.backgroundColor = "rgba(255,255,255,0.2)";
      let modal_backdrop = document.querySelector(".modal-backdrop.show");
      modal_body.style.zIndex = "5";
      modal_backdrop.style.zIndex = "5";
    },
    modal_body_color_hide() {
      let modal_body = document.querySelector(".modal.fade.show.d-block");
      modal_body.style.backgroundColor = null;
      modal_body.style.zIndex = null;
    },
    //点击“添加 AGENT”弹出overlay开始
    showModal() {
      this.$refs.myModalRef.show();
    },
    //点击“添加 AGENT”弹出overlay结束
    showMsgAllFromChild(data) {
      if (data) {
        var index = this.selected.findIndex(d => d === data);
        if (index !== -1) {
          this.selected.splice(index, 1);
        } else {
          this.selected.push(data);
        }
      }
    },
    // 从子组件ESXI获取勾选的数据开始
    showMsgFromEsxiChild(data) {
      if (data) {
        var index = this.MsgFromEsxiChildSelected.findIndex(d => d === data);
        if (index !== -1) {
          this.MsgFromEsxiChildSelected.splice(index, 1);
        } else {
          this.MsgFromEsxiChildSelected.push(data);
        }
      }
    },
    // 从子组件ESXI获取勾选的数据结束
    // 从子组件Vcenter获取勾选的数据开始
    showMsgFromVcenterChild(data) {
      if (data) {
        var index = this.MsgFromVcenterChildSelected.findIndex(d => d === data);
        if (index !== -1) {
          this.MsgFromVcenterChildSelected.splice(index, 1);
        } else {
          this.MsgFromVcenterChildSelected.push(data);
        }
      }
    },
    crosser(obj) {
      var temp = {};
      var res = Object.keys(obj).reduce((arr, key) => {
        var valArr = obj[key].split(",");
        if (valArr.length < 2) {
          temp[key] = obj[key];
          return arr;
        }
        valArr.map((value, index) => {
          if (!arr[index]) {
            arr.push({});
          }
          arr[index][key] = value;
        });
        return arr;
      }, []);
      var ret =
        res.length > 0
          ? res.map(item => {
              return Object.assign({}, item, temp);
            })
          : [temp];
      return ret;
    },
    //object 拆分函数结束
    //弹出修改按开始
    EditAgentOverlay() {
      if (this.MsgFromVcenterChildSelected.length !== 0) {
        this.$refs.editUserPassword.show();
      } else {
        alert("请勾选要修改的 vCenter IP 地址");
      }
    },
    //弹出修改密码结束
    //确认修改用户名及密码开始
    EditAgent_Submit(evt) {
      evt.preventDefault();
      if (this.Agentbutton_index === 6) {
        this.VcenterEsxi = "vcenter";
        axios
          .put(`${this.testLive}${this.VcenterEsxi}/v1/${this.MsgFromVcenterChildSelected}`, {
            vcenter_user: this.EditVcenterForm.vcenter_user,
            vcenter_password: this.EditVcenterForm.vcenter_password,
            edit_flag: 1
          })
          .then(req => {
            if (req.data.code !== 0) {
              this.submit_Error_show();
            } else {
              this.submit_Success_show();
            }
            this.error_MSG = req.data.msg;
            this.isActiveLive = false;
            this.$nextTick(() => (this.isActiveLive = true));
            setTimeout(() => {
              this.MsgFromVcenterChildSelected = [];
              this.EditVcenterForm.vcenter_user = "";
              this.EditVcenterForm.vcenter_password = "";
            }, 3000);
          });
      }
      // else {
      //   this.VcenterEsxi = "esxi";
      //   axios.put((`/${this.VcenterEsxi}/v1/${this.MsgFromEsxiChildSelected}`), {
      //     "vcenter_user": "555555",
      //     "vcenter_password": "88888"
      //   }).then(req => {
      //     if (req.data.code !== 0) {
      //       this.submit_Error_show();
      //     } else {
      //       this.submit_Success_show();
      //     }
      //     this.MsgFromEsxiChildSelected = [];
      //     this.isActiveLive = false;
      //     this.$nextTick(() => this.isActiveLive = true);
      //     this.error_MSG = req.data.msg;
      //   })
      // }
    },
    //确认修改用户名及密码结束
    //取消修改用户名及密码结束
    hideModal() {
      this.$refs.editUserPassword.hide();
    },
    //取消修改用户名及密码结束
    //点击移除按钮弹出警告功能开始
    removeAgent() {
      this.$refs.removeAleartModal.show();
    },
    //点击移除按钮弹出警告功能结束
    //点击移除弹出警告的取消按钮功能开始
    removeHideModal() {
      this.$refs.removeAleartModal.hide();
    },
    //点击移除弹出警告的取消按钮功能结束
    //点击移除弹出警告的确认按钮功能开始
    removeShowModal() {
      if (this.Agentbutton_index === 6) {
        this.VcenterEsxi = "vcenter";
        if (this.MsgFromVcenterChildSelected.length !== 0) {
          axios
            .delete(`${this.testLive}${this.VcenterEsxi}/v1/`, {
              data: {
                pk: this.MsgFromVcenterChildSelected
              }
            })
            .then(req => {
              if (req.data.code !== 0) {
                this.submit_Error_show();
              } else {
                this.submit_Success_show();
                this.getEsxiVcenterIp();
              }
              this.MsgFromVcenterChildSelected = [];
              this.isActiveLive = false;
              this.$nextTick(() => (this.isActiveLive = true));
              this.error_MSG = req.data.msg;
              this.Esxi_modal_onSubmit();
            });
        } else {
          alert("请勾选要删除的 IP 地址");
        }
      } else {
        this.VcenterEsxi = "esxi";
        if (this.MsgFromEsxiChildSelected.length !== 0) {
          axios
            .delete(`${this.testLive}${this.VcenterEsxi}/v1/`, {
              data: {
                pk: this.MsgFromEsxiChildSelected
              }
            })
            .then(req => {
              if (req.data.code !== 0) {
                this.submit_Error_show();
              } else {
                this.submit_Success_show();
              }
              this.MsgFromEsxiChildSelected = [];
              this.isActiveLive = false;
              this.$nextTick(() => (this.isActiveLive = true));
              this.error_MSG = req.data.msg;
            });
        } else {
          alert("请勾选要删除的 IP 地址");
        }
      }
    },
    //点击移除弹出警告的确认按钮功能开始
    //搜索功能开始
    onSubmit(evt) {
      evt.preventDefault();
      this.isClear = true;
      if (this.Agentbutton_index === 6) {
        this.VcenterEsxi = "vcenter";
        if (this.form.search) {
          axios
            .get(`${this.testLive}` + this.VcenterEsxi + `/v1/` + this.form.search)
            .then(req => {
              this.singleVcenterInfo = req.data.data;
              if (req.data.data === null) {
                this.submit_Error_show();
              } else {
                this.submit_Success_show();
              }
              this.error_MSG = "查无此 IP 地址";
            });
        }
      } else {
        this.VcenterEsxi = "esxi";
        if (this.form.search) {
          axios
            .get(`${this.testLive}` + this.VcenterEsxi + `/v1/` + this.form.search)
            .then(req => {
              this.singleEsxiInfo = req.data.data;
              if (req.data.data === null) {
                this.submit_Error_show();
              } else {
                this.submit_Success_show();
              }
              this.error_MSG = "查无此 IP 地址";
            });
        }
      }
    },
    //搜索功能结束
    //清除搜索框功能开始
    clearForm() {
      this.isActiveLive = false;
      this.$nextTick(
        () => (this.isActiveLive = true),
        (this.form.search = ""),
        (this.isClear = false)
      );
    }
    //清除搜索框功能结束
  },
  created() {
    this.getEsxiVcenterIp();
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      let currentButton = document.querySelector(
        ".topcoat-button-bar__button.current"
      );
      currentButton.click();
    });
  }
};
</script>
<style scoped>
#exampleInput1 {
  height: 32px;
}
.submit_button {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translateY(-50%);
  right: 6%;
}
.submit_button>>>.btn-secondary {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.login-icon {
  position: relative;
  margin-left: -40px;
  padding-left: 0px;
  border-radius: 50% !important;
  cursor: pointer;
}
.login-icon::before {
  content: " ";
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}
.modal_module_header_select_button {
  left: -7px;
}
.modal_form_select {
  max-width: 17rem;
  left: -9.3rem;
  position: relative;
}
.module_header_edit_button,
.module_header_remove_button {
  border: 1px solid rgba(204, 204, 204, 1);
  height: 32px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
}
.module_header_edit_button:hover,
.module_header_remove_button:hover {
  background: rgba(102, 153, 255, 0.2);
}
.module_header_edit_button span,
.module_header_remove_button span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modalTab {
  border: 0px;
}
.modalTab>>>.card-header {
  background-color: #fff;
  border-bottom: 0px;
}
.modal_form {
  margin-bottom: 7rem;
}
.modal_body {
  position: relative;
}
.modal_body>>>.modal-body {
  min-height: 27rem !important;
}
.modal_footer_button {
  position: absolute;
  bottom: 20px;
  right: 2rem;
}
.modal_submit {
  width: 6rem;
  color: rgb(102, 102, 102);
  font-weight: 900;
  background: rgba(51, 204, 0, 0.2);
  cursor: pointer;
  margin-right: 0.7rem;
}
.modal_cancel {
  width: 6rem;
  font-weight: 900;
  cursor: pointer;
  margin-right: 0.7rem;
}
.modal_submit:hover {
  background: rgba(102, 153, 255, 0.2);
}
.Esxi_form_input {
  max-width: 17rem;
}
.Vcenter_form_input {
  max-width: 17rem;
}
.Esxi_span,
.Vcenter_span {
  position: relative;
}
.editVcenter {
  text-align: left;
  margin-left: 0.8rem;
  font-weight: bold;
}
.Vcenter_span span {
  position: absolute;
  top: 12px;
  margin-left: 1rem;
}
.Esxi_span span {
  position: absolute;
  top: 12px;
  margin-left: 1rem;
}
.submit_success {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1051;
}
.submit_success span {
  font-weight: bold;
  top: 100%;
  position: relative;
  color: #fff;
}
.submit_error {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1051;
}
.submit_error span {
  font-weight: bold;
  top: 100%;
  position: relative;
  color: #fff;
}
.ui-success,
.ui-error {
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.ui-success-circle {
  stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
  stroke-dashoffset: 260.75219024795285px;
  transform: rotate(220deg);
  transform-origin: center center;
  stroke-linecap: round;
  animation: ani-success-circle 1s ease-in both;
}
.ui-success-path {
  stroke-dasharray: 60px 64px;
  stroke-dashoffset: 62px;
  stroke-linecap: round;
  animation: ani-success-path 0.4s 1s ease-in both;
}
@keyframes ani-success-circle {
  to {
    stroke-dashoffset: 782.2565707438586px;
  }
}
@keyframes ani-success-path {
  0% {
    stroke-dashoffset: 62px;
  }
  65% {
    stroke-dashoffset: -5px;
  }
  84% {
    stroke-dashoffset: 4px;
  }
  100% {
    stroke-dashoffset: -2px;
  }
}
.ui-error-circle {
  stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
  stroke-dashoffset: 260.75219024795285px;
  animation: ani-error-circle 1.2s linear;
}
.ui-error-line1 {
  stroke-dasharray: 54px 55px;
  stroke-dashoffset: 55px;
  stroke-linecap: round;
  animation: ani-error-line 0.15s 1.2s linear both;
}
.ui-error-line2 {
  stroke-dasharray: 54px 55px;
  stroke-dashoffset: 55px;
  stroke-linecap: round;
  animation: ani-error-line 0.2s 0.9s linear both;
}
@keyframes ani-error-line {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes ani-error-circle {
  0% {
    stroke-dasharray: 0, 260.75219024795285px;
    stroke-dashoffset: 0;
  }
  35% {
    stroke-dasharray: 120px, 120px;
    stroke-dashoffset: -120px;
  }
  70% {
    stroke-dasharray: 0, 260.75219024795285px;
    stroke-dashoffset: -260.75219024795px;
  }
  100% {
    stroke-dasharray: 260.75219024795285px, 0;
    stroke-dashoffset: -260.75219024795px;
  }
}
.clear {
  position: absolute;
  top: 32%;
  left: 65%;
  cursor: pointer;
  color: #009ad6;
  font-size: 0.9rem;
}
.clear:hover {
  text-decoration-line: underline;
  font-weight: bold;
}
.table_body {
  min-height: 32rem;
  max-height: 33rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.modalTab>>>.nav.nav-pills.card-header-pills.small {
  background: transparent;
  width: 182px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  left: 7px;
}
.modalTab>>>.nav.nav-pills.card-header-pills.small li {
  width: 90px;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modalTab>>>.nav-item a.nav-link:hover {
  background: rgba(102, 153, 255, 0.2);
  border: 1px solid rgba(102, 153, 255, 0.2);
}
.modalTab>>>.nav-item a.nav-link.active {
  color: #000;
  background-color: #f2f2f2;
  font-weight: bold;
  box-shadow: 0px 0px 5px 0px #cccccc inset !important;
  border: 1px solid #000;
}
.modalTab>>>.nav-item a.nav-link {
  background-color: #fff;
  color: #666666;
  border-color: #ccc;
  box-shadow: 0px 0px 5px 0px transparent inset !important;
}
</style>


