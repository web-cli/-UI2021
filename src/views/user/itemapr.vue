<template>
    <div class="content">
        <!-- <router-link to="/touzi" class="back">&lt;</router-link> -->
            <van-nav-bar
      title="投资详情"
      left-arrow
      fixed
      @click-left="$router.push({ path: '/touzi' })"
    />
        <div class="top">
        </div>
        <div class="mt0 login-top">
            <!-- <div class="title">投资详情</div> -->
            <div class="box">
                <!-- <div class="side left"></div> -->
                <div class="main">
                    <div class="main_item">
                        <div class="main_info">
                            <div>投资金额</div>
                            <div class="big">¥<span>{{data.money}}元</span></div>
                        </div>
                        <div class="main_info main_info2">
                            <div>预期效益</div>
                            <div class="big">¥<span>{{data.apr_money}}</span>元</div>
                        </div>
                    </div>
                    <div class="main_item">
                        <div class="main_info">
                            <div>投资时间</div>
                            <div class="big">{{data.addtime_date}}</div>
                        </div>
                        <div class="main_info main_info2">
                            <div>到期时间</div>
                            <div class="big">{{data.end_time_date}}</div>
                        </div>
                    </div>
                    <div class="main_item main_item_last">
                        <div class="main_info">
                            <div>收益方式</div>
                            <div class="big">{{data.type_name}}</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="side right"></div> -->
            </div>
        </div>
        <div class="mt1">
            <table class="table">
                <thead>
                <tr>
                    <th class="border_top border_left">期号</th>
                    <th class="border_top">应收本金</th>
                    <th class="border_top">应收利息</th>
                    <th class="border_top">应收时间</th>
                    <th class="border_top">收益时间</th>
                    <th class="border_top border_right">状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, key) in data.apr_plan" :key="key">
                    <td class="border_left">第{{item.num}}期</td>
                    <td>{{item.money2}}</td>
                    <td>{{item.money1}}</td>
                    <td>{{item.time1}}</td>
                    <td>{{item.time2 != '0000-00-00 00:00:00'?item.time2:'未完成'}}</td>
                    <td class="border_right">{{item.status == 1?'已完成':'未完成'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

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
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/index/interest', {id: this.$router.history.current.params.id}).then(res => {
                    this.data = res.data;
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    .content {

        .back {
            position: absolute;
            z-index: 10;
            color: #fff;
            text-indent: 8px;
            width: 36px;
            height: 24px;
            line-height: 20px;
            font-size: 18px;
            background: #e8c27d;
            border-radius: 0 20px 20px 0;
            top: 20px;
        }

        .mt0 {
            padding: 60px 0 50px 0;
            // background: #2c6dfb;
            margin-top: 100px;
        }

        .mt0 .title {
            width: 55.4%;
            height: 36px;
            line-height: 36px;
            border-radius: 36px;
            color: #333333;
            font-size: 18px;
            text-align: center;
            background: #e8c27d;
            margin: 0 auto 34px auto;
        }

        .mt0 .box {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        .mt0 .box .side {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 22px;
            flex: 0 0 22px;
            height: 158px;
            background: #7a6e87;
        }

        .mt0 .box .left {
            border-radius: 0 10px 10px 0;
            margin-right: 15px
        }

        .mt0 .box .right {
            margin-left: 15px;
            border-radius: 10px 0 0 10px;
        }

        .mt0 .box .main {
            width: 100%;
            // background: #e8c27c;
            border-radius: 10px;
            // padding: 18px 7.8%;
            padding: 0 60px;
            // display: flex;
            // justify-content: space-around;
        }

        .mt0 .box .main .main_item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            color: #ffffff;
            font-size: 24px;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .mt0 .box .main .main_item_last {
            margin-bottom: 0;
        }

        .mt0 .box .main .main_item .main_info {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            color: #ffffff;
            font-size: 12px;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            text-align: left;
        }

        .mt0 .box .main .main_item .main_info2 {
            text-indent: 30%;
        }

        .mt0 .box .main .main_item .main_info .big {
            margin-top: 10px;
            font-size: 28px;
            span{
                // color: #ee0a24;
                // padding: 10px 0;
                margin: 0 6px;
                display: inline-block;
            }
        }

        .mt1 {
            width: 92.4%;
            border-radius: 10px;
            overflow: scroll;
            position: relative;
            padding-bottom: 80px;
            background: #fff;
            -webkit-box-shadow: 1px 1px 4px 0px #f2f2f2;
            box-shadow: 1px 1px 4px 0px #f2f2f2;
            margin: 10px auto;

        }

        .mt1 .table {
            width: 100%;
        }

        .mt1 .table td,
        .mt1 .table th {
            border: 1px solid #dcdcdc;
            padding: 7px 0;
            text-align: center;
            font-size: 12px;
            color: #919191;
        }

        .mt1 .table th {
            color: #333;
        }

        .mt1 .table .border_top {
            border-top: none;
        }

        .mt1 .table .border_left {
            border-left: none;
        }

        .mt1 .table .border_right {
            border-right: none;
        }

        .mt1 .table th {
            color: #333;
        }
    }
</style>