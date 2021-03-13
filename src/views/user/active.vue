<template>
	
	<div class="investment-container">
	<!-- <div class="header">
		<div class="head">
			<router-link to="/user" class="back"></router-link>
			税务申报
		</div>
	</div> -->
	          <van-nav-bar
        title="税务申报"
        left-arrow
        fixed
        @click-left="$router.push({path:'/user'})"
      />
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
		<div style="color: red;width: 80%;font-size: 14px;text-align: center;background:#ffffff;width:100%;">
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

<style lang="scss" scoped>
	.investment-container {
    height: auto;
    .heigBox{
        width: 100%;
        height: 246px;
        background-color: #FFFFFF;
				margin-top: 100px;
    }
    .lineHeight{
        width: 2px;
        height: 50px;
        background: #C0B091;
        opacity: 0.3;
        margin: 20px 10px;
    }
    .btn {
        width: 676px;
        height: 86px;
        // background: linear-gradient(-90deg, #EBD18F 0%, #F4E5BD 100%);
				background: $orange;
        border-radius: 40px;
        font-size: 32px;
				color: #FFFFFF;
		position: fixed;
        font-family: PingFang SC;
        font-weight: 500;
        // color: #6A532C;
        line-height: 86px;
        text-align: center;
        // margin: 18px auto;
				// margin: 0 auto;
		bottom: 20px;
		left: 40px;
        
    }
    .titleBox{
        width: 676px;
        height: 208px;
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
            color: $black;
            text-align: center;
        }
        .num{ 
            font-size: 36px;
            font-family: PingFang SC;
            font-weight: 800;
            color: $money;
            margin-top: 26px;
            text-align: center;
        }
    }

}

</style>
