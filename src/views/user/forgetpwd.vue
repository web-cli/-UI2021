<template>
    <div class="main">
		<div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        修改密码
		    </div>
		</div>
        <div class="bg" v-bind:style="{'background-image':bg}"></div>
        <router-link to="/login" class="back"></router-link>
        <div class="title"></div>

        <form class="form" @submit.prevent="handleSubmit">
            <div class="content clearfix">
                <span class="left_icon phone_icon"></span>
                <input class="inp" v-model.trim="data.mobile" type="text" placeholder="请输入手机号码">
                <!-- <span class="right right_icon clear_icon"></span> -->
            </div>
            <!-- <div class="content clearfix">
                <span class="left_icon captcha_icon"></span>
                <input class="inp inp1" type="text" v-model.trim="data.image_code" placeholder="请输入验证码">
                <img class="right click_code image_code" :src="base64Image" @click="getCode"/>
            </div> -->
            <div class="content clearfix">
                <span class="left_icon sms_icon"></span>
                <input class="inp inp1" v-model.trim="data.code" type="text" placeholder="输入短信验证码">
                <span class="right getsms" @click="sendcode">
                    <van-count-down :time="time" @finish="timeCall">
                        <template v-slot="timeData" class="sendCode">{{time > 0 ? timeData.seconds : '获取验证码'}}</template>
                    </van-count-down>
                </span>
            </div>
            <div class="content clearfix">
                <span class="left_icon pwd_icon"></span>
                <input class="inp" v-model.trim="data.passwd" type="password" placeholder="新密码">
                <span class="right right_icon show_icon" id="pwd_show"></span>
            </div>
            <div class="content clearfix">
                <span class="left_icon pwd_icon"></span>
                <input class="inp" v-model.trim="data.npasswd" type="password" placeholder="确认新密码">
                <span class="right right_icon show_icon" id="pwd2_show"></span>
            </div>
            <div class="content btn_content clearfix">
                <button type="submit" class="btn" id="btn">确认修改</button>
            </div>
 <!--           <div class="content btn_content clearfix">
                <router-link to="/resetpaypwd"><button  class="btn" id="btn">去修改支付密码</button> </router-link> 
            </div> -->
        </form>

    </div>
</template>

<script>

    import Vue from 'vue'
    import Fetch from '../../utils/fetch'
    import {CountDown} from 'vant';

    Vue.use(CountDown);

    export default {
        name: "index",
        data() {
            return {
                bg: '',
                data: {},
                base64Image: '',
                time: 0,
                is_send: false
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
                Fetch('/index/webconfig', {type: 'bg'}).then(res => {
                    this.bg = 'url("' + res.data.forget + '")';
                })
            },
            timeCall() {
                this.is_send = false;
                this.time = 0;
            },
            sendcode() {

                if (this.is_send) {
                    return;
                }

                if (!this.data.mobile) {
                    this.$notify("请输入手机号");
                    return;
                }

                this.is_send = true;
                Fetch("/index/code", {
                    type: 'forgetpwd',
                    mobile: this.data.mobile
                }).then(() => {
                    this.time += 60 * 1000;
                    this.$notify({
                        background: '#07c160',
                        message: '发送成功'
                    });
                }).catch(() => {
                    this.is_send = false;
                });
            },
            handleSubmit() {

                if (!this.data.mobile) {
                    this.$notify("请输入您的手机号");
                    return;
                }

                if (!this.data.passwd) {
                    this.$notify("请输入新密码");
                    return;
                }

                if (this.data.passwd !== this.data.npasswd) {
                    this.$notify("两次密码不一致");
                    return;
                }

                Fetch("/index/forgetpwd", {
                    type: 'forgetpwd',
                    phone: this.data.mobile,
                    password: this.data.passwd,
                    code: this.data.code
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '修改成功'
                    });
                }).then(() => {
                    this.$router.replace({
                        path: this.$router.history.current.query.redirect || "/"
                    });
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .main {
        position: relative;
        padding-top: 1px;
        padding-bottom: 20px;

        .image_code {
            font-size: .4rem;
            cursor: pointer;
            border-radius: 10px;
        }

        .bg {
            position: fixed;
            z-index: 1;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: no-repeat center;
            background-size: cover;
        }

        .back {
            display: inline-block;
            width: 28px;
            height: 28px;
            background: url(images/back.png) no-repeat center;
            background-size: contain;
            position: absolute;
            top: 24px;
            left: 20px;
            z-index: 2;
        }

        .title {
            width: 60%;
            height: 62px;
            color: #000000;
            font-size: 26px;
            line-height: 62px;
            border-radius: 0 0 26px 26px;
            position: relative;
            z-index: 2;
            margin: 0 auto;
            background: #fff;
            opacity: 0.5;
            text-align: center;
            margin-top: -1px;
        }

        .form {
            width: 67%;
            position: relative;
            margin: 20% auto;
            z-index: 2;
        }

        .form .content {
            width: 100%;
            border-bottom: 1px solid #b5b4b4;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 6px 10px 38px 0px;
            position: relative;
            z-index: 4;
            margin-bottom: 20px;
        }

        .form .content .left_icon {
            float: left;
            width: 18px;
            height: 18px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        .form .content .phone_icon {
            background-image: url(images/mobile.png);
        }

        .form .content .pwd_icon {
            background-image: url(images/pwd.png);
        }

        .form .content .captcha_icon {
            background-image: url(images/captcha.png);
        }

        .form .content .sms_icon {
            background-image: url(images/sms.png);
        }

        .form .content .right {
            float: right;
        }

        .form .content .right_icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        .form .content .clear_icon {
            background-image: url(images/clear.png);
        }

        .form .content .show_icon {
            background-image: url(images/hidepwd.png);
        }

        .form .content .invite_icon {
            background-image: url(images/invite.png);
        }

        .form .content .getsms {
            display: inline-block;
            width: 88px;
            height: 28px;
            line-height: 28px;
            border-radius: 28px;
            text-align: center;
            background: #c0bfc8;
            color: #464765;
            font-size: 12px;

            /deep/ .van-count-down{
                line-height: 28px;
            }
        }

        .form .content .captcha_img {
            background-image: url(images/captcha_img.png);
            display: inline-block;
            width: 88px;
            height: 28px;
        }

        .form .content .inp {
            float: left;
            padding: 0 8px;
            font-size: 14px;
            background: transparent;
            color: #fff;
        }

        .form .content .inp1 {
            width: 50%;
        }

        .form .content .inp2 {
            width: 80%;
        }

        .form .btn_content {
            border: none;

            padding: 0;
        }

        .form .btn {
            display: block;
            width: 59%;
            height: 50px;
            line-height: 50px;
            border-radius: 50px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            background: #fff;
            margin: 0 auto;
			background-color: #333333;
        }

        @media (max-width: 360px) {
            .form .content .getsms {
                width: 74px;
            }

            .form .content .captcha_img {
                width: 74px;
            }
        }
    }
</style>


