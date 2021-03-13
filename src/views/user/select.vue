<template>
    <van-list :finished="true">
        <div class="bank_box" v-for="(v,k) in list" :key="k" @click="onChange(v)">
            <div class="left">
                <div class="left_bank_name">{{v.bank}}</div>
                <div class="left_bank_number">{{v.account}}</div>
            </div>
            <div class="right">
                <span class="right_bank_name">{{v.bank}}</span>
                <span class="right_arrow"></span>
            </div>
        </div>
        <router-link class="btn" to="/bank">添加银行卡</router-link>
    </van-list>
</template>
<script>

    import Vue from 'vue';
    import {List} from 'vant';
    import Fetch from '../../utils/fetch'

    Vue.use(List);
    export default {
        props: {
            onChange: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                list: [],
            }
        },
        mounted() {

            Fetch('/user/my_bank').then(r => {
                this.list = r.data.list;
            });
        }
    }
</script>
<style lang="less" scoped>

    .btn {
        display: block;
        width: 400px;
        margin: 40px auto;
        font-size: 32px;
        color: #fff;
        background: #fe7b17;
        height: 30*2px;
        line-height: 30*2px;
        border-radius: 5*2px;
        outline: none;
        border: none;
        height: 80px;
        line-height: 80px;
        text-align: center;
        span{
            display: inline-block;
            font-size: 48px;
        }
        border-radius: 40px;
    }
    .bank_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 86%;
        height: 80*2px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 12*2px 0 24*2px;
        background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
        background-image: -o-linear-gradient(left, #666666, #262627);
        background-image: linear-gradient(to right, #666666, #262627);
        margin: 22*2px auto 22*2px auto;
        -webkit-box-shadow: 0 1px 12px 0 #7d7c7c;
        box-shadow: 0 1px 12px 0 #7d7c7c;
    }

    .bank_box .left .left_bank_name {
        color: #efeff4;
        font-size: 32px;
        margin-bottom: 16px;
    }

    .bank_box .left .left_bank_number {
        color: #efeff4;
        font-size: 28px;
    }

    .bank_box .right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .bank_box .right .right_bank_name {
        font-size: 30px;
        color: #f3b467;
        margin-right: 18px;
    }

    .bank_box .right .right_arrow {
        display: inline-block;
        width: 16px;
        height: 32px;
        background-image: url(./images/right_arrow.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
</style>
