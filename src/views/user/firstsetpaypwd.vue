<template>
    <div>
        <router-link to="/account" class="back">&lt;</router-link>
        <div class="top">
        </div>
        <form class="form" @submit.prevent="handleSubmit">
            <div class="title">设置支付密码</div>
            <div class="content">
                <div class="triangle"></div>
                <div class="item_box">
                    <div class="item_title">支付密码</div>
                    <div class="item">
                        <input type="password" class="inp newpwd" v-model.trim="pwd" placeholder="请输入新登录密码">
                        <span class="right"></span>
                    </div>
                </div>
                <div class="item_box">
                    <div class="item_title">确 认 密 码</div>
                    <div class="item">
                        <input type="password" class="inp confirm_newpwd" v-model.trim="npwd" placeholder="请输入确认密码">
                        <span class="right"></span>
                    </div>
                </div>
            </div>
            <button type="submit" class="sbtn">完成</button>
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
                pwd: '',
                npwd: '',
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

                if (!this.pwd) {
                    this.$notify("请输入支付密码");
                    return;
                }

                if (!this.npwd) {
                    this.$notify("请输入确认密码");
                    return;
                }

                if (this.pwd !== this.npwd) {
                    this.$notify("新密码和确认密码不一致");
                    return;
                }

                Fetch("/user/info/repaypasswd", {
                    npasswd: this.pwd
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '修改成功'
                    });
                    this.$router.back();
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    html,
    body {
        background: #ffffff;
    }

    ::-moz-placeholder {
        color: #999999;
    }

    ::-webkit-input-placeholder {
        color: #999999;
    }

    :-ms-input-placeholder {
        color: #999999;
    }

    input,
    select,
    button {
        border: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .back {
        position: absolute;
        z-index: 10;
        color: #fff;
        text-indent: 8px;
        width: 36px;
        height: 24px;
        line-height: 20px;
        font-size: 18px;
        background: #e8c27d;
        border-radius: 0 20px 20px 0;
        top: 10px;

    }

    .top {
        height: 278px;
        background: #544b5e;
    }

    .form {
        width: 89.6%;
        margin: -150px auto 0 auto;
        box-sizing: content-box;
        position: relative;
    }

    .form .title {
        text-align: right;
        color: #fefefe;
        font-size: 21px;
        margin-bottom: 6px;
    }

    .form .content {
        padding: 35px 7% 90px 7%;
        background-color: #fff;
        border-radius: 16px;
        position: relative;
        border: 1px solid #f2f2f2;
        box-shadow: 1px 1px 4px 0px #f2f2f2;
        background-image: url(images/editpwd_bottom.png);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 100% auto;

    }

    .form .content .triangle {
        width: 0;
        height: 0;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid #fff;
        position: absolute;
        top: -15px;
        left: 46px;
    }

    .form .item_box {
        margin-bottom: 16px;
    }

    .form .item_box .item_title {
        width: 75px;
        height: 18px;
        line-height: 18px;
        text-align: left;
        border-radius: 18px;
        text-indent: 8px;
        color: #fff;
        font-size: 12px;
        background: #544b5e;
    }

    .form .item_box .item {
        display: flex;
        align-items: center;
        padding-bottom: 7px;
        border-bottom: 1px solid #edebeb;
        margin-top: 10px;
        justify-content: space-between;

    }

    .form .item_box .item .inp {
        flex: 1;
        font-size: 14px;
        color: #544b5e;
        padding: 0 4px;
    }

    .form .item_box .item .right {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(images/editpwd_pwd.png) no-repeat center;
        background-size: contain;
    }

    .form .sbtn {
        display: block;
        height: 38px;
        line-height: 38px;
        width: 41.8%;
        border-radius: 38px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        margin: 44px auto 20px auto;
        background: -webkit-linear-gradient(left, #fdb204, #f4d080);
        background: -o-linear-gradient(right, #fdb204, #f4d080);
        background: -moz-linear-gradient(right, #fdb204, #f4d080);
        background: linear-gradient(to right, #fdb204, #f4d080);
        box-shadow: 0 0 6px 1px #e0e0e0;
    }
</style>