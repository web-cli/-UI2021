<template>
    <div style="height: 100%;background: #ffe3b4;">
        <div class="top_box">
            <a @click="$router.push('/user')" class="left"></a>
            <a @click="more" class="qa">?</a>
        </div>
        <div class="banner_box">
            <img src="./image/banner.png" class="banner" alt=""/>
            <div class="money_box">
                <div class="money_icon"><span class="icon1"></span></div>
                <div class="money_info">{{data.user_fruit}}</div>
            </div>
        </div>
        <div class="mt0">兑换商店</div>
        <div class="mt1">
            <span class="record" @click="showlist()">兑换记录</span>
        </div>
        <div class="ctn">
            <div class="item" v-for="(v,k) in data.list" :key="k">
                <img class="desk" src="./image/desk.png" alt=""/>
                <div class="product_box">
                    <div class="img_box">
                        <img class="product_img" :src="v.thumb" alt=""/>
                        <img class="icon3" src="./image/icon3.svg" alt=""/>
                    </div>
                </div>
                <div class="get_btn" @click="shop(v.id)">兑换</div>
                <div class="need_money_box">
                    <span class="need_money_icon"></span>
                    <span class="need_money">{{v.money}}</span>
                </div>
            </div>
        </div>
        <div class="mask"></div>
        <van-overlay :show="show" @click="show = false" :z-index="99">
            <div class="record_popup">
                <div class="record_top">
                    <img class="popup_top" src="./image/popup_top.png" alt=""/>
                    <div class="popup_bg"></div>
                </div>
                <span class="popup_close"></span>
                <div class="popup_title">
                    兑换记录
                </div>
                <div class="popup_ctn">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>
                                <div>产品</div>
                            </th>
                            <th>
                                <div>果实</div>
                            </th>
                            <th>
                                <div>时间</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in order.list" :key="k">
                            <td class="td_1">{{v.name}}</td>
                            <td class="td_2">-{{v.money}}</td>
                            <td class="td_3">{{v.addtime|dateFormat}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </van-overlay>
        <!-- 规则弹窗 -->
        <transition name="fade">
            <div class="sign_pop" v-show="rule_dh">
                <div class="sign_inner">
                    <div class="rule_tips"><pre>{{rule_msg}}</pre></div>
                    <div @click="close()" class="i_know"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch';
    import {Dialog, Overlay} from 'vant';
    import moment from "moment";
    import Vue from 'vue';

    Vue.use(Overlay);


    export default {
        name: "shop",
        components: {},
        data() {
            return {
                data: {},
                show: false,
                order: {},
                rule_dh: false,
                rule_msg: '收集金币兑换你想要的水果\n已兑换过的水果不可二次兑换\n金币不足不可兑换'
            };
        },
        created() {
            this.$parent.footer(false);
        },
        filters: {
            dateFormat(time) {
                return moment(parseInt(time) * 1000).format('YYYY.MM.DD');
            }
        },
        mounted() {
            this.start();
        },
        methods: {
            close(){
                this.rule_dh = false;
            },
            start() {
                Fetch('/goods/index/search').then(res => {
                    this.data = res.data;
                });
            },
            shop(id) {

                Dialog.confirm({
                    title: '提示',
                    message: '是否兑换'
                }).then(() => {

                    Fetch('/goods/index/shop', {
                        id: id
                    }).then(() => {
                        this.$notify({
                            background: '#07c160',
                            message: '兑换成功'
                        });
                        this.start();
                    });

                }).catch(() => {
                    return;
                });
            },
            more() {

                this.rule_dh = true;

                // Dialog.alert({
                //     title: '兑换介绍',
                //     message: '达到一定数量的果实即可兑换相应的水果【例如：达到要求兑换一次苹果，（每兑换一次即相应水果5斤）兑换之后将会在三到五个工作日内以快递的方式派送到用户填写的收货地址】'
                // }).then(() => {
                //     return;
                // });

            },
            showlist() {
                Fetch('/goods/order/search').then((res) => {
                    this.order = res.data;
                });
                this.show = true;
            }
        }
    };
</script>

<style lang="less" scoped>

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }

    .top_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        position: absolute;
        top: 10px;
        left: 0;
        padding: 0 15px;
        z-index: 2;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .top_box .left {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        background-color: #faf5c8;
        background-image: url(./image/back.svg);
        background-repeat: no-repeat;
        background-size: 15px 17px;
        background-position: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .top_box .qa {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        color: #e58700;
        font-size: 24px;
        font-weight: bold;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #faf5c8;
    }

    .banner_box {
        position: relative;
        width: 100%;
        z-index: 1;
        padding-bottom: 40px;
        background: #e29c67;
        border-bottom: 1px solid #f7cf9e;
    }

    .banner_box .banner {
        display: block;
        width: 100%;
        max-width: 100%;
    }

    .banner_box .money_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        left: 5px;
        bottom: 24px;
        z-index: 2;
    }

    .banner_box .money_box .money_icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 30px;
        height: 30px;
        padding: 2px;
        background: #faf5cb;
        border-radius: 30px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        z-index: 2;
    }

    .banner_box .money_box .money_icon .icon1 {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #c0b681;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(./image/icon1.svg);
        background-size: 16px 12px;
    }

    .banner_box .money_box .money_info {
        height: 22px;
        border-radius: 0 22px 22px 0;
        padding: 0 14px 0 20px;
        background: #faf5cb;
        color: #b97139;
        font-size: 15px;
        line-height: 22px;
        margin-left: -12px;
        z-index: 1;
    }

    .mt0 {
        width: 60%;
        height: 28px;
        line-height: 28px;
        margin: 0 auto;
        border-radius: 4px 4px 0 0;
        background: #ffe3b4;
        text-align: center;
        font-size: 16px;
        color: #b97139;
        margin-top: -29px;
        position: relative;
        z-index: 3;
    }

    .mt1 {
        margin: 12px auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 0 12px;
    }

    .mt1 .record {
        font-size: 12px;
        color: #b97139;
        text-decoration: underline;
    }

    .ctn {
        width: 100%;
        padding: 0 8px;
    }

    .ctn .item {
        width: 100%;
        position: relative;
        margin: 70px auto;
    }

    .ctn .item .desk {
        display: block;
        width: 100%;
        max-width: 100%;
        position: relative;
        z-index: 1;
    }

    .ctn .item .product_box {
        width: 104px;
        height: 66px;
        border-radius: 3px;
        border: 1px solid #fff;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#b0e7ff), to(#53a7ff));
        background-image: -o-linear-gradient(top, #b0e7ff, #53a7ff);
        background-image: linear-gradient(to bottom, #b0e7ff, #53a7ff);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: absolute;
        z-index: 2;
        left: 2%;
        top: -55px;
    }

    .ctn .item .product_box .img_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 5;
    }

    .ctn .item .product_box .product_img {
        display: block;
        max-height: 84%;
    }

    .ctn .item .product_box .icon3 {
        display: inline-block;
        width: 14px;
        position: absolute;
        z-index: 4;
        right: -13px;
        bottom: 1px;
    }

    .ctn .item .get_btn {
        width: 98px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-image: url(./image/btn.png);
        color: #fff;
        font-size: 17px;
        text-stroke: 1px #1dbbfb;
        position: absolute;
        z-index: 2;
        right: 15px;
        top: -6%;
    }

    .ctn .item .need_money_box {
        position: absolute;
        left: 12px;
        top: 24%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        z-index: 2;
    }

    .ctn .item .need_money_box .need_money_icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 27px;
        height: 29px;
        background: #ade500;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px 12px;
        background-image: url(./image/icon1.svg);
    }

    .ctn .item .need_money_box .need_money {
        width: 60px;
        height: 25px;
        border-radius: 0 6px 6px 0;
        text-align: center;
        background: #faf5cb;
        color: #ea7947;
        font-size: 14px;
        line-height: 25px;
        z-index: 1;
    }

    .record_popup {
        position: fixed;
        width: 82%;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 200;
        //display: none;
    }

    .record_popup .record_top {
        width: 100%;
    }

    .record_popup .record_top .popup_bg {
        width: 96.4%;
        padding-bottom: 42px;
        background: #e29c67;
        margin: -12px auto 0 auto;
    }

    .record_popup .record_top .popup_top {
        display: block;
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
    }

    .record_popup .popup_title {
        width: 64%;
        text-align: center;
        height: 20px;
        line-height: 20px;
        color: #c66c27;
        font-size: 12px;
        background: #ffe3b4;
        border-radius: 5px 5px 0 0;
        margin: -20px auto 0 auto;
    }

    .record_popup .popup_close {
        display: inline-block;
        width: 34px;
        height: 34px;
        border-radius: 34px;
        background: #faf4c4;
        z-index: 201;
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: center;
        background-image: url(./image/close.svg);
        position: absolute;
        right: 0;
        margin-right: -6px;
        top: 7%;
    }

    .record_popup .popup_ctn {
        width: 96.4%;
        margin: -1px auto 0 auto;
        background: #ffe3b4;
        padding: 15px 1.8%;
        min-height: 300px;
        max-height: 450px;
        overflow: auto;
    }

    .record_popup .popup_ctn .table {
        width: 88%;
        margin: 0 auto;
        table-layout: fixed;
    }

    .record_popup .popup_ctn .table thead tr th {
        width: 33.33%;
    }

    .record_popup .popup_ctn .table thead tr th > div {
        display: inline-block;
        width: 60px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: #c07a44;
        color: #fee3ae;
        font-size: 12px;
        border-radius: 4px 4px 0 0;
    }

    .record_popup .popup_ctn .table tbody tr td {
        height: 24px;
        text-align: center;
        color: #ea7947;
        border: 1px solid #e58700;
        font-size: 12px;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .record_popup .popup_ctn .table tbody tr td.td_3 {
        font-size: 12px;
    }

    .sign_pop{
        background: rgba(0,0,0,0.6);
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .sign_inner{
        width: 263px;
        height: 351px;
        background: url(./image/rule_pop.png) no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -175px;
        margin-left: -131px;
    }
    .i_know{
        width: 220px;
        height: 35px;
        position: absolute;
        bottom: 28px;
        left: 20px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
    }
    .rule_tips{
        width: 100%;
        padding: 0 10px;
        line-height: 20px;
        font-size: 13px;
        color: #707070;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 90px;
        position: absolute;
        left: 0;
        top: 190px;
        white-space: pre-wrap;
    }
</style>


