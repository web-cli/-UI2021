<template>
    <div>
        <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                信息管理
            </div>
        </div>
        <div class="fund_wrap">
            <table class="table">
                <tbody>
                <tr class="header">
                    <th class="first">状态</th>
                    <th>主题</th>
                    <th>时间</th>
                    <th class="last">操作</th>
                </tr>
                <tr v-for="(v,k) in data.list" :key="k">
                    <td v-if="!v.is_read" style="color: #00C800">未读</td>
                    <td v-if="v.is_read" style="color: #cccccc">已读</td>
					<td v-if="v.title === '履约提醒'" style="color: #c80003">{{v.title}}</td>
                    <td v-else>{{v.title}}</td>
                    <td>{{v.time|dateFormat}}</td>
                    <td>
                        <router-link class="button" :to="'/notice/' + v.id">查看</router-link>
                    </td>
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
        name: "login",
        data() {
            return {
                data: [],
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
                Fetch('/user/notice').then((r) => {
                    this.data = r.data;
                });

                console.log(this.data)
            },
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
        width: 25%;
        text-align: center;
        font-size: 14px;
        line-height: 26px;
        padding-bottom: 10px;
        padding-top: 24px;
        color: #333333;
    }

    .fund_wrap .table tbody tr td .button{
        background: #e8c27d;
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 5px;
        color: white;
    }

    .fund_wrap .table tbody tr .td_3 {
        color: #dfba7b;
    }
</style>