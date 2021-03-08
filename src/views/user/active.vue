<template>
	
	<div class="investment-container">
	<div class="header">
		<div class="head">
			<router-link to="/user" class="back"></router-link>
			税务申报
		</div>
	</div>
		<div class="heigBox">
			<div class="titleBox">
				<div>
					<p class="title">可申报账户余额</p>
					<p class="num">{{data.taxation_money}}</p>
				</div>
                <!-- <div class="lineHeight"></div> -->
                <!-- <div >
					<p class="title">可用余额</p>
					<p class="num">{{data.taxation_money}}</p>
				</div> -->
                <div class="lineHeight"></div>
				<div >
					<p class="title">申报金额</p>
					<p class="num">{{data.taxation}}</p>
				</div>
			</div>
		</div>
		<div style="color: red;width: 80%;font-size: 14px;text-align: center;">
			  *注：投资金额及收益不能用来申报税务！
		</div>
        <div class="btn" @click="action">税务申报</div>
		
		<div>
			<img src="./images/active_1.jpg"  width="100%" alt="">
		</div>
		<div>
			<img src="./images/active_2.jpg" style="margin-bottom: 20px;" width="100%" alt="">
		</div>
	</div>	
		
</template>

<script>
	import Fetch from '../../utils/fetch';

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {},
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
				Fetch('/user/info_taxation').then(res => {
					this.data = res.data;
					console.log(res.data);
				})
			},
			action() {
				Fetch('/user/dnc_taxation').then(res => {
					this.$notify({
						background: '#07c160',
						message: '申报成功'
					});
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	.investment-container {
    height: auto;
    .heigBox{
        width: 100%;
        height: 123px;
        background-color: #FFFFFF;
    }
    .lineHeight{
        width: 1px;
        height: 25px;
        background: #C0B091;
        opacity: 0.3;
        margin: 10px 5px;
    }
    .btn {
        width: 348px;
        height: 43px;
        background: linear-gradient(-90deg, #EBD18F 0%, #F4E5BD 100%);
        border-radius: 4px;
        font-size: 16px;
		position: fixed;
        font-family: PingFang SC;
        font-weight: 500;
        color: #6A532C;
        line-height: 43px;
        text-align: center;
        margin: 18px auto;
		bottom: 10px;
		left: 13px;
        
    }
    .titleBox{
        width: 348px;
        height: 108px;
        background-image: url("./../../assets/images/touziBac.png");
        background-size: cover;
        background-repeat: no-repeat;
        padding: 0 13px;
        margin:  0 auto;
        display: flex;
        justify-content: space-between;
        padding: 34px 30px ;
        .title{
            font-size: 11px;
            font-family: PingFang SC;
            font-weight: 500;
			margin:0 35px;
            color: #C0B091;
            text-align: center;
        }
        .num{ 
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 800;
            color: #6A532C;
            margin-top: 13px;
            text-align: center;
        }
    }

}

</style>
