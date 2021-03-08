<template>
    <div>
        <div id="header">
            <div class="header">
                <span class="back" @click="$router.push('/user')"></span>
                <!-- <span class="add" @click="$router.push('/address')"></span> -->
                <div class="tab_box">
                    <!-- 选中状态加class tab_active -->
                    <!-- <div class="tab" :class="status === k ? 'tab_active' : ''" v-for="(v,k) in data.config.status"
                         :key="k" @click="start(k)">
                        <div class="info">{{v}}</div>
                        <div class="line"></div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="order_wrap">
            <div class="ctn">
                <div class="item" v-for="(v,k) in data.list" :key="k">
                    <!-- 背景图 -->
                    <div class="left"><img :src="v.img"></div>
                    <div class="right">
                        <div class="title">{{v.goods}}×{{v.num}}</div>
                        <div class="sub">兑换时间：{{v.time}}</div>
                        <div class="price_box"><span class="rmb">果币:</span><span class="price">{{v.integral}}</span></div>
                        <div class="btn_box">
                            <!-- <a href="javascript:;" class="not_ship">{{v.status_name}}</a> -->
                            <!-- <a href="javascript:;" v-if="v.status === 'D'" class="express_btn">查看物流</a> -->
                        </div>
                    </div>
                </div>
                <div class="nodata_box" v-if="data.count === 0">
                    <img class="nodata" src="./images/nodata.svg" alt=""/>
                    <div class="sub">您目前还没有兑换记录</div>
                </div>
            </div>
            <!--            <div class="like_box">-->
            <!--                <div class="like_box_title">-->
            <!--                <span class="line_box">-->
            <!--                    <span class="dot"></span>-->
            <!--                    <span class="line"></span>-->
            <!--                </span>-->
            <!--                    <span class="title_box">-->
            <!--                    <span class="icon"></span>-->
            <!--                    <span class="title">猜你喜欢</span>-->
            <!--                </span>-->
            <!--                    <span class="line_box">-->

            <!--                    <span class="line"></span>-->
            <!--                    <span class="dot"></span>-->
            <!--                </span>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch';
    import Vue from 'vue';
    import {NoticeBar} from 'vant';

    Vue.use(NoticeBar);

    export default {
        name: "info",
        data() {
            return {
                data: {
                    config:{
                        status:{}
                    }
                },
                status: 'S',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            /* start(status = 'S') {
                this.status = status;
                Fetch('/user/shop_order', {status: status}).then(res => {
                    this.data = res.data;
                })
            }, */
			start() {
			    this.status = status;
			    Fetch('/user/shop_order').then(res => {
			        this.data = res.data;
			    })
			},
        }
    };
</script>

<style lang="less" scoped>
    #header {
        width: 100%;
        height: 50px;
    }

    #header .header {
        height: 50px;
        position: fixed;
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        z-index: 20;
        background: #fafafa;
    }

    #header .header .back {
        display: inline-block;
        width: 15px;
        height: 27px;
        background-image: url(./images/back_l.svg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 4.5%;
        z-index: 21;
    }

    #header .header .add {
        display: inline-block;
        width: 23px;
        height: 23px;
        background-image: url(./images/add.svg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 4.5%;
        z-index: 21;
    }

    #header .header .tab_box {
        width: 128px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        bottom: 0;
    }

    #header .header .tab_box .tab {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    #header .header .tab_box .tab .info {
        font-size: 14px;
        color: #444545;
        margin-bottom: 4px;
    }

    #header .header .tab_box .tab .line {
        width: 74%;
        height: 2px;
        background: transparent;
    }

    #header .header .tab_box .tab.tab_active .info {
        color: #13963d;
    }

    #header .header .tab_box .tab.tab_active .line {
        background: #13963d;
    }

    .order_wrap {
        width: 100%;
        margin-top: 18px;
    }

    .order_wrap .ctn {
        width: 94.6%;
        margin: 0 auto 60px auto;
    }

    .order_wrap .ctn .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        padding: 12px 12px 12px 18px;
        border-radius: 8px;
        background: #fff;
        -webkit-box-shadow: 0 0 8px 0 #ededed;
        box-shadow: 0 0 8px 0 #ededed;
        margin-bottom: 18px;
    }

    .order_wrap .ctn .item .left {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 80px;
        flex: 0 0 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-right: 5%;
        width: 80px;
    }

    .order_wrap .ctn .item .left img {
       width: 80px;
       height: 80px;
    }

    .order_wrap .ctn .item .right {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .order_wrap .ctn .item .right .title {
        color: #323232;
        font-size: 15px;
        line-height: 1.7;
        width: 100%;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .order_wrap .ctn .item .right .sub {
        font-size: 12px;
        color: #323232;
        line-height: 1.7;
        width: 100%;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .order_wrap .ctn .item .right .price_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        color: #ff7362;
        margin: 14px 0 12px 0;
    }

    .order_wrap .ctn .item .right .price_box .rmb {
        font-size: 12px;
        margin-right: 4px;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
    }

    .order_wrap .ctn .item .right .price_box .price {
        font-size: 14px;
    }

    .order_wrap .ctn .item .right .btn_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
    }

    .order_wrap .ctn .item .right .btn_box .not_ship {
        font-size: 13px;
        color: #303030;
    }

    .order_wrap .ctn .item .right .btn_box .express_btn {
        display: inline-block;
        width: 70px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #13963d;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #13963d;
        margin-left: 18px;
    }

    .order_wrap .ctn .nodata_box {
        margin: 44px auto 70px auto;
    }

    .order_wrap .ctn .nodata_box .nodata {
        display: block;
        width: 38%;
        margin: 0 auto;
    }

    .order_wrap .ctn .nodata_box .info {
        text-align: center;
        color: #444545;
        font-size: 15px;
        line-height: 1.7;
    }

    .order_wrap .ctn .nodata_box .sub {
        text-align: center;
        color: #828484;
        font-size: 12px;
        line-height: 1.7;
    }

    .order_wrap .like_box {
        padding: 20px 0;
        background: #fff;
    }

    .order_wrap .like_box .like_box_title {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 140px;
        margin: 0 auto;
    }

    .order_wrap .like_box .like_box_title .line_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .order_wrap .like_box .like_box_title .line_box .dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        background: #f47813;
        border-radius: 5px;
    }

    .order_wrap .like_box .like_box_title .line_box .line {
        width: 20px;
        height: 1px;
        background: #f47813;
    }

    .order_wrap .like_box .like_box_title .title_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .order_wrap .like_box .like_box_title .title_box .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url(./images/like.svg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        margin-right: 4px;
    }

    .order_wrap .like_box .like_box_title .title_box .title {
        font-size: 14px;
        color: #f47813;
    }
</style>