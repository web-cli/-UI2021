<template>
  <div class="invest-detail" style="height: 92vh">
    <!-- <div class="header" style="height: 46px;">
      <div class="head" style="height: 46px; line-height: 46px;font-size: 16px; z-index: 2;">
        <a @click="back()" class="back invest-back"></a>
        立即投标
      </div>
    </div> -->

    <van-nav-bar
      title="立即投标"
      left-arrow
      fixed
      @click-left="back()"
    /> 
    <div class="login-top content">
      			<!-- <svg class="svg iconImg" aria-hidden="true">
					<use xlink:href="#iconzhanghu1"></use>
				</svg> -->
    </div>
<!-- 
    <div class="mt0">
      <div class="mt0_main">
        <div class="mt0_content">
          <div class="mt0_item">
            <div class="mt0_item_title">账户可用余额（元）</div>
            <div class="mt0_item_money">¥ {{ data.user_money }}元</div>
          </div>
          <div class="mt0_item mt0_item_last">
            <div class="mt0_item_title">项目可投金额（元）</div>
            <div class="mt0_item_money">¥ {{ data.kt_money }}元</div>
          </div>
        </div>
      </div>
      <img class="mt0_bottom" src="./images/bid_bottom.png" alt="" />
    </div> -->
    <form method="post" class="form" @submit.prevent="handleSubmit">
      <div class="top">
           <div class="form_item">
          <div class="form_item_left">账户可用余额（元）</div>
          <div>
            ¥ <span class="red">{{ data.user_money }}元</span>
          </div>
        </div>
           <div class="form_item">
          <div class="form_item_left">项目可投金额（元）</div>
          <div>
            ¥ <span class="red">{{ data.kt_money }}元</span>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">起投金额</div>
          <div>
            ¥ <span class="red">{{ data.min }}元</span>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">结息时间</div>
          <div v-if="data.type === 7">每<span class="yellow">1小时</span>自动结息</div>
          <div v-else>满<span class="yellow">24小时</span>自动结息</div>
        </div>
        <div class="form_item">
          <div class="form_item_left tz-monney">投资金额</div>
          <div class="form_item2">
            <div>
              <span class="money_btn decrease" @click="setNum(1)">-</span>
              <input type="text" v-model="money" name="money" id="money" class="bid_money" />
              <span class="money_btn increase" @click="setNum(0)">+</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="box">
        <div class="item clearfix">
          <!-- <span class="icon"></span> -->
          <van-field readonly>
            <template #button>
              <div class="tip">
                最低起投 <span class="yellow">{{ data.min }}</span
                >元，加一次为<span class="yellow">{{ data.min }}</span
                >元
              </div>
            </template>
          </van-field>

          <van-cell-group>
            <van-field
              left-icon="bill"
              v-model="passwd"
              type="password"
              placeholder="请输入交易密码"
            />
          </van-cell-group>

          <!-- <input type="password" class="pwd" name="pwd" v-model.trim="passwd" placeholder="请输入交易密码"> -->
          <!-- <span class="right"></span> -->
        </div>
      </div>
      <div class="box3">
        <div class="forgetpay">
          <div class="lbtn" @click="$router.push('/resetpaypwd')">忘记密码?</div>
        </div>
        <div class="item clearfix"></div>
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
import Fetch from '../../utils/fetch';
import Vue from 'vue';
import { Field, Popup, CouponCell, CouponList } from 'vant';
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(Popup).use(Field);

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {},
      money: 0,
      passwd: '',
      id: 0,
      chosenCoupon: -1,
      showList: false,
      coupons: [],
      disabledCoupons: []
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
      if (num == 0) {
        this.money = Number(this.money) + Number(this.data.min);
      } else {
        this.money =
          Number(this.money) - Number(this.data.min) < 0
            ? 0
            : Number(this.money) - Number(this.data.min);
      }
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      console.log(index);
    },
    onExchange(code) {
      this.coupons.push(coupon);
      console.log('code:' + code);
    },
    start() {
      Fetch('/index/item_view_apply_new', {
        id: this.id
      }).then(res => {
        this.data = res.data.view;
        for (let j = 0; j < this.data.quan.length; j++) {
          let item = new Array();

          if (this.data.quan[j].status == 1) {
            item = {
              id: this.data.quan[j].id,
              reason: '',
              condition: this.data.quan[j].name,
              value: this.data.quan[j].num,
              name: this.data.quan[j].name,
              startAt: this.data.quan[j].starttime,
              endAt: this.data.quan[j].endtime,
              valueDesc: this.data.quan[j].num + '%',
              unitDesc: ''
            };
            this.coupons.push(item);
          } else {
            item = {
              id: this.data.quan[j].id,
              reason: '每日返息不可用',
              condition: this.data.quan[j].name,
              value: this.data.quan[j].num,
              name: '有效期',
              startAt: this.data.quan[j].starttime,
              endAt: this.data.quan[j].endtime,
              valueDesc: this.data.quan[j].num + '%',
              unitDesc: ''
            };
            this.disabledCoupons.push(item);
          }

          console.log(item.value);
          console.log(item.name);
        }

        this.money = Number(res.data.view.min);
      });
    },
    back() {
      this.$router.push('/item/' + this.id).catch(err => {
        err;
      });
    },
    getClass(channel) {
      return 'recharge_online_' + channel;
    },
    handleSubmit() {
      if (!this.money) {
        this.$notify('请输入投入金额');
        return;
      }

      if (!this.passwd) {
        this.$notify('请输入交易密码');
        return;
      }
      var lid = this.chosenCoupon === -1 ? 0 : this.coupons[this.chosenCoupon].id;
      console.log(lid);
      Fetch('/index/item_new_apply', {
        id: this.id,
        lid: lid,
        money: this.money,
        pwd: this.passwd
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '投资成功'
        });
        this.$router.replace('/touzi');
      });
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
    font-size: 28px;
    color: #00a0e9;
    padding-right: 50px;
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
  padding: 40px 0 0 0;
  background: #544b5e;
  position: relative;
  z-index: 1;
}

.mt0 .mt0_main {
  width: 92%;
  margin: 0 auto;
  padding: 2px 0 100px 0;
  background: #e8c27d;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.mt0 .mt0_main .mt0_title {
  height: 92px;
  line-height: 92px;
  color: #544b5e;
  font-size: 48px;
  text-align: center;
  border-bottom: 2px solid #544b5e;
}

.mt0 .mt0_main .mt0_content {
  padding: 32px 2.2%;
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
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  padding: 0 8px 0 16px;
  color: #e8c27d;
  font-size: 24px;
  background: #333333;
  text-align: left;
  margin-bottom: 40px;
	// width: 248px;
}

.mt0 .mt0_main .mt0_content .mt0_item .mt0_item_money {
  font-size: 34px;
  color: #333333;
  text-align: left;
  padding-left: 16px;
}

.mt0 .mt0_main .mt0_content .mt0_item_last .mt0_item_money {
  text-align: right;
  padding-right: 16px;
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
  padding: 2px 0;
  width: 92.4%;
  margin: -40px auto 0 auto;
  border-radius: 12px;
  position: relative;
  -webkit-box-shadow: 0 6px 8px 2px #e7e8e8;
  box-shadow: 0 6px 8px 2px #e7e8e8;
  z-index: 4;
}

.form .top {
  padding: 26px 4.8% 0 4.8%;
  background: #fff;
  border-radius: 24px 24px 0 0;
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
  font-size: 30px;
  height: 60px;
  border-radius: 60px;
  padding: 0 28px;
  margin-top: 30px;
  background: #ffffff;
}

.form .top .form_item .yellow {
  color: #fe7b17;
}

.form .top .form_item .form_item_left {
  color: #5c5c5f;
}

.form .top .form_item1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: #333333;
  font-size: 30px;
  font-weight: 600;
  padding-left: 28px;
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
}

.form .top .form_item2 > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-align: center;

  -ms-flex-align: center;

  align-items: center;
}

.form .top .form_item2 > div .money_btn {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  color: #fff;
  background: #473e51;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.form .top .form_item2 > div .increase {
  background: #333333;
  // background: #e8c27d;
  color: #ffffff;
}

.form .top .form_item2 > div .bid_money {
  color: #333333;

  width: 152px;
  font-size: 36px;
  padding: 0 12px;
  text-align: center;
}

.form .box {
  // border-top: 2px solid #d5d5d5;
  // border-bottom: 2px solid #d5d5d5;
  padding: 20px 4.8% 10px 4.8%;
  background: #ffffff;
}

.form .box .remian_money {
  text-align: right;
  padding-right: 40px;
  font-size: 12px;
  color: #544b5e;
}

.form .box .remian_money > span {
  display: inline-block;
  color: #e8c27d;
  padding: 0 6px;
  line-height: 18px;
}

.form .box .remian_money > span {
  font-size: 28px;
}

.form .box3 {
  padding: 40px 4.8% 28px 4.8%;
  background: #fff;
  border-radius: 0 0 12px 12px;
}

.form .box3 .item .icon {
  float: left;
  width: 36px;
  height: 36px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(images/withdraw_pwd.png);
  margin-right: 10px;
}

.form .box3 .item .pwd {
  float: left;
  width: 50%;
  font-size: 30px;
  color: #544b5e;
  height: 44px;
  line-height: 36px;
}

.form .box3 .item .right {
  float: right;
  width: 32px;
  height: 36px;
  background: url(images/withdraw_hide.png) no-repeat center;
  background-size: contain;
}

.form .box3 .item .show {
  background: url(images/withdraw_show.png) no-repeat center;
  background-size: contain;
}

.form .btn {
  display: block;
  width: 100%;
  height: 72px;
  line-height: 72px;
  color: #ffffff;
  text-align: center;
  border-radius: 72px;
  background: #2c6dfb;
  font-size: 34px;
  position: absolute;
  bottom: -140px;
  left: 50%;
  font-weight: 500;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 1;
  margin-top: 40px;
}

.tz-monney {
  margin-bottom: 18px;
}

.yellow {
  color: #e8c27d;
}

.tip {
  color: #ccc;
}

</style>
<style lang="scss" scoped>
.content{
  margin-top: 100px;
}
.form{
  margin-top: -240px;
}
.yellow{
  color: #fe7b17;
}
.red{
  color: #ee0a24;
  font-weight: 500;
}
</style>
