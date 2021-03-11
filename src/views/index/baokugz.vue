<template>
	<div class="baokugz">

		<!-- <div class="header">
			<div class="head" >
				<a @click="$router.back()" class="back"></a>
				宝库规则
			</div>
		</div> -->
		  <van-nav-bar
      title="宝库规则"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
		<div class="baokubg"></div>

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
				is_show_share: false,
			}
		},
		created() {
			this.$parent.footer(false);
		},
		mounted() {
			this.start();
		},
		methods: {
			close() {
				this.is_show_share = false;
			},
			showShare() {
				this.is_show_share = true;
			},
			start() {
				Fetch('/user/share').then(res => {
					this.data = res.data;
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	html,
	body {
		background: #e5e5e5;
		height: 100vh;
	}

	.baokubg {
		height: 91vh;
		margin-top: 100px;
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: url(./image/huanbao/baokuguize.jpg);
	}

	.top {
		padding: 25px 0 85px 0;
		background: #554b5f;

	}

	.top .title {
		width: 55.4%;
		margin: 0 auto;
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #333333;
		font-size: 18px;
		background: #e8c27d;
		border-radius: 35px;
	}

	.top .avator_box {
		width: 51.8%;
		margin: 0 auto;
		position: relative;
		background: #e8c27d;
		border-radius: 15px;
		padding: 1px 0;
	}

	.top .avator_box .avatar {
		background-size: contain;
		//background-image: url(images/code.png);
		width: 96px;
		height: 96px;
		margin: 0 auto;
		border-radius: 50%;
		/*#background: #fff;*/
		background-repeat: no-repeat;
		background-position: center;

	}

	.top .avator_box .invite_btn {
		height: 22px;
		line-height: 22px;
		color: #fefefe;
		font-size: 12px;
		border-radius: 22px;
		width: 140px;
		text-align: center;
		background: #544b5e;
		margin: 7px auto 10px auto;
	}

	.top .avator_box .invite_title {
		height: 30px;
		line-height: 30px;
		color: #fefefe;
		font-size: 18px;
		border-radius: 30px;
		width: 115px;
		text-align: center;
		background: #544b5e;
		margin: -16px auto 10px auto;
		border: 1px solid #e8c27d;
	}

	.main {
		width: 89%;
		padding: 38px 6% 0 6%;
		background: #fff;
		border-radius: 15px;
		margin: -72px auto 0 auto;
		position: relative;
	}

	.main .my_invite {
		position: absolute;
		z-index: 10;
		color: #fff;
		text-indent: 5px;
		width: 90px;
		height: 16px;
		line-height: 16px;
		font-size: 12px;
		background: #e8c27d;
		border-radius: 0 16px 16px 0;
		top: 14px;
		left: 0;
	}

	.main .content {
		padding-bottom: 10px;
	}

	.main .content .item {
		border-bottom: 1px solid #edebeb;
		color: #999999;
		font-size: 12px;
		padding: 1rem 0;
	}

	.main .content .item:last-child {
		border-bottom: none;
	}

	.main .content .item .title {
		font-size: 14px;
	}

	.main .content .item .left {
		float: left;
		width: 90px;
		text-align: center;
	}

	.main .content .item .right {
		float: right;
		width: 140px;
		text-align: center;
	}

	.mask_c {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000;
		opacity: 0.7;
		z-index: 11;
	}

	.qrcode_box {
		width: 258px;
		height: 260px;
		// background-image: url(images/invite_qrcode_box.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		position: fixed;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		z-index: 12;
		overflow: hidden;
	}

	.qrcode_box .qrcode {
		width: 134px;
		height: 134px;
		// background-image: url(images/qrcode.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin: 15px auto;
	}

	.qrcode_box .qrcode_info {
		text-align: center;
		color: #fff;
		font-size: 13px;
		margin: 20px auto 12px auto;

	}

	.qrcode_box .qrcode_btn {
		display: block;
		width: 128px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		border-radius: 36px;
		font-size: 16px;
		color: #544b5e;
		background: #e8c27d;
		margin: 0 auto;

	}
</style>
<style lang="scss" scoped>
.baokugz{
	// height: 100vh;
}
</style>
