<template>
    <div>
        <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                收益记录
            </div>
        </div>
        <div class="fund_wrap">
            <table class="table">
                <tbody>
                <tr class="header">
                    <th class="first">项目名称</th>
                    <th>金额</th>
                    <th>支付时间</th>
                    <th class="last">状态</th>
                </tr>
                <tr v-for="(item, key) in data.list" :key="key">
                    <td>{{item.title + '第' + item.num + '期'}}</td>
                    <td style="color:#a8853a">{{item.pay2}}</td>
                    <td>{{item.time2|dateFormat}}</td>
                    <td :style="status(item.status)">{{item.status=='0'?'未还款':'已还款'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch';
    import moment from "moment";

    export default {
        name: "index",
        components: {},
        data() {
            return {
                data: {},
            };
        },
        created() {
            this.$parent.footer(false);
        },
        filters: {
            dateFormat(time) {
                return moment(time).format('MM.DD hh:mm');
            }
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/user/interest').then(res => {
                    this.data = res.data;
                })
            },
            status(v) {
                if (v === '1') {
                    return 'color:#67C23A';
                }

                return 'color:#E6A23C'
            }
        }
    };
</script>

<style lang="less" scoped>
    .fund_wrap .table tr {
        width: 100%;
    }

    .fund_wrap .table .header {
        width: 100%;
        height: 34px;
        background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
        background-image: -o-linear-gradient(left, #666666, #262627);
        background-image: linear-gradient(to right, #666666, #262627);
        border: 0;
    }

    .fund_wrap .table tr .first {
        border-radius: 10px 0 0 10px;
    }

    .fund_wrap .table tr .last {
        border-radius: 0 10px 10px 0;
        border: 0;
    }

    .fund_wrap .table tr th {
        font-size: 14px;
        color: #e8c27d;
        width: 33.333%;
        border-right: 1px solid #666666;
    }

    .fund_wrap .table .tab.tab_2 {
        border-left: 1px solid #7B7B7B;
        border-right: 1px solid #7B7B7B;
    }

    .fund_wrap .table {
        table-layout: fixed;
        width: 92%;
        margin: 15px auto;
    }

    .fund_wrap .table tbody tr {
        margin: 0 auto;
        border-bottom: 1px solid #EDEDED;
    }

    /*.fund_wrap .table tbody tr td:first-child {*/
    /*    text-align: left;*/
    /*}*/

    /*.fund_wrap .table tbody tr td:last-child {*/
    /*    text-align: left;*/
    /*}*/


    .fund_wrap .table tbody tr td {
        padding: 0 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        line-height: 26px;
        padding-bottom: 10px;
        padding-top: 24px;
        color: #333333;
    }

    .fund_wrap .table tbody tr .td_3 {
        color: #dfba7b;
    }
</style>