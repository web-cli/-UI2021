<template>
    <div class="big_wrap">
        <div class="header">
            <div class="head">
                <router-link to="/tree" class="back"></router-link>
                兑换记录
            </div>
        </div>
        <div class="record_list">
            <div class="list_child" v-for="(v,k) in order.list" :key="k">
                <div class="shop_pic">
                    <img :src="v.img" alt="" />
                </div>
                <div class="shop_detail">
                    <p class="list_title">{{v.goods}}</p>
                    <p class="record_time">兑换时间：{{v.time|dateFormat}}</p>
                </div>
                <div class="dh_num">
                    <!-- <img src="./image/tree/ico.png" class="icon_fruit" alt="" /> -->
                    <span class="fruit_num">果币：{{v.integral}}</span>
                    <span class="fruit_num2">×{{v.num}}</span>
                    <!-- <p class="record_type">{{v.status_name}}</p> -->
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch';
    import {Dialog, Overlay} from 'vant';
    import moment from "moment";
    import Vue from 'vue';

    Vue.use(Overlay);


    export default {
        name: "record",
        components: {},
        data() {
            return {
                data: {},
                show: false,
                order: {},
                
            };
        },
        created() {

        },
        filters: {
            dateFormat(time) {
                return moment(time).format('YYYY.MM.DD');
            }
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/user/shop_order').then((res) => {
                    this.order = res.data;
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .big_wrap{
        background: url(./image/record_bg.png) repeat-y top center;
        background-size: 100% auto;
        min-height: 100vh;
        padding-bottom: 20px;
    }
    .record_list{
        width: 90.6%;
        margin: 8px auto 0 auto;
        background: #f4efde;
        .list_child{
            width: 100%;
            height: 107px;
            background: #ffffff;
            border-radius: 10px;
            padding: 11px;
            display: flex;
            flex-flow: row no-wrap;
            margin-bottom: 10px;
        }
        .shop_pic{
            float: left;
            width: 87px;
            background: #eeeeee;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            img{
                width: 75%;
                height: 75%;
            }
        }
        .shop_detail{
            width: 47%;
            height: 100%;
            margin-left: 9px;
            float: left;
            .list_title{
                width: 100%;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                font-size: 15px;
                color: #000;
                line-height: 22px;
                margin-top: 6px;
            }
            .record_time{
                width: 100%;
                font-size: 12px;
                color: #8b8b8b;
                margin-top: 12px;
                line-height: 24px;
            }
        }
        .dh_num{
            width: 25%;
            float: left;
            height: 100%;
            position: relative;
            .icon_fruit{
                width: 18px;
                position: absolute;
                right: 1.525rem;
                top: 14px;
            }
            .fruit_num{
                position: absolute;
                font-size: 12px;
                color: #965623;
                top: 14px;
                right: 0;
				width: 100px;

            }
            .fruit_num2{
                font-size: 12px;
                color: #999999;
                position: absolute;
                top: 33px;
                right: 0;
            }
            .record_type{
                font-size: 12px;
                color: #df6428;
                position: absolute;
                right: 0;
                bottom: 6px;
            }
        }
    }
    
</style>


