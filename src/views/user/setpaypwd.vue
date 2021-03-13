<template>
    <div style="background:#ffffff;">
        <!-- <div class="header">
            <div class="head">
                <router-link to="/account" class="back"></router-link>
                设置支付密码
            </div>
        </div> -->
               <van-nav-bar
        title="设置支付密码"
        left-arrow
        fixed
        @click-left="$router.push({path:'/account'})"
      />
        <van-form @submit="handleSubmit" style="margin-top: 46px;background:#ffffff;">
   
    <van-field
    v-model="passwd"
    type="password"
    name="密码"
    label="登录密码"
    placeholder="登录密码"
    :rules="[{ required: true, message: '请填写登录密码' }]"
  />
   <van-field
    v-model="npasswd"
    type="password"
    name="新密码"
    label="新密码"
    placeholder="新密码"
    :rules="[{ required: true, message: '请填写新密码' }]"
  />
  <van-field
    v-model="snpasswd"
    type="password"
    name="确认新密码"
    label="确认新密码"
    placeholder="确认新密码"
    :rules="[{ required: true, message: '请确认新密码' }]"
  />
      <van-field
          name="smscode"
          v-model.trim="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <!-- <van-button size="small" type="info">发送验证码</van-button> -->
            <van-count-down :time="time" @finish="timeCall">
              <template v-slot="timeData">
                <van-button round type="info" @click="sendcode" size="small">{{
                  timeData.seconds > 0 ? timeData.seconds : '获取验证码'
                }}</van-button>
              </template>
            </van-count-down>
          </template>
        </van-field>
       <div class="warming" style="margin-left:20px">提醒：支付密码默认为登录密码</div>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>

</van-form>
        <!-- <div class="resetpaypwd_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <label class="item">
                    <span class="info">旧密码</span>
                    <input type="password" class="inp oldpwd" v-model.trim="passwd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">新密码</span>
                    <input type="password" class="inp newpwd" v-model.trim="npasswd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">确认新密码</span>
                    <input type="password" class="inp confirm_newpwd" v-model.trim="snpasswd" placeholder="请输入">
                </label>
                <div class="warming">提醒：支付密码默认为登录密码</div> -->
                <!--                <div class="forget_box">-->
                <!--                    <router-link to="/forgetpwd" class="forget"><span class="icon">&nbsp;?</span><span class="info">忘记密码</span></router-link>-->
                <!--                </div>-->
                <!-- <button type="submit" class="sbtn">确定修改</button>
            </form>
        </div> -->
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                passwd: '',
                npasswd: '',
                snpasswd: '',
                is_send: false,
                  time: 0,
                  code:''
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            // this.start();
        },
        methods: {
            handleSubmit() {

                if (!this.passwd) {
                    this.$notify("请输入原支付密码");
                    return;
                }

                if (!this.npasswd) {
                    this.$notify("请输入新支付密码");
                    return;
                }

                if (!this.snpasswd) {
                    this.$notify("请输入确认密码");
                    return;
                }

                if (this.npasswd !== this.snpasswd) {
                    this.$notify("新密码和确认密码不一致");
                    return;
                }

                Fetch("/user/repaypasswd", {
                    passwd: this.passwd,
                    npasswd: this.npasswd
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '修改成功'
                    });
                    this.$router.back();
                });
            },
            // 短信验证码
              timeCall () {
      this.is_send = false;
      this.time = 0;
    },
    // 注意 这是注册时候的验证码 你需要先传入用户的手机号码
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
        }
    };
</script>

<style lang="less" scoped>

    .resetpaypwd_wrap .form {
        display: block;
        width: 92.8%;
        margin: 0 auto;
        padding-top: 15px;
    }
    .warming {
        font-size: 12px;
        line-height: 1.7;
        color: #F01516;
        padding: 20px 0;
    }
    .resetpaypwd_wrap .form .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        position: relative;
        height: 48px;
    }

    .resetpaypwd_wrap .form .item .info {
        font-size: 15px;
        color: #303442;
    }

    .resetpaypwd_wrap .form .item .inp {
        font-size: 15px;
        color: #303442;
        text-align: right;
        padding: 0 16px;
        line-height: 17px;
    }

    .resetpaypwd_wrap .form .item:after {
        position: absolute;
        content: "";
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
        left: 0;
        bottom: 0;
    }

    .resetpaypwd_wrap .form .forget_box {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        margin: 16px auto 26px auto;
    }

    .resetpaypwd_wrap .form .forget_box .forget {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .resetpaypwd_wrap .form .forget_box .forget .icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 18px;
        height: 18px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 16px;
        color: #fff;
        background: #e9c37d;
        border-radius: 18px;
        margin-right: 6px;
    }

    .resetpaypwd_wrap .form .forget_box .forget .info {
        font-size: 13px;
        color: #303442;
    }

    .resetpaypwd_wrap .form .sbtn {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        background: #e8c27d;
        border-radius: 2px;
        font-size: 16px;
        color: #fff;
        -webkit-box-shadow: 0 2px 10px 0 #f2dbb2;
        box-shadow: 0 2px 10px 0 #f2dbb2;
    }
</style>