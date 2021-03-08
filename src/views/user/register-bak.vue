<template>
	<div class="main">
		<div class="bg" v-bind:style="{'background-image':bg}"></div>
		<router-link to="/login" class="back"></router-link>

		<form class="form" @submit.prevent="handleSubmit">
			<div class="form_bg"></div>
			<div class="content clearfix">
				<span class="left_icon phone_icon"></span>
				<input class="inp phone" id="phone" name="phone" type="text" v-model.trim="data.mobile" placeholder="请输入手机号码">
				<span class="right right_icon clear_icon"></span>
			</div>

			<div class="content clearfix">
				<span class="left_icon pwd_icon"></span>
				<input class="inp pwd" type="password" name="pwd" v-model.trim="data.password" placeholder="请设置登录密码">
				<span class="right right_icon show_icon pwd_show"></span>
			</div>
			<div class="content clearfix">
				<span class="left_icon pwd_icon"></span>
				<input class="inp pwd2" type="password" id="pwd2" name="pwd2" v-model.trim="data.spassword" placeholder="请再输入登录密码">
				<span class="right right_icon show_icon pwd2_show"></span>
			</div>
			<!-- <div class="content clearfix">
                <span class="left_icon captcha_icon"></span>
                <input class="inp inp1" type="text" v-model.trim="data.image_code" placeholder="请输入图形验证码">
                <img class="right click_code image_code" :src="base64Image" @click="getImageCode"/>
            </div> -->
			<div class="content clearfix" v-if="config.sms_verify">
				<span class="left_icon sms_icon"></span>
				<input class="inp inp1" id="smsCode" name="smscode" v-model.trim="data.code" type="text" placeholder="请输入短信验证码">
				<van-count-down :time="time" class="right getsms" @finish="timeCall">
					<template v-slot="timeData">
						<span class="item" @click="sendcode">{{timeData.seconds > 0 ? timeData.seconds : '获取验证码'}}</span>
					</template>
				</van-count-down>
			</div>
			<div class="content clearfix">
				<span class="left_icon invite_icon"></span>
				<input class="inp inp2" name="top" value="{$phone}" :readonly="is_t_inp" v-model.trim="data.t_mobile" type="text"
				 placeholder="推荐人手机号(没有可不填)">
				<input type="hidden" id="imei" name="imei" v-model.trim="data.imei"/>
				<input type="hidden" id="devtype" name="devtype" v-model.trim="data.devtype"/>
			</div>
			<label class="contract">
				<van-checkbox v-model="checked" icon-size="14px">我已阅读并同意</van-checkbox>
				<!-- <router-link to="/regContact">用户协议</router-link> -->
				<router-link style="margin-left: 5px" v-if="config.user_contract_name" :to="config.user_contract_link">
					{{config.user_contract_name}}
				</router-link>
				<router-link style="margin-left: 5px" v-if="config.user_contract_ys_name" :to="config.user_contract_ys_link">
					{{config.user_contract_ys_name}}
				</router-link>
			</label>
			<button type="submit" class="btn">立即注册</button>
		</form>
		<router-link to="/login" class="login">已有账号？请登录</router-link>
	</div>
</template>

<script>
	import Vue from 'vue';
	import qs from 'qs'
	import {
		CountDown,
		Checkbox
	} from 'vant';
	import Fetch from '../../utils/fetch'
	import {getidfa,getUrlKey,gettype} from "../../utils/sys.js";

	Vue.use(CountDown).use(Checkbox);

    export default {
        name: "index",
        data() {
            return {
                time: 0,
                bg: '',
                data: {
                    t_mobile: '',
					imei:'',
					devtype:'',
                },
                base64Image: '',
                is_t_inp: false,
                is_send: false,
                checked: true,
				psd:'password',
                config:{},
				delivery_asn:''
            }
        },
        created() {
            this.$parent.footer(false);
			this.data.imei = getidfa();
			this.data.devtype = gettype();
        },
        mounted() {
			this.delivery_asn = getUrlKey("m",window.location.href);
			this.data.t_mobile = this.delivery_asn;
			if (this.data.t_mobile) {
			    this.is_t_inp = true;
			}

			this.start();
			// this.getImageCode();
		},
		methods: {
			// getImageCode() {
			//     Fetch("/api/api/imageCode").then(res => {
			//         this.base64Image = res.data.code
			//     });
			// },
			start() {
				Fetch('/index/webconfig', {
					type: 'bg'
				}).then(res => {
					this.bg = 'url("' + res.data.reg + '")';
				})
				Fetch('/index/webconfig', {
					type: 'web'
				}).then(res => {
					this.config = res.data
				})
			},
			clear() {
				this.data.username = '';
			},
			timeCall() {
				this.is_send = false;
				this.time = 0;
			},
			sendcode() {

				if (this.is_send) {
					return;
				}

				if (!this.config.sms_verify) {
					return;
				}

				if (!this.data.mobile) {
					this.$notify("请输入手机号");
					return;
				}

				// if (!this.data.image_code) {
				//     this.$notify("请输入图片验证码");
				//     return;
				// }

				this.is_send = true;

				Fetch("/index/register_code", {
					mobile: this.data.mobile
				}).then(() => {
					this.time = 60 * 1000;
					this.$notify({
						background: '#07c160',
						message: '发送成功'
					});
				}).catch(() => {
					this.is_send = false;
				});

			},
			handleSubmit() {

				if (!this.data.mobile) {
					this.$notify("请输入您的手机号");
					return;
				}

				if (!this.data.password) {
					this.$notify("请输入登录密码");
					return;
				}

				if (this.data.password !== this.data.spassword) {
					this.$notify("两次输入的密码不一至");
					return;
				}

				if (!this.data.code && this.config.sms_verify) {
					this.$notify("请输入验证码");
					return;
				}

				if (!this.checked) {
					this.$notify("请同意用户协议");
					return;
				}

				Fetch("/index/register", {
					...this.data
				}).then((res) => {
					this.$notify({
						background: '#07c160',
						message: '注册成功'
					});
					if (res.data.token) {
						localStorage.setItem('token', res.data.token);
					}
					//                if (res.data.app_link) {
					//                    location.href = res.data.app_link;
					//                } else {
					//                    this.$router.replace('/user');
					//                }

					this.$router.replace('/tree');
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	.main {

		.contract {

			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			padding: 10px 0 20px 0;
			color: #000000;
			font-size: 12px;

			>a {
				color: #a9fffc;
			}

			/deep/ .van-checkbox .van-checkbox__label {
				color: #ffffff;
			}
		}

		.user {
			font-size: 14px;
			color: #ffffff;
		}

		position: relative;
		padding-top: 1px;
		padding-bottom: 20px;

		.image_code {
			border-radius: 10px;
		}

		.bg {
			position: fixed;
			z-index: 1;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background: no-repeat center;
			background-size: cover;
		}

		.back {
			display: inline-block;
			width: 28px;
			height: 28px;
			background: url(images/back.png) no-repeat center;
			background-size: contain;
			position: absolute;
			top: 24px;
			left: 20px;
			z-index: 2;
		}

		.form {
			width: 85%;
			position: relative;
			margin: 20% auto 0 auto;
			z-index: 2;
			padding: 16px 14px 20px;
		}

		.form .form_bg {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: #fff;
			opacity: 0.16;
			z-index: -1;
			border-radius: 20px;
			-webkit-box-shadow: 0 0 10px 4px #343656;
			box-shadow: 0 0 10px 4px #343656;
		}

		.form .content {
			width: 100%;
			border-bottom: 1px solid #b5b4b4;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			padding: 6px 10px 38px 10px;
			position: relative;
			z-index: 4;
			margin-bottom: 26px;
		}

		.form .content .left_icon {
			float: left;
			width: 18px;
			height: 18px;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
		}

		.form .content .phone_icon {
			background-image: url(images/mobile.png);
		}

		.form .content .pwd_icon {
			background-image: url(images/pwd.png);
		}

		.form .content .captcha_icon {
			background-image: url(images/captcha.png);
		}

		.form .content .sms_icon {
			background-image: url(images/sms.png);
		}

		.form .content .right {
			float: right;
		}

		.form .content .right_icon {
			display: inline-block;
			width: 16px;
			height: 16px;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
		}

		.form .content .clear_icon {
			background-image: url(images/clear.png);
		}

		.form .content .show_icon {
			background-image: url(images/hidepwd.png);
		}

		.form .content .invite_icon {
			background-image: url(images/invite.png);
		}

		.form .content .getsms {
			display: inline-block;
			width: 88px;
			height: 28px;
			line-height: 28px;
			border-radius: 28px;
			text-align: center;
			background: #c0bfc8;
			color: #464765;
			font-size: 12px;
		}

		.form .content .captcha_img {
			display: inline-block;
			width: 88px;
			height: 28px;
		}

		.form .content .inp {
			float: left;
			padding: 0 8px;
			font-size: 14px;
			background: transparent;
			color: #fff;
		}

		.form .content .inp1 {
			width: 50%;
		}

		.form .content .inp2 {
			width: 80%;
		}

		.form .btn {
			display: block;
			width: 60.8%;
			height: 57px;
			line-height: 57px;
			border-radius: 57px;
			text-align: center;
			color: #363957;
			font-size: 20px;
			margin: 0 auto;
			background: #fff;
		}

		@media (max-width: 360px) {
			.form .content .getsms {
				width: 74px;
			}

			.form .content .captcha_img {
				width: 74px;
			}
		}

		.login {
			display: block;
			width: 120px;
			margin: 0 auto;
			color: #6b6a6b;
			font-size: 13px;
			margin-top: 8%;
			position: relative;
			z-index: 2;
		}
	}
</style>
