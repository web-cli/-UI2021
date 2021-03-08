<template>
  <div class="main">
    <!-- <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                登陆
            </div>
        </div> -->
    <van-nav-bar
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="choose_btn">
      <router-link to="/login" class="l_btn cur">登陆</router-link>
      <router-link to="/register" class="l_btn">注册</router-link>
    </div>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="item">
        <div class="content">
          <span class="left_icon phone_icon"></span>
          <input
            v-model.trim="data.username"
            class="inp"
            type="text"
            placeholder="请输入手机号码"
          />
          <span class="right_icon clear_icon" @click="clear()"></span>
        </div>
      </div>
      <div class="item item_pwd">
        <div class="content">
          <span class="left_icon pwd_icon"></span>
          <input
            v-model.trim="data.password"
            autocomplete="off"
            class="inp"
            :type="psd"
            placeholder="请输入登录密码"
          />
          <span
            class="right_icon show_icon"
            :class="psd == 'password' ? '' : 'show'"
            @click="show_psd"
          ></span>
        </div>
      </div>

      <label class="contract">
        <van-checkbox v-model="checked" icon-size="14px" sytle="color:#000;"
          >我已阅读并同意</van-checkbox
        >
        <!--                <router-link to="/regContact">用户协议</router-link>-->
        <router-link to="/art/12">《用户协议》</router-link>和<router-link
          to="/art/13"
          >《隐私政策》</router-link
        >
      </label>
      <div class="item login_box">
        <van-button
          type="primary"
          class="btn basic_btn_v2"
          color="linear-gradient(to right, #1db8f7, #1464f3)"
          size="large"
          >立即登录</van-button
        >
      </div>
      <div class="item item_forget">
        <router-link to="/forgetpwd" class="forgetpwd">忘记密码？</router-link>
      </div>
    </form>
    <div class="footer_bg"></div>
  </div>
</template>

<script>

import Vue from 'vue';
import qs from 'qs'
import { CountDown, Checkbox, Button } from 'vant';
import Fetch from '../../utils/fetch'

Vue.use(CountDown).use(Checkbox).use(Button);
export default {
  name: "index",
  components: {},
  data () {
    return {
      data: {},
      bg: '',
      checked: true,
      config: {},
      psd: 'password'
    };
  },
  created () {
    this.$parent.footer(false);
  },
  mounted () {
    this.start();
  },
  methods: {
      onClickLeft(){
          this.$router.push({path:'/user'})
      },
    start () {
      Fetch('/index/webconfig', { type: 'bg' }).then(res => {
        this.bg = 'url("' + res.data.login + '")';
      })
    },
    clear () {
      this.data.username = '';
    },
    show_psd () {
      console.log(this.psd)
      if (this.psd == 'password') {
        this.psd = 'text';
      } else {
        this.psd = 'password';
      }
    },

    handleSubmit () {

      if (!this.data.username) {
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

      if (!this.checked) {
        this.$notify({
          message: '请同意用户协议',
          color: '#FF3232',
          background: '#FFEAEA',
        });
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
        Fetch('/index/tree').then(res => {
          if (res.data.adv_icon.length > 0) {
            this.$router.replace('/');
          } else {
            this.$router.replace('/index');
          }
        })
        // this.$router.replace({
        //     path: this.$router.history.current.query.redirect || "/"
        // });
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
  justify-content: flex-start;
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
}

.form {
  width: 100%;
  padding: 0 44px;
  margin: 78px auto 0 auto;
  z-index: 2;
}

.form .item {
  position: relative;
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

.form .item .content .left_icon {
  display: inline-block;
  width: 32px;
  height: 27px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.form .item .content .phone_icon {
  background-image: url(images/tel.png);
}

.form .item .content .pwd_icon {
  background-image: url(images/suo.png);
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
  background-image: url(images/biyan.png);
}
.form .item .content .show_icon.show {
  background-image: url(images/zhengyan.png);
}

.form .item .content .inp {
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

.form .item_pwd {
  margin-top: 36px;
}

.form .item_forget {
  margin-top: 52px;
  text-align: center;
}

.form .item_forget .forgetpwd {
  color: #999999;
  font-size: 14px;
  width: 100%;
  line-height: 20px;
}

.form .item .btn {
  width: 64%;
  height: 36px;
  line-height: 36px;
}

.login_box {
  display: flex;
  justify-content: center;
  margin-top: 42px;
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
@media (max-height: 600px) {
  .form .item_forget {
    margin-top: 12px;
  }
  .form {
    margin: 40px auto 0 auto;
  }
}
</style>


