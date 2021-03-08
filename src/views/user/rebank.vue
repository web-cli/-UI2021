<template>
    <div class="container" style="background-color: rgb(244, 245, 247); height: 100%; position: inherit;">
        <div class="header">
            <div class="head">
                <router-link to="/recharge" class="back"></router-link>
                银行入款充值
            </div>
        </div>
		<div  class="rebank_infos">
			<div  class="van-hairline--bottom">
				<span >转账金额：<span >￥</span>{{money}}</span>
			</div>
		</div>
        <div  class="rebank_infos">
			<div class="van-hairline--bottom">
			    <span>收款银行：<span>{{bank_name}}</span></span>
			</div>
			<div class="van-hairline--bottom">
			    <span>收款人：<span>{{bank_user}}</span></span>
			    <button v-clipboard="() => bank_user" v-clipboard:success="copy" class="copy">
				<img  src="./images/copy.png" alt="" style="width: 4vw;">
				</button>
			</div>
			<div>
			    <span>收款账号：<span>{{bank_card}}</span></span>
			    <button v-clipboard="() => bank_card" v-clipboard:success="copy" class="copy">
				<img  src="./images/copy.png" alt="" style="width: 4vw;">
				</button>
			</div>
		</div>
		<p  style="color: rgb(204, 0, 1);">
			请复制充值页面上的户名跟银行账户，登陆您的手机银行进行银行转账汇款。
		</p>
		<div  class="rebank_infos">
			<label  class="van-hairline--bottom">
				<span >付款人：<input  type="text" v-model.trim="pay_user" placeholder="请输入付款人"></span>
			</label>
			<label  class="van-hairline--bottom">
				<span >附言：<input  type="text" v-model.trim="pay_remark" placeholder="请输入充值附言"></span>
			</label>
		</div>

        
		<div  class=" tips">
			<span >第一步：打开手机银行APP或支付宝</span>
		</div>
		<div  class=" tips">
			<span >第二步：转账{{money}}元到{{bank_name}}({{bank_user}})</span>
		</div>
		<div  class=" tips">
			<span >第三步：确认转账成功,点击下面按钮提交审核</span>
		</div>
		<div  class="rebank_infos">
			<span  style="padding: 10px; text-align: center; margin: 0px auto; display: block; text-decoration: underline;" ><router-link to="/art/5" class="back">不够清晰？查看转账教程</router-link></span>
			<span  style="padding: 10px; text-align: center; margin: 0px auto; display: block; text-decoration: underline;"><router-link to="/kefu" class="back">不会操作？点击联系客服</router-link></span>
		</div>
        <p>{{bank_remark}}</p>
		<div style="margin: 20px 15px;">
		    <van-button block round color="#ffb800" @click="submit">提交</van-button>
		</div>
    </div>
</template>
<script>
    import Vue from "vue";
    import {NavBar, Button} from "vant";
    import Fetch from '../../utils/fetch'
    import Clipboard from 'v-clipboard'

    Vue.use(NavBar).use(Button).use(Clipboard);
    export default {
        data() {
            return {
                bank_name: '',
                bank_user: '',
                bank_card: '',
				bank_remark: '',
                pay_user: '',
                pay_remark: '',
                money: 0,
				rid: 0
            }
        },
        mounted() {
            this.money = this.$route.query.money;
            this.getData();
        },
        methods: {
            onClickLeft() {
                this.$router.replace('/recharge')
            },
            copy() {
                this.$notify({
                    background: '#07c160',
                    message: '复制成功'
                })
            },
            submit() {
				if (!this.pay_user) {
					this.$dialog.alert({
					  title: '提示',
					  message: '请填写付款人',
					  theme: 'round-button',
					}).then(() => {
					  // on close
					});
				    return;
				}
				this.$dialog.confirm({
				  title: '提示',
				  message: '请确认您已向\n'+this.bank_name+ '\n'+ this.bank_user + '\n(' +this.bank_card + ')\n打款'+this.money+'元',
				  theme: 'round-button',
				}).then(() => {
				    // on confirm
					Fetch("/user/bank_apply", {
					    money: this.money,
					    remark: this.pay_remark,
					    name: this.pay_user,
						rid: this.rid
					}).then(() => {
					    this.$notify({
					        background: '#07c160',
					        message: '提交成功'
					    });
					    this.$router.push('/user').catch (err => {});;
					})
					return;
				  }).catch(() => {
				    // on cancel
					return;
				  });
                
            },
            getData() {
                Fetch("/user/recharge_type",{type: this.$route.query.type,money:this.$route.query.money}).then(res => {
                    this.bank_user = res.data.bank_user;
                    this.bank_card = res.data.bank_card;
                    this.bank_name = res.data.bank_name;
					this.bank_remark = res.data.bank_remark;
					this.rid = res.data.rid
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .container {
        position: fixed;
        width: 100%;
        height: 100%;
        min-height: 100%;
        //background: #8b50f8 url('./images/bg.png') no-repeat left 45px;
        background-size: contain;
        padding-top: 45px;

        .header {
            position: fixed;
            width: 100%;
            top: 0;
        }

        .money {
            background-color: #fff;
            padding: 20px 20px;
            border-radius: 8px;
            margin: 15px;
            margin-top: 20px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .inp {
                font-size: 24px;

                > span {
                    font-size: 14px;
                    display: inline-block;
                    margin-left: 10px;
                }
            }
        }

        .infos {
            background-color: #fff;
            border-radius: 8px;
            margin: 15px;
            margin-top: 20px;
            font-size: 14px;

            > div, label {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                align-items: center;
                justify-content: space-between;
            }

            .copy {
                color: #ffffff;
                width: 50px;
                border-radius: 10em;
                background: rgb(125, 81, 252);
                height: 25px;
                line-height: 10px;
            }
        }

        > p {
            font-size: 12px;
            line-height: 1.8;
            margin: 0 15px;
            color: #c1c1c1;
        }
		.rebank_infos{
		    background-color: #fff;
		    border-radius: 8px;
		    margin: 15px;
		    margin-top: 20px;
		    font-size: 14px;
			.copy {
			        color: #fff;
			        width: 50px;
			        border-radius: 10em;
			        background: #fff;
			        height: 25px;
			        line-height: 10px;
			}
			img {
			    vertical-align: middle;
			}
			
		}
    }
.container .rebank_infos div,.container .rebank_infos label{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
}

	.tips{
	    background: red;
	    color: #fff;
	    font-size: 16px;
	    padding: 10px;
	    text-align: center;
	    margin: 0 auto;
	    display: block;
	    border-radius: 8px;
	    margin: 15px;
	    margin-top: 20px;
	}

</style>
