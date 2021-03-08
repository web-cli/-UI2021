<template>
    <div>
        <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                信息管理
            </div>
        </div>
        <div class="security_wrap">
            <div class="safe_box">
                <img class="safe_icon" src="./images/safe.svg">
            </div>
            <div class="mt0">
                <div class="mt0_title">安全中心</div>
                <a href="javascript:;" class="mt0_item">
                    <div class="left">
                        <div class="icon_box">
                            <img class="icon" src="./images/phone.svg">
                        </div>
                        <div class="info">手机号</div>
                    </div>
                    <div class="right"><p class="right_info">{{data.mobile}}</p></div>
                </a>
<!--                <router-link to="/auth" class="mt0_item">
                    <div class="left">
                        <div class="icon_box">
                            <img class="icon" src="./images/id.svg" alt="">
                        </div>
                        <div class="info">实名认证</div>
                    </div>
                    <div class="right">
                        <span class="right_icon right_icon_id"></span>
                        <p class="right_info">{{data.is_auth === 'Y' ? '已认证' : '未认证'}}</p>
                    </div>
                </router-link> -->

<!--                <router-link to="/bank" class="mt0_item">
                    <div class="left">
                        <div class="icon_box">
                            <img class="icon" src="./images/bank.svg" alt="">
                        </div>
                        <div class="info">银行卡管理</div>
                    </div>
                    <div class="right">
                        <span class="right_icon"></span>
                    </div>
                </router-link>

				<router-link to="/alipay" class="mt0_item">
				    <div class="left">
				        <div class="icon_box">
				            <img class="icon" src="./images/alipay.svg" alt="">
				        </div>
				        <div class="info">支付宝设置</div>
				    </div>
				    <div class="right">
				        <span class="right_icon"></span>
				    </div>
				</router-link> -->

                <router-link to="/setpwd" class="mt0_item">
                    <div class="left">
                        <div class="icon_box">
                            <img class="icon" src="./images/password.svg" alt="">
                        </div>
                        <div class="info">修改登录密码</div>
                    </div>
                    <div class="right">
                        <span class="right_icon"></span>
                    </div>
                </router-link>

<!--                <router-link to="/setpaypwd" class="mt0_item">
                    <div class="left">
                        <div class="icon_box">
                            <img class="icon" src="./images/pay_password.svg" alt="">
                        </div>
                        <div class="info">修改支付密码</div>
                    </div>
                    <div class="right">
                        <span class="right_icon"></span>
                    </div>
                </router-link> -->
            </div>
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
                Fetch('/user/check_auth').then(res => {
                    this.data = res.data;
                })
            },
        }
    };
</script>

<style lang="less" scoped>

    .security_wrap .safe_box {
        background: #544B5E;
        margin-top: -12px;
        position: relative;
        z-index: 15;
        padding-bottom: 62px;
    }

    .security_wrap .safe_box .safe_icon {
        display: block;
        width: 21.6%;
        margin: 0 auto;
    }

    .security_wrap .mt0 {
        width: 90.8%;
        margin: -31px auto 0 auto;
        position: relative;
        z-index: 16;
    }

    .security_wrap .mt0 .mt0_title {
        width: 97.06%;
        margin: 0 auto 16px auto;
        height: 62px;
        line-height: 62px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        background: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0 10px 8px -4px #F7FCFF;
        box-shadow: 0 10px 8px -4px #F7FCFF;
    }

    .security_wrap .mt0 .mt0_item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: 42px;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: 1px solid #E7E7E7;
        padding-left: 5px;
    }

    .security_wrap .mt0 .mt0_item .left {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .security_wrap .mt0 .mt0_item .left .icon_box {
        width: 23px;
        height: 23px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-right: 12px;
    }

    .security_wrap .mt0 .mt0_item .left .icon_box .icon {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
    }

    .security_wrap .mt0 .mt0_item .left .info {
        font-size: 16px;
        color: #191818;
    }

    .security_wrap .mt0 .mt0_item .right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .security_wrap .mt0 .mt0_item .right .right_icon {
        display: inline-block;
        width: 8px;
        height: 14px;
        background-image: url(images/right_arrow.svg);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 3px;
    }

    .security_wrap .mt0 .mt0_item .right .right_icon.right_icon_id {
        display: none;
    }

    .security_wrap .mt0 .mt0_item .right .right_info {
        font-size: 14px;
        color: #e9c37d;
    }
</style>