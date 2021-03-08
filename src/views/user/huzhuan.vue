<template>
    <div style="background: #ededed">
        <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
            </div>
        </div>
        <div class="top">
            <img class="banner" src="./images/viptarns_banner.png">
        </div>
        <form method="post" class="form" @submit.prevent="handleSubmit">
            <div class="top">
                <div class="left">对方手机号</div>
                <input type="number" class="mobile" name="phone" v-model.trim="mobile" placeholder="请输入对方手机号">
            </div>
            <div class="box">
                <div class="title1">转账金额</div>
                <div class="amount_box">
                    <span>¥</span>
                    <input type="number" v-model.trim="money" placeholder="请输入金额">
                </div>
                <div class="remian_money">可转账金额：<span>¥{{data.money}}</span></div>
            </div>

            <div class="box3">
                <div class="item clearfix">
                    <span class="icon"></span>
                    <input type="password" class="pwd" name="pwd" v-model.trim="passwd" placeholder="请输入交易密码">
                    <span class="right"></span>
                </div>
                <div class="forgetpay">
                    <div class="lbtn" @click="$router.push('/resetpaypwd')">忘记密码?</div>
                </div>
            </div>
            <button type="submit" class="btn">确认转账</button>
        </form>
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
                money: '',
                mobile: '',
                passwd: '',
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
                Fetch('/user/huzhuan/index');
            },
            getClass(channel) {
                return 'recharge_online_' + channel;
            },
            handleSubmit() {

                if (!this.mobile) {
                    this.$notify("请输入对方手机号");
                    return;
                }

                if (!this.money) {
                    this.$notify("请输入转账金额");
                    return;
                }

                if (!this.passwd) {
                    this.$notify("请输入交易密码");
                    return;
                }

                Fetch("/user/huzhuan/apply", {
                    passwd: this.passwd,
                    money: this.money,
                    mobile: this.mobile
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '互转成功'
                    });
                    this.$router.push('/zhuanzhang').catch (err => {});;
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    html,
    body {
        background: #f3f4f4;
    }

    ::-moz-placeholder {
        color: #9e9ea0;
    }

    ::-webkit-input-placeholder {
        color: #9e9ea0;
    }

    :-ms-input-placeholder {
        color: #9e9ea0;
    }

    .forgetpay {
        padding: 30px 0;
        height: 30px;

        .lbtn {
            float: right;
            font-size: 14px;
            color: #00A0E9;
        }
    }

    .top {
        padding: 10px 0 92px 0;
        background: #544b5e;

    }

    .top .banner {
        display: block;
        width: 55%;
        margin: 0 auto;
    }

    .form {
        padding: 1px 0;
        width: 92.4%;
        margin: -54px auto 0 auto;
        border-radius: 12px;
        position: relative;
        -webkit-box-shadow: 0 3px 4px 1px #e7e8e8;
        box-shadow: 0 3px 4px 1px #e7e8e8;
    }

    .form .top {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        background: #fff;
        padding: 22px 4.8% 25px 4.8%;
        border-radius: 12px 12px 0 0;
        border-bottom: 1px solid #dcdcdc;
    }

    .form .top .mobile {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: #f5f5f5;
        color: #5d5e60;
        padding: 13px 8px;
        border-radius: 0 44px 44px 0;
        -webkit-box-shadow: 0 0 4px 1px #e7e8e8;
        box-shadow: 0 0 4px 1px #e7e8e8;
        font-size: 15px;
    }

    .form .top .left {
        display: inline-block;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 120px;
        flex: 0 0 120px;
        height: 44px;
        line-height: 44px;
        background-color: #f5f5f5;
        color: #5d5e60;
        background-image: url(images/viptrans_mobile.png);
        background-repeat: no-repeat;
        background-position: 14px center;
        background-size: 18px 27px;
        padding-left: 37px;
        padding-right: 6px;
        border-radius: 44px 0 0 44px;
        -webkit-box-shadow: 0 0 4px 1px #e7e8e8;
        box-shadow: 0 0 4px 1px #e7e8e8;
        font-size: 15px;
        margin-right: 6px;
    }

    .form .box {
        background: #fff;
        padding: 24px 0 10px 0;
    }

    .form .box .title1 {
        color: #333333;
        font-size: 18px;
        padding: 0 4.8%;
    }

    .form .box .amount_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 4.8%;
        margin: 15px auto 15px auto;

    }

    .form .box .amount_box > span {
        color: #333333;
        font-size: 32px;
        margin-right: 4px;

    }

    .form .box .amount_box > input {
        color: #544b5e;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 40px;
        overflow: hidden;
    }

    .form .box .remian_money {
        padding: 10px 4.8%;
        background: #f5f5f5;
        margin-bottom: 10px;
        font-size: 12px;
        color: #544b5e;
        border-top: 1px solid #d5d5d5;
        border-bottom: 1px solid #d5d5d5;
    }


    .form .box .remian_money > span {
        font-size: 14px;
    }

    .form .box3 {
        padding: 12px 4.8% 50px 4.8%;
        background: #fff;
        border-radius: 0 0 12px 12px;
    }

    .form .box3 .item .icon {
        float: left;
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-image: url(images/withdraw_pwd.png);
        margin-right: 10px;
    }

    .form .box3 .item .pwd {
        float: left;
        width: 50%;
        font-size: 15px;
        color: #544b5e;
        height: 18px;
        line-height: 18px;

    }

    .form .box3 .item .right {
        float: right;
        width: 16px;
        height: 18px;
        background: url(images/withdraw_hide.png) no-repeat center;
        background-size: contain;
    }

    .form .box3 .item .show {
        background: url(images/withdraw_show.png) no-repeat center;
        background-size: contain;
    }


    .form .btn {
        display: block;
        width: 60%;
        height: 36px;
        line-height: 36px;
        color: #333333;
        text-align: center;
        border-radius: 36px;
        background: #e8c27d;
        font-size: 18px;
        position: absolute;
        bottom: -18px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        z-index: 1;
    }
</style>


