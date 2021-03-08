<template>
  <div class="main">
    <!-- <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                注册
            </div>
        </div>
        <div class="choose_btn">
        	<router-link to="/login" class="l_btn">登陆</router-link>
        	<router-link to="/register" class="l_btn cur">注册</router-link>
        </div> -->
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active" @click="onClickTab" color="#1989fa">
      <van-tab title="登陆"></van-tab>
      <van-tab title="注册"></van-tab>
    </van-tabs>

    <div class="form">
      <div class="content clearfix">
        <span class="left_icon phone_icon"></span>
        <input
          class="inp phone"
          id="phone"
          name="phone"
          type="text"
          v-model.trim="data.mobile"
          placeholder="请输入手机号码"
        />
        <span class="right right_icon clear_icon" @click="clear()"></span>
      </div>

      <div class="content clearfix">
        <span class="left_icon pwd_icon"></span>
        <input
          class="inp pwd"
          :type="psd"
          name="pwd"
          v-model.trim="data.password"
          placeholder="请设置登录密码"
        />
        <span
          class="right_icon show_icon"
          :class="psd == 'password' ? '' : 'show'"
          @click="show_psd"
        ></span>
      </div>
      <div class="content clearfix">
        <span class="left_icon pwd_icon"></span>
        <input
          class="inp pwd2"
          :type="psd"
          id="pwd2"
          name="pwd2"
          v-model.trim="data.spassword"
          placeholder="请再输入登录密码"
        />
        <span
          class="right_icon show_icon"
          :class="psd == 'password' ? '' : 'show'"
          @click="show_psd"
        ></span>
      </div>
      <!--            <div class="content clearfix">
                <input class="inp inp1" type="text" v-model.trim="data.image_code" placeholder="请输入图形验证码">
                <img class="right click_code image_code" :src="base64Image" @click="getImageCode"/>
            </div> -->
      <div class="content clearfix">
        <input
          class="inp inp1"
          id="smsCode"
          name="smscode"
          v-model.trim="data.code"
          type="text"
          placeholder="请输入短信验证码"
        />
        <van-count-down :time="time" @finish="timeCall">
          <template v-slot="timeData">
            <van-button round type="info" @click="sendcode" size="normal">{{
              timeData.seconds > 0 ? timeData.seconds : '获取验证码'
            }}</van-button>
          </template>
        </van-count-down>
      </div>
      <div class="content clearfix">
        <span class="left_icon invite_icon"></span>
        <input
          class="inp inp2"
          name="top"
          value="{$phone}"
          :readonly="is_t_inp"
          v-model.trim="data.t_mobile"
          type="text"
          placeholder="推荐人手机号(没有可不填)"
        />
        <input type="hidden" id="imei" name="imei" v-model.trim="data.imei" />
        <input
          type="hidden"
          id="devtype"
          name="devtype"
          v-model.trim="data.devtype"
        />
      </div>
      <label class="contract">
        <van-checkbox v-model="checked" icon-size="14px"
          >我已阅读并同意</van-checkbox
        >
        <router-link to="/art/12">《用户协议》</router-link>和<router-link
          to="/art/13"
          >《隐私政策》</router-link
        >
        <!--                <router-link to="/regContact">用户协议</router-link>
                <router-link style="margin-left: 5px" v-if="config.user_contract_name" :to="config.user_contract_link">
                    《{{config.user_contract_name}}》
                </router-link>
                <router-link style="margin-left: 5px" v-if="config.user_contract_ys_name"
                             :to="config.user_contract_ys_link">
                    《{{config.user_contract_ys_name}}》
                </router-link>-->
      </label>
      <van-button
        type="primary"
        @click="handleSubmit"
        class="btn basic_btn_v2"
        color="linear-gradient(to right, #1db8f7, #1464f3)"
        size="large"
        >立即注册</van-button
      >
      <!-- <button type="submit" class="btn basic_btn_v2" :class="data.mobile!=''&&data.password!=''?'':'no_touch'">立即注册</button> -->
    </div>
    <router-link to="/login" class="login">已有账号？请登录</router-link>
    <div class="footer_bg"></div>
  </div>
</template>

<script>

import Vue from 'vue';
import qs from 'qs'
import { CountDown, Button, Checkbox } from 'vant';
import Fetch from '../../utils/fetch'
import { getidfa, getUrlKey, gettype } from "../../utils/sys.js";
Vue.use(CountDown).use(Checkbox).use(Button);

export default {
  name: "index",
  data () {
    return {
      time: 0,
      bg: '',
      data: {
        t_mobile: '',
        imei: '',
        devtype: '',
      },
      base64Image: '',
      is_t_inp: false,
      is_send: false,
      checked: true,
      psd: 'password',
      config: {},
      delivery_asn: '',
      active:1
    }
  },
  created () {
    this.$parent.footer(false);
    this.data.imei = getidfa();
    this.data.devtype = gettype();
  },
  mounted () {
    this.delivery_asn = getUrlKey("m", window.location.href);
    this.data.t_mobile = this.delivery_asn;
    if (this.data.t_mobile) {
      this.is_t_inp = true;
    }

    this.start();
    // this.getImageCode();
  },
  methods: {
    onClickLeft () {
      this.$router.push({ path: '/user' })
    },
    onClickTab (name, title) {
      const PATH = name === 0 ? '/login' : '/register'
      this.$router.push({ path: PATH })
    },
    show_psd () {
      console.log(this.psd)
      if (this.psd == 'password') {
        this.psd = 'text';
      } else {
        this.psd = 'password';
      }
    },
    getImageCode () {
      Fetch("/index/imageCode").then(res => {
        this.base64Image = res.data.code;
      });
    },
    start () {
      // Fetch('/index/webconfig', {type: 'bg'}).then(res => {
      //     this.bg = 'url("' + res.data.reg + '")';
      // })
      Fetch('/index/webconfig', { type: 'web' }).then(res => {
        this.config = res.data
      })
    },
    clear () {
      console.log(this.data.mobile)
      this.data.mobile = '';
    },
    timeCall () {
      this.is_send = false;
      this.time = 0;
    },
    sendcode () {

      if (this.is_send) {
        return;
      }

      if (!this.data.mobile) {
        this.$notify({
          message: '请输入手机号',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      //            if (!this.data.image_code) {
      // this.$notify({
      //     message: '请输入图片验证码',
      // 	color: '#FF3232',
      // 	background: '#FFEAEA',
      // });
      //                return;
      //            }

      this.is_send = true;

      Fetch("/index/register_code", {
        // image_code: this.data.image_code,
        type: 'register',
        mobile: this.data.mobile
      }).then(() => {
        this.time = 60 * 1000;
        this.$notify({
          background: '#EAF1FF',
          color: '#3292FF',
          message: '发送成功'
        });
        // this.getImageCode();
      }).catch(() => {
        this.is_send = false;
        // this.getImageCode();
      });

    },
    handleSubmit () {
      if (!this.data.mobile) {
        this.$notify({
          message: '请输入您的手机号',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      if (!this.data.password) {
        this.$notify({
          message: '请输入登录密码',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      if (this.data.password !== this.data.spassword) {
        this.$notify({
          message: '两次输入的密码不一至',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      if (!this.data.code) {
        this.$notify({
          message: '请输入验证码',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      if (!this.checked) {
        this.$notify({
          message: '请同意用户协议',
          color: '#FF3232',
          background: '#FFEAEA',
        });
        return;
      }

      Fetch("/index/register", {
        ...this.data
      }).then((res) => {
        this.$notify({
          background: '#EAF1FF',
          color: '#3292FF',
          message: '注册成功'
        });
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        if (res.data.app_link && this.imei == '') {
          location.href = res.data.app_link;
        } else {
          this.$router.replace('/tree');
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.choose_btn {
  width: 208px;
  margin: 44px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  color: #ceced0;
  height: 45px;
  text-align: center;
  line-height: 45px;
  .l_btn {
    width: 50%;
    &.cur {
      color: #333333;
      border-bottom: 2px solid #000000;
    }
  }
}

.main {
  position: relative;
  padding-top: 1px;
  padding-bottom: 20px;
  background-color: #ffffff;
  min-height: 100%;

  .contract {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 8px 0 0 2px;
    color: #000000;
    font-size: 12px;

    > a {
      color: #0d48c7;
    }

    /deep/ .van-checkbox .van-checkbox__label {
      color: #000000;
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

  .form {
    width: 100%;
    padding: 0 48px;
    position: relative;
    margin-top: 17px;
  }

  .form .content {
    width: 100%;
    height: 38px;
    margin-top: 20px;
    border-bottom: 1px solid #f0f1f3;
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
    position: relative;
    z-index: 4;
  }

  .form .content .left_icon {
    display: inline-block;
    width: 32px;
    height: 27px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .form .content .phone_icon {
    background-image: url(images/tel.png);
  }

  .form .content .pwd_icon {
    background-image: url(images/suo.png);
  }
  .form .content .invite_icon {
    background-image: url(images/tuijian.png);
  }

  .form .content .right_icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
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
    background-image: url(images/biyan.png);
  }
  .form .content .show_icon.show {
    background-image: url(images/zhengyan.png);
  }

  .form .content .getsms {
    display: inline-block;
    width: 88px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(202, 162, 98, 1) 0%,
      rgba(226, 195, 151, 1) 100%
    );
    color: #7d5319;
    font-size: 14px;
  }

  .form .content .captcha_img {
    display: inline-block;
    width: 88px;
    height: 28px;
  }

  .form .content .inp {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 7px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    background: transparent;
    color: #000;
  }

  .form .content .inp1 {
    width: 50%;
  }

  .form .content .inp2 {
    width: 80%;
  }

  .form .btn {
    display: block;

    line-height: 36px;
    margin-top: 15px;
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
.footer_bg {
  width: 100%;
  max-width: 750px;
  position: absolute;
  height: 94px;
  background: url(./images/login_bg.png) no-repeat top center;
  background-size: 100% 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}
</style>


