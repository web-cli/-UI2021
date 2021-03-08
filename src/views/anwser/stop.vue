<template>
    <div class="main">
        <img class="logo" src="./image/logo.png" alt=""/>
        <div class="mt0">
            <div class="mt0_title">成功者可获得</div>
            <div class="mt0_money">¥{{data.money}}</div>
        </div>
        <div class="mt1">
            <div class="mt1_child">
                <div class="mt1_child_title">总参与人数</div>
                <div class="mt1_child_people">{{data.anw_user_sum}}</div>
            </div>
            <div class="mt1_child">
                <div class="mt1_child_title">成功人数</div>
                <div class="mt1_child_people">{{data.anw_ok_user_sum}}</div>
            </div>
        </div>
        <div class="mt2">
            <div class="mt2_title">我的答题数据</div>
            <div class="mt2_answer_box">
                <div class="mt2_answer mt2_answer_left">正确数<span>{{data.ok_sum}}</span></div>
                <div class="mt2_answer mt2_answer_right">错误数<span>{{data.err_sum}}</span></div>
            </div>
            <div class="mt2_time">耗时<span>{{data.date}}</span></div>
        </div>
        <div class="mt3">本次答题活动剩余时间:<span><van-count-down class="mi" :time="data.time * 1000" /></span></div>
        <div class="mt4">
            参与国投华安答题英雄会瓜分百万答题奖金<br>
            下一个英雄就是你！！！
        </div>
        <div class="mt4">
            <router-link to="/" class="btn">返回首页</router-link>
            <a @click="relocal" class="btn">刷新</a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Fetch from '../../utils/fetch'
    import {CountDown} from 'vant';

    Vue.use(CountDown);

    export default {
        name: "index",
        data() {
            return {
                data: {
                    values: [],
                }
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/user/anwser/stop').then(res => {
                    this.data = res.data;
                });
            },
            relocal(){
                this.$router.go(0);
            },
        }
    };
</script>

<style lang="less" scoped>
    .main {
        min-height: 100%;
        background-image: url(./image/bg.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        background-color: #0b0d2d;
        padding-bottom: 40px;
    }

    .main .logo {
        display: block;
        width: 77.08%;
        margin: 0 auto 14px auto;
    }

    .main .btn {
        margin-right: 10px;
        line-height: 28px;
        height: 30px;
        color: #fff;
        font-size: 16px;
        background-color: #644581;
        padding: 0 12px;
        border-radius: 30px;
        border: 1px solid #01d8f4;
        font-weight: bold;
    }

    .main .mt0 {
        width: 79.03%;
        margin: 0 auto 18px auto;
        border-radius: 12px;
        background-color: #fff;
        padding: 8px 0 24px 0;
    }

    .main .mt0 .mt0_title {
        text-align: center;
        font-size: 18px;
        color: #464545;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .main .mt0 .mt0_money {
        text-align: center;
        font-size: 30px;
        color: #84007d;
        font-weight: bold;
    }

    .main .mt1 {
        width: 88.89%;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .main .mt1 {
        width: 88.89%;
        margin: 18px auto 20px auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .main .mt1 .mt1_child {
        width: 46.88%;
        border-radius: 12px;
        background-color: #fff;
        padding: 10px 0 6px 0;
    }

    .main .mt1 .mt1_child .mt1_child_title {
        text-align: center;
        font-size: 17px;
        color: #464545;
        font-weight: 700;
    }

    .main .mt1 .mt1_child .mt1_child_people {
        text-align: center;
        font-size: 30px;
        color: #84007d;
        font-weight: bold;
    }

    .main .mt2 {
        width: 79.03%;
        margin: 0 auto 32px auto;
        border-radius: 12px;
        background-color: #fff;
        padding: 8px 0 4px 0;
    }

    .main .mt2 .mt2_title {
        text-align: center;
        font-size: 18px;
        color: #464545;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .main .mt2 .mt2_answer_box {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 0 auto;
    }

    .main .mt2 .mt2_answer {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 17px;
        color: #464545;
        font-weight: 700;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 4px auto;
    }

    .main .mt2 .mt2_answer.mt2_answer_left {
        padding-left: 10%;
    }

    .main .mt2 .mt2_answer.mt2_answer_right {
        padding-left: 6px;
    }

    .main .mt2 .mt2_answer > span {
        font-size: 30px;
        color: #84007d;
        font-weight: bold;
        margin-left: 8px;
    }

    .main .mt2 .mt2_time {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 17px;
        color: #464545;
        font-weight: 700;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        text-align: center;
    }

    .main .mt2 .mt2_time > span {
        font-size: 30px;
        color: #84007d;
        font-weight: bold;
        margin-left: 8px;
    }

    .main .mt3 {
        width: 100%;
        background: #ff0000;
        text-indent: 2em;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        height: 40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
    }

    .main .mt3 .mi {
        color: #ffffff;
        font-size: 26px;
        font-weight: bold;
        text-indent: 4px;
    }

    .main .mt4 {
        text-align: center;
        font-size: 17px;
        color: #FEFF83;
        line-height: 1.7;
        margin: 24px auto 0 auto;
    }

    @media (max-width: 360px) {
        .main .mt1 .mt1_child .mt1_child_people {
            font-size: 26px;
        }

        .main .mt4 {
            font-size: 15px;
        }
    }
</style>


