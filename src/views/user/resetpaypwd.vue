<template>
    <div>
        <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                找回支付密码
            </div>
        </div>
        <div class="resetpaypwd_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <label class="item">
                    <span class="info">登录密码</span>
                    <input type="password" class="inp oldpwd" v-model.trim="passwd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">新密码</span>
                    <input type="password" class="inp newpwd" v-model.trim="npasswd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">确认新密码</span>
                    <input type="password" class="inp confirm_newpwd" v-model.trim="snpasswd" placeholder="请输入">
                </label>
                <!--                <div class="forget_box">-->
                <!--                    <router-link to="/forgetpwd" class="forget"><span class="icon">&nbsp;?</span><span class="info">忘记密码</span></router-link>-->
                <!--                </div>-->
                <button type="submit" class="sbtn">确定修改</button>
            </form>
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
                passwd: '',
                npasswd: '',
                snpasswd: '',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            // this.start();
        },
        methods: {
            handleSubmit() {

                if (!this.passwd) {
                    this.$notify("请输入登录密码");
                    return;
                }

                if (!this.npasswd) {
                    this.$notify("请输入新支付密码");
                    return;
                }

                if (!this.snpasswd) {
                    this.$notify("请输入确认密码");
                    return;
                }

                if (this.npasswd !== this.snpasswd) {
                    this.$notify("新密码和确认密码不一致");
                    return;
                }

                Fetch("/user/resetpaypwd", {
                    passwd: this.passwd,
                    npasswd: this.npasswd
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '找回成功'
                    });
                    this.$router.back();
                });
            }
        }
    };
</script>

<style lang="less" scoped>

    .resetpaypwd_wrap .form {
        display: block;
        width: 92.8%;
        margin: 0 auto;
        padding-top: 15px;
    }

    .resetpaypwd_wrap .form .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        position: relative;
        height: 48px;
    }

    .resetpaypwd_wrap .form .item .info {
        font-size: 15px;
        color: #303442;
    }

    .resetpaypwd_wrap .form .item .inp {
        font-size: 15px;
        color: #303442;
        text-align: right;
        padding: 0 16px;
        line-height: 17px;
    }

    .resetpaypwd_wrap .form .item:after {
        position: absolute;
        content: "";
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
        left: 0;
        bottom: 0;
    }

    .resetpaypwd_wrap .form .forget_box {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        margin: 16px auto 26px auto;
    }

    .resetpaypwd_wrap .form .forget_box .forget {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .resetpaypwd_wrap .form .forget_box .forget .icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 18px;
        height: 18px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 16px;
        color: #fff;
        background: #e9c37d;
        border-radius: 18px;
        margin-right: 6px;
    }

    .resetpaypwd_wrap .form .forget_box .forget .info {
        font-size: 13px;
        color: #303442;
    }

    .resetpaypwd_wrap .form .sbtn {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        background: #e8c27d;
        border-radius: 2px;
        font-size: 16px;
        color: #fff;
        -webkit-box-shadow: 0 2px 10px 0 #f2dbb2;
        box-shadow: 0 2px 10px 0 #f2dbb2;
    }
</style>