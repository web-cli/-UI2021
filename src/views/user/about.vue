<template>
    <div class="wrap">
        <!-- <div class="header">
            <div class="head">
                关于我们
            </div>
        </div> -->
                 <van-nav-bar
        title="关于我们"
        left-arrow
        fixed
        @click-left="$router.back()"
      />
        <div class="main">
            <router-link :to="'/art/' + target.id" class="cell-item"  v-for="(target, key) in data" :key="key">
                <!-- <span class="icon icon ico_notice"></span>
                <span class="info">{{target.title}}</span>
                <span class="right"></span> -->
                <van-cell :title="target.title" icon="search" is-link size="large" />
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
        // -webkit-box-shadow: 0 0 8px 5px #ededed;
        // box-shadow: 0 0 8px 5px #ededed;
         box-shadow: 0 1vw 1vw 1vw rgba(0, 0, 0, 0.2);
        margin-top: 130px;
    }

    .main .block-item {
        display: block;
        padding: 1.5rem 0;
        border-bottom: 1px solid #dcdcdc;
        color: #333333;
        font-size: 13px;
    }

    .main .block-item_last {
        border: none;
    }

    .main .block-item .icon {
        float: left;
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-right: 5px;

    }

    .main .block-item .ico_notice {
        background-image: url(images/more_icon_notice.png);

    }

    .main .block-item .ico_company {
        background-image: url(images/more_icon_company.png);

    }

    .main .block-item .ico_user {
        background-image: url(images/more_icon_user.png);

    }

    .main .block-item .ico_safe {
        background-image: url(images/more_icon_safe.png);

    }

    .main .block-item .ico_tel {
        background-image: url(images/more_icon_tel.png);

    }

    .main .block-item .ico_photo {
        background-image: url(images/more_icon_photo.png);

    }

    .main .block-item .ico_pay {
        background-image: url(images/more_icon_pay.png);

    }

    .main .block-item .ico_help {
        background-image: url(images/more_icon_help.png);

    }


    .main .block-item .info {
        float: left;

    }

    .main .block-item .right {
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
<style lang="scss" scoped>
.van-cell {
    // height: 110px;
    // line-height: 110px;
    border-bottom: 1px solid #dcdcdc;
}
.van-icon-search {
    color: $primary-color;
}
.cell-item{
    width: 100%;
    height: 110px;
    // line-height: 110px;
}
.wrap{
    height: 91vh;
    background: #ffffff;
}
</style>