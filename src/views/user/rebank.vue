<template>
   <div class="nav-bar-container">
    <van-nav-bar
      title="银行入款充值"
      left-arrow
      fixed
      @click-left="$router.push({path:'/recharge'})"
    />

    	<van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" :scrollable='true'>
        请复制充值页面上的户名跟银行账户，登陆您的手机银行进行银行转账汇款。
        </van-notice-bar>

    <van-cell-group >
        <van-cell title="转账金额" :value="`￥${money}`" />
        <van-cell title="收款银行" :value="bank_name"  />
        <van-cell title="收款人">
            <template #right-icon>
                <span class="cell-right">{{bank_user}}</span>
                 <button v-clipboard="() => bank_user" v-clipboard:success="copy" class="copy">
				    <img  src="./images/copy.png" alt="" style="width: 4vw;">
				    </button>
            </template>
        </van-cell>
          <van-cell title="收款账号">
            <template #right-icon>
                <span class="cell-right">{{bank_card}}</span>
                 <button v-clipboard="() => bank_card" v-clipboard:success="copy" class="copy">
				    <img  src="./images/copy.png" alt="" style="width: 4vw;">
				    </button>
            </template>
        </van-cell>
       

    </van-cell-group>



        <van-cell-group class="mt-16">
            <van-field v-model="pay_user" label="付款人" placeholder="请输入付款人" />
            <van-field v-model="pay_remark" label="附言" placeholder="请输入充值附言" />
        </van-cell-group>
        

        <van-steps direction="vertical" :active="0" class="mt-16" active-color="#38f">
            <van-step>
                <h3>打开手机银行APP或支付宝</h3>
            </van-step>
            <van-step>
                <h3>转账{{money}}元到{{bank_name}}({{bank_user}})</h3>
            </van-step>
            <van-step>
                <h3>确认转账成功,点击下面按钮提交审核</h3>
            </van-step>
        </van-steps>

		<div  class="rebank_infos">
			<span  style="padding: 10px; text-align: center; margin: 0px auto; display: block; text-decoration: underline;" ><router-link to="/art/5" class="back">不够清晰？查看转账教程</router-link></span>
			<span  style="padding: 10px; text-align: center; margin: 0px auto; display: block; text-decoration: underline;"><router-link to="/kefu" class="back">不会操作？点击联系客服</router-link></span>
             <p class="bottom-tip"> <van-icon name="info-o"  class="bottom-icon"/> {{bank_remark}}</p>
        </div>
		<div style="margin: 20px 15px;">
		    <van-button block round color="#1989fa" @click="submit">提交</van-button>
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
		    // margin: 15px;
            margin-top: 16px;
		    // margin-top: 20px;
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

.cell-right {
    padding-right: 10px;
    color: #969799;
}

.bottom-tip {
    display: flex;
    padding: 0 24px;
    padding-bottom: 12px;
    line-height: 1.4;
}

.bottom-icon {
    transform: translateY(1px);
    padding-right: 10px;
}

.copy {
    transform: translateY(-4px);
    background-color: #fff;
}
</style>
