<template>
    <div class="table">
        <b-table :items="items" :fields="fields" class="dataCollectNot">
            <template slot="down_name" slot-scope="row"><b-form-checkbox-group id="radioboxes2" v-model="selected"><b-form-radio  :value="row.value" @change="showMsgFromDataCollectNotChild(row.value)">{{row.value}}</b-form-radio></b-form-checkbox-group>
</template>
</b-table></div></template>


<script>
    import axios from 'axios';
    export default {
        props:['showMsgFromDataCollectNotChild'],
        data() {
            return {
                testLive:'/',
                selected: [],
                fields: [{
                        key: 'down_name',
                        label: '文件名称',
                    },
                    {
                        key: 'current_time',
                        label: '备份时间',
                        sortable: true
                    },
                    {
                        key: 'backup_method',
                        label: '全量/增量',
                    },
                    {
                        key: 'down_flag',
                        label: '下载状态',
                        sortable: true
                    }
                ],
                items: []
            }
        },
        created() {
            axios.get(`${this.testLive}down/v1/`).then((response) => {
                let IfDown = response.data.data.result;
                let arr = new Array();
                for (var i = 0; i < IfDown.length; i++) {
                    if (!IfDown[i].down_flag) {
                        arr.push(IfDown[i]);
                        this.items = arr;
                    }
                }
            });
        },
        updated() {
            var Full = document.querySelectorAll('[aria-colindex="3"]');
            var down = document.querySelectorAll('[aria-colindex="4"]');
            for (let i = 0; i < Full.length; i++) {
                if (Full[i].textContent === 'full amount') {
                    Full[i].textContent = '全量';
                } else if (Full[i].textContent === "increment") {
                    Full[i].textContent = '增量';
                }
            }
            for (let j = 0; j < down.length; j++) {
                if (down[j].textContent === 'false') {
                    down[j].textContent = '未下载';
                    down[j].style.color = "rgba(238, 0, 0, 0.6)";
                } else if (down[j].textContent === "true") {
                    down[j].textContent = '已下载';
                    down[j].style.color = "rgba(51, 204, 0, 0.6)";
                }
            }
        },
    }
</script>

<style scoped>
.dataCollectNot{
    text-align: left;
}
</style>
