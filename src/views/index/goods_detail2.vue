<template>
	<div class="wrap">
		<!-- <div class="header">
			<div class="head">
				<a @click="$router.back()" class="back"></a>
				积分商城
			</div>
		</div> -->
		
	<van-nav-bar
  :title="`${goodsDetail.title}详情` || '商品详情'"
  left-arrow
	fixed
  @click-left="$router.back()"
/>
<div class="goods-content">
    <img :src="goodsDetail.img" alt="">
   
</div>
 <p>积分:<span>{{goodsDetail.integral}}</span></p>
<div class="detail">
  简介：<span>无</span>
</div>

<!-- 		<div class="imgs">
			<img src="./image/huanbao/jiaoshi.png" style="width: 100%;" alt="">
		</div> -->
	
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';

	export default {
		name: "shop",
		data() {
			return {
	
        goodsDetail:{}
			};
		},
		mounted() {
      console.log(this.$route)
      this.goodsDetail = this.$route.query


			// $(window).resize(function(){
			// 	set();
			// });

			// set();
			// this.start();
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.mobile {
		width: 100%;
		margin: 0 auto;
		padding: 0;
		font-size: 16*2px;
		height: 100%;
	}

	.goods_list {
		position: absolute;
		width: 100%;
		height: 100%;
	
	}

	.right_list {
border-radius: 12*2px;
background: #FFFFFF;
border-radius: 12*2px;
margin-top: 2vw;
	width: 46%;
	height: 200*2px;
box-shadow: 0 1vw 1vw rgba(0,0,0,.2);
margin-top: 30*2px;
	}
	.goods-wrap{
		display: flex;
		justify-content: space-between;
		padding: 0 20*2px;
		flex-wrap: wrap;
		flex-shrink: 1;
		padding-bottom: 20*2px;
			background: #F7F8FA;
	}

	.shop_detail {
		text-align: center;
		line-height: 7vw;
	}

	// .dh_btn {
	// 	text-align: center;
	// 	color: #FFFFFF;
	// 	border-radius: 3vw;
	// 	background-color: #0f51a0;
	// 	padding: 0 7vw;
	// }
	.shop_pic{
	@include flex-center();
	width: 150*2px;
	height: 76*2px;
	margin-top: 10*2px;
	img{
	max-width: 120*2px;
	max-height: 76*2px;
	}
}
.btn{
	width: 100*2px;
	margin:10*2px auto 0 auto
}
.vip_icon{
		color: #CBC9CC;
		font-size: 14*2px;
	span{
		font-weight: bold;
		color: #EE0A24;
	}
}
.goods-content{
  
  background: #FFFFFF;
  width: 96%;
    box-shadow: 0 1vw 1vw 1vw rgba(0, 0, 0, 0.2);
    @include flex-center();
    margin: 0 auto;
    margin-top: 160px;
  img{
    max-width: 100%;
    max-height: 600px;
    margin: 0 auto;
  }

}
  .wrap{
    background: #ffffff;
  }
  p{
    font-size: 32px;
    font-weight: 500;
    margin-top: 60px;
    margin-left: 30px;
    span{
      color:$money;
    }
  }
  .detail{
    @include flex-start();
    margin-top: 100px;
    margin-left: 30px;
    font-size: 32px;
    font-weight: 500;
    span{
      font-size: 26px;
      font-weight: 400;
      font-size: 26px;
    }
  }
</style>
