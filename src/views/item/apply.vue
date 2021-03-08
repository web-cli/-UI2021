<template>
	<div>
		<div class="header">
			<div class="head">
				<a @click="back()" class="back"></a>
				立即投标
			</div>
		</div>
		<div class="mt0">
			<div class="mt0_main">
				<div class="mt0_content">
					<div class="mt0_item">
						<div class="mt0_item_title">账户可用余额（元）</div>
						<div class="mt0_item_money">¥ {{data.user_money}}元</div>
					</div>
					<div class="mt0_item mt0_item_last">
						<div class="mt0_item_title">项目可投金额（元）</div>
						<div class="mt0_item_money">¥ {{data.kt_money}}元</div>
					</div>
				</div>
			</div>
			<img class="mt0_bottom" src="./images/bid_bottom.png" alt="">

		</div>
		<form method="post" class="form" @submit.prevent="handleSubmit">

			<div class="top">
				<div class="form_item">
					<div class="form_item_left">起投金额</div>
					<div>¥<span class="yellow">{{data.min}}元</span></div>
				</div>
				<div class="form_item">
					<div class="form_item_left">结息时间</div>
					<div v-if="data.type === 7">每<span class="yellow">1小时</span>自动结息</div>
					<div v-else>满<span class="yellow">24小时</span>自动结息</div>
				</div>
				<div class="form_item">
					<div class="form_item_left">投资金额</div>
					<div class="form_item2">
						<div>
							<span class="money_btn decrease" @click="setNum(1)">-</span>
							<input type="text" v-model.tirm="money" name="money" id="money" class="bid_money">
							<span class="money_btn increase" @click="setNum(0)">+</span>
						</div>
					</div>
				</div>
				
			</div>
			<div class="box">
				<div class="remian_money">最低起投
					<span class="bidStart">{{data.min}}</span>元，加一次为<span class="bidStep">{{data.min}}</span>元
				</div>
			</div>

			<div class="box">
				<div class="item clearfix">
					<!-- <span class="icon"></span> -->
					<van-field left-icon="bill"  v-model="passwd" type="password" placeholder="请输入交易密码" />
					<!-- <input type="password" class="pwd" name="pwd" v-model.trim="passwd" placeholder="请输入交易密码"> -->
					<!-- <span class="right"></span> -->
				</div>
				

			</div>
			<div class="box3">
				<div class="forgetpay">
					<div class="lbtn" @click="$router.push('/resetpaypwd')">忘记密码?</div>
				</div>
				<div class="item clearfix">
					</div>
			<!-- 优惠券单元格 -->
			<van-coupon-cell
			  :coupons="coupons"
			  :chosen-coupon="chosenCoupon"
			  @click="showList = true"
			  title="加息券"
			/>
			<!-- 优惠券列表 -->
			<van-popup
			  v-model="showList"
			  round
			  position="bottom"
			  
			  style="height: 90%; padding-top: 4px;"
			>
			  <van-coupon-list
			    :coupons="coupons"
			    :chosen-coupon="chosenCoupon"
			    :disabled-coupons="disabledCoupons"
				:show-exchange-bar="false"
				:show-close-button="false"
			    @change="onChange"
			    @exchange="onExchange"

			  />
			</van-popup>
			</div>
			<button type="submit" class="btn">确认投资</button>
		</form>
		<div class="body_bottom"></div>

	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'
	import Vue from 'vue';
	import { Field , Popup ,CouponCell, CouponList } from 'vant';
	Vue.use(CouponCell);
	Vue.use(CouponList);
	Vue.use(Popup).use(Field);

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {},
				money: 0,
				passwd: '',
				id: 0,
				chosenCoupon: -1,
				showList:false,
				coupons: [],
				disabledCoupons: [],

			};
		},
		created() {
			this.$parent.footer(false);

		},
		mounted() {
			this.id = this.$router.history.current.params.id;
			this.start();
		},
		methods: {
			setNum(num) {
				if(num == 0){
					this.money = Number(this.money) + Number(this.data.min);
				}else{
					this.money = (Number(this.money) - Number(this.data.min) <0)?0:Number(this.money) - Number(this.data.min);
				}
				
			},
			onChange(index) {
			      this.showList = false;
			      this.chosenCoupon = index;
				  console.log(index);
			},
			onExchange(code) {
			    this.coupons.push(coupon);
				console.log('code:'+code);
			},
			start() {

				Fetch('/index/item_view_apply_new', {
					id: this.id
				}).then(res => {
					this.data = res.data.view;
					for(let j = 0; j < this.data.quan.length; j++) {
						let item = new Array();
						
						if(this.data.quan[j].status == 1){
							item = {
							  id: this.data.quan[j].id,
							  reason: '',
							  condition: this.data.quan[j].name,
							  value: this.data.quan[j].num,
							  name: this.data.quan[j].name,
							  startAt: this.data.quan[j].starttime,
							  endAt: this.data.quan[j].endtime,
							  valueDesc: this.data.quan[j].num+'%',
							  unitDesc: '',
							};
							this.coupons.push(item);
						}else{
							item = {
							  id: this.data.quan[j].id,
							  reason: '每日返息不可用',
							  condition: this.data.quan[j].name,
							  value: this.data.quan[j].num,
							  name: '有效期',
							  startAt: this.data.quan[j].starttime,
							  endAt: this.data.quan[j].endtime,
							  valueDesc: this.data.quan[j].num+'%',
							  unitDesc: '',
							};
							this.disabledCoupons.push(item);
						}
						
						
						console.log(item.value);
						console.log(item.name);
					}
					
					
					this.money = Number(res.data.view.min);
				})

			},
			back() {
				this.$router.push('/item/' + this.id).catch(err => {
					err
				});
			},
			getClass(channel) {
				return 'recharge_online_' + channel;
			},
			handleSubmit() {

				if (!this.money) {
					this.$notify("请输入投入金额");
					return;
				}

				if (!this.passwd) {
					this.$notify("请输入交易密码");
					return;
				}
				var lid = (this.chosenCoupon===-1)?0:this.coupons[this.chosenCoupon].id;
				console.log(lid);
				Fetch("/index/item_new_apply", {
					id: this.id,
					lid:lid,
					money: this.money,
					pwd: this.passwd
				}).then(() => {
					this.$notify({
						background: '#07c160',
						message: '投资成功'
					});
					this.$router.replace('/touzi');
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	html,
	body {
		background: #f3f4f4;
	}

	.forgetpay {
		height: 30px;

		.lbtn {
			float: right;
			font-size: 14px;
			color: #00A0E9;
		}
	}

	::-moz-placeholder {
		color: #9e9ea0;
	}

	::-webkit-input-placeholder {
		color: #9e9ea0;
	}

	:-ms-input-placeholder {
		color: #9e9ea0;
	}

	.mt0 {
		padding: 20px 0 0 0;
		background: #544b5e;
		position: relative;
		z-index: 1;
	}

	.mt0 .mt0_main {
		width: 92%;
		margin: 0 auto;
		padding: 1px 0 50px 0;
		background: #e8c27d;
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		z-index: 1;

	}

	.mt0 .mt0_main .mt0_title {
		height: 46px;
		line-height: 46px;
		color: #544b5e;
		font-size: 24px;
		text-align: center;
		border-bottom: 1px solid #544b5e;
	}

	.mt0 .mt0_main .mt0_content {
		padding: 16px 2.2%;
		padding-bottom: 44px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;

	}

	.mt0 .mt0_main .mt0_content .mt0_item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
	}

	.mt0 .mt0_main .mt0_content .mt0_item .mt0_item_title {
		height: 20px;
		line-height: 20px;
		border-radius: 20px;
		padding: 0 4px 0 8px;
		color: #e8c27d;
		font-size: 12px;
		background: #473e51;
		text-align: left;
		margin-bottom: 10px;
	}

	.mt0 .mt0_main .mt0_content .mt0_item .mt0_item_money {
		font-size: 17px;
		color: #333333;
		text-align: left;
		padding-left: 8px;
	}

	.mt0 .mt0_main .mt0_content .mt0_item_last .mt0_item_money {

		text-align: right;
		padding-right: 8px;
	}

	.mt0 .mt0_main .mt0_content .mt0_item_last .mt0_item_title {

		text-align: right;

	}

	.mt0 .mt0_bottom {
		display: block;
		width: 100%;
		max-width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 2;
	}

	.form {
		padding: 1px 0;
		width: 92.4%;
		margin: -20px auto 0 auto;
		border-radius: 12px;
		position: relative;
		-webkit-box-shadow: 0 3px 4px 1px #e7e8e8;
		box-shadow: 0 3px 4px 1px #e7e8e8;
		z-index: 4;
	}

	.form .top {
		padding: 13px 4.8% 0 4.8%;
		background: #fff;
		border-radius: 12px 12px 0 0;
	}

	.form .top .form_item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		color: #37383b;
		font-size: 15px;
		height: 30px;
		border-radius: 30px;
		padding: 0 14px;
		margin-top: 15px;
		background: #ffffff;
	}

	.form .top .form_item .yellow {
		color: #e8c27d;
	}

	.form .top .form_item .form_item_left {
		color: #5c5c5f;
	}

	.form .top .form_item1 {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		color: #333333;
		font-size: 15px;
		font-weight: 600;
		padding-left: 14px;
		margin: 10px auto 13px auto;
	}

	.form .top .form_item2 {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: reverse;
		-ms-flex-direction: row-reverse;
		flex-direction: row-reverse;
		padding-right: 20px;
		padding-bottom: 15px;
	}

	.form .top .form_item2>div {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;

		-webkit-box-align: center;

		-ms-flex-align: center;

		align-items: center;
	}

	.form .top .form_item2>div .money_btn {
		display: inline-block;
		width: 14px;
		height: 14px;
		border-radius: 14px;
		color: #fff;
		background: #473e51;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		line-height: 10px;
	}

	.form .top .form_item2>div .increase {
		color: #333333;
		background: #e8c27d;
	}

	.form .top .form_item2>div .bid_money {
		color: #333333;

		width: 76px;
		font-size: 18px;
		padding: 0 6px;
		text-align: center;
	}


	.form .box {
		border-top: 1px solid #d5d5d5;
		border-bottom: 1px solid #d5d5d5;
		padding: 10px 4.8% 10px 4.8%;
		background: #ffffff;
	}

	.form .box .remian_money {

		text-align: right;
		padding-right: 20px;
		font-size: 12px;
		color: #544b5e;

	}

	.form .box .remian_money>span {

		display: inline-block;
		color: #e8c27d;
		padding: 0 6px;
		vertical-align: top;
		line-height: 18px;
	}


	.form .box .remian_money>span {
		font-size: 14px;
	}

	.form .box3 {
		padding: 20px 4.8% 28px 4.8%;
		background: #fff;
		border-radius: 0 0 12px 12px;
	}

	.form .box3 .item .icon {
		float: left;
		width: 18px;
		height: 18px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		background-image: url(images/withdraw_pwd.png);
		margin-right: 10px;
	}

	.form .box3 .item .pwd {
		float: left;
		width: 50%;
		font-size: 15px;
		color: #544b5e;
		height: 22px;
		line-height: 18px;

	}

	.form .box3 .item .right {
		float: right;
		width: 16px;
		height: 18px;
		background: url(images/withdraw_hide.png) no-repeat center;
		background-size: contain;
	}

	.form .box3 .item .show {
		background: url(images/withdraw_show.png) no-repeat center;
		background-size: contain;
	}


	.form .btn {
		display: block;
		width: 60%;
		height: 36px;
		line-height: 36px;
		color: #ffffff;
		text-align: center;
		border-radius: 36px;
		background: #f33b20;
		font-size: 18px;
		position: absolute;
		bottom: -100px;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
		z-index: 1;
	}

	.body_bottom {
		height: 200px;
	}
</style>
