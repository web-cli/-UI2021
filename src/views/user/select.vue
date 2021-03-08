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
        <router-link class="btn" to="/bank">去添加</router-link>
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
        width: 3rem;
        margin: 20px auto;
        font-size: 14px;
        color: #fff;
        background: #7ac72b;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        outline: none;
        border: none;
        text-align: center;
    }
    .bank_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 86%;
        height: 80px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 12px 0 24px;
        background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
        background-image: -o-linear-gradient(left, #666666, #262627);
        background-image: linear-gradient(to right, #666666, #262627);
        margin: 22px auto 22px auto;
        -webkit-box-shadow: 0 1px 6px 0 #7d7c7c;
        box-shadow: 0 1px 6px 0 #7d7c7c;
    }

    .bank_box .left .left_bank_name {
        color: #efeff4;
        font-size: 16px;
        margin-bottom: 8px;
    }

    .bank_box .left .left_bank_number {
        color: #efeff4;
        font-size: 14px;
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
        font-size: 12px;
        color: #f3b467;
        margin-right: 18px;
    }

    .bank_box .right .right_arrow {
        display: inline-block;
        width: 8px;
        height: 16px;
        background-image: url(./images/right_arrow.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
</style>
