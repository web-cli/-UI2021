<template>
    <div>
        <div class="header">
            <div class="head">
                关于我们
            </div>
        </div>
        <div class="main">
            <router-link :to="'/art/' + item.id" class="item clearfix" v-for="(item, key) in data" :key="key">
                <span class="icon icon ico_notice"></span>
                <span class="info">{{item.title}}</span>
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
                data: {},
            };
        },
        created() {
            this.$parent.footer(true, 'tree');
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/index/about').then((res) => {
                    this.data = res.data.list;
					
					if (this.$parent.getFooterType() === "n1") {
						this.data = this.data.slice(7,this.data.length)
					}
					// console.log(this.data.slice(7,this.data.length))
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    html,
    body {
        background: #ededed;
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
        padding: 1.5rem 0;
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

    .main .item .ico_user {
        background-image: url(images/more_icon_user.png);

    }

    .main .item .ico_safe {
        background-image: url(images/more_icon_safe.png);

    }

    .main .item .ico_tel {
        background-image: url(images/more_icon_tel.png);

    }

    .main .item .ico_photo {
        background-image: url(images/more_icon_photo.png);

    }

    .main .item .ico_pay {
        background-image: url(images/more_icon_pay.png);

    }

    .main .item .ico_help {
        background-image: url(images/more_icon_help.png);

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
</style>