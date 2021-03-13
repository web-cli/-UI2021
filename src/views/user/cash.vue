<template>
    <div class="wrap">
        <!-- <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                提现
            </div>
        </div> -->
            <van-nav-bar
      title="提现"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
        <div class="withdraw_wrap">
            <form method="post" class="form" @submit.prevent="handleSubmit">
                <div class="bank_box" @click="show = true" ref="add">
                    <div class="left">
                        <div class="left_bank_name">{{bank.bank}}</div>
                        <div class="left_bank_number">{{bank.account}}</div>
                    </div>
                    <div class="right">
                        <span class="right_bank_name">{{bank.bank}}</span>
                        <span class="right_arrow"></span>
                    </div>
                </div>
                
                <div class="money_box">
                    <span class="rmb">¥</span>
                    <input class="inp inp_money" type="number" v-model="money" name="money" placeholder="请输入金额">
                </div>
                <div class="remain_money">可提现余额<span class="money"> {{data.money}} </span>元</div>
				<div class="remain_money">不可提现余额<span class="money"> {{data.nomoney}} </span>元</div>
				<div class="withdraw_warming">
				    <span class="left">(需要成长值{{data.need}}可提现，当前成长值为:<span class="money">{{data.value}}</span>)</span>
				</div>
				<div class="van-multi-ellipsis--l2 tips" v-if="footer_type === 'n2'">
					1.注册,签到,实名认证赠送的现金统一称为系统福利
				</div>
				<div class="van-multi-ellipsis--l3 tips" v-if="footer_type === 'n2'">
					2.成长值是您投资价格总值,例如:成功投资价值500项目,那么您的成长值就是500,成长值会一直累计。
				</div>
				<div class="van-multi-ellipsis--l4 tips" v-if="footer_type === 'n2'">
					3.成长值未达到2000 ,账户上的系统福利不可提出,系统赠送的福利金额可参与投资(您充值的本金利润满200元可以随时提,并不受成长值影响)
				</div>
                <div class="pay_box">
                    <!-- <span class="left_icon"></span> -->
                    <input type="password" class="inp_pay" v-model.trim="passwd" placeholder="请输入交易密码">
                    <!-- <span class="right_icon"></span> -->
                    <van-icon name="closed-eye"></van-icon>
                </div>
                <div class="forgetpay">
                    <div class="btn" @click="$router.push('/resetpaypwd')">忘记密码?</div>
                </div>
                <button type="submit" class="sbtn">立即提现</button>
                <!-- <p class="withdraw_tip">温馨提示: <br/>《1》申请提现时间为；每日09；00-23；00，提现申请成功递交后，将于1-20分钟内可以提现到您所绑定的银行卡账户上。<br/>《2》夜间22；00-09；00期间提现申请的资金，需在09；00之后由银行联系系统自动识别提现到账。 </p> -->
            </form>
        </div>
        <van-popup
                v-model="show"
                position="bottom"
                style="height: 60%"
        >
            <bank-select :onChange="selected"/>
        </van-popup>
    </div>
</template>

<script>

    import Vue from 'vue';
    import Fetch from '../../utils/fetch';
    import {Popup, Dialog} from 'vant';
    import select from './select';

    Vue.use(Popup);

    export default {
        name: "index",
        components: {
            'bank-select': select,
			'Dialog': Dialog.Component,
        },
        data() {
            return {
				footer_type: 'n1',
                show: false,
                data: {},
                bank: {},
                bank_id: 0,
                money: '',
                passwd: '',
				tip:0,
            };
        },
        created() {
			if (this.$parent.getFooterType() === 'n1') {
				this.$parent.footer(false);
			} else {
				this.$parent.footer(false);
				this.$data.footer_type = 'n2'
			}
            
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {

                Fetch('/user/cost_bank').then(res => {
                    this.data = res.data;
                    this.bank = res.data.bank;
					this.tip = res.data.tip;
					if(this.tip){
						Dialog.alert({
						  title: '提现提醒',
						  message: '工作时间为：9:30 - 22:30，提现成功后非工作时间提现需要延迟到次日工作时间出款。',
						}).then(() => {
						  // on close
						});
					}
                })
				
				// 先选择银行卡
				if(!this.bank.id&&this.bank.id!=0){
					this.$refs.add.click();
				}
            },
            handleSubmit() {
				Dialog.confirm({
				  title: '复投奖励公告',
				  message: '尊敬的动理会员<br>自动理APP于2020年11月20日推出银行转账充值赠送1%的福利政策，近期发现较多会员利用此规则，项目到期后，提现本金然后通过银行转账充值的方式来领取充值福利，每日从提现到充值，一出一进的操作流程，给动理APP的财务部门带来繁重的审核工作，也给会员续投带来不便，至此动理APP于2021年1月13日推出复投奖励政策，项目到期后参与投资3000以上，即送1.2%的复投奖励，以缓解动理APP财务部门工作量跟会员的便捷性。<br>动理APP运营部<br>2021年1月31日',
				  theme: 'round-button',
				  confirmButtonText:'确认提现',
				  cancelButtonText:'返回投资'
				}).then(() => {
					if (!this.bank.id&&this.bank.id!=0) {
					    this.$notify('请选择提现银行卡');
					    return;
					}
					
					if (!this.money) {
					    this.$notify('请输入提现金额');
					    return;
					}
					
					Fetch('/user/cost_apply', {
					    money: this.money,
					    bank_id: this.bank.id,
					    passwd: this.passwd
					}).then(() => {
					
					    this.$notify({
					        background: '#07c160',
					        message: '提现申请成功'
					    });
					
					    this.$router.back();
					})
				  })
				  .catch(() => {
					// on cancel
					this.$router.replace('/item');
				  });

                
            },
            selected(bank) {
                this.show = false;
                this.bank = bank;
            },
        }
    };
</script>

<style lang="less" scoped>

    .forgetpay{
        padding-bottom: 15px;
        height: 30px;
        .btn{
            float: right;
            font-size: 26px;
            color: #00A0E9;
            margin: 10px 0;
        }
    }

    input::-webkit-input-placeholder { /* WebKit browsers */
        color: #666666;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #666666;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #666666;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #666666;
    }

    .withdraw_wrap .form {
        display: block;
        width: 94%;
        margin: 0 auto;
    }

    .withdraw_wrap .form .bank_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: 160px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 24px 0 48px;
        background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
        background-image: -o-linear-gradient(left, #666666, #262627);
        background-image: linear-gradient(to right, #666666, #262627);
        margin: 44px auto 68px auto;
        -webkit-box-shadow: 0 1px 6px 0 #7d7c7c;
        // box-shadow: 0 1px 6px 0 #7d7c7c;
        box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
    }

    .withdraw_wrap .form .bank_box .left .left_bank_name {
        color: #efeff4;
        font-size: 36px;
        margin-bottom: 16px;
    }

    .withdraw_wrap .form .bank_box .left .left_bank_number {
        color: #efeff4;
        font-size: 28px;
    }

    .withdraw_wrap .form .bank_box .right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .withdraw_wrap .form .bank_box .right .right_bank_name {
        font-size: 30px;
        color: #f3b467;
        margin-right: 26px;
    }

    .withdraw_wrap .form .bank_box .right .right_arrow {
        display: inline-block;
        width: 16px;
        height: 32px;
        background-image: url(./images/right_arrow.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .withdraw_wrap .form .withdraw_warming {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        color: #969799;
    }

    .withdraw_wrap .form .withdraw_warming .left {
        font-size: 26px;
        white-space: nowrap;
        margin-right: 32px;
        line-height: 60px;
    }

    .withdraw_wrap .form .withdraw_warming .right {
        font-size: 24px;
        white-space: pre-wrap;
        line-height: 44px;
        text-align: right;
    }

    .withdraw_wrap .form .money_box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        overflow: hidden;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 20px auto 36px auto;
    }

    .withdraw_wrap .form .money_box .rmb {
        font-size: 43px;
        color: #212121;
    }

    .withdraw_wrap .form .money_box .inp_money {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        font-size: 68px;
        color: #242e39;
        padding: 0 10px;
        line-height: 40px;
    }

    .withdraw_wrap .form .remain_money {
        font-size: 30px;
		// line-height: 20px;
        color: #242e39;
        // margin:20px 0;
        margin-bottom: 30px;
    }

    .withdraw_wrap .form .remain_money .money {
        // color: #f3b467;
    }

    .withdraw_wrap .form .pay_box {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 92px;
        padding: 0 14px 0 12px;
        margin: 15px auto;
        -webkit-box-shadow: 0 1px 8px 0 #F1F1F1;
        box-shadow: 0 1px 8px 0 #F1F1F1;
        border-radius: 2px;
    }

    .withdraw_wrap .form .pay_box .left_icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 18px;
        flex: 0 0 18px;
        height: 20px;
        background-image: url(./images/password.svg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .withdraw_wrap .form .pay_box .right_icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 20px;
        flex: 0 0 20px;
        height: 40px;
        background-image: url(./images/eye_close.svg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .withdraw_wrap .form .pay_box .right_icon.right_icon_open {
        background-image: url(./images/eye_open.svg);
    }

    .withdraw_wrap .form .pay_box .inp_pay {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0 10px;
        font-size: 28px;
        line-height: 14px;
        color: #212121;
    }

    .withdraw_wrap .form .sbtn {
        display: block;
        width: 100%;
        height: 84px;
        line-height: 84px;
        text-align: center;
        background: #fe7b17;
        border-radius: 40px;
        font-size: 36px;
        color: #fff;
        margin-top: 30px;
    }

    .withdraw_wrap .form .withdraw_tip {
        font-size: 24px;
        color: #212121;
        opacity: .5;
        line-height: 1.7;
        margin-top: 16px;
    }
</style>

<style lang="scss" scoped>
.withdraw_wrap{
    margin-top: 120px;
}
.wrap{
    background: #ffffff;
}
.tips{
    color: #cbc9cc;
    line-height: 1.6;
    margin: 10px;
}
</style>
