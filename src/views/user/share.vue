<template>
    <div class="share-content">
        <!-- <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                邀请好友
            </div>
        </div> -->
            <van-nav-bar
      title="邀请好友"
      left-arrow
      fixed
      @click-left="$router.push({path:'/user'})"
    />
        <div class="top">
            <div class="avator_box">
                <div class="avatar" v-bind:style="{'background-image':'url(' + data.avatar + ')'}"></div>
                <div class="invite_btn" @click="showShare">点击获取邀请二维码</div>
            </div>
        </div>
        <div class="main">
            <span class="my_invite">我推荐的会员</span>
            <div class="content">
                <div class="item clearfix">
                    <div class="left title">推广会员</div>
                    <div class="right title">注册时间</div>
                </div>
                <div class="item clearfix" v-for="(item, key) in data.share_user" :key="key">
                    <div class="left 1">{{item.phone}}</div>
                    <div class="right">{{item.time}}</div>
                </div>
            </div>

        </div>
        <div class="qrcode_box" v-if="is_show_share">
            <div class="qrcode" :style="'background-image: url(' + data.share_image_url + ')'"></div>
            <p class="qrcode_info">好友扫描以上专属二维码可直接注册</p>
            <button type="button" class="qrcode_btn" @click="close">我知道啦</button>
        </div>
        <div class="mask_c" v-if="is_show_share"></div>
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
                is_show_share: false,
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            close(){
                this.is_show_share = false;
            },
            showShare(){
                this.is_show_share = true;
            },
            start() {
                Fetch('/user/share').then(res => {
                    this.data = res.data;
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    html,
    body {
        background: #e5e5e5;
    }

    .top {
        padding: 25px 0 85px 0;
        background: #faab0c;
        margin-top: 100px;
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

    .top .avator_box {
        width: 51.8%;
        margin: 0 auto;
        position: relative;
        // background: #e8c27d;
        border-radius: 15px;
        padding: 1px 0;
    }

    .top .avator_box .avatar {
        background-size: contain;
        //background-image: url(images/code.png);
        width: 96px;
        height: 96px;
        margin: 0 auto;
        border-radius: 50%;
        /*#background: #fff;*/
        background-repeat: no-repeat;
        background-position: center;

    }

    .top .avator_box .invite_btn {
        height: 66px;
        line-height: 66px;
        color: #fefefe;
        font-size: 24px;
        border-radius: 22px;
        width: 280px;
        text-align: center;
        background: #544b5e;
        margin: 14px auto 20px auto;
    }

    .top .avator_box .invite_title {
        height: 30px;
        line-height: 30px;
        color: #fefefe;
        font-size: 18px;
        border-radius: 30px;
        width: 115px;
        text-align: center;
        background: #544b5e;
        margin: -16px auto 10px auto;
        border: 1px solid #e8c27d;
    }

    .main {
        width: 89%;
        padding: 76px 6% 0 6%;
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
        margin: -72px auto 0 auto;
        position: relative;
    }

    .main .my_invite {
        position: absolute;
        z-index: 10;
        color: #fff;
        text-indent: 5px;
        width: 180px;
        height: 56px;
        line-height:56px;
        font-size: 24px;
        background: #e8c27d;
        border-radius: 0 16px 16px 0;
        top: 28px;
        left: 0;
    }

    .main .content {
        padding-bottom: 10px;
    }

    .main .content .item {
        border-bottom: 1px solid #edebeb;
        color: #999999;
        font-size: 24px;
        padding: 1rem 0;
    }

    .main .content .item:last-child {
        border-bottom: none;
    }

    .main .content .item .title {
        font-size: 28px;
    }

    .main .content .item .left {
        float: left;
        width: 180px;
        text-align: center;
    }

    .main .content .item .right {
        float: right;
        width: 280px;
        text-align: center;
    }

    .mask_c {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #000;
        opacity: 0.7;
        z-index: 11;
    }

    .qrcode_box {
        width: 258*2px;
        height: 260*2px;
        background-image: url(images/invite_qrcode_box.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 12;
        overflow: hidden;
    }

    .qrcode_box .qrcode {
        width: 134*2px;
        height: 134*2px;
        background-image: url(images/qrcode.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin: 30px auto;
    }

    .qrcode_box .qrcode_info {
        text-align: center;
        color: #fff;
        font-size: 26px;
        margin: 20px auto 12px auto;

    }

    .qrcode_box .qrcode_btn {
        display: block;
        width: 128*2px;
        height: 36*2px;
        line-height: 36*2px;
        text-align: center;
        border-radius: 36px;
        font-size: 32px;
        color: #544b5e;
        background: #e8c27d;
        margin: 0 auto;
        margin-top: 20px;

    }
</style>
<style lang="scss" scoped>
.share-content{
    height: 91vh;
    background: #ffffff;
}
</style>