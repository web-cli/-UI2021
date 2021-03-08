<template >
	<div class="mobile" >
		<div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        商品详情
		    </div>
		</div>
		<div class="imgs">
		    <img :src="image" style="width: 100%;height: 55vw;" alt="">
		</div>
		<div>
			<div class="goodstitle">{{title}}</div>
		</div>
		<div class="line">
			商品详情
		</div>
		<div class="content"  v-html="content">
		</div>
		<div class="play">
			<div class="num-s">
				剩余：{{num}} 件
			</div>
			<div class="integral-s">
				积分：<span style="color: red;">{{integral}} </span>
			</div>
			<div class="dh_btns" @click="category_btn(data.id)">兑换</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';
	
	export default {
	    name: "shop",
	    data() {
			return {
			    data: {
					id:0,
				},
				title:'',
				content:'',
				num:'',
				image:'',
				integral:'',
			};
		},
		created() {
			console.log(222);
		    this.$parent.footer(false);
		},
		mounted() {
			Fetch('/index/goods_detail', {
			    id: this.$router.history.current.params.code
			}).then(res => {
				this.data.id = res.data.id;
			    this.title = res.data.title;
				this.image = res.data.img;
			    this.content = res.data.content;
				this.num = res.data.num;
				this.integral = res.data.integral;
			})
		},
		methods: {
			start() {
				
			    // 兑换信息
			    Fetch('/index/goods_list').then(res => {
			        this.category_data = res.data;
			        for (var i = 0; i < res.data.category.length; i++) {
			            this.dh_num.push([]);
			            for (var j = 0; j< res.data.category[i].list.length; j++) {
			                this.dh_num[i].push(1);
			            };
			        };
			        if(res.data.exchange_rules.content || res.data.exchange_rules.title){
			            this.rule_msg = res.data.exchange_rules.content || res.data.exchange_rules.title;
			        }
			    });
			
			},
			category_btn(id){
			    Fetch('/index/shop_exchange',{gid:id,num:1}).then((res) => {
					this.$notify({
						background: '#07c160',
						message: res.info
					});
					this.start();
				})
			},
		}
	}
</script>

<style>
	.goodstitle{
		padding: 5vw;
		font-weight: 700;
		font-size: 3vw;
		color: #666;
		background-color: #FFFFFF;
		box-shadow: 0px -1px 5px rgba(89,125,172,.4);
	}
	.goods{
		
	}
	.mobile{
		background-color: #F8F8F8;
		height: 100%;
	}
	.content{
		margin-top: 3vw;
		
	}
	.line{
		width: 100%;
		text-align: center;
		margin: 1px 0 ;
		padding: 4vw 0;
		line-height: 7vw;
		font-size: 4.5vw;
		font-weight: 700;
		height: 15vw;
		box-shadow: 0 1px 1px rgba(0,0,0,.1);
		background-color: #FFFFFF;
	}
	.play{
		box-shadow: 0px -1px 5px rgba(89,125,172,.4);
		position:fixed;
		bottom:0;
		width: 100%;
		font-size: 3.5vw;
		background-color: #FFFFFF;
	}
	.dh_btns{
		position: relative;
		float: right;
		width: 43%;
		height: 13vw;
		text-align: center;
		line-height: 13vw;
		color: #FFFFFF;
		background-color: #e54d42;
	}
	.num-s{
		position: relative;
		float: left;
		left: 3vw;
		top: 4vw;
	}
	.integral-s{
		position: relative;
		float: left;
		left: 6vw;
		top: 4vw;
	}
</style>
