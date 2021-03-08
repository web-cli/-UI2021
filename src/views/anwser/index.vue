<template>
    <div class="main">
        <img class="logo" src="./image/logo.png" alt="">
        <div class="rule_box">
            <div class="rule_title">详情说明</div>
            <div class="rule_info_box">{{content}}</div>
        </div>
        <div class="btn_box">
            <router-link to="/" class="btn">拒绝，回到首页</router-link>
            <a @click="toAnw" class="btn">同意，立即参与</a>
        </div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch';

    export default {
        name: "index",
        data() {
            return {
                content: '',
                msg:'',
                status:'N',
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
                Fetch('/user/anwser/index').then(res => {
                    this.content = res.data.remark;
                    this.msg = res.data.msg;
                    this.status = res.data.status;
                    if(res.data.status === 'S'){
                        this.$router.replace('/anwser/stop');
                    }
                });
            },
            toAnw() {
                if (this.status === 'N') {
                    this.$notify(this.msg);
                } else {
                    this.$router.push('/anwser/start');
                }
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

    .main .rule_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        width: 92.78%;
        margin: 0 auto;
        border-radius: 12px;
        background-color: #fff;
        height: 420px;
        padding: 14px;
    }

    .main .rule_box .rule_title {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 32px;
        flex: 0 0 32px;
        text-align: center;
        font-size: 20px;
        color: #464545;
        font-weight: 700;
        letter-spacing: 0.1em;
    }

    .main .rule_box .rule_info_box {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        text-align: left;
        font-size: 14px;
        color: #464545;
        overflow-y: auto;
        line-height: 1.7;;
    }

    .main .btn_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 92.78%;
        margin: 24px auto 0 auto;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
    }

    .main .btn_box .btn {
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

    @media (max-width: 960px) {
    }
</style>


