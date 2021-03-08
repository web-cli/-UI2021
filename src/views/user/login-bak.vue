<template>
	<div class="main">
		<!-- <div class="bg" v-bind:style="{'background-image':bg}"></div> -->
		<router-link to="/" class="back"></router-link>
		<form class="form" @submit.prevent="handleSubmit">
			<div class="item">
				<div class="item_bg"></div>
				<div class="content">
					<span class="left_icon phone_icon"></span>
					<input v-model.trim="data.username" class="inp" type="text" placeholder="请输入手机号码">
					<span class="right_icon clear_icon" @click="clear()"></span>
				</div>
			</div>
			<div class="item item_pwd">
				<div class="item_bg"></div>
				<div class="content">
					<span class="left_icon pwd_icon"></span>
					<input v-model.trim="data.password" class="inp" type="password" placeholder="请输入登录密码">
					<span class="right_icon show_icon"></span>
				</div>
			</div>
			<div class="item item_forget clearfix">
				<router-link to="/forgetpwd" class="forgetpwd">忘记密码？</router-link>
			</div>

			<label class="contract">
				<span  icon-size="14px">
					登入即代表阅读并同意
				</span>
				<router-link style="margin-left: 5px" v-if="config.user_contract_name" :to="config.user_contract_link">
					{{config.user_contract_name}}
				</router-link>
				<router-link style="margin-left: 5px" v-if="config.user_contract_ys_name" :to="config.user_contract_ys_link">
					{{config.user_contract_ys_name}}
				</router-link>
			</label>

			<div class="item">
				<button type="submit" class="btn loginbtn">立即登录</button>
			</div>
			<div class="item">
				<div class="item_bg_gray"></div>
				<router-link to="/register" class="btn">注册账号</router-link>
			</div>
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
				data: {},
				bg: '',
				config: {}
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
				Fetch('/index/webconfig', {
					type: 'bg'
				}).then(res => {
					this.bg = 'url("' + res.data.login + '")';
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

			handleSubmit() {

				if (!this.data.username) {
					this.$notify("请输入您的手机号");
					return;
				}

				if (!this.data.password) {
					this.$notify("请输入登录密码");
					return;
				}

				Fetch("/index/login", {
					username: this.data.username,
					password: this.data.password
				}).then((res) => {
					if (res.data.token) {
						localStorage.setItem('token', res.data.token);
					}
					this.$parent.setFooterType(res.data.footer);
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
	.contract {

		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 10px 5px 20px 20px;
		color: #fff;
		font-size: 12px;

		>a {
			color: #a9fffc;
		}

		/deep/ .van-checkbox .van-checkbox__label {
			color: #ffffff;
		}
	}

	.main {
		position: relative;
		padding-top: 1px;
		padding-bottom: 20px;


	}

	.main .bg {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: no-repeat center;
		background-size: cover;
	}

	.main .back {
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
		width: 72%;
		position: relative;
		margin: 33% auto 0 auto;
		z-index: 2;
	}

	.form .item {
		position: relative;
		margin-bottom: 26px;
		overflow: hidden;
	}

	.form .item .logo {
		display: block;
		width: 42.8%;
		margin: 0 auto;
	}

	.form .item .item_bg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		opacity: 0.1;
		border-radius: 38px;
		z-index: 3;
	}

	.form .item .content {
		width: 100%;
		height: 38px;
		border-radius: 38px;
		border: 1px solid #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 10px 16px;
		position: relative;
		z-index: 4;
	}

	.form .item .content .left_icon {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.form .item .content .phone_icon {
		background-image: url(images/phone.png);
	}

	.form .item .content .pwd_icon {
		background-image: url(images/pwd.png);
	}

	.form .item .content .right_icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.form .item .content .clear_icon {
		background-image: url(images/clear.png);
	}

	.form .item .content .show_icon {
		background-image: url(images/hidepwd.png);
	}

	.form .item .content .inp {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		padding: 0 8px;
		font-size: 14px;
		background: transparent;
		color: #fff;
	}

	.form .item_pwd {
		margin-bottom: 10px;
	}

	.form .item_forget {
		margin-bottom: 35px;
	}

	.form .item_forget .forgetpwd {
		color: #fff;
		font-size: 12px;
		float: right;
		padding-right: 10px;
	}

	.form .item .btn {
		display: block;
		width: 100%;
		height: 36px;
		border-radius: 36px;
		color: #18192e;
		position: relative;
		z-index: 4;
		text-align: center;
		line-height: 36px;
		font-size: 15px;
	}

	.form .item .loginbtn {
		background: #fff;
	}

	.form .item .item_bg_gray {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		opacity: 0.5;
		border-radius: 36px;
		z-index: 3;
	}
</style>
