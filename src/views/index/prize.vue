<template>
	
    <div class="container">
		<div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        幸运转盘
		    </div>
		</div>
        <div class="lucky-wheel">
            <div class="lucky-title">
                <img style="width: 100%;" src="./image/huanbao/top.png">
            </div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                    <div class="wheel-pointer" @click="rotate_handle()"
                         :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>
                <div class="wheel-bg"
                     :style="{transform:rotate_angle,transition:rotate_transition,'background-image':background}">
                    <div class="prize-list">
                    </div>
                </div>
            </div>
        </div>

            <div class="content">
                剩余抽奖次数： {{lottery_ticket}}
            </div>
            <div class="jl">
                <p>
					<van-button type="primary" icon="question" @click="dialog">活动规则</van-button>
					<van-button type="primary" icon="service" to="/kefu">在线客服</van-button>
                    <!-- <router-link to="/kefu" class="zjjl">在线客服&gt;&gt;</router-link> -->
                    <!-- <span @click="dialog">活动规则&gt;&gt;</span> -->
                </p>
            </div>
           <div class="gdbox">
                <strong>中奖记录</strong>
                <p class="tit">
                    <span>手机号</span>
                    <span>获得奖励</span>
                </p>
                <div class="zhongj-bbk">
                    <div class="zhongj-bb" style="overflow:hidden;" ref="outbox">
                        <div class="zhongj-bbl inner-container" ref="movebox">
                            <div class="prize_list" v-for="(item, key) in data" :key="key">
                                <li>{{item.mobile}}</li>
                                <li>获取奖品：{{item.jp_name}}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="prize_img" class="toast-picture">
                <div class="close" @click="close_toast()"></div>
                <div class="toast-title">
                    {{prize_name}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel" @click="close_toast">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
    </div>
</template>
<script>
	import Vue from 'vue';
    import {Dialog,Button } from 'vant';
    import Fetch from '../../utils/fetch'
	Vue.use(Button);
    export default {
        components: {
            [Dialog.Component.name]: Dialog.Component
        },
        data() {
            return {
                easejoy_bean: 0, //金豆
                lottery_ticket: 0, //抽奖次数
                toast_control: false, //抽奖结果弹出框控制器
                hasPrize: false, //是否中奖
                start_rotating_degree: 0, //初始旋转角度
                rotate_angle: 0, //将要旋转的角度
                start_rotating_degree_pointer: 0, //指针初始旋转角度
                rotate_angle_pointer: 0, //指针将要旋转的度数
                rotate_transition: "transform 3s ease-in-out", //初始化选中的过度属性控制
                rotate_transition_pointer: "transform 3s ease-in-out", //初始化指针过度属性控制
                click_flag: true, //是否可以旋转抽奖
                prize_name: '未中奖',
                prize_img: require("./image/sorry.png"),
                loading: false,
                data: [],
                isShow: true,
                prize_num: 0,
                background: '',
                prize_remark: '',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
			// this.rotating();
            Fetch('/index/getLottery').then(res => {
				console.log(res);
                this.prize_remark = res.data.prize_remark;
                this.data = res.data.prize_list;
                this.lottery_ticket = res.data.prize_num;
                //this.background = 'url("' + res.data.background + '")';
				//this.background = 'url(./image/turnplate-bg.png)';
				
                this.gd();
            });
        },
        computed: {},
        methods: {
            //此方法为处理奖品数据
            rotate_handle() {

                if (this.lottery_ticket <= 0) {
					Dialog.confirm({
					  title: '提示',
					  message: '您的抽奖次数用光了，投资可以增加抽奖次数哦！',
					})
					  .then(() => {
					    // on confirm
						this.$router.replace('/item')
					  })
					  .catch(() => {
					    // on cancel
					  });
                    // this.$notify('您还没有抽奖机会');
                    return;
                }

                if (!this.loading) {
                    this.loading = true;
                    Fetch('/index/doLottery').then(res => {
                        this.index = res.data.index; //指定每次旋转到的奖品下标
                        this.prize_name = res.data.name;
                        if (res.data.is_prize) {
                            this.prize_img = require("./image/huanbao/congratulation.png");
                        } else {
                            this.prize_img = require("./image/huanbao/sorry.png");
                        }
                        this.lottery_ticket -= 1;
                        this.rotating();
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            },
            rotating() {
                if (!this.click_flag) return;
                var during_time = 1; // 默认为1s
                var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
                var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
                var rand_circle = 7; // 附加多转几圈，2-3
                this.click_flag = false; // 旋转结束前，不允许再次触发
                // 转动盘子
                var rotate_angle =
                    this.start_rotating_degree +
                    rand_circle * 360 +
                    result_angle[result_index] -
                    this.start_rotating_degree % 360;
                this.start_rotating_degree = rotate_angle;
                this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                // //转动指针
                // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
                // this.start_rotating_degree_pointer =360*rand_circle;
                var that = this;
                // 旋转结束后，允许再次触发
                setTimeout(function () {
                    that.click_flag = true;
                    that.game_over();
                }, during_time * 3000); // 延时，保证转盘转完
            },
            game_over() {
                this.toast_control = true;
                this.loading = false;
            },
            //关闭弹窗
            close_toast() {
                this.toast_control = false;
            },
            dialog() {
                Dialog.alert({
                    title: '规则介绍',
                    message: '1.每日签到可以获得一次抽奖机会。\n2.投资抽奖福利项目获得抽奖权限，多投多送；\n3.如获得现金奖励，中奖结束后自动派送至会员账户余额，可点击会员中心-资金明细查看详情；\n4.如获得实体物品，抽奖结束后主动联系客服人员，提供快递信息，由于实体礼品涉及采购时间，所有实物奖品会在中奖后7个工作日内寄出！\n本活动最终解释权归上海彬理投资管理有限公司所有.',
                    className: 'cj_dialog',
                }).then(() => {
                    console.log('dialog closed.')
                });
            },
            gd() {
                var moveTarget = this.$refs.movebox;
                var outbox = this.$refs.outbox;
                if (this.data.length <= 6) {
                    return
                }

                var initTop = 0;
                setInterval(function () {
                    initTop++;
                    if (initTop >= moveTarget.scrollHeight / 2) {
                        initTop = 0;
                    }

                    moveTarget.style = 'transform: translateY(-' + initTop + 'px)';

                }, 35)
            }
        },
    };
</script>
<style lang="less">
    .cj_dialog {
        background: -webkit-linear-gradient(top, #fff3de, #fae6c2);

        .van-dialog__message {
            text-align: left;
            line-height: 30px;
        }
    }
</style>
<style lang="less" scoped>

    .container {
        width: 100%;
        background: red url("./image/bk.png") no-repeat fixed top;
        background-size: 100% 100%;
        .inner-container {

        }

        /*文字无缝滚动*/
        @keyframes myMove {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-150px);
            }
        }

        .prize_list {
            width: 100%;
            /*animation: myMove 5s linear infinite;*/
            /*animation-fill-mode: forwards;*/
            height: 30px;

            li {
                width: 50%;
                float: left;
				font-size: 3vw;
				list-style-type:none;
            }
        }

        .lucky-wheel {
            width: 100%;
        }

        .lucky-title {
            width: 100%;
            height: 150px;
            // background: url("./image/lucky_title.png") no-repeat center top;
            background-size: 100%;
            margin-bottom: 70px;
        }

        .wheel-main {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .wheel-bg {
            width: 320px;
            height: 320px;
            background: url(image/huanbao/turnplate-bg.png) no-repeat center top;
            background-size: 100%;
            color: #fff;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            transition: transform 3s ease;
        }

        .wheel-pointer-box {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 100;
            transform: translate(-50%, -60%);
            width: 60px;
            height: 60px;
        }

        .wheel-pointer {
            width: 60px;
            height: 60px;
            background: url("./image/draw_btn.png") no-repeat center top;
            background-size: 100%;
            transform-origin: center 60%;
        }

        .wheel-bg div {
            text-align: center;
        }

        .prize-list {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .prize-list .prize-item {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }

        .prize-list .prize-item:first-child {
            top: 0;
            left: 8.3125rem;
            transform: rotate(20deg);
        }

        .prize-list .prize-item:nth-child(2) {
            top: 2.8rem;
            left: 10.8rem;
            transform: rotate(67deg);
        }

        .prize-list .prize-item:nth-child(3) {
            top: 6.4rem;
            left: 10.6rem;
            transform: rotate(-250deg);
        }

        .prize-list .prize-item:nth-child(4) {
            top: 9rem;
            left: 8.2125rem;
            transform: rotate(-210deg);
        }

        .prize-list .prize-item:nth-child(5) {
            top: 9.2125rem;
            left: 4.4rem;
            transform: rotate(-160deg);
        }

        .prize-list .prize-item:nth-child(6) {
            top: 6.3875rem;
            left: 1.9rem;
            transform: rotate(-111deg);
        }

        .prize-list .prize-item:nth-child(7) {
            top: 2.8rem;
            left: 1.8125rem;
            transform: rotate(-69deg);
        }

        .prize-list .prize-item:nth-child(8) {
            top: 0;
            left: 4.5rem;
            transform: rotate(-20deg);
        }

        .jl {
            width: 90%;
            height: 12vw;
            line-height: 12vw;
            margin: 0 auto;
            border-radius: 2vw;
            color: #b9925b;
            font-size: 4vw;
            background: -moz-linear-gradient(top, #fff8eb, #fee9c5);
            background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#fff8eb), to(#fee9c5));
            background: -webkit-linear-gradient(top, #fff8eb, #fee9c5);
            background: -o-linear-gradient(top, #fff8eb, #fee9c5);
        }

        .jl > p > span {
            margin-left: 10px;
            color: #ffffff;
        }

        .jl > p > a {
            margin-left: 10px;
            color: #ffffff;
        }

        .jl > p {
            text-align: center;
        }

        .gdbox {
            width: 90%;
            height: auto;
            margin: 0 auto;
            background: -moz-linear-gradient(top, #fff3de, #fae6c2);
            background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#fff3de), to(#fae6c2));
            background: -webkit-linear-gradient(top, #fff3de, #fae6c2);
            background: -o-linear-gradient(top, #fff3de, #fae6c2);
        }

        .gdbox > strong {
            font-size: 16px;
            display: block;
            color: #303030;
            text-align: center;
            padding: 10px 0;
            margin-top: 10px;
        }

        .gdbox > p {
            text-align: center;
            color: #303030;
            margin: 0px;
            background: #b9925b
        }

        .zhongj-bbk {
            width: 89.1%;
            height: auto;
            margin: 0 auto;
            padding-top: 10px;
        }

        .zhongj-bt, .zhongj-bb {
            width: 90%;
            height: 35px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 10px;
            margin: 0 auto;
            line-height: 35px;
            text-align: center;
        }

        .shouj, .phone {
            width: 55%;
            height: 100%;
            float: left;
        }

        .jj, .money {
            width: 45%;
            height: 100%;
            float: left;
        }

        .zhongj-bbk {
            padding-top: 5px;
            padding-bottom: 8px;
        }

        .zhongj-bb {
            height: 140px;
            font-weight: 400;
        }

        .zhongj-bbl {
            width: 100%;
        }

        .zhongj-bbr {
            width: 45%;
            height: 140px;
            float: left;
        }

        .tit > span:nth-child(1) {
            margin-right: 8vw;
        }

        .tit > span:nth-child(2) {
            margin-left: 12px
        }

        .tit {
            width: 100%;
            margin: 0 auto;
            height: 8vw;
            line-height: 8vw;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
        }

        .prize-item {
            width: 5.875rem;
            height: 9rem;
        }

        .prize-pic img {
            height: 2.5rem;
            margin-top: 1.5625rem;
        }

        .prize-count {
            font-size: 0.875rem;
        }

        .prize-type {
            font-size: 0.75rem;
        }

        .main {
            position: relative;
            width: 100%;
        }

        .main-bg {
            width: 100%;
            height: 1em;
        }

        .content {
            margin-top: 15px;
            text-align: center;
            width: 100%;
            font-size: 16px;
            color: #ffeb39;
            margin-bottom: 15px;
        }

        .remark {
            text-align: center;
            width: 100%;
            font-size: 12px;
            color: #ffffff;
            margin-bottom: 15px;
        }

        .content div {
            text-align: left;
        }

        .tip {
            position: relative;
            margin: 2.5em auto 0;
            width: 100%;
            border: 1px solid #fbc27f;
        }

        .tip-title {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 1rem;
            color: #fccc6e;
            background: rgb(243, 109, 86);
            padding: 0.3125rem 0.625rem;
        }

        .tip-content {
            padding: 1.5625rem 0.625rem;
            font-size: 0.875rem;
            color: #fff8c5;
            line-height: 1.5;
        }

        .toast-mask {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000;
            width: 100%;
            height: 100%;
        }

        .toast {
            position: fixed;
            top: 50%;
            left: 47%;
            z-index: 20000;
            transform: translate(-50%, -50%);
            width: 70%;
            border-radius: 0.3125rem;
            padding: 0.3125rem;
            background-color: rgb(252, 244, 224);
        }

        .toast-container {
            position: relative;
            width: 100%;
            height: 100%;
            border: 1px dotted #fccc6e;
        }

        .toast-picture {
            position: absolute;
            top: -80px;
            left: -10px;
            width: 100%;
        }

        .toast-pictrue-change {
            position: absolute;
            top: -1.5rem;
            left: -1.375rem;
            width: 17.5rem;
            height: 3.125rem;
        }

        .toast-title {
            padding: 2.8125rem 0;
            font-size: 18px;
            color: #fc7939;
            text-align: center;
        }

        .toast-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.9375rem;
        }

        .toast-btn div {
            background-image: -moz-linear-gradient(-18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%);

            background-image: -ms-linear-gradient(-18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%);
            background-image: -webkit-linear-gradient(-18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%);
            box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
            width: 60px;
            height: 30px;
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            font-size: 14px;
        }

        .close {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 40px;
            height: 40px;
            background: url("./image/close_store.png") no-repeat center top;
            background-size: 100%;
        }
    }
</style>

