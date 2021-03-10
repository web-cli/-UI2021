<template>
	<div>
		<div class="user_n2">

			<div class="">
				<div class="notification_box" v-if="data.is_new_notice">
					<div class="left">
						<van-notice-bar class="info" text="您有新的系统消息" left-icon="volume-o" />
					</div>
					<div class="right">
						<span class="info" @click="$router.push('/notice')">去查看></span>
						<!-- <span class="icon"></span> -->
					</div>
				</div>
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
							<div class="avator_right_info2 pos" >
							我的积分: <span class="money">{{data.integral}} </span>
						</div>
						<div class="avator_right_info1" >
							成长值: {{data.value}} 
						</div>
					</div>
				<span style="text-decoration: underline;" @click="$router.push('/integral')">
								查看明细
							</span>
				</div>

				<!-- <div class="top">
					<div class="avator"></div>
					<div class="avator_right">
						<div class="avator_right_info1">
							Hi ,{{data.mobile}} <div class="vip_leave" :class="data.vip_name" v-if="data.vip_name !== '普通会员'"></div></div>
						<div class="avator_right_info2" style="font-size: 14px;font-weight: 700;">
							我的积分: {{data.integral}} <span style="text-decoration: underline;" @click="$router.push('/integral')">
								<查看明细>
							</span>
						</div>
						<div class="avator_right_info1" style="font-size: 14px;font-weight: 700;">
							成长值: {{data.value}} 
						</div>

					</div>

				</div> -->


				<div class="mt0 content2">
					<div class="left ">
						<!-- <div class="left_box_icon1"></div> -->
				<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzhanghu1"></use>
				</svg>
						<div class="left_box">
							<div class="left_box_info1 f-text">
								账户余额(元)
							</div>
							<div class="left_box_info2">
								{{data.money}}</div>
							<router-link to="/funds">
								<div class="left_box_info3 f-text">
									流水明细 </div>
							</router-link>
							<router-link to="/recharge">
								 <van-button round block type="info" native-type="submit" class="small-btn"
            >充值</van-button>
							</router-link>
						</div>
						<div class="left_arrow"></div>
					</div>

					<!-- <div class="line"></div> -->
					<div class="center" style="text-align: center;">
						<!-- <div class="left_box_icon2"></div> -->
							<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzijinchilixifenpeichaxun"></use>
				</svg>
						<div class="left_box">
							<div class="left_box_info1 f-text">
								待收利息(元)
							</div>
							<div class="left_box_info2">
								{{data.ds_apr_money}}</div>
							<router-link to="/funds">
								<div class="left_box_info3 f-text">
									流水明细</div>
							</router-link>
							<router-link to="/cash">
								<!-- <a class="cbtn">提现</a> -->
									 <van-button round block type="info" native-type="submit" class="small-btn"
            >提现</van-button>
							</router-link>
						</div>
						<div class="left_arrow"></div>
					</div>

					<div class="right">
						<!-- <div class="left_box_icon2"></div> -->
							<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#icondaishouhuo"></use>
				</svg>
						<div class="left_box">
							<div class="left_box_info1 f-text">
								待收本金(元)
							</div>
							<div class="left_box_info2">
								{{data.ds_money}}</div>
							<router-link to="/funds">
								<div class="left_box_info3 f-text">
									投资明细 </div>
							</router-link>
							<router-link to="/item">
								<!-- <a class="cbtn">投资</a> -->
								 <van-button round block type="info" native-type="submit" class="small-btn"
            >投资</van-button>
							</router-link>
						</div>
						<div class="left_arrow"></div>
					</div>
				</div>

				<div class="indexnav">
					<div class="nav_top">
						<router-link to="/notice">
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconxiaoxi"></use>
				</svg>
				<p>我的消息</p>
						</div>
							<!-- </div><img src="../index/image/huanbao/zxkf.png" /><span>我的消息</span> -->
							</router-link>
						
						<router-link to="/invest">
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconicon_A1"></use>
				</svg>
				<p>充值记录</p>
						</div>
						<!-- <img src="../index/image/huanbao/zjmx.png" /><span>充值记录</span> -->
						</router-link>
						<router-link to="/cost">
						<!-- <img src="../index/image/huanbao/txjl.png" /><span>提现记录</span> -->
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconicon_A"></use>
				</svg>
				<p>提现记录</p>
						</div>
						</router-link>

					</div>
				</div>
				<div class="indexnav">
					<div class="nav_top">
						<!-- <router-link to="/auth"><img src="./images/icon_1.svg" /><span>实名认证</span></router-link> -->
						<router-link to="/baoku">
						<!-- <img src="../index/image/huanbao/baoku.png" /><span>我的宝库</span> -->
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzhishibaoku"></use>
				</svg>
				<p>我的宝库</p>
						</div>
						</router-link>
						<router-link to="/account">
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzhanghu"></use>
				</svg>
				<p>账户信息</p>
						</div>
						<!-- <img src="../index/image/huanbao/zhxx.png" /><span>账户信息</span> -->
						</router-link>
						<router-link to="/touzi">
						<!-- <img src="../index/image/huanbao/tzmx.png" /><span>投资记录</span> -->
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#icontouzimingxichaxun"></use>
				</svg>
				<p>投资记录</p>
						</div>
						</router-link>
						
					</div>
				</div>


				<!-- 				<div class="indexnav">
					<div class="nav_top">
						<router-link to="/mission"><img src="../index/image/huanbao/mrfl.png" /><span>每日签到</span></router-link>
						<router-link to="/mission"><img src="../index/image/huanbao/zswd.png" /><span>每日答题</span></router-link>
						<router-link to="/mission"><img src="../index/image/huanbao/yqhy.png" /><span>环保知识</span></router-link>
					</div>
				</div> -->
				<div class="indexnav">
					<div class="nav_top">
						<!-- <router-link to="/forgetpwd"><img src="./images/icon_5.svg" /><span>修改密码</span></router-link> -->
						<router-link to="/share">
						<!-- <img src="../index/image/huanbao/yqhywd.png" /><span>邀请好友</span> -->
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconyaoqing"></use>
				</svg>
				<p>邀请好友</p>
						</div>
						</router-link>
						<router-link to="/active">
						<div class="img-item">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconshuiwuguanlixitong"></use>
				</svg>
				<p>税务申报</p>
						</div>
						<!-- <img src="../index/image/huanbao/rwzx.png" /><span style="color: red;">税务申报</span> -->
						</router-link>
						<router-link to="">
							<div class="img-item"  @click="logout">
										<svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#icontuichu"></use>
				</svg>
				<p>退出登陆</p>
						</div>
							<!-- <img src="../index/image/huanbao/tcdl.png" @click="logout" /><span>退出登陆</span> -->
							</router-link>
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
  data () {
    return {
      data: {},
    };
  },
  created () {
    if (this.$parent.getFooterType() === 'n2') {
      this.$router.replace('/user').catch(err => {
        err
      });
    }
    this.$parent.footer(true, 'info');
  },
  mounted () {
    this.start();
  },
  methods: {
    start () {
      // 修复个别手机不能滚动到顶端
      setTimeout(() => {
        var element = document.getElementById("app");
        element.scrollIntoView();
      }, 0)
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      Fetch('/user/info').then(res => {
        this.data = res.data;
        // console.log(this.data)
      })
    },
    logout () {
      this.$parent.setFooterType('n1');
      localStorage.removeItem('token');
      this.$router.replace('/login');
    },

  }
};
</script>

<style lang="less" scoped>
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
    margin-bottom: 0px;
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

.user_n2 {
  padding: 0 0 53px 0;
}

.user_n2 .mt0 {
  // background-image: url(../index/image/huanbao/mbpg.png);
  //     background-repeat: round;
  // padding-bottom: 8px;
  border-bottom: 4px solid #f4f4f4;
}

.user_n2 .user_top {
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

.user_n2 .user_top .user_top_left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.user_n2 .user_top .user_top_left .avator {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(./images/avator.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.user_n2 .user_top .user_top_left .mobile_info {
  color: #535252;
  font-size: 14px;
  margin: 0 5px;
}

.user_n2 .user_top .user_top_left .vip_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.user_n2 .user_top .user_top_left .vip_box .vip_icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: url(./images/vip1.svg);
  background-repeat: no-repeat;
  background-size: 12px 12px;
  position: relative;
  z-index: 2;
  background-position: center;
  background-color: #ffd200;
}

.user_n2 .user_top .user_top_left .vip_box .vip_info {
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

.user_n2 .user_top .user_top_left .vip_box .vip_info .right {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url(./images/vip_right.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.user_n2 .user_top .msg {
  display: inline-block;
  width: 23px;
  height: 23px;
  background-image: url(./images/msg.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.user_n2 .money_box {
  width: 90%;
  margin: 0 auto 16px auto;
  padding: 26px 10%;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#585858),
    to(#383838)
  );
  background-image: -o-linear-gradient(left, #585858, #383838);
  background-image: linear-gradient(to right, #585858, #383838);
  border-radius: 18px;
  color: #fefefe;
}

.user_n2 .money_box .money_info {
  // background-image:url(../index/image/huanbao/mpg.png);
  font-size: 14px;
  margin-bottom: 12px;
}

.user_n2 .money_box .money {
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

.user_n2 .money_box .money .rmb {
  font-size: 36px;
}

.user_n2 .money_box .money .withdraw_btn {
  font-size: 13px;
  color: #fefefe;
}

.user_n2 .notification_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 5%;
  background-color: #fe7b17;
  color: #ffffff;
}

.user_n2 .notification_box .left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 40%;
}

.user_n2 .notification_box /deep/ .van-notice-bar {
  height: 64px;
  background-color: #fe7b17;
}

.user_n2 .notification_box .left .icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(./images/notification.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 8px;
}

.user_n2 .notification_box .left .info {
  color: #ffffff;
  font-size: 13px;
  width: 100%;
}

.user_n2 .notification_box .right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.user_n2 .notification_box .right .info {
  font-size: 12px;
  color: #ffffff;
  margin-right: 6px;
}

.user_n2 .notification_box .right .icon {
  display: inline-block;
  width: 12px;
  height: 16px;
  background-image: url(./images/not_right.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.user_n2 .mt1 {
  background-color: #fff;
  border-bottom: 4px solid #f4f4f4;
  padding-left: 7.4%;
}

.user_n2 .mt1 .user_item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 47px;
}

.user_n2 .mt1 .user_item .icon {
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

.user_n2 .mt1 .user_item .icon > img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.user_n2 .mt1 .user_item .info {
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

.user_n2 .mt1 .user_item:first-child .info {
  border-bottom: 1px solid #e0e0e0;
}

.top {
  height: 250px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0 65px 15px;
  background: #1ca3ff;
  background-image: url(../index/image/huanbao/mbg2.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-repeat: round;
  border-radius: 0 0 10px 10px;
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
  display: flex;
  flex-direction: column;
  // margin-left: 60px;
}

.avator_right .avator_right_info1 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
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
  height: 220px;
  margin-top: -80px;
  margin-bottom: 40px;
}

.left {
  // display: flex;
  // margin-left: 10%;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}

.right {
  // display: flex;
  // margin-right: 10%;
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
  background: url(../index/image/huanbao/yue.png) no-repeat 50%;
  background-size: contain;
  margin-bottom: 15px;
}

.left_box_icon2 {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url(../index/image/huanbao/fenhoong.png) no-repeat 50%;
  background-size: contain;
  margin-bottom: 15px;
}

.cbtn {
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
.vip_leave {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 18%;
  right: 5%;

  &.VIP0 {
    background: url(../index/image/tree/v0_d.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP1 {
    background: url(./images/ico/vip1.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP2 {
    background: url(./images/ico/vip2.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP3 {
    background: url(./images/ico/vip3.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP4 {
    background: url(./images/ico/vip4.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP5 {
    background: url(./images/ico/vip5.png) no-repeat center center;
    background-size: 100% 100%;
  }

  &.VIP6 {
    background: url(./images/ico/vip6.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>

<style lang="scss" scoped>
.new-user {
  color: #ffffff;
  font-size: 28px;
  padding: 0px 40px;
  height: 320px;
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
}
.content2 {
  min-height: 360px;
  box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
  margin-top: -70px;
  color: $black;
  font-size: 28px;
  @include flex-between();
}
.left_box {
  div,
  a {
    margin-top: 10px;
  }
  .van-button__content {
    margin: 0;
    // margin-top: 10px;
  }
  align-items: center;
  .left_box_info2 {
    color: $money;
    font-size: 28px;
    font-weight: 500;
    margin-top: 16px;
  }
  .left_box_info3 {
    color: $orange;
    margin-bottom: 10px;
  }
}
.indexnav {
  background: none;
	padding: 0 30px;
}
.img-item{
	// box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
	background: #ffffff;
	border-radius: 12px;
	padding: 10px ;
	// border: 1px solid #f2f2f2;
}
.user_n2{
	background: #ffffff;
}
</style>