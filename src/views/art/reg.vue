<template>
    <div class="main">
        <img class="bg" :src="data.reg_bg" alt="">
        <form class="form" @submit.prevent="handleSubmit">
            <div class="item">
                <input type="text" class="inp inp_mobile" v-model.trim="data.mobile" placeholder="请输入手机号码">
            </div>
            <div class="item">
                <input type="password" class="inp inp_pwd" v-model.trim="data.password" placeholder="请设置登陆密码">
            </div>
            <div class="item">
                <input type="text" class="inp_captcha" v-model.trim="data.code" placeholder="请输入短信验证码">
                <van-count-down :time="time" class="get_captcha" @finish="timeCall">
                    <template v-slot="timeData">
                        <span @click="sendcode">{{timeData.seconds > 0 ? timeData.seconds : '获取验证码'}}</span>
                    </template>
                </van-count-down>
            </div>
            <button type="submit" class="btn sbtn">立即注册</button>
            <button type="button" class="btn vip_btn">会员登录</button>
            <button type="button" @click="kefu" class="btn service_btn">在线客服</button>
        </form>
    </div>
</template>

<script>

    import Vue from 'vue';
    import {CountDown} from 'vant';
    import Fetch from '../../utils/fetch'

    Vue.use(CountDown);

    export default {
        name: "index",
        data() {
            return {
                time: 0,
                bg: '',
                data: {

                },
                is_send: false
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {

            this.start();
        },
        methods: {
            kefu(){
                this.$router.push('/kefu').catch (err => {});;
            },
            start() {
                Fetch('/api/api/webconfig', {type: 'tg'}).then(res => {
                    this.data = res.data;
                });
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

                Fetch("/api/api/code", {
                    type: 'register',
                    stype:'app',
                    mobile: this.data.mobile
                }).then(() => {
                    this.time = 60 * 1000;
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

                if (!this.data.password) {
                    this.$notify("请输入登录密码");
                    return;
                }

                if (!this.data.code) {
                    this.$notify("请输入验证码");
                    return;
                }

                Fetch("/api/api/register", {
                    ...this.data
                }).then((res) => {
                    this.$notify({
                        background: '#07c160',
                        message: '注册成功'
                    });

                    if (res.data.app_link) {
                        location.href = res.data.app_link;
                    } else {
                        this.$router.replace('/user');
                    }
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .main {

        min-height: 100%;
        position: relative;

        .clearfix:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            clear: both;
            height: 0;
        }

        .clearfix {
            zoom: 1;
        }

        a {
            text-decoration: none;
        }

        a:hover {
            text-decoration: none;
        }

        html {
            -webkit-tap-highlight-color: transparent;
        }

        body {
            width: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            -webkit-text-size-adjust: none;
        }


        #hint {
            position: fixed;
            left: 20px;
            right: 20px;
            pointer-events: none;
            text-align: center;
            opacity: 0;
            bottom: 20%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            font-size: 14px;
            -webkit-transition: opacity 400ms ease-in-out;
            -o-transition: opacity 400ms ease-in-out;
            transition: opacity 400ms ease-in-out;
            z-index: 1000;
        }

        #hint>.text {
            display: inline-block;
            color: #eaeaea;
            line-height: 20px;
            padding: 5px 12px;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            line-height: 20px;
            padding: 5px 12px;
            -webkit-box-shadow: 0 0 3px silver;
            box-shadow: 0 0 3px silver;
            margin: 3px;
            white-space: pre-wrap;
            vertical-align: top;
        }

        .bg {
            display: block;
            max-width: 100%;
            background-size: 100% 100%;
        }

        .form {
            width: 75%;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            position: fixed;
            top: 20%;
        }

        .form .item {
            width: 100%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            font-size: 13px;
            margin-bottom: 14px;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        .form .item .get_captcha {
            height: 40px;
            line-height: 40px;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 100px;
            flex: 0 0 100px;
            color: #fff;
            background-color: red;
            border-radius: 40px;
            text-align: center;
        ;
        }

        .form .item .get_captcha.disable {
            background: #E8E8E8;
        }


        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #666;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #666;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #666;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #666;
        }

        .form .item .inp {
            height: 40px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            line-height: 16px;
            border-radius: 40px;
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 12px 18px;
            color: #333;
            background: #fff;
        }

        .form .item .inp_captcha {
            height: 40px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            line-height: 16px;
            border-radius: 40px;
            width: 60%;
            padding: 12px 18px;
            color: #333;
            background: #fff;
        }
        @media (max-width: 359px) {
            .form .item .inp_captcha {
                width: 50%;
            }
        }

        .form .btn {
            display: block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-radius: 40px;
            font-size: 18px;
            text-align: center;
            color: #fff;
            background: #F70502;
            -webkit-box-shadow: 1px 2px 0 0 #A00903;
            box-shadow: 1px 2px 0 0 #A00903;
            margin-bottom: 14px;
        }

    }
</style>


