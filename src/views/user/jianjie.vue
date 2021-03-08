<template>
    <div class="about">
        <router-link to="/about" class="back">&lt;</router-link>
        <div class="top">
            <div class="title">
                公司简介
            </div>
        </div>
        <div class="main">
            <router-link to="/art/45c48c" class="item clearfix">
                <span class="icon icon ico_notice"></span>
                <span class="info">转账充值教程</span>
                <span class="right"></span>
            </router-link>
            <router-link to="/art/d3d944" class="item clearfix">
                <span class="icon icon ico_notice"></span>
                <span class="info">公司简介</span>
                <span class="right"></span>
            </router-link>
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
                data: {
                    money: 1000
                },
                money_info: '',
                money: '',
            };
        },
        created() {
            this.$parent.footer(true);
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/api/api/webconfig', {type: 'pay'}).then(res => {
                    this.data = res.data;
                })

                Fetch('/user/info/money').then(res => {
                    this.money_info = res.data.money;
                })
            },
            getClass(channel) {
                return 'recharge_online_' + channel;
            },
            handleSubmit() {

                if (!this.data.username) {
                    this.$notify("请输入您的手机号");
                    return;
                }

                if (!this.data.password) {
                    this.$notify("请输入登录密码");
                    return;
                }

                Fetch("/api/api/login", {
                    username: this.data.username,
                    password: this.data.password
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '登录成功'
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
    .about {
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
            top: 20px;

        }

        .top {
            padding: 22px;
            background: #554b5f;

        }

        .top .title {
            width: 55.4%;
            margin: 0 auto;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #333333;
            font-size: 18px;
            background: #e8c27d;
            border-radius: 35px;
        }

        .main {
            width: 86.8%;
            margin: 30px auto 60px auto;
            padding: 0 3.8% 3.8% 14px;
            background: #fff;
            border-radius: 26px;
            -webkit-box-shadow: 0 0 8px 5px #ededed;
            box-shadow: 0 0 8px 5px #ededed;
        }

        .main .item {
            display: block;
            padding: 15px 0;
            border-bottom: 1px solid #dcdcdc;
            color: #333333;
            font-size: 13px;
        }

        .main .item_last {
            border: none;
        }

        .main .item .icon {
            float: left;
            width: 18px;
            height: 18px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            margin-right: 5px;

        }

        .main .item .ico_notice {
            background-image: url(images/more_icon_notice.png);

        }

        .main .item .ico_company {
            background-image: url(images/more_icon_company.png);

        }


        .main .item .info {
            float: left;

        }

        .main .item .right {
            float: right;
            width: 6px;
            height: 18px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url(images/more_right.png);
            margin-right: 5px;

        }
    }
</style>