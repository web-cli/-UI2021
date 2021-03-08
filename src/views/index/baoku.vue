<template>
	<div>
		<div class="user_n1">
			<div class="header">
				<div class="head">
					<a @click="$router.back()" class="back"></a>
					宝库
					<router-link to="/baokugz"><a style="right: 0;width: 130px;position: fixed;">
						使用规则
					</a></router-link>
				</div>
			</div>
			<div class="">
				<div class="top">

					<div class="avator_right">

						<div class="avator_right_info1">
							￥ {{this.baoku_data.sumMoney}} </div>
						<div class="avator_right_info2">
							宝库总金额(元)
						</div>
					</div>
				</div>

				
				<div class="mt0">
					<div class="left">
						<div class="left_box_icon1"></div>
						<div class="left_box">
							<div class="left_box_info2">
								{{this.baoku_data.todayIncome}} </div>
							<div class="left_box_info1">
								今日收益 (元)
							</div>

							<router-link to=""><a class="cbtn" @click="toBox('转出到余额','0')">转出</a></router-link>
						</div>
						<div class="left_arrow"></div>
					</div>
					<div class="center">
						<div class="left_box_icon2"></div>
						<div class="left_box">
							<div class="left_box_info2">
								{{this.baoku_data.sumIncome}} </div>
							<div class="left_box_info1">
								累计收益 (元)
							</div>


							<a class="cbtn" style="opacity: 0;background-color: #808080;">转入</a>
						</div>
						<div class="left_arrow"></div>
					</div>
					<div class="right">
						<div class="left_box_icon2"></div>
						<div class="left_box">
							<div class="left_box_info2">
								{{this.baoku_data.interestRate}}% </div>
							<div class="left_box_info1">
								24小时利率 (%)
							</div>


							<a class="cbtn" style="background-color: #808080;" @click="toBox('转入到宝库','1')">转入</a>
						</div>
						<div class="left_arrow"></div>
					</div>
				</div>
			</div>
			<div id="simpleModal" class="modal">
				<div class="modal-content">
					<div class="modal-header">
						<span class="closeBtn" @click="closeBox">&times;</span>
						<h2 class="news-title"></h2>
					</div>
					<div class="modal-body" style="text-align: center;">
						<!-- <p>这是一个弹窗效果</p> -->
						<p class="body-box"></p>
						<div class="chu" style="font-size: 17px;">
							<div class="left_box_icon1"></div>
							<div class="left_box">
								<div class="left_box_info1" style="font-size: 17px;">
									转出金额
								</div>
								<div class="left_box_info2">
									<input class="outInput" placeholder="输入金额" ref="getFocus" type="number" style="font-size: 30px;" autofocus="autofocus"></div>
								<div class="left_box_info1" style="font-size: 17px;">
									宝库余额 (元)
								</div>
								<div class="left_box_info2" style="font-size: 17px;">
									{{this.baoku_data.sumMoney}} </div>
								<router-link to=""><a class="cbtn" @click="out()" style="height: 50px;line-height: 50px;font-size: 17px;">确认转出</a></router-link>
							</div>
							<div class="left_arrow"></div>
						</div>
					</div>

				</div>

			</div>

			<div id="simpleModal" class="modal">
				<div class="modal-content">
					<div class="modal-header">
						<span class="closeBtn" @click="closeBox">&times;</span>
						<h2 class="news-title"></h2>
					</div>
					<div class="modal-body" style="text-align: center;">
						<!-- <p>这是一个弹窗效果</p> -->
						<p class="body-box"></p>
						<div class="chu" style="font-size: 17px;">
							<div class="left_box_icon1"></div>
							<div class="left_box">
								<div class="left_box_info1" style="font-size: 17px;">
									转入金额
								</div>
								<div class="left_box_info2">
									<input class="inInput" placeholder="输入金额" ref="getFocus" type="number" style="font-size: 30px;" autofocus="autofocus"></div>
								<div class="left_box_info1" style="font-size: 17px;">
									账号余额 (元)
								</div>
								<div class="left_box_info2" style="font-size: 17px;">
									{{data.money}} </div>
								<router-link to=""><a class="cbtn" @click="inM()" style="height: 50px;line-height: 50px;font-size: 17px;">确认转入</a></router-link>
							</div>
							<div class="left_arrow"></div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';
	import Vue from 'vue';
	import {
		NoticeBar
	} from 'vant';

	Vue.use(NoticeBar);

	export default {
		name: "info",
		data() {
			return {
				data: {},
				baoku_data: {},
			};
		},
		created() {
			if (this.$parent.getFooterType() === 'n1') {
				this.$router.replace('/tree');
			}
			this.$parent.footer(false);
		},
		mounted() {
			this.start();
		},
		methods: {
			inM() {
				var inMoney = document.getElementsByClassName("inInput")[0];
				if (!Number(inMoney.value)) {
					this.$notify({
						background: '#ff0000',
						message: '请输入正确金额'
					});

					return;
				}

				if (Number(inMoney.value) > Number(this.data.money)) {
					this.$notify({
						background: '#ff0000',
						message: '金额不能大于账户余额'
					});

					return;
				}

				Fetch('/user/save_yue_bao', {
					money: Number(inMoney.value)
				}).then(baoku => {
					this.$notify({
						background: '#00aa00',
						message: '操作成功'
					});
					
					this.$router.go(0);
				})
			},
			out() {
				var outMoney = document.getElementsByClassName("outInput")[0];
				if (!Number(outMoney.value)) {
					this.$notify({
						background: '#ff0000',
						message: '请输入正确金额'
					});

					return;
				}

				if (Number(outMoney.value) > Number(this.baoku_data.sumMoney)) {
					this.$notify({
						background: '#ff0000',
						message: '金额不能大于宝库余额'
					});

					return;
				}

				Fetch('/user/out_yue_bao', {
					money: Number(outMoney.value)
				}).then(baoku => {
					this.$notify({
						background: '#00aa00',
						message: '操作成功'
					});
					
					this.$router.go(0);
				})
			},
			toBox(title = '', contain = '0') {
				var newsBoxOut = document.getElementsByClassName("modal")[0];
				var newsBoxIn = document.getElementsByClassName("modal")[1];
				if (contain === "0") {
					newsBoxOut.style.display = "block";
				}

				if (contain === "1") {
					newsBoxIn.style.display = "block";
				}

				var newsTitle = document.getElementsByClassName("news-title")[0];
				newsTitle.innerText = title;
				var newsTitle2 = document.getElementsByClassName("news-title")[1];
				newsTitle2.innerText = title;
			},

			closeBox() {
				var newsBoxOut = document.getElementsByClassName("modal")[0];
				var newsBoxIn = document.getElementsByClassName("modal")[1];
				newsBoxOut.style.display = "none";
				newsBoxIn.style.display = "none";
			},
			start() {
				this.$refs.getFocus.focus();
				Fetch('/user/info').then(res => {
					this.data = res.data;
				})

				Fetch('/user/get_yue_bao_info').then(baoku => {
					console.log(baoku.data)
					this.baoku_data = baoku.data;
				})
			},
			logout() {
				this.$parent.setFooterType('n1');
				localStorage.removeItem('token');
				this.$router.replace('/login');
			},

		}
	};
</script>

<style lang="less" scoped>
	input {
		// border-bottom-style: solid;
		margin-bottom: 30px;
		font-size: 30px;
		width: 100%;
		text-align: center;
		display: block;
		height: 100%;
		background: none;
		color: inherit;
		opacity: 1;
		-webkit-text-fill-color: currentcolor;
		font: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		// text-align: inherit;
		text-indent: inherit;
		text-transform: inherit;
		text-shadow: inherit;
	}

	.indexnav {
		width: 100%;
		background: #fff;
		overflow: hidden;
		line-height: 40px;
		font-size: 12px;
		margin-top: 24px;

		.nav_top,
		.nav_bottom {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			margin-bottom: 14px;
		}
	}

	.indexnav a {
		text-align: center;
		width: 23.466%;
		font-size: 14px;
		display: flex;
		flex-direction: column;
	}

	.indexnav a span {
		width: 100%;
		display: block;
		line-height: 16px;
		margin-top: 4px;
	}

	.indexnav a img {
		// width: 50%;
		margin: 0 auto;
		display: block;
		overflow: hidden;
		height: 60px;
	}

	.user_n1 {
		padding: 0 0 53px 0;
	}

	.user_n1 .mt0 {
		// background-image: url(../index/image/huanbao/mbpg.png);
		//     background-repeat: round;
		// padding-bottom: 8px;
		border-bottom: 4px solid #f4f4f4;
	}

	.user_n1 .user_top {
		width: 90%;
		margin: 0 auto;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 10px 0;
		margin-bottom: 26px;
	}

	.user_n1 .user_top .user_top_left {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.user_n1 .user_top .user_top_left .avator {
		display: inline-block;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-image: url(../item/images/recharge_checked.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .user_top .user_top_left .mobile_info {
		color: #535252;
		font-size: 14px;
		margin: 0 5px;
	}

	.user_n1 .user_top .user_top_left .vip_box {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.user_n1 .user_top .user_top_left .vip_box .vip_icon {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 20px;
		background-image: url();
		background-repeat: no-repeat;
		background-size: 12px 12px;
		position: relative;
		z-index: 2;
		background-position: center;
		background-color: #ffd200;
	}

	.user_n1 .user_top .user_top_left .vip_box .vip_info {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		height: 16px;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background: #66513d;
		color: #fff;
		border-radius: 16px;
		font-size: 12px;
		padding: 0 4px 0 16px;
		position: relative;
		z-index: 1;
		margin-left: -12px;
	}

	.user_n1 .user_top .user_top_left .vip_box .vip_info .right {
		display: inline-block;
		width: 12px;
		height: 12px;
		background-image: url();
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .user_top .msg {
		display: inline-block;
		width: 23px;
		height: 23px;
		background-image: url();
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .money_box {

		width: 90%;
		margin: 0 auto 16px auto;
		padding: 26px 10%;
		background-image: -webkit-gradient(linear, left top, right top, from(#585858), to(#383838));
		background-image: -o-linear-gradient(left, #585858, #383838);
		background-image: linear-gradient(to right, #585858, #383838);
		border-radius: 18px;
		color: #fefefe;
	}

	.user_n1 .money_box .money_info {
		// background-image:url(../index/image/huanbao/mpg.png);
		font-size: 14px;
		margin-bottom: 12px;
	}

	.user_n1 .money_box .money {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		font-size: 48px;
		-webkit-box-align: baseline;
		-ms-flex-align: baseline;
		align-items: baseline;
	}

	.user_n1 .money_box .money .rmb {
		font-size: 36px;
	}

	.user_n1 .money_box .money .withdraw_btn {
		font-size: 13px;
		color: #fefefe;
	}

	.user_n1 .notification_box {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		width: 100%;
		height: 34px;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 0 5%;
		background-color: #f5e2cd;
	}

	.user_n1 .notification_box .left {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 40%;
	}

	.user_n1 .notification_box /deep/ .van-notice-bar {
		height: 34px;
		background-color: #f5e2cd;
	}

	.user_n1 .notification_box .left .icon {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-image: url();
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		margin-right: 8px;
	}

	.user_n1 .notification_box .left .info {
		color: #7f6d58;
		font-size: 13px;
		width: 100%;
	}

	.user_n1 .notification_box .right {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.user_n1 .notification_box .right .info {
		font-size: 12px;
		color: #7f6d58;
		margin-right: 6px;
	}

	.user_n1 .notification_box .right .icon {
		display: inline-block;
		width: 12px;
		height: 16px;
		background-image: url();
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .mt1 {
		background-color: #fff;
		border-bottom: 4px solid #f4f4f4;
		padding-left: 7.4%;
	}

	.user_n1 .mt1 .user_item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 47px;
	}

	.user_n1 .mt1 .user_item .icon {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 28px;
		height: 28px;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		margin-right: 8px;
	}

	.user_n1 .mt1 .user_item .icon>img {
		display: block;
		max-width: 100%;
		max-height: 100%;
	}

	.user_n1 .mt1 .user_item .info {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 47px;
		-webkit-box-flex: 1;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		font-size: 15px;
		color: #aaaaaa;
	}

	.user_n1 .mt1 .user_item:first-child .info {
		border-bottom: 1px solid #e0e0e0;
	}

	.top {
		border-radius: 0 0 10px 10px;
		height: 250px;
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 0 65px 15px;
		background: #1ca3ff;
		background-image: url(./image/huanbao/mbg2.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-repeat: round;

	}

	.avator {
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: url(../index/image/huanbao/wode.png) no-repeat;
		background-size: 45px 50px;
		border: 3px solid #fff;
		margin-right: 8px;
	}

	.avator_right {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		// margin-left: 60px;
	}

	.avator_right .avator_right_info1 {
		font-size: 30px;
		font-weight: 700;
		color: #fff;
		margin-bottom: 15px;
	}

	.avator_right .avator_right_info2 {
		font-size: 14px;
		color: #fff;
	}

	.mt0 {
		width: 93.6%;
		margin: 0 auto 5px auto;
		border-radius: 10px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// padding: -1px 3.7%;
		padding: 10px;
		position: relative;
		box-shadow: 0 3px 15px #fbdbaf;
		// height: 200px;
		margin-top: -80px;
		margin-bottom: 40px;
	}

	.left {
		width: 35%;
		// display: flex;
		// margin-left: 10%;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}

	.center {
		// display: flex;
		// margin-left: 10%;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}

	.right {
		// display: flex;
		// margin-right: 10%;
		width: 35%;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}

	.left_box {
		// margin-left: 20px;
		display: flex;

		flex-direction: column;
	}

	.left_box_info1 {
		line-height: 25px;
		color: #878787;
		font-size: 13px;
		margin-bottom: 5px;
	}

	.left_box_info2 {
		line-height: 25px;
		align-items: center;
		color: #1ca3ff;
		font-size: 16px;
		text-align: center;
	}

	.left_box_info3 {
		line-height: 25px;
		align-items: center;
		color: #858a8e;
		font-size: 13px;
		text-align: center;
		text-decoration: underline;
	}

	.left_box_icon1 {
		display: inline-block;
		width: 30px;
		height: 30px;
		// background: url(./image/huanbao/yue.png) no-repeat 50%;
		background-size: contain;
		margin-bottom: 15px;
	}

	.left_box_icon2 {
		display: inline-block;
		width: 30px;
		height: 30px;
		// background: url(./image/huanbao/fenhoong.png) no-repeat 50%;
		background-size: contain;
		margin-bottom: 15px;
	}

	.cbtn {
		width: 100%;
		padding-left: 15px;
		padding-right: 15px;
		display: inline-block;
		height: 30px;
		border-radius: 50px;
		line-height: 30px;
		background: #ffa500;
		color: #fff;
		font-size: 15px;
		margin-top: 25px;
	}

	.line {
		width: 3px;
		height: 103px;
		background: #eee;
		// margin: 0 .375rem;
	}

	.modal {
		display: none;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		overflow: auto;
		background-color: #f4f4f4;
		margin: 15% auto;
		width: 100%;
		height: 100%;
		box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
		animation-name: modalopen;
		animation-duration: 1s;
	}

	.modal-header h2,
	.modal-footer h3 {
		margin: 0;
	}

	.modal-header {
		background-color: coral;
		padding: 15px;
		color: #fff;
	}

	.closeBtn {
		color: #fff;
		float: right;
		font-size: 30px;
	}

	.closeBtn:hover,
	.closeBtn:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}

	.modal-body {
		padding: 10px 20px;
	}

	.modal-footer {
		color: #fff;
		background-color: coral;
		padding: 10px;
		text-align: center;
	}

	.body-box {
		line-height: 1.8;
	}

	@keyframes modalopen {
		from {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}
</style>
