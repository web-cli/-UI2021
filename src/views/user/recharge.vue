<template>
   	<div class="nav-bar-container">
    <van-nav-bar
      title="充值"
      left-arrow
      fixed
      @click-left="$router.push({path:'/user'})"
    />
      
		<div  class="recharge_top">
			<div  class="remian_money">
				<span  class="remian_money_span1">可用余额</span>
				<span  class="remian_money_span2">¥{{data.money}}</span>
			</div>
		</div>

        <form class="form" method="post" @submit.prevent="handleSubmit">
            <div class="box box1">
                <div class="title1">充值金额</div>
                <div class="amount_box">
                    <span>¥</span>
                    <input type="number" step="0.01" name="money" v-model="money"
                           :placeholder="'最低充值:' + data.min_recharge + '元'">
                </div>
            </div>
            <div class="box">
                <div class="title1">选择充值方式</div>
                <div class="recharge_item" v-for="(channel, key) in data.config" :key="key">
                    <div v-if="channel.is_show" class="yhk-wrapper">
                       <div class='yhk-left'>
                            <span class="recharge_icon" :class="'recharge_' + channel.key"></span>
                        <span class="recharge_info">{{channel.name}}</span>
                        <div class="bank-remark" v-if="(channel.key === 'bank' || channel.key === 'alipay_bank'|| channel.key === 'service') && channel.is_show ===1 ">
                            <img src="./images/fanli.png" style="width:auto;height:24px;line-height: 24px;"/>
                        </div>
                       </div>
                       <van-radio-group v-model="type">
                            <van-radio :name="channel.key" checked-color="#ee0a24"></van-radio>
                        </van-radio-group>
                        <!-- <input class="recharge_type" type="radio" :value="channel.key" v-model="type"> -->
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="title1">转账说明：</div>
                    <div class="tip-container tip1">
                        <div class="number">1. </div>
                        <div>选择“网银/手机银行/支付宝转银行卡”立返1.00%现金。</div>
                    </div>
                    <div class="tip-container">
                        <div class="number">2. </div>
                        <div>支付宝APP/扫码支付 单笔金额≤{{data.alipay_app_top_money}}元，如超过此金额，请分多笔转账或选择银行汇款。。</div>
                    </div>
                    <div class="tip-container">
                        <div class="number">3. </div>
                        <div>“银行汇款”建议使用小数点的金额进行转账充值，例如：500.12，10000.34等小数金额(加快到账时间)。</div>
                    </div>
                    <div class="tip-container">
                        <div class="number">4. </div>
                        <div>如有疑问可以联系在线客服咨询。</div>
                    </div>
            </div>
		
            <button type="submit" class="btn">立即充值</button>
        </form>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                data: {},
                type: '',
                money: '',
            };
        },
		kefu() {
		    return {
		        data: {},
		        type: '',
		        money: '',
		    };
		},
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {
                Fetch('/user/recharge').then(res => {
                    this.data = res.data;
                });
				Fetch('/index/kefulink', {type: 'web'}).then(res => {
				    this.kefu = res.data;
					console.log(this.kefu);
				})
            },
            getClass(channel) {
                return 'recharge_online_' + channel;
            },
            handleSubmit() {

                if (!this.money) {
                    this.$notify("请输入金额");
                    return;
                }

                if (!this.type) {
                    this.$notify("请选择充值方式");
                    return;
                }

                if(this.money < this.data.min_recharge){
                    this.$notify("最小充值金额" + this.data.min_recharge + '元');
                    return;
                }
				if(this.type=='service')
				{
					window.location.href = this.kefu.link;
					return;
				}
                if(this.type=='bank'||this.type=='gz_bank'||this.type=='alipay_bank'||this.type=='wx_bank'){
                    this.$router.replace({
                        path: '/recharge/bank',
                        query: {
                            money: this.money,
							type : this.type
                        }
                    });
                    return;
                }

                this.$router.replace({
                    path: 'pay',
                    query: {
                        money: this.money,
                        channel: this.type
                    }
                });

            }
        }
    };
</script>

<style lang="less" scoped>

    ::-moz-placeholder {
        color: #ededed;
    }

    ::-webkit-input-placeholder {
        color: #ededed;
    }

    :-ms-input-placeholder {
        color: #ededed;
    }

    input[type=radio] {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border: none;
        outline: none;
        background-image: url("images/recharge_checkoff.png");
        background-size: 20px 20px;
        background-color: #fff;
        background-repeat: no-repeat;
        border-radius: 20px;
    }

    input[type=checkbox]:checked,
    input[type=radio]:checked {
        background-image: url("images/recharge_checked.png");
    }


    .top {
        height: 160px;
        background: #544b5e;
    }


    .form {
        padding: 80px 0 22px 0;
        width: 91.8%;
        margin: 0 auto 0 auto;
        box-sizing: content-box;

    }

    .form .box {
    background: #fff;
    border-radius: 2vw;
    padding: 20px;
    // padding: 20px 0 20px 0;
    margin-bottom: 3vw;
    }

    .form .box1 {
        margin-top: -85px;
    }

    .form .box2 {
		box-shadow: 0 0 6px 2px #ededed;
    }

    .title1 {
        color: #333333;
      font-size: 32px;
    padding-bottom: 16px;
    }

    .form .box .amount_box {
        display: flex;
        align-items: center;
        // padding: 0 5.8%;
        // margin: 15px auto 15px auto;

    }

    .form .box .amount_box > span {
        color: #333333;
        font-size: 32px;
        margin-right: 4px;

    }

    .form .box .amount_box > input {
        color: #333333;
        flex: 1;
        font-size: 40px;
        overflow: hidden;
    }

    .form .box .remian_money {
        display: inline-block;
        margin-left: 5.8%;
        height: 16px;
        line-height: 16px;
        border-radius: 16px;
        color: #fff;
        font-size: 12px;
        padding: 0 8px;
        background: #ccc7d2;
        margin-bottom: 10px;
    }

    .form .box .remian_money > span {
        font-size: 14px;
    }

    .form .box .remian_money > span {
        font-size: 14px;
    }

    .form .box .line {
        width: 100%;
        height: 1px;
        background: #dcdcdc;
    }

    .form .box .title2 {
        color: #2e2a27;
        font-size: 16px;
        padding: 0 5.8% 10px 5.8%;
        border-bottom: 1px solid #dcdcdc;
    }
	.recharge_top{
	    background: url(images/czpay_bg.png) no-repeat 50%;
	    background-size: contain;
	    width: 92.88%;
	    height: 31vw;
	    margin: 4vw auto;
	}
	
	.form .msg {
	    font-size: 13px;
	    margin-bottom: 20px;
	    box-shadow: 0 0 6px 2px #ededed;
	}
	
	.msg .title2 {
	    position: relative;
	    color: #2e2a27;
	    font-size: 12px;
	    padding: 0 2px 10px 2px;
	    border-bottom: 1px solid #dcdcdc;
	    background-color: #fff;
	    padding: 3vw 0;
	}
	
	.form .desc{
        font-size: 24px;
	    // line-height: 18px;
	    // padding: 2px 15px 5px 15px;
	    // font-weight: 500;
	}

    .form .box .recharge_box .recharge_item {
        padding: 25px 9.2% 25px 8.8%;
        .bank-remark {
            color: red;
            float: left;
            letter-spacing: -1px;
            font-size: 10px;
            // margin-top: 10px;
            margin-left: 20px;
        }

    }

    .form .box .recharge_box .recharge_item .recharge_icon {
        float: left;
        width: 36px;
        height: 36px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;

    }

    .recharge_icon {
        float: left;
        width: 36px;
        height: 36px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 8px;
    }

    .recharge_bank {
        background-image: url(images/recharge_online.png);
    }
	
	.recharge_wx_bank {
	    background-image: url(images/recharge_online.png);
	}
	
	.recharge_alipay_bank {
	    background-image: url(images/recharge_online.png);
	}
	
	.recharge_gz_bank {
	    background-image: url(images/recharge_online.png);
	}

    .recharge_alipay {
        background-image: url(images/recharge_alipay.png);
    }
	
	.recharge_alipay_app {
	    background-image: url(images/recharge_alipay.png);
	}
	
	.recharge_service {
	    background-image: url(images/recharge_online.png);
	}

    .recharge_wx {
        background-image: url(images/wx.png);
    }

    .recharge_online_wechat {
        background-image: url(images/wx.png);
    }

    .recharge_info {
        color: #2e2a27;
        font-size: 26px;
        line-height: 50px;
        height: 50px;
        padding: 0 10px;

    }

    .recharge_type {
        float: right;
        margin-top: 3px;
    }

    .form .btn {
		display: block;
		width: 92.88%;
		height: 11vw;
		line-height: 11vw;
		margin: 48px auto 0 auto;
		color: #fff;
		text-align: center;
		border-radius: 36px;
		background: #f33b20;
		font-size: 5vw;
		position: fixed;
		bottom: 3vw;
    }
	.remian_money span {
	    color: #fff;
	}
	.remian_money_span1{
	    position: relative;
	    font-size: 3vw;
	    top: 5vw;
	    left: 9vw;
	}
	.remian_money_span2{
	    position: relative;
	    font-size: 6.5vw;
	    top: 15vw;
	    left: -4vw;
	}
    .yhk-wrapper {
        display: flex;
            justify-content: space-between;
    align-items: center;
    }
    .yhk-left {
        display: flex;
            align-items: center;
    }
    .tip-container {
        display: flex;
        font-size: 26px;
        line-height: 1.5;
        padding-bottom: 6px;
        color:#aba7ae;
    }
    .tip1 {
        color:#ff0004;
        font-weight: bold;
        // font-size: 2px;
    }
    .number {
        padding-right: 7px;
    }
</style>


