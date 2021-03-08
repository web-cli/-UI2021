<template>
	<div style="height: 100%; width: 100%; position: fixed" class="codepay">
		<div class="header">
			<div class="head">
				<router-link to="/recharge" class="back"></router-link>
				{{channel === 'wx' ?  '微信' : '支付宝'}}扫码充值
			</div>
		</div>
		
		<div class="mobile" style="background-color: #00C800;" v-if="channel === 'wx'">
			<div class="header-nbsp"></div>
			<div style="color:#fff;text-align: center;padding: 20px 0; font-size: 18px">
				微信充值 {{money}} 元
			</div>
			<div style="width: 96%; margin:0 auto; padding: 0 2%;">
				<img :src="qrcodeImg" width="100%" />
			</div>
			<div class="content" style="background-color: #00C800;">
				{{content}}
			</div>
		</div>
		<div class="mobile" style="background-color: #00A0E9;" v-if="channel === 'alipay'">
			<div class="header-nbsp"></div>
			<div style="color:#fff;text-align: center;padding: 20px 0; font-size: 18px">
				支付宝充值 {{money}} 元
			</div>
			<div style="width: 96%; margin:0 auto; padding: 0 2%;">
				<img :src="qrcodeImg" width="100%" />
			</div>
			<div class="content">
				{{content}}
			</div>
		</div>

		<div class="mobile" style="background-color: #00A0E9;" v-if="channel === 'alipay_app'">
			<!-- <div class="header-nbsp"></div> -->
			<div style="color:#fff;text-align: center;padding: 20px 0; font-size: 18px">
				正在跳转支付宝支付...
			</div>
			<!-- 		    <div style="width: 96%; margin:0 auto; padding: 0 2%;">
		        <img :src="qrcodeImg" width="100%"/>
		    </div> -->
			<div class="content">
				{{content}}
			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'

	export default {
		name: "alipay",
		data() {
			return {
				title: "",
				money: "",
				channel: "",
				qrcodeImg: "",
				content: "",
			};
		},
		created() {
			this.$parent.footer(false);

		},
		mounted() {
			this.money = this.$route.query.money ? this.$route.query.money : ""
			this.channel = this.$route.query.channel ? this.$route.query.channel : ""

			if (this.channel === 'alipay_app') {
				// 自动调用唤醒支付宝
				this.alipayApp(this.money);
			} else {
				this.getData();
			}
		},
		methods: {
			// 请求后端数据
			alipayApp(m = 50) {
				var channel = null;
				// 1. 获取支付通道
				plus.payment.getChannels(function(channels) {
					for (var i in channels) {

						if (channels[i].id == "alipay") {
							channel = channels[i];
						}
					}
				}, function(e) {
					alert("获取支付通道失败：" + e.message);
					return 0;
				});

				var host = 'https://' + window.location.host;

				// 获取token
				var token = localStorage.getItem('token');

				// 获取可用
				var ALIPAYSERVER =  host + '/api/user/recharge_type';

				// 2. 发起支付请求
				function pay(id) {
					// 从服务器请求支付订单
					var PAYSERVER = '';
					if (id == 'alipay') {
						PAYSERVER = ALIPAYSERVER;
					} else {
						plus.nativeUI.alert("不支持此支付通道！", null, "捐赠");
						return;
					}

					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						switch (xhr.readyState) {
							case 4:
								if (xhr.status == 200) {
									var obj = JSON.parse(xhr.responseText); //由JSON字符串转换为JSON对象
									console.log(obj);
									if(obj.code == 0){
										plus.nativeUI.alert(obj.info, function() {
											this.$router.replace('/recharge');
										}, "提示", "OK");
										return;
									}else{
										plus.payment.request(channel, obj.data, function(result) {
											
											plus.nativeUI.alert("支付成功！", function() {
												this.$router.replace('/item');
											}, "提示", "OK");
										}, function(error) {
											plus.nativeUI.alert("支付失败：请选择手机银行或者支付宝转银行卡支付！", function() {
												this.$router.replace('/recharge');
											}, "提示", "OK");

										});
									}
									
								} else {
									alert("获取订单信息失败！");
								}
								break;
							default:
								break;
						}
					}
					xhr.open('POST', PAYSERVER);
					xhr.send('token=' + token + '&type=alipay_app' + '&money=' + m);
				}

				pay('alipay');
			},


			getData() {
				Fetch("/user/recharge_type", {
					money: this.money,
					type: this.channel
				}).then(res => {
					if (res.data) {
						this.title = res.data.title;
						this.qrcodeImg = res.data.image;
						this.content = res.data.content;
					}
				});
			},

			testHttp() {

			}
		}
	};
</script>

<style lang="less" scoped>
	.codepay {
		* {
			font-family: ' Microsoft YaHei UI', '微软雅黑', 'PingFang SC', 'Heiti SC', ' Droid Sans';
		}

		.content {
			text-indent: 2em;
			padding: .2rem .4rem .4rem;
			font-size: 18px;
			color: #fff;
			line-height: 26px;
			background-color: #00A0E9;
		}
	}

	.header {
		height: 50px;
		width: 100%;
		max-width: 750px;
	}

	.header .head {
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 750px;
		margin: 0 auto;
		z-index: 10;
		height: 50px;
		text-align: center;
		background: #544B5E;
		line-height: 50px;
		font-size: 18px;
		color: #e8c27d;
	}

	.mobile {
		width: 100%;
		margin: 0 auto;
		padding: 0;
		font-size: 16px;
		height: 100%;
	}

	/*首页样式*/
	.header {
		width: 100%;
		height: 40px;
		text-align: center;
		background: #fff;
		position: relative;
		top: 0;
		z-index: 2000;
		box-shadow: 0px 2px 5px #eee;
		-webkit-box-shadow: 0px 2px 5px #eee;
		-ms-box-shadow: 0px 2px 5px #eee;
		line-height: .9rem;
		font-size: .3rem;
		color: #000;
	}

	.header img {
		height: 32px;
		margin: 4px auto;
	}

	.header a {
		position: absolute;
		right: .25rem;
		font-size: 16px;
		color: #3582b3;
		line-height: 40px;
		letter-spacing: 1px;
	}

	.header-nbsp {
		width: 100%;
		height: .9rem;
	}

	.indexbanner {
		width: 100%;
		margin: 0 auto;
		position: relative;
		display: block;
		overflow: hidden;
	}

	.mod_01 {
		float: left;
		width: 100%;
	}

	.mod_01 img {
		width: 100%;
		height: auto;
		margin: 0 auto;
		float: left;
	}

	.dotModule_new {
		-webkit-border-radius: .1rem;
		position: absolute;
		bottom: 5%;
		right: 0;
		left: 0;
		z-index: 1;
	}

	#slide_01_dot {
		text-align: center;
		margin: .03rem auto 0 auto;
	}

	#slide_01_dot span {
		display: inline-block;
		margin: 0 .1rem;
		width: .13rem;
		height: .13rem;
		vertical-align: middle;
		background: #ddd;
		cursor: pointer;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
	}

	#slide_01_dot .selected {
		background: #3582b3;
	}

	/*样式二*/
	.pro_box {
		width: 100%;
	}

	.pro_box .item_list {
		margin-bottom: .17rem;
		background: #fff;
		padding: .1rem .1rem .2rem .1rem;
		position: relative;
	}

	.pro_box .item_list .img {
		width: 100%;
		display: block;
	}

	.pro_box .item_list h2 {
		display: block;
		padding: 0 .25rem;
		font-size: .4rem;
		line-height: 1rem;
		width: 6.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pro_box .item_list dl {
		border-top: 1px solid #dfdfdf;
		margin: 0 .1rem;
		height: 1.7rem;
		padding: .2rem 0;
	}

	.pro_box .item_list dl .left {
		text-align: center;
		width: 2.3rem;
		border-right: 1px solid #dfdfdf;
		float: left;
	}

	.pro_box .item_list dl .left p {
		font-size: .32rem;
		color: #6b6cbc;
		margin-bottom: .1rem;
	}

	.pro_box .item_list dl .left p strong {
		font-size: .8rem;
		color: #fd5b35;
		font-weight: normal;
	}

	.pro_box .item_list dl .right {
		width: 4.7rem;
		float: right;
		padding: .15rem 0;
		position: relative;
	}

	.pro_box .item_list dl .right p {
		width: 3.2rem;
		line-height: .7rem;
		font-size: .28rem;
		text-align: center;
		color: #333;
	}

	.pro_box .item_list dl .right p strong {
		color: #fd5b35;
		font-size: .32rem;
		font-weight: normal;
	}

	.pro_box .item_list .pro_det span {
		font-size: .28rem;
		color: #333;
		padding-left: .3rem;
	}

	.pro_box .item_list .txt {
		margin-top: .2rem;
		font-size: .3rem;
		line-height: .55rem;
		color: #666;
		text-indent: 2em;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
	}

	/*进度条*/
	.circle {
		width: 1.4rem;
		height: 1.4rem;
		position: absolute;
		border-radius: 50%;
		background: #fd5b35;
		right: .07rem;
		top: .15rem;
	}

	.clip_left,
	.clip_right {
		width: 1.4rem;
		height: 1.4rem;
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.circle_left,
	.circle_right {
		width: 1.4rem;
		;
		height: 1.4rem;
		;
		position: absolute;
		border-radius: 50%;
		top: 0px;
		left: 0px;
		background: #f3ece6;
	}

	.circle_right,
	.clip_right {
		clip: rect(0, auto, auto, .75rem);
	}

	.circle_left,
	.clip_left {
		clip: rect(0, .66rem, auto, 0);
	}

	.mask {
		width: 1.16rem;
		height: 1.16rem;
		border-radius: 50%;
		right: .12rem;
		top: .12rem;
		background: #fff;
		position: absolute;
		text-align: center;
		line-height: 1.16rem;
	}

	.mask span {
		font-size: .34rem;
		color: #fd5b35;
	}

	/*视频展示*/
	.vid_box {
		background: #fff;
	}

	.contact {
		margin-top: .5rem;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding: 0 .2rem;
		line-height: .8rem;
	}

	.contact .tel {
		font-size: 16px;
		font-weight: bold;
	}

	.contact .tel strong {
		font-size: 16px;
		color: red;
	}

	.contact .kef {
		float: right;
		font-size: 16px;
		color: #000;
	}

	.footer {
		text-align: center;
		margin-top: .2rem;
		padding: 0 .2rem
	}

	.footer p {
		font-weight: bold;
		line-height: .8rem;
		font-size: 16px;
	}

	.footer .zhenjian {
		width: 100%;
		text-align: center;
		font-size: 0;
		padding-bottom: 20px
	}

	.footer .zhenjian img {
		width: 32%;
		margin: 10px .05rem .1rem .05rem;
		padding: 0 10px
	}

	.indexnav {
		width: 100%;
		background: #fff;
		min-height: 160px;
		padding: 10px 0;
	}

	.indexnav a {
		text-align: center;
		width: 23%;
		float: left;
		margin: 0 1%;
		font-weight: bold;
	}

	.indexnav a img {
		width: 60%;
		margin: .1rem auto .1rem auto;
		display: block;
		overflow: hidden;
	}

	.indexnav a font {
		width: 100%;
		text-align: center;
		line-height: .36rem;
		display: block;
		overflow: hidden;
		font-weight: normal;
	}

	.marquee_outer {
		clear: both;
		width: 100%;
		padding: 10px .3rem;
		background: #fff;
		margin-top: .2rem;
		height: 54px;
		line-height: 28px;
	}

	.marquee_outer img {
		float: left;
		width: 24px;
		margin-top: .1rem;
	}

	.marquee_txt {
		width: 85%;
		overflow: hidden;
		height: 100%;
		float: right;
	}

	.marquee_txt a {
		color: red;
		font-size: 18px;
		font-weight: bold;
	}

	.list_outer {
		margin-top: .2rem;
		margin-bottom: .4rem
	}

	.list_outer ul li {
		position: relative;
		background: #fff;
		border: 1px solid #ddd;
		padding: .25rem;
		width: 100%;
		margin: 0 auto;
		margin-top: .2rem;
	}

	.list_outer ul li a img {
		width: 100%;
		/*height:3.2rem;*/
	}

	.list_outer ul li a h1 {
		color: #000;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		margin: .15rem 0 .25rem 0;
	}

	.list_outer ul li .list_cont {
		width: 100%;
		color: #333;
		font-size: 14px;
		text-indent: 2em;
		line-height: 24px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.list_outer ul .list_lab {
		margin: .25rem 0 .15rem 0;
	}

	.list_outer ul li .list_lab span {
		color: red;
		padding: 0 .2rem;
		font-size: 13px;
	}

	.list_outer ul li .list_tip span {
		color: #999;
		font-size: 13px;
		padding: 0 .2rem;
	}

	.list_outer ul li a img.over {
		position: absolute;
		width: 2rem;
		height: 2rem;
		bottom: .3rem;
		right: .3rem;
	}

	/*详情*/
	.details_top {
		width: 6.89rem;
		margin: 0 auto;
		padding: .25rem .25rem 0 .25rem;
		background: #fff;
		border: 1px solid #ddd;
	}

	.details_top img {
		width: 100%;
	}

	.details_top h1 {
		color: #000;
		font-size: .3rem;
		font-weight: normal;
		margin: .15rem 0 .25rem 0;
	}

	.details_top ul li {
		border-top: 1px solid #ddd;
		padding: .1rem 0;
		font-size: .3rem;
		color: #333;
		line-height: .6rem;
	}

	.details_top ul li .inner {
		padding: .1rem .3rem;
		background: #f5f5f5;
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
	}

	.details_top ul li .inner .span1 {
		display: block;
		line-height: .6rem;
		color: #000;
		font-size: .28rem;
		text-align: center;
	}

	.details_top ul li .inner .span2 {
		display: block;
		line-height: .6rem;
		font-size: .3rem;
		color: #999;
		text-align: center;
	}

	.details_top ul li .inner p i {
		font-style: normal;
		color: #3582b3;
		font-size: .36rem;
	}

	.progressBox1 {
		background: #ccc;
		width: 100%;
		height: .4rem;
		border-radius: .09rem;
		margin: .2rem 0;
		position: relative;
	}

	.progressBox1 .progress1 {
		height: 100%;
		background: #3582b3;
		border-radius: .09rem;
	}

	.progressNum1 {
		position: absolute;
		color: #fff;
		font-size: .24rem;
		top: -.09rem;
	}

	.details_foot {
		width: 100%;
		background: #fff;
		margin-top: .3rem;
		margin-bottom: .1rem;
	}

	.details_foot .tabs {
		font-size: 0;
	}

	.details_foot .tabs span {
		display: inline-block;
		width: 50%;
		height: .9rem;
		line-height: .9rem;
		font-size: .32rem;
		color: #000;
		text-align: center;
		border-bottom: 1px solid #ddd;
	}

	.details_foot .tabs span.on {
		color: #3582b3;
		border-bottom: 2px solid #3582b3;
	}

	.explain_outer {
		padding: .2rem .4rem;
	}

	.explain_outer .table {
		border-collapse: collapse;
		width: 100%;
		border-top: 1px solid #000;
		border-left: 1px solid #000;
	}

	.explain_outer .table td {
		padding: .15rem .2rem;
		line-height: .4rem;
		color: #666;
		font-size: .28rem;
		border-right: 1px solid #000;
		border-bottom: 1px solid #000;
		vertical-align: middle;
	}

	.explain_outer .table tr td:first-child {
		width: 30%;
		text-align: center;
	}

	.explain_outer .table td span {
		color: #000;
		font-size: .28rem;
	}

	.explain_outer .table td i {
		font-style: normal;
		font-size: .28rem;
		color: red;
	}

	.explain_outer .data {
		display: none;
	}

	.explain_outer .data img {
		max-width: 100%;
		height: 3.1rem;
	}

	.invest_btn {
		position: fixed;
		z-index: 2000;
		bottom: 0;
		width: 100%;
		height: 1rem;
		background: #fff;
		border-top: 1px solid #ddd;
	}

	.invest_btn a {
		display: block;
		width: 6.7rem;
		height: .7rem;
		margin: .15rem auto;
		background: #3582b3;
		color: #fff;
		font-size: .3rem;
		text-align: center;
		line-height: .7rem;
		border-radius: 5px;
	}

	/*项目提交页面*/
	.form_outer {
		width: 100%;
		background: #fafafa;
		padding-top: 1.1rem;
		height: 100%;
		box-sizing: border-box;
	}

	.form_top {
		width: 7rem;
		font-size: 0;
		margin: 0 auto;
		border-radius: 5px;
		padding: .15rem 0 .25rem 0;
		background: #3582b3;
	}

	.form_top p {
		width: 50%;
		text-align: center;
		display: inline-block;
	}

	.form_top p .span_tit {
		color: #fff;
		font-size: .24rem;
		display: block;
		line-height: .6rem;
	}

	.form_top p .span_num {
		color: #fff;
		font-size: .32rem;
		display: block;
		line-height: .6rem;
	}

	.form_top p strong {
		font-weight: normal;
	}

	.form_outer ul li {
		border-bottom: 1px solid #e5e5e5;
		padding: .15rem .3rem;
		line-height: .5rem;
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
	}

	.form_outer ul li label {
		font-size: .3rem;
		color: #000;
	}

	.form_outer ul li span {
		font-size: .3rem;
		color: #000;
		margin-right: 0;
	}

	.form_outer ul li .start {
		font-size: .36rem;
		color: #3582b3;
	}

	.form_outer ul li .time {
		color: blue;
		font-weight: bold;
	}

	.form_outer ul li span.add {
		font-size: .24rem;
		color: #666;
	}

	.form_outer .caculate {
		margin-top: .5rem;
	}

	.form_outer .caculate i {
		font-size: .32rem;
		font-weight: bold;
		display: inline-block;
		width: .36rem;
		height: .36rem;
		color: #333;
		text-align: center;
		line-height: .36rem;
		border: 1px solid #333;
		border-radius: 50%;
	}

	.form_outer ul li input {
		font-size: .34rem;
		color: #000;
		line-height: .5rem;
		width: 2rem;
		text-align: center;
		background: #fafafa;
		border: 0;
	}

	.form_outer .pwd {
		color: #000;
		font-size: .28rem;
		width: 4rem;
		text-align: right;
	}

	/*登录注册*/
	.container_page {
		background: #fff;
		width: 100%;
		/*height:100%;overflow:auto;*/
		padding-top: .9rem;
		box-sizing: border-box;
	}

	.reg_bg form {
		margin: 0 .5rem;
	}

	.login_bg form h2 {
		font-size: .32rem;
		line-height: .5rem;
		color: #303030;
		font-weight: normal;
		vertical-align: baseline;
	}

	.input_text {
		background: #fff;
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 0;
		height: 1rem;
		padding-left: .66rem;
		font-size: .28rem;
		position: relative;
	}

	.input_text.log,
	.input_text.cert {
		height: .8rem;
		padding: 0 .3rem;
	}

	.input_text.log input {
		width: 84%;
		float: right;
		height: .5rem;
		padding: .15rem 0;
		font-size: .3rem;
	}

	.input_text.log label {
		line-height: .8rem;
		display: block;
		float: left;
		width: 16%;
		color: #000;
		font-size: .3rem;
	}

	.input_text.cert input {
		width: 75%;
		float: right;
		height: .5rem;
		padding: .15rem 0;
		font-size: .3rem;
		text-align: right;
	}

	.input_text.cert label {
		line-height: .8rem;
		display: block;
		float: left;
		width: 25%;
		color: #000;
		font-size: .3rem;
	}

	.input_text i {
		display: block;
		position: absolute;
		left: 0;
		top: .325rem;
		height: .35rem;
		width: .35rem;
	}

	.input_text i.pwd_show {
		left: 5.8rem;
		top: .35rem;
	}

	.input_text i img {
		width: 100%;
		height: 100%;
	}

	.input_text input {
		width: 100%;
		padding: .3rem 0 0;
		height: .42rem;
		font-size: .28rem;
		border: 0;
		outline: none;
		color: #303030;
	}

	.input_text input::-webkit-input-placeholder {
		color: #c6c6c6;
	}

	.input_btn {
		display: block;
		background-color: #3582b3;
		text-align: center;
		height: .7rem;
		line-height: .7rem;
		font-size: .3rem;
		border-radius: 5px;
		width: 6.5rem;
		color: #fff;
		border: 1px solid #3582b3;
		margin: .3rem auto;
	}

	.link_cen {
		display: block;
		text-align: center;
		margin-top: 1.96rem;
		color: #38f;
		font-size: .28rem;
	}

	#getcode {
		position: absolute;
		top: .33rem;
		background: #fff;
		color: #38f;
		z-index: 2;
		right: 0;
		font-size: .28rem;
		cursor: pointer;
		text-align: right;
		border-width: 0 0 0 1px;
		border-color: 1px;
		padding-left: .24rem;
	}

	#getcode.on {
		color: #999;
	}

	#imgcode {
		position: absolute;
		top: .22rem;
		background: #fff;
		color: #38f;
		z-index: 2;
		right: 0;
		font-size: .56rem;
		cursor: pointer;
		text-align: right;
		border-width: 0 0 0 1px;
		border-color: 1px;
		padding-left: .24rem;
	}

	.p1 {
		color: #999;
		font-size: .24rem;
		text-align: center;
		margin-top: .1rem;
	}

	.p1 a,
	.p2 a {
		color: #3582b3;
	}

	.p2 {
		font-size: .28rem;
		text-align: center;
		padding: .5rem 0 .5rem;
	}

	.p2.re a {
		font-size: .3rem;
	}

	/*关于我们*/
	.about_tit {
		font-weight: normal;
		font-size: .28rem;
		padding: 1.1rem .25rem .3rem .25rem;
		color: #666;
	}

	.about_outer {
		background: #fff;
	}

	.about_outer li a {
		line-height: .42rem;
		position: relative;
		display: block;
		border-bottom: 1px solid #e5e5e5;
		padding: .2rem .4rem .25rem 1rem;
		color: #000;
		font-size: .3rem;
		letter-spacing: 1px;
	}

	.about_outer li a img {
		position: absolute;
		width: .4rem;
		height: .4rem;
		top: .2rem;
		left: .4rem;
	}

	/*网站公告*/
	.mnote {
		width: 100%;
		display: block;
		background: #fff;
		margin-top: .2rem;
	}

	.mnote li a {
		position: relative;
		display: block;
		padding: .3rem .4rem;
		border-bottom: 1px solid #eaeaea;
		line-height: .5rem;
	}

	.mnote li a h1 {
		color: #000;
		font-weight: normal;
		font-size: .3rem;
		width: 85%;
		letter-spacing: 1px;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mnote li span {
		font-size: .28rem;
		display: block;
		color: #666;
		width: 85%;
		text-align: right;
	}

	.news_detail {
		padding: 1.1rem .28rem 1.2rem .28rem;
		background: #fff;
		height: 100%;
		box-sizing: border-box;
	}

	.news_detail .tit {
		font-size: .3rem;
		text-align: center;
		color: #333;
		font-weight: normal;
	}

	.news_detail .time {
		font-size: .24rem;
		text-align: center;
		padding: .15rem 0 .25rem 0;
		color: #777;
	}

	/*公司简介*/
	.company {
		padding: 1.05rem .28rem .3rem .28rem;
		background: #fff;
		min-height: 100%;
		box-sizing: border-box;
	}

	.company h1 {
		font-size: .4rem;
		padding-bottom: .3rem;
		text-align: center;
		color: #ff8040;
		letter-spacing: 1px;
	}

	.company h1.total {
		font-size: .32rem;
		text-align: left;
	}

	.company h2 {
		font-size: .3rem;
		padding: .2rem 0;
		color: #333;
	}

	.company h3 {
		font-size: .28rem;
		padding: .2rem 0 .05rem 0;
		font-weight: normal;
		color: #000;
	}

	.company h3.pay {
		color: #ff8040;
		padding: 0 0 .1rem 0;
	}

	.company h3.help {
		margin-top: .2rem;
	}

	.company h4 {
		font-size: .28rem;
		font-weight: normal;
		color: #000;
	}

	.company .com_txt {
		font-size: .28rem;
		color: #333;
		line-height: .45rem;
		text-indent: 2em;
	}

	.company .com_txt.mar {
		margin: .1rem 0;
	}

	.company .com_txt.int {
		text-indent: 0;
	}

	.company .com_txt strong {
		font-weight: normal;
		color: #ff8040;
		font-size: .28rem;
	}

	/*安全保障*/
	.com_item {
		margin-bottom: .5rem;
	}

	.company .check li {
		margin-bottom: .2rem;
		font-size: .28rem;
		color: #333;
		position: relative;
		padding-left: .8rem;
		line-height: .5rem;
	}

	.company .check.way li {
		padding-left: .6rem
	}

	.company .check li:before {
		content: '';
		position: absolute;
		width: .08rem;
		height: .08rem;
		background: #ff8040;
		top: .22rem;
		left: .5rem;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
	}

	.company .check.way li:before {
		left: .1rem;
	}

	.company .check.way li label {
		font-weight: bold;
		color: #666;
		font-size: .3rem;
	}

	.company .check.way li span {
		color: #3582b3;
		font-size: .28rem;
		font-weight: bold;
	}

	/*平台资质*/
	.company .img {
		width: 100%;
		margin-bottom: .3rem;
	}

	/*个人中心*/
	.my_total {
		color: #fff;
		background: #58a5e4;
		background: -moz-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #58a5e4), color-stop(100%, #2b61a7));
		background: -webkit-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -o-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -ms-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: linear-gradient(to bottom, #58a5e4 0%, #2b61a7 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#58a5e4', endColorstr='#2b61a7', GradientType=0);
	}

	:root .my_total {
		filter: none;
	}

	.my_total .user {
		padding: .3rem 0;
		font-size: .24rem;
	}

	.my_total .user span {
		padding: 0 .3rem;
	}

	.my_total .bal {
		font-size: .82rem;
		margin-top: .1rem;
		text-align: center;
	}

	.my_total .bal_tit {
		font-size: .28rem;
		color: #ddd;
		text-align: center;
	}

	.my_total .wait {
		background: rgba(255, 255, 255, .1);
		margin-top: .7rem;
		padding: .2rem 0;
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
	}

	.my_total .wait .item {
		width: 50%;
		border-left: 1px solid #ccc;
		text-align: center;
		color: #000;
	}

	.my_total .wait .item:first-child {
		border: 0;
	}

	.my_total .wait .item .span_num {
		color: #fff;
		font-size: .26rem;
	}

	.my_total .wait .item .span_tit {
		display: block;
		color: #dadada;
		margin-top: .1rem;
	}

	.user_btn {
		padding: .2rem;
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
	}

	.user_btn a {
		display: inline-block;
		width: 3.45rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		font-size: .3rem;
		color: #3582b3;
		background: #fff;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		-ms-border-radius: 5px;
	}

	/*推荐有奖*/
	.planner_h2 {
		background: #fff;
		padding: .2rem 0;
		font-weight: normal;
		border-top: 1px solid #ebebeb;
	}

	.planner_h2 span {
		font-size: .3rem;
		color: #333;
		border-left: 2px solid #3582b3;
		padding-left: .3rem;
	}

	.planner_rule {
		border-bottom: 1px solid #ebebeb;
		background: #fff;
	}

	.planner_rule table {
		width: 100%;
		border-collapse: collapse;
		border-top: 1px solid #ebebeb;
		border-left: 1px solid #ebebeb;
	}

	.planner_rule table td,
	.planner_rule table th {
		border-right: 1px solid #ebebeb;
		border-bottom: 1px solid #ebebeb;
		padding: .1rem 0;
		text-align: center;
	}

	.planner_rule table th {
		background: #fafafa;
	}

	.firends_to {
		margin: .2rem .3rem .4rem .3rem;
		font-size: 0;
		height: 1.65rem;
	}

	.firends_to a {
		float: left;
		width: 50%;
		height: 1.65rem;
		text-align: center;
	}

	.firends_to a img {
		width: 1rem;
		height: 1rem;
	}

	.firends_to a span {
		display: block;
		margin: .2rem auto 0 auto;
		width: 1rem;
		height: .4rem;
		line-height: .4rem;
		font-size: .24rem;
		border: 1px solid #fed39b;
		background: #fff5e4;
		border-radius: .2rem;
		-webkit-border-radius: .2rem;
		-moz-border-radius: .2rem;
		-ms-border-radius: .2rem;
	}

	/*提现*/
	#blank {
		display: none;
	}

	.blank_card {
		padding: .2rem .25rem;
		background: #fff;
		font-size: .28rem;
		margin: .02rem 0;
		position: relative;
	}

	.bank_xljt1 {
		height: .4rem;
		position: absolute;
		width: 5rem;
		top: .2rem;
		left: 1.65rem;
	}

	.jt_xz {
		position: absolute;
		right: 1rem;
		top: .2rem;
		width: 1rem;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		border-left: 1px solid #ccc;
	}

	.jt_xz img {
		width: .3rem;
	}

	.jt_xz img.down {
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-o-transform: rotate(180deg);
	}

	.blank_card label {
		display: inline-block;
		width: 1.4rem;
	}

	.blank_card input[type=text],
	.blank_card input[type=password],
	select {
		background: #fff;
		width: 5rem;
		border: 0;
		min-height: .4rem;
		font-size: .28rem;
	}

	.blank_card .big,
	.blank_card input[type=text].big {
		font-size: .42rem;
		margin: .25rem 0;
	}

	.blank_card strong {
		color: #3582b3;
	}

	.input_tips {
		color: #999;
		padding: 0 .25rem;
	}

	.input_tips input {
		width: .25rem;
		height: .25rem;
		border: 1px solid #ddd;
	}

	.bank_xl {
		display: none;
		width: 5.5rem;
		border: 1px solid #ccc;
		border-bottom: 0;
		top: .8rem;
		left: 1.2rem;
		position: absolute;
		z-index: 1;
		background: #fff;
	}

	.bank_xl li {
		border-bottom: 1px solid #ccc;
		padding-left: .1rem;
	}

	.bank_xl li a {
		display: block;
		width: 100%;
	}

	.bank_xl li a img {
		width: 2rem;
	}

	/*添加银行卡*/
	.mycard {
		width: 6.2rem;
		padding: .2rem .4rem;
		color: #fff;
		margin: .2rem auto;
		border-radius: .1rem;
		box-shadow: 0 4px 10px #999;
		background: #58a5e4;
		background: -moz-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #58a5e4), color-stop(100%, #2b61a7));
		background: -webkit-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -o-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: -ms-linear-gradient(top, #58a5e4 0%, #2b61a7 100%);
		background: linear-gradient(to bottom, #58a5e4 0%, #2b61a7 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#58a5e4', endColorstr='#2b61a7', GradientType=0);
	}

	:root .mycard {
		filter: none;
	}

	.mycard p {
		height: .7rem;
		line-height: .7rem;
	}

	.mycard .card_name {
		font-size: .3rem;
		padding-right: .5rem;
	}

	.mycard .card_type {
		font-size: .26rem;
	}

	.mycard .card_num {
		font-size: .5rem;
		margin-left: .3rem;
	}

	.mycard_add {
		background: #fff;
		padding: .3rem .5rem;
		display: none;
	}

	.mycard_add h3 {
		font-weight: normal;
		line-height: 1.12rem;
		color: #404040;
		font-size: .3rem;
		text-align: left;
		border-bottom: 1px solid rgba(0, 0, 0, .12);
	}

	.mycard_add .action {
		margin-top: .3rem;
	}

	.mycard_add .sub {
		margin-left: 1.15rem;
		width: 1.8rem;
		height: .8rem;
		font-size: .3rem;
		border-radius: .08rem;
		background: #3582b3;
		color: #fff;
		border: 0;
	}

	.mycard_add .sub.del {
		margin-left: .5rem;
		color: #333;
		background: #ddd;
	}

	/*记录表格*/
	.record_outer {
		width: 100%;
		background: #fff;
	}

	.record_outer table {
		width: 100%;
		border-collapse: collapse;
		border-top: 1px solid #ebebeb;
		border-left: 1px solid #ebebeb;
	}

	.record_outer table td,
	.record_outer table th {
		border-right: 1px solid #ebebeb;
		border-bottom: 1px solid #ebebeb;
		padding: .15rem .1rem;
		text-align: center;
	}

	.record_outer table td a {
		display: block;
		padding: .04rem 0;
		color: #fff;
		font-size: .24rem;
		border-radius: 2px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		-ms-border-radius: 2px;
	}

	.record_outer table td a.a1 {
		background: #58a5e4;
	}

	.record_outer table td a.a2 {
		background: #2b61a7;
	}

	/*回到上一页*/
	.othertop {
		width: 100%;
		height: 40px;
		background: #4f79bc;
		position: fixed;
		z-index: 2000;
		text-align: center;
		line-height: .8rem;
		font-size: .32rem;
		color: #fff;
	}

	.goback {
		width: .8rem;
		height: .8rem;
		float: left;
		margin-left: .2rem;
	}

	.goback img {
		width: 30px;
		height: 30px;
		margin: .15rem 0 0 0;
	}

	.othertop-font {
		width: 100%;
		height: 40px;
		position: fixed;
		text-align: center;
		font-size: 16px;
		color: #fff;
		line-height: 40px
	}

	/*回到顶部*/
	.go_top {
		display: block;
		width: .4rem;
		height: .4rem;
		padding: .1rem;
		border-radius: 50%;
		position: fixed;
		bottom: 2.5rem;
		right: .3rem;
		border: 1px solid #ccc;
		background: #f2f2f2;
	}

	.go_top img {
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		overflow: hidden;
	}

	/*弹出层*/
	.cover_bg {
		display: none;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .7);
	}

	.cover_bg .share img {
		width: 3.06rem;
	}

	/*合同*/
	.contract_box {
		width: 7.1rem;
		margin: 0 auto;
		background: #fff;
		padding: .3rem .2rem;
	}

	.contract_box.deta {
		width: 7.1rem;
		padding: .2rem;
	}

	.contract_box .con_name {
		text-align: center;
		font-weight: normal;
		font-size: .34rem;
		margin: .3rem 0 .2rem 0;
	}

	.contract_box p.stamp {
		color: #e16f00;
		font-size: .24rem;
		text-align: right;
		margin: 0;
		cursor: pointer;
	}

	.contract_box p {
		line-height: 20px;
		font-size: .24rem;
		margin: .15rem 0;
		color: #000;
		text-align: left;
	}

	.contract_box p.code {
		text-align: right;
	}

	.contract_box p label {
		color: #000;
		font-weight: bold;
	}

	.contract_box.deta .table_auto {
		width: 100%;
		margin: auto;
		overflow: auto;
	}

	.contract_box.deta .table_auto table {
		margin: auto;
		width: 14rem;
	}

	.contract_box .tablec {
		width: 100%;
		border-collapse: collapse;
		border-top: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
		margin-bottom: .3rem;
	}

	.contract_box .tablec td {
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #e5e5e5;
		padding: .2rem;
		font-size: .24rem;
	}

	.contract_box .tablec td:first-child {
		width: 43%;
	}

	.contract_box .tablec tr:nth-child(odd) {
		background: #f5f5f5;
	}

	.contract_box.deta .tablec td:first-child {
		width: auto;
	}

	.contract_box.deta .tablec td {
		text-align: center;
		padding: .3rem 0;
	}

	.contract_box.deta .tablec tr:nth-child(odd) {
		background: none;
	}

	.contract_box.deta .tablec tr:hover {
		background: #f9f9f9;
	}

	.contract_box.deta .tablec th {
		font-size: .28rem;
		background: #f5f5f5;
		padding: .3rem 0;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #e5e5e5;
	}

	.signature {
		position: relative;
		margin: 1rem 0 40px;
	}

	.signature .Party {
		width: 2.5rem;
		float: left
	}

	.signature .Party p {
		margin-bottom: .3rem;
	}

	.signature .Party span {
		font-size: .24rem;
		padding-left: .5rem;
	}

	.signature img {
		position: absolute;
		z-index: 99;
		top: -.7rem;
		right: 1.6rem;
		width: 2rem;
	}

	/*详情*/
	.contract_box .data_name {
		padding: .5rem .2rem;
		border: 1px dashed #ddd;
		margin-bottom: .5rem;
	}

	.contract_box .data_name span {
		padding: 0 .14rem;
		font-size: .28rem;
	}

	/*新增样式2修改*/
</style>
