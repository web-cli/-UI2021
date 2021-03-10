<template>
	<div>
		<div class="user_n1">
						<div class="login-top new-user">
					<div class="left">
				<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#icontongxunlutouxiang"></use>
				</svg>
					</div>
					<div>
					<p>
							Hi ,{{data.mobile}} <div class="vip_leave" :class="data.vip_name" v-if="data.vip_name !== '普通会员'"></div>
					</p>
					<div class="vip">
							{{data.vip_name}}
					</div>
						
			
					</div>
				</div>
			<!-- <div class="top">
				<div class="avator"></div>
				<div class="avator_right">
					<div class="avator_right_info1">
						Hi,{{data.mobile}} </div>
					<div class="avator_right_info2">
						{{data.vip_name}}
					</div>
				</div>
			</div> -->


			<div class="mt0">
				<div class="left">
					<!-- <div class="left_box_icon1"></div> -->
							<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzhanghu1"></use>
				</svg>
					<div class="left_box">
						<div class="left_box_info1">
							账户余额(元)
						</div>
						<div class="left_box_info2 money">
							{{data.money}} </div>
					</div>
					<div class="left_arrow"></div>
				</div>
				<div class="line"></div>
				<div class="left">
					<!-- <div class="left_box_icon2"></div>  -->
							<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconjifen"></use>
				</svg>
					
					<div class="left_box">
						<div class="left_box_info1">
							积分
						</div>
						<div class="left_box_info2 money">
							{{data.integral}} </div>
					</div>
					<div class="left_arrow"></div>
				</div>
			</div>

			<div class="today">今日任务</div>
			<div class="mt1">
				<router-link to="" class="user_item">
					<span class="icon"><img src="./image/huanbao/mrfl.png" alt="" /></span>
					<span class="info">
						<div class="h-title ">每日领福利</div>
						<div class="a-text">奖励2.00元</div>
						<div class="a-text">每日登录即可完成任务</div>
					</span>
					<router-link to="" style="height: 30px;">
						<a v-if="mission.qiandao_status == false"   @click="checkin2()">
							
							<van-button round block type="info" native-type="submit" class="small-btn"
            >去签到</van-button>
						</a>
						<a v-if="mission.qiandao_status == true" style="background-color: #d6d6d6;" >
								<van-button round block type="info" native-type="submit" class="small-btn" disabled
            >已签到</van-button>
						</a>
					</router-link>
				</router-link>
			</div>
			<div class="mt1">
				<router-link to="" class="user_item">
					<!-- <span class="icon"><img src="./image/huanbao/yqhy.png" alt="" /></span> -->
									<svg class="svg icon" aria-hidden="true">
					<use xlink:href="#iconyaoqing"></use>
				</svg>
					<span class="info">
						<div class="h-title ">邀请好友</div>
						<div class="a-text">奖励5元起 </div>
						<div class="a-text">邀请好友投资成功奖励5元起</div>
					</span>
					<router-link to="/share" style="height: 30px;">
						<a v-if="mission.invest_status == false" >
								<van-button round block type="info" native-type="submit" class="small-btn"
            >去完成</van-button>
						</a>
						 <a v-if="mission.invest_status == true"  style="background-color: #d6d6d6;">
							 	<van-button round block type="info" native-type="submit" class="small-btn" disabled
            >已完成</van-button>
						 </a>
					</router-link>
				</router-link>
			</div>
			<div class="mt1">
				<router-link to="" class="user_item">
					<span class="icon"><img src="./image/huanbao/yqhy.png" alt="" /></span>
					<div class="info">
						<div class="h-title ">存入宝库</div>
						<div class="a-text">零钱管家,每日自动生利</div>
						<div class="a-text">有几率获取2000现金大奖</div>
					</div>
					<router-link to="/baoku" style="height: 30px;">
						<a v-if="mission.yue_bao_status == false">
								<van-button round block type="info" native-type="submit" class="small-btn"
            >去完成</van-button>
						</a>
						<a v-if="mission.yue_bao_status == true"  style="background-color: #d6d6d6;">
							<van-button round block type="info" native-type="submit" class="small-btn" disabled
            >已完成</van-button>
						</a>
					</router-link>
				</router-link>
			</div>
<!-- 			<div class="mt1">
				<router-link to="" class="user_item">
					<span class="icon"><img src="./image/huanbao/xrrz.png" alt="" /></span>
					<span class="info">
						<div class="h-title ">新人认证领红包</div>
						<div class="a-text">奖励10元</div>
						<div class="a-text">完成实名认证后即可领取</div>
					</span>
					<router-link to="/auth" style="height: 30px;">
						<a v-if="mission.auth_status == false" class="cbtn">去完成</a>
						<a v-if="mission.auth_status == true" class="cbtn" style="background-color: #d6d6d6;">已认证</a>
					</router-link>
				</router-link>
			</div> -->
			<div class="mt1">
				<router-link to="" class="user_item">
					<span class="icon"><img src="./image/huanbao/cytz.png" alt="" /></span>
					<span class="info">
						<div class="h-title ">参与投资</div>
						<div class="a-text">奖励商城积分</div>
						<div class="a-text">当日投入即可完成任务</div>
					</span>
					<router-link to="/item" style="height: 30px;">
							<van-button round block type="info" native-type="submit" class="small-btn"
            >去完成</van-button>
						
					</router-link>
				</router-link>
			</div>
<!-- 			<div class="mt1">
				<router-link to="" class="user_item">
					<span class="icon"><img src="./image/huanbao/zswd.png" alt="" /></span>
					<div class="info">
						<div class="h-title ">每日知识问答</div>
						<div class="a-text">奖励红包2-100元</div>
						<div class="a-text">有几率获取iphone11手机</div>
					</div>
					
					<a v-if="mission.answer_status == false" class="cbtn" @click="dati()">去完成</a>
					<a v-if="mission.answer_status == true" class="cbtn" style="background-color: #d6d6d6;">已完成</a>
					
				</router-link>
			</div> -->
			<div class="warming">
				本活动解释权由本司所有，一经发现违规刷取取消任务资格。
			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';
	import Vue from 'vue';
	import {
		NoticeBar,
		Dialog
	} from 'vant';

	Vue.use(NoticeBar);

	export default {
		components: {
		    [Dialog.Component.name]: Dialog.Component
		},
		name: "info",
		data() {
			return {
				data: {},
				footer_type: 'n1',
				mission:{},
			};
		},
		created() {
			// if (this.$parent.getFooterType() === 'n2') {
			// 	this.$router.replace('/user');
			// }
			this.$parent.footer(true, 'mission');

			var type = localStorage.getItem('footer');
			if (type) {
				this.footer_type = type;
			}
		},
		mounted() {
			this.start();
		},
		methods: {
			dati() {
				Fetch('/index/getAnswer').then((res) => {
					this.$router.replace("/exam")
				})
			},
			checkin2() {
				Fetch('/user/sign').then((res) => {
					this.sign_money = res.data.reward;
					this.new_sign_ok = true;
					this.$notify({
						background: '#07c160',
						message: '签到成功 +' + res.data.reward
					});
					Dialog.confirm({
					  title: '恭喜',
					  message: '获得一次转盘抽奖机会，是否前往抽奖？',
					})
					  .then(() => {
					    // on confirm
						this.$router.replace('/prize')
					  })
					  .catch(() => {
					    // on cancel
					  });
				})
			},
			start() {
				Fetch('/user/info').then(res => {
					this.data = res.data;
				})
				
				Fetch('/index/getStstusAll').then(res =>{
					this.mission = res.data
					console.log(this.mission)
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
	.cbtn {
		padding-left: 15px;
		padding-right: 15px;
		display: inline-block;
		height: 30px;
		border-radius: 50px;
		line-height: 30px;
		background: #1ca3ff;
		color: #fff;
		font-size: 15px;
		// position: absolute;
		right: 20px;
	}

	.warming {
		margin-top: 30px;
		text-align: center;
		font-size: 12px;
		line-height: 1.7;
		color: #6b7d99;
		padding-bottom: 0;
	}

	.info {
		display: flex;
		flex-direction: column;
		// div{
		// 	margin-top: 8px;
		// }
	}

	.user_n1 {
		padding: 0 0 53px 0;
	}

	.user_n1 .mt0 {
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
		background-image: url(./image/home2.png);
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
		background-image: url(./image/home2.png);
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
		background-image: url(./image/home2.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .user_top .msg {
		display: inline-block;
		width: 23px;
		height: 23px;
		background-image: url(./image/home2.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .money_box {
		box-shadow: 0 5px 2px #fbdbaf;
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
		background-image: url(./image/home2.png);
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
		background-image: url(./image/home2.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}

	.user_n1 .mt1 {
		background-color: #fff;
		border: 4px solid #f4f4f4;
		// padding-left: 7.4%;
		padding-left: 20px;
		margin: 0px 20px;
		border-radius: 20px;
		margin-bottom: 10px;
		padding:10px 0;
	}

	.user_n1 .mt1 .user_item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: flex-start;
		height: 98px;
		margin:20px;

	}

	.user_n1 .mt1 .user_item .icon {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 96px;
		height: 96px;
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
		// height: 47px;
		width: 55%;
		// -webkit-box-flex: 1;
		// -ms-flex: 1 1 auto;
		// flex: 1 1 auto;
		font-size: 26px;
		color: #aaaaaa;
	}

	.user_n1 .mt1 .user_item:first-child .info {
		// border-bottom: 1px solid #e0e0e0;
	}

	.h-title {
		width: 100%;
		font-size: 30px;
		color: #151515;
		font-weight: 500;
		// line-height: 15px;
	}

	.a-text {
		width: 100%;
		padding: 5px 0;
		font-size: 12px;
	}

	.today {
		font-size: 36px;
		color: #272727;
		font-weight: 700;
		border-left: 10px solid #1ca3ff;
		padding: 10px 0px;
		padding-left: 15px;
		margin-bottom: 30px;
		display: flex;
		align-items: center;
		margin-top: 50px;
	}


	.top {
		height: 150px;
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 0 34px 15px;
		background: #1ca3ff;
		background-image: url(./image/huanbao/ydbg.png);
		// background-repeat: no-repeat;
		// background-size: 100%;
		background-repeat: round;

	}

	.avator {
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: url(./image/huanbao/wode.png) no-repeat;
		background-size: 45px 50px;
		border: 3px solid #fff;
		margin-right: 8px;
	}

	.avator_right {
		display: flex;
		flex-direction: column;
	}

	.avator_right .avator_right_info1 {
		font-size: 15px;
		font-weight: 700;
		color: #fff;
		margin-bottom: 5px;
	}

	.avator_right .avator_right_info2 {
		font-size: 0.75rem;
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
		padding: 30px;
		position: relative;
		box-shadow: 0 3px 15px #fbdbaf;
		height: 80px;
		margin-top: -40px;
	}

	.left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left_box {
		margin-left: 20px;
		display: flex;
		flex-direction: column;
	}

	.left_box_info1 {
		color: #242e39;
		font-size: 24px;
		margin-bottom: 5px;
	}

	.left_box_info2 {
		display: flex;
		align-items: center;
		color: #1ca3ff;
		font-size: 18px;
	}
	.left_box_icon2{
		display: inline-block;
		width: 30px;
		height: 30px;
		background: url(./image/huanbao/fenhoong.png) no-repeat 50%;
		background-size: contain;
	}
	.left_box_icon1 {
		display: inline-block;
		width: 30px;
		height: 30px;
		background: url(./image/huanbao/yue.png) no-repeat 50%;
		background-size: contain;
	}
	.line{
		    width: 6px;
		    height: 90px;
		    background: #eee;
		    // margin: 0 .375rem;
	}
	
</style>
<style lang="scss" scoped>
.new-user {
  color: #ffffff;
  font-size: 28px;
  padding: 0px 40px;
  height: 280px;
  @include flex-start();
  .pos {
    margin: 16px 0;
  }
  svg {
    margin-right: 20px;
  }
  span {
    color: #ffffff;
    // font-size: 13px;
    margin-left: 20px;
  }
	.vip{
		color: $orange;
		margin-top: 10px;
	}
}
.mt0{
	height: 140px;
	  box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
}
.money{
	margin-top: 10px;
}
.user_n1{
	background: #ffffff;
}
.info{
	margin-left: 16px;
	div{
		margin-bottom: 6px;
	}
}
.small-btn{
	width: 180px;
	margin-top: 20px;
	margin-right: 40px;
}
</style>