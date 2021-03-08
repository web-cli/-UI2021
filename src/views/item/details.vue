<template>
    <div style="margin-bottom: 65px; height: auto;">
        <div class="header">
            <div class="head">
                <router-link to="/item" class="back"></router-link>
                投资详情
            </div>
        </div>
        <div class="main">
			<div class="mt0">
	           <img class="banner" :src="data.thumb" alt="">
				<div class="mt0_info">{{data.title}}</div>
			</div>
			<div class="mt1">
				<div class="item">
					<div class="title">项目规模</div>
					<div class="info">￥{{data.total}}万元</div>
				</div>
				<div class="item" >
					<div class="title" v-if="data.type === 7">每小时分红</div>
					<div class="title" v-else>每期分红</div>
					<div class="info">{{data.apr_money}}元起</div>
				</div>
				<div class="item" >
					<div class="title">投资期限</div>
					<div class="info" v-if="data.type === 7">{{data.day}}小时</div>
					<div class="info" v-else>{{data.day}}天</div>
				</div>
			</div>
			<div class="mt5">
				<div class="process">
					<div class="percent_box">
						<div class="percent" :style="'width:' + data.schedule + '%'"></div>
					</div>
					<span class="percent_num">{{data.schedule}}%</span>
				</div>
			</div>
			<div class="bottom_line"></div>
			<div class="mt2">
				<div class="item"><span>分红方式：</span><span>{{data.type_name}}</span></div>
				<div class="item"><span>起投金额：</span><span>{{data.min}}元</span></div>
				<div class="item"><span>担保机构：</span><span>{{data.guarantee}}</span></div>
				<div class="item"><span>投资零风险：</span><span>本金保障</span></div>
				
			</div>
			
			<div class="bottom_line"></div>
			<div class="title_box">
				<div class="mt3_title mt3_title1 tables_c">投资详情</div>
				<div class="s_hide" @click="show_detail" :class='{s_show:details}'>{{details?'收起':'展示'}}</div>
			</div>
			<div class="mt3" v-show="details">
				<div class="go_top" @click="gotop"></div>
				<div class="details_list">
					<span>项目名称：</span>
					<span>{{data.title}}</span>
				</div>
				<div class="details_list">
					<span>项目金额：</span>
					<span>{{data.total}}万元人民币</span>
				</div>
				<div class="details_list" v-if="data.type === 7">
					<span>每小时分红：</span>
					<span>按每小时{{data.rate}}%的收益（保本保息）</span>
				</div>
				<div class="details_list" v-else>
					<span>每天分红：</span>
					<span>按每日{{data.rate}}%的收益（保本保息）</span>
				</div>
				<div class="details_list">
					<span>投资金额：</span>
					<span>最低起投{{data.min}}元</span>
				</div>
				
				<div class="details_list mar_big" v-if="data.type === 7">
					<span>项目期限：</span>
					<br>
					<span>{{data.day}}个小时；</span>
				</div>
				<div class="details_list mar_big" v-else>
					<span>项目期限：</span>
					<br>
					<span>{{data.day}}个自然日；（一个自然日为一天包含节假日）</span>
				</div>
				<div class="details_list mar_big" v-if="data.type === 7">
					<span>收益计算：</span>
					<br>
					<span><i>每小时分红{{data.apr_money}}元</i>*<i>{{data.day}}小时</i>=总收益<i>{{data.apr_money * data.day}}</i>元；</span>
				</div>
				<div class="details_list mar_big" v-else>
					<span>收益计算：</span>
					<br>
					<span><i>每日分红{{data.apr_money}}元</i>*<i>{{data.day}}天</i>=总收益<i>{{data.apr_money * data.day}}</i>元；</span>
				</div>
				<div class="details_list mar_big">
					<span>还款方式：</span>
					<br>
					<span>{{data.type_name}} 节假日照常收益；</span>
				</div>
				<div class="details_list">
					<span>投资份数：</span>
					<span>最低起投{{data.min_share}}份（限买{{data.num}}份）</span>
				</div>
				<div class="details_list mar_big" v-if="data.type === 7">
					<span>结算时间：</span>
					<br>
					<span>根据您投资下单成功时间为准，{{data.day}}小时后，到期系统将当日分红和产品本金一起返还到您的会员账号中；</span>
				</div>
				<div class="details_list mar_big" v-else>
					<span>结算时间：</span>
					<br>
					<span>今日15点投资，次日15点系统自动计息结算收益（例如在15:00成功投资，则在下个自然日15:00收到分红），到期系统将当日分红和产品本金一起返还到您的会员账号中；</span>
				</div>
				<div class="details_list mar_big">
					<span>可投金额：</span>
					<br>
					<span>投资期间只要产品未投满，投资者均可自由投资；</span>
				</div>
				<div class="details_list mar_big">
					<span>安全保障：</span>
					<br>
					<span>{{data.guarantee}}对平台上的每一笔投资提供<i>100%本金保障</i>，平台设立风险备用金，对本金承诺全额垫付；</span>
				</div>
				<div class="details_list mar_big" v-if="data.type === 7">
					<span>项目概述：</span>
					<br>
					<span>本项目筹集资金<i>{{data.total}}</i>万元人民币，投资本项目（按每小时分红<i>{{data.apr_money}}元/小时</i>）项目周期为<i>{{data.day}}</i>个小时，所筹集资金用于该项目直投运作，作为投资者分红固定且无任何风险，所操作一切风险都由公司与担保公司一律承担，投资者不需要承担任何风险。</span>
				</div>
				<div class="details_list mar_big" v-else>
					<span>项目概述：</span>
					<br>
					<span>本项目筹集资金<i>{{data.total}}</i>万元人民币，投资本项目（按每日分红<i>{{data.apr_money}}元/天</i>）项目周期为<i>{{data.day}}</i>个自然日，所筹集资金用于该项目直投运作，作为投资者分红固定且无任何风险，所操作一切风险都由公司与担保公司一律承担，投资者不需要承担任何风险。</span>
				</div>
				<div class="details_list mar_big">
					<span>推荐奖励：</span>
					<br>
					<span>在会员中心最下面(邀请好友)转发到您朋友圈里,只要您朋友通过邀请二维码注册的为一级,充值并成功投资一次性还款项目,您就可以得到按投资金额{{data.invest1}}%的奖励,注册成功后，系统自动赠送 ！</span>
				</div>
				
			</div>
			<div class="mt3">
				<h2 v-html="data.fixedcontent">{{data.fixedcontent}}</h2>
			</div>
            <router-link :to="getApply()" class="btn">马上投资</router-link>
        </div>
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
                id:0,
				details: false
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.id = this.$router.history.current.params.id;
            this.start();
			window.addEventListener("scroll", this.handleScroll, true);
        },
        methods: {
            start() {

                Fetch('/index/item_view', {id: this.id}).then(res => {
                    this.data = res.data.view;
                })
            },

            getApply() {
                return '/item/apply/' + this.id;
            },
			show_detail(){
				this.details = !this.details;
			},
			gotop(){
				let top = document.documentElement.scrollTop || document.body.scrollTop;
				const timeTop = setInterval(() => {
					document.body.scrollTop = document.documentElement.scrollTop = top -= 30;
					if (top <= 0) {
					  clearInterval(timeTop);
					}
				}, 10);
			}
        }
    };
</script>

<style lang="less" scoped>
    html,
    body {
        background: #ffffff;
    }

    ::-moz-placeholder {
        color: #999999;
    }

    ::-webkit-input-placeholder {
        color: #999999;
    }

    :-ms-input-placeholder {
        color: #999999;
    }

    input,
    select,
    button {
        border: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    input[type=checkbox],
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

    .main {
        font: initial;
        width: 100%;
        margin: 6px auto 0 auto;
		background: #F7F8F9;
    }
	.main_wrap{
		padding: 0 4.8%;
		margin: 0 auto;
	}

    .main .title1 {
        width: 60%;
        height: 36px;
        line-height: 36px;
        border-radius: 36px;
        color: #333333;
        font-size: 18px;
        text-align: center;
        background: #e8c27d;
        margin: 0 auto 10px auto;
    }

    .main .mt0 img {
        width: 100%;
        max-width: 100%;
        border-radius: 5px;
    }

    .main .mt0 .mt0_info {
        color: #6A6A6A;
        font-size: 15px;
        line-height: 37px;
    }
	.mt0,.mt1,.mt2,.mt3,.mt4,.mt5,.mt6{
		width: 100%;
		padding: 0 4.8%;
		background-color: #FFFFFF;
	}
    .main .mt1 {
        width: 100%;
		height: 38px;
		display: flex;
		justify-content: space-around;
		flex-wrap: nowrap;
    }

    .main .mt1 .item {
        width: 33.3%;
    }

	.main .mt1 .item:nth-of-type(1){
		text-align: left;
	}
	.main .mt1 .item:nth-of-type(2){
		text-align: center;
		border-left: 1px solid #97979738;
		border-right: 1px solid #97979738;
	}
	.main .mt1 .item:nth-of-type(3){
		text-align: right;
	}
    .main .mt1 .item .title {
        color: #787878;
		font-size: 12px;
		line-height: 18px;
    }
	.main .mt1 .item .info{
		font-size: 14px;
		color: #000000;
		font-weight: 500;
		line-height: 20px;
	}

    .main .mt2 .item {
		width: 100%;
		height: 52px;
		line-height: 52px;
        border-bottom: 1px solid #E3E4E5;
    }
	.main .mt2 .item span:nth-of-type(1){
		float: left;
		font-size: 15px;
		color: #404142;
	}
	.main .mt2 .item span:nth-of-type(2){
		float: right;
		font-size: 15px;
		color: #A1A2A3;
	}
	.main .mt2 .item:last-of-type{
		border-bottom: none;
	}
	@media (max-width: 375px) {
		.main .mt2 .item span{
			font-size: 12px !important;
		}
	}

    .process {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
		padding-top: 25px;
		padding-bottom: 16px;
    }

    .process .percent_box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 3px;
        border-radius: 2px;
        background: #E9F0FF
    }

    .process .percent {
        width: 80%;
        height: 3px;
        border-radius: 2px;
        background: #2D73FF;
    }

    .process .percent_num {
        color: #2D73FF;
        font-size: 12px;
		line-height: 17px;
        margin-left: 18px;
    }

	.bottom_line{
		width: 100%;
		height: 8px;
		background-color: rgba(247,248,249,1);
	}
    .title_box {
		width: 100%;
		height: 54px;
		line-height: 25px;
		padding: 15px 0;
		border-bottom: 1px solid #E3E4E5;
		background-color: #FFFFFF;
    }
	.mt3_title1{
		margin-left: 17px;
		border-left: 3px solid #BF9F42;
		font-size: 15px;
		color:#333333;
		padding-left: 9px;
		float: left;
	}
	.s_hide{
		float: right;
		margin-right: 17px;
		font-size: 15px;
		color:#BF9F42;
		line-height: 25px;
	}
	.s_hide::after{
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 13px;
		height: 8px;
		background: url(images/zhankai.png) no-repeat center center;
		background-size: 100% 100%;
		margin-left: 5px;
	}
	.s_hide.s_show::after{
		background: url(images/shouqi.png) no-repeat center center;
		background-size: 100% 100%;
	}
    .content {
        padding: 1em;
        display: none;
        text-indent: 2em;
    }

	.details_list{
		width: 100%;
		padding: 15px 0;
		line-height: 20px;
		font-size: 14px;
		border-bottom: 1px solid #E3E4E5;
	}
	.details_list span:nth-of-type(1){
		color: #666666;
		display: inline-block;
	}
	.details_list span:nth-of-type(2){
		color: #A1A2A3;
		display: inline-block;
	}
	.details_list.mar_big span:nth-of-type(1){
		margin-bottom: 10px;
	}
    .main .btn {
            position: fixed;
            bottom: 4vw;
            display: block;
            height: 12vw;
            line-height: 12vw;
            width: 85%;
            text-align: center;
            font-size: 5vw;
            color: #fff;
            font-weight: 700;
            margin: 0 7.5vw;
            border-radius: 6vw;
            background-color: #f33b20;
    }
	.mt3{
		position: relative;
	}
	.go_top{
		width: 35px;
		height: 35px;
		background: url(images/gotop.png) no-repeat center center;
		background-size: 100% 100%;
		position: fixed;
		right: 18px;
		bottom: 12px;
	}

</style>