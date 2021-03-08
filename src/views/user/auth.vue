<template>
    <div>
        <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                实名认证
            </div>
        </div>
        <div class="verify_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <div class="item">
                    <span class="info">姓名</span>
                    <input class="inp" type="text" name="name" v-model.trim="data.name" placeholder="请输入姓名"
                           :readonly="data.is_auth === 'Y'">
                </div>
                <div class="item">
                    <span class="info">身份证号码</span>
                    <input class="inp" type="text" name="idcard" v-model.trim="data.idcard" placeholder="请输入身份证号"
                           :readonly="data.is_auth === 'Y'">
                </div>
                <button type="submit" class="btn" v-if="data.is_auth === 'N'">立即认证</button>
                <div class="warming">提醒：请您绑定本人真实姓名与身份证号码，若使用他人姓名绑定导致无法提现等问题，本公司概不负责。</div>
                <div class="success_box">
                    <img class="ok" src="./images/ok.svg" alt="">
                </div>
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
                data: {},
                money_info: '',
                money: '',
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
                Fetch('/user/check_auth').then(res => {
                    this.data = res.data;
                })

            },
            handleSubmit() {

                if (!this.data.name) {
                    this.$notify("请输入姓名");
                    return;
                }

                if (!this.data.idcard) {
                    this.$notify("请输入身份证号");
                    return;
                }

                Fetch("/user/auth", {
                    ...this.data
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '认证成功'
                    });
                    this.$router.replace({
                        path: this.$router.history.current.query.redirect || "/mission"
                    });
                })
            }
        }
    };
</script>

<style lang="less" scoped>

    .verify_wrap .form {
        display: block;
        width: 100%;
        padding-top: 46px;
    }

    .verify_wrap .form .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-bottom: 1px solid #EDEDED;
        font-size: 14px;
        padding: 6px 4.3% 6px 7.4%;
        margin-bottom: 22px;
    }

    .verify_wrap .form .item .inp {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        text-align: right;
    }

    .verify_wrap .form .warming {
        font-size: 12px;
        line-height: 1.7;
        color: #F01516;
        padding: 0 7.4%;
    }

    .verify_wrap .form .btn {
        display: block;
        width: 60%;
        height: 36px;
        line-height: 36px;
        color: #333333;
        text-align: center;
        border-radius: 36px;
        background: #e8c27d;
        font-size: 18px;
        z-index: 1;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .verify_wrap .form .success_box {
        margin: 80px auto 40px auto;
    }

    .verify_wrap .form .success_box .ok {
        display: block;
        width: 68%;
        margin: 0 auto;
    }
</style>