<template>
	<div class="mobile">
		
		<!-- 关于我们 -->
		<div class="list_outer">
			<video-player  class="video-player vjs-custom-skin"
				 ref="videoPlayer"
				 :playsinline="true"
				 :options="playerOptions"
			></video-player>
			<!-- <ul class="message">
				<li @click="">
					<router-link :to="'/prize'" >
						<img src="./image/huanbao/ydbg.png">
					</router-link>
				</li>
			</ul> -->
		</div>
<!-- 		<div class="pic" v-if="footer_type === 'n1'">
			<img src="./image/huanbao/jiaoshi.png" alt="" style="width: 80%;margin-left: 10%;margin-top: -30px;">
		</div> -->
		
		<div class="list_outer" v-if="footer_type === 'n2'">
			
			<ul>
				<li id="left" style="height: 150px; text-align: center">
					<router-link :to="'/item'">
						<img src="./image/huanbao/xiangmu.png" style="height: 150px;" @click="">
					</router-link>
				</li>
				<li id="right" style="height: 150px;text-align: center">
					<router-link :to="'/baoku'">
						<img src="./image/huanbao/sbaoku.jpg"  style="height: 150px;" @click="">
					</router-link>
				</li>
			</ul>
		</div>
		<div class="marquee_outer" v-if="footer_type === 'n1'">
			<van-notice-bar text="欢迎您的加入,请分享给您身边的朋友." left-icon="volume-o" background="#ffffff"></van-notice-bar>
		</div>
		<div class="marquee_outer" v-else>
			<van-notice-bar :text="data.notice" left-icon="volume-o" background="#ffffff"></van-notice-bar>
		</div>

		<div class="jchd" style="margin-top: 10px;">
			<img src="./image/huanbao/huodong.png" style="background-size: 100% 100%;height: 20px;margin-top: 10px;">
		</div>
		<!-- 环保知识 -->
		<div class="list_outer">
			<ul>
				<li>
					<router-link :to="''">
						<img src="./image/huanbao/qiandao.png" @click="checkin2">
						<div class="outer_wrap">

						</div>
					</router-link>
				</li>
<!-- 				<li v-if="footer_type === 'n2'">
					<router-link :to="'/scratch_card'" >
						<img src="./image/huanbao/guagua.png" @click="">
						<div class="outer_wrap">

						</div>
					</router-link>
				</li> -->
				<li>
					<router-link :to="'/sport_event' ">
						<img src="./image/huanbao/yundong.png" @click="">
						<div class="outer_wrap">

						</div>
					</router-link>
				</li>
<!-- 				<li>
					<router-link :to="'/start'">
						<img src="./image/huanbao/kantu.png" @click="">
						<div class="outer_wrap">

						</div>
					</router-link>
				</li> -->
				<li>
					<router-link :to="'/prize'">
						<img src="./image/huanbao/zhuanpan.png" @click="">

					</router-link>
				</li>
				<li>
					<router-link :to="'/goods'">
						<img src="./image/huanbao/shangcheng.png" @click="">
					</router-link>
				</li>
			</ul>
		</div>
		
		<div class="jchd" style="margin-top: 10px;">
			<img src="./image/huanbao/hot.png" style="background-size: 100% 100%;height: 30px;margin-top: 10px;">
		</div>

		<div class="mt0" v-for="item in hotitem.list" @click="goToDetail(item.id,item.schedule)" >
			<div class="img_box">
				<img class="img" :src="item.thumb" alt="">
			</div>
			<div class="outer_wrap_hot">
				<div class="mt0_title">{{item.title}}</div>
				<div class="pro_wrap">
					<div class="process">
						<div class="percent" v-bind:style="schedule(item.schedule)"></div>
					</div>
					<span class="percent_num">{{item.schedule}}%</span>
				</div>
				<div class="mt0_detail" v-if="item.type === 7">
					<span class="mt0_detail_left"> 产品小时利率：{{item.rate}}%</span>
					<span class="mt0_detail_right">每小时收益：{{item.apr_money}}元</span>
				</div>
				<div class="mt0_detail">
					<span class="mt0_detail_left" v-if="item.type === 7">项目周期：{{item.day}}小时</span>
					<span class="mt0_detail_left" v-else>项目周期：{{item.day}}天</span>
					<span class="mt0_detail_right">总收益：{{item.allmoney}}元</span>
				</div>
				<div class="mt0_detail">
					<span class="mt0_detail_left">项目总金额：{{item.total}}万元</span>
					<span class="mt0_detail_right">起投金额：{{item.min}}元起</span>
				</div>
				<div class="mt0_detail">
					<span class="mt0_detail_left">您的等级：{{item.vip}}</span>
					<span class="mt0_detail_right_vip">VIP日利率：{{item.vip_rate}}%</span>
				</div>
				<div class="mt0_detail">
					<span class="mt0_b_all" v-if="item.type === 7" style="color: #E54D42;font-weight:bold;">【元宵福利】{{item.type_name}}</span>
					<span class="mt0_b_left" v-else>{{item.type_name}}</span>
					<span class="mt0_b_right" v-if="item.type !== 7">积分：{{item.min}}</span>
				</div>
				
				<div class="btn_touzi" style="position: absolute;bottom: 0;"  v-if="item.schedule !== 100">马上投资</div>
				<div class="btn_touzi_full" style="position: absolute;bottom: 0;"  v-else>项目结束</div>
			</div>
		
		</div>
		<div class="mask" v-show="ad_show" z-index="999">
			<div class="ops">
				<div class="close">
					<div @click="close()">关闭</div>
				</div>
				<a @click="goAd()">
					<img :src="ad.activity_img" />
				</a>
			</div>

		</div>
		<div id="simpleModal" class="modal">
			<div class="modal-content">
				<div class="modal-header">
					<span class="closeBtn" @click="closeBox">&times;</span>
					<h2 class="news-title"></h2>
				</div>
				<div class="modal-body">
					<!-- <p>这是一个弹窗效果</p> -->
					<p class="body-box">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nemo? Temporibus velit
						eligendi neque repudiandae quis, autem vero fuga officia enim quas quibusdam consequuntur nam dolores tempore
						asperiores repellendus distinctio.</p>
				</div>
				<!-- 			            <div class="modal-footer">
			                <h3>弹框底部</h3>
			            </div> -->
			</div>
		</div>
		<div class="appdown" v-show="down_show" v-if="data.app.is_disable === 'Y'">
			<div class="close_down">
				<a href="javascript:;" @click="appdown_close">×</a>
			</div>
			<div class="logo">
				<img :src="data.app.image" width="100%">
			</div>
			<div class="mark">
				<p>{{data.app.text1}}</p>
				<p>{{data.app.text2}}</p>
			</div>
		
			<div class="down">
				<a :href="data.app.app_link">下载APP</a>
			</div>
		</div>

	</div>
</template>


<script>
	import Vue from 'vue';
	import Fetch from '../../utils/fetch';
	import {getidfa,gettype} from "../../utils/sys.js";
	import { videoPlayer } from 'vue-video-player'
	import 'video.js/dist/video-js.css'
	import 'vue-video-player/src/custom-theme.css'
	import {
		Swipe,
		SwipeItem,
		NoticeBar,
		Overlay,Col, Row,Dialog
	} from "vant";

	Vue.use(NoticeBar).use(Overlay);

	export default {
		name: "index",
		components: {
			VanSwipe: Swipe,
			VanSwipeItem: SwipeItem,
			[Dialog.Component.name]: Dialog.Component,
			videoPlayer
		},
		data() {
			return {
				playerOptions : {
				        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				        autoplay: false, //如果true,浏览器准备好时开始回放。
				        muted: false, // 默认情况下将会消除任何音频。
				        loop: false, // 导致视频一结束就重新开始。
				        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				        language: 'zh-CN',
				        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				        sources: [{
				          src: 'https://dongli1219.oss-cn-hangzhou.aliyuncs.com/WeChat_20210119160030.mp4',  // 路径
				          type: 'video/mp4'  // 类型
				        }],
				        poster: "https://www.njmbttd.com/upload/dongli.jpg", //你的封面地址
				        // width: document.documentElement.clientWidth,
				        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				        controlBar: {
				          timeDivider: true,
				          durationDisplay: true,
				          remainingTimeDisplay: false,
				          fullscreenToggle: true,  //全屏按钮
				        }
				    },
				footer_type: 'n1',
				data: {
					app: {},
				},
				hotitem:{},
				down_show: true,
				link_width: 0,
				banner: [],
				notice: '',
				links: [],
				type: 'n1',
				ad: {},
				ad_show: false,
				invest:{},
				examinationData: [{
					id: "1",
					name: "one",
					question: "课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握课堂管理讲师对课堂气氛的掌握",
				}, ]
			};
		},
		created() {
			if (this.$parent.getFooterType() === 'n1') {
				this.$router.push('/tree').catch(err => {
					err
				});
				this.$parent.footer(true, 'tree');
			} else {
				this.$parent.footer(true, 'tree');
				this.$data.footer_type = 'n2'
			}
			this.imei = getidfa();
			this.devtype = gettype();
			if(this.imei){
				this.down_show = false;
			}


		},
		mounted() {
			this.start();

		},
		methods: {
			getIputValue(index) {
				// console.log(index + 1 + "题" + this.radio);
				this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
				console.log(this.allRadio);
				// console.log(this.radio)
			},
			toBox(title = '', contain = '') {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "block";

				var bodyBox = document.getElementsByClassName("body-box")[0];
				bodyBox.innerHTML = contain;
				var newsTitle = document.getElementsByClassName("news-title")[0];
				newsTitle.innerText = title;
			},
			checkin2() {
				Fetch('/user/sign').then((res) => {
					this.sign_money = res.data.reward;
					this.new_sign_ok = true;
					this.$notify({
						background: '#07c160',
						message: '签到成功 +' + res.data.reward
					});
					Dialog.confirm({
					  title: '恭喜',
					  message: '获得一次转盘抽奖机会，是否前往抽奖？',
					})
					  .then(() => {
					    // on confirm
						this.$router.replace('/prize')
					  })
					  .catch(() => {
					    // on cancel
					  });
				})
			},
			closeBox() {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "none";
			},

			appdown_close() {
				this.data.app.is_disable = 'N';
			},
			goAd() {
				// this.close();
				// this.$router.push(this.ad.url).catch(err => {err});
				this.$router.push("/art/17").catch(err => {
					err
				});
			},
			close() {
				this.ad_show = false
			},
			start() {
				this.type = this.$parent.getFooterType();
				Fetch('/index/int',{
						imei: this.imei,
						devtype:this.devtype,
					}, null, false).then(res => {
					this.ad = res.data.ad;
					this.data = res.data;

					if (res.data.ad.activity_status == 1) {
						this.ad_show = true
					} else {
						this.ad_show = false
					}
				});

				/* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

				Fetch('/index/banner', {
					type: 'banner'
				}).then(res => {
					this.banner = res.data;
				});
				Fetch('/index/itemtree').then(res => {
					this.hotitem = res.data;
				});
				Fetch('/index/getinvest5').then(res => {
					// 首页公告 图标
					if (res.data.list) {
						this.invest = res.data.list;
					}
				});
			},
			onChange(index) {
				let els = this.$refs.dian.querySelectorAll("div");
				for (let i = 0; i < els.length; i++) {
					els[i].className = "";
				}
				els[index].className = "selected";
			},
			schedule(schedule) {
				return {
					width: schedule + '%'
				};
			},
			goToDetail(id,schedule) {
				if(schedule >= 100){
					this.$dialog.alert({
					  title: '温馨提示',
					  message: '项目已满，请更换项目投资。',
					  theme: 'round-button',
					}).then(() => {
					  // on close
					});
					return;
				}
				this.$router.replace('/item/' + id);
			},
			schedule_left(schedule) {
				if (schedule > 80) {
					return {
						left: (schedule - 30) + '%',
						color: '#fff'
					}
				} else {
					return {
						left: schedule.slice(0, 5) + '%'
					}
				}

			}
		}
	};
</script>

<style lang="less" scoped>
	.project {
		width: 100%;

	}

	/deep/ .marquee_outer .van-notice-bar {}

	/deep/ .marquee_outer {
		box-shadow: none;
		background: none;
	}

	/deep/ .marquee_outer .van-icon-volume-o::before {
		content: '';
		width: 22px;
		height: 23px;
		background: url(./image/tree/horn.png) no-repeat center center;
		background-size: 100% 100%;
		margin-right: 6px;
	}

	/deep/ .van-notice-bar__content {
		color: #202020;
	}

	/deep/ .van-notice-bar {
		padding: 0 7px;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.list_outer {
		// margin-top: .2rem;
		margin-bottom: .4rem
	}

	.list_outer .outer_wrap {
		padding: 0 10px;
	}

	.list_outer .message li {
		// position: relative;
		float: left;
		display: block;
		background: #fff;
		box-shadow: 1px 4px 11px 1px rgba(0, 0, 0, 0.09);
		border-radius: 5px;
		overflow: hidden;
		width: 100%;
		margin: 0 auto;
		// padding-bottom: 7px;
		// margin-top: 14px;
		// margin-left: 1.3%;
	}

	.list_outer ul li {
		// position: relative;
		float: left;
		display: block;
		background: #fff;
		box-shadow: 1px 4px 11px 1px rgba(0, 0, 0, 0.09);
		border-radius: 5px;
		overflow: hidden;
		width: 48%;
		margin: 0 auto;
		margin-bottom: 20px;
		margin-top: 14px;
		margin-left: 1.3%;
	}

	.list_outer ul li a img {
		width: 100%;
		/*height:3.2rem;*/
	}

	.list_outer ul li a h1 {
		color: #000;
		font-size: 16px;
		line-height: 22px;
		font-weight: bold;
		margin: 8px 0 2px 0;
	}

	.list_outer ul li .list_cont {
		width: 100%;
		color: #999;
		font-size: 13px;
		line-height: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.list_outer ul .list_lab {
		display: none;
		margin: .25rem 0 .15rem 0;
		font-size: 12px;
		color: #D2A775;
	}

	.list_outer ul li .list_lab span {
		background: rgba(239, 239, 239, 1);
		padding: 0 .2rem;
		font-size: 12px;
		line-height: 18px;
		margin-right: 4px;
	}

	.list_outer ul li .list_tip span {
		color: #999;
		font-size: 12px;
		line-height: 17px;
		margin-top: 3px;
	}

	.list_outer ul li a img.over {
		position: absolute;
		width: 2rem;
		height: 2rem;
		bottom: .3rem;
		right: .3rem;
	}

	.indexnav {
		width: 100%;
		background: #fff;
		overflow: hidden;
		line-height: 40px;
		font-size: 12px;
		margin-top: 24px;

		.nav_top,
		.nav_bottom {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			margin-bottom: 14px;
		}
	}

	.indexnav a {
		text-align: center;
		width: 23.466%;
		font-size: 12px;
		display: flex;
		flex-direction: column;
	}

	.indexnav a span {
		width: 100%;
		display: block;
		line-height: 16px;
		margin-top: 4px;
	}

	.indexnav a img {
		width: 50%;
		margin: 0 auto;
		display: block;
		overflow: hidden;
	}

	.marquee_outer {
		clear: both;
		// width: 90.66%;
		margin: 0 auto;
		box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.06);
		background: #fff;
		height: 40px;
		line-height: 28px;
		border-radius: 4px;
	}

	.marquee_outer img {
		float: left;
		width: 24px;
		margin-top: .1rem;
	}

	/*首页样式*/
	.header {
		width: 100%;
		height: 40px;
		text-align: center;
		background: #fff;
		position: relative;
		top: 0;
		z-index: 99;
		box-shadow: 0px 2px 5px #eee;
		-webkit-box-shadow: 0px 2px 5px #eee;
		-ms-box-shadow: 0px 2px 5px #eee;
		line-height: .9rem;
		font-size: .3rem;
		color: #000;
	}

	.header img {
		height: 32px;
		margin: 4px auto;
	}

	.header a {
		position: absolute;
		right: 0;
		left: 0;
		margin: 0 auto;
		font-size: 16px;
		color: #212121;
		line-height: 40px;
		letter-spacing: 1px;
	}

	.header-nbsp {
		width: 100%;
		height: .9rem;
	}

	.indexbanner {
		width: 100%;
		margin: 0 auto;
		position: relative;
		display: block;
		overflow: hidden;
	}
	.pro_wrap {
		width: 100%;
		position: relative;
		height: 17px;
		line-height: 17px;
		margin-top: 10px;
	}


	.mobile {
		overflow-x: hidden;
		width: 100%;
		margin: 0 auto;
		padding: 0;
		font-size: 16px;
		height: 100%;



		.progressBox {
			background: #3960e81c;
			border: 1px solid #2bb8ee78;
			;
			width: 80%;
			height: 17px;
			line-height: 17px;
			border-radius: 9px;
			display: inline-block;
			overflow: hidden;
			position: relative;
		}

		.progressBox .progress {
			height: 100%;
			background: linear-gradient(270deg, rgba(64, 164, 242, 1) 0%, rgba(61, 103, 232, 1) 100%);
		}

		.progressNum {
			position: absolute;
			top: 0;
			left: 80%;
			line-height: 17px;
			color: #3582b3;
			margin-left: 10px;
			font-size: 14px;
		}

		.appdown {
			width: 100%;
			max-width: 750px;
			height: 56px;
			background-color: rgba(0, 0, 0, 0.5);
			position: fixed;
			font-size: 12px;
			bottom: 50px;

			.down {
				width: 65px;
				height: 100%;
				float: right;
				margin-right: 18px;
				display: flex;
				justify-content: center;
				align-items: center;

				a {
					display: block;
					width: 100%;
					height: 26px;
					line-height: 26px;
					text-align: center;
					border-radius: 3px;
					background-color: #FE8000;
					color: #fff;
					font-size: 12px;
				}
			}

			.close_down {
				width: 15px;
				float: right;
				height: 100%;
				font-size: .6rem;

				a {
					display: block;
					width: 15px;
					font-size: 14px;
					cursor: pointer;
					color: #FE8000;
					line-height: 25px;
					text-align: center;
				}
			}

			.mark {
				float: left;
				height: 100%;
				color: #fff;
				line-height: 0.5rem;
				margin-left: 9px;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
			}

			.mark p:nth-of-type(1) {
				line-height: 17px;
				font-size: 13px;
			}

			.mark p:nth-of-type(2) {
				line-height: 14px;
				font-size: 12px;
			}

			.logo {
				width: 32px;
				height: 32px;
				float: left;
				margin-left: 8px;
				margin-top: 12px;

				img {
					max-height: 100%;
					border-radius: 6px;
				}
			}
		}

		.ops {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			max-width: 80%;
			margin: -25px auto 0 auto;

			.close {

				font-size: 20px;
				color: #fff;
				margin-bottom: 5px;
				height: 20px;

				div {
					float: right;
				}
			}

			.close::after {
				clear: both;
				content: '';
			}

			a {
				img {
					width: 100%;
					max-width: 750px;
					height: 100%;
				}
			}
		}

		.bannerSwp {

			width: 100%;
			max-width: 100%;
			min-height: 100px;

			.van-swipe {
				width: 100%;

				.van-swipe-item {
					img {
						width: 100%;
						max-height: 150px;
					}
				}

				.custom-indicator {
					position: absolute;
					left: 50%;
					bottom: 5px;
					padding: 2px 5px;
					color: #fff;
					font-size: 12px;
					background: rgba(0, 0, 0, 0.1);

					div {
						display: inline-block;
						margin: 0 2px;
						width: 0.1rem;
						height: 0.13rem;
						vertical-align: middle;
						background: #ddd;
						cursor: pointer;
						/*border-radius: 50%;*/
						/*-webkit-border-radius: 50%;*/
						transform: skewX(-29deg);
					}

					.selected {
						width: 0.3rem;
						background: #3582b3;
					}
				}
			}
		}

		.contact {
			margin-top: .5rem;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			padding: 0 .2rem;
			line-height: .8rem;
		}

		.contact .tel {
			font-size: 16px;
			font-weight: bold;
		}

		.contact .tel strong {
			font-size: 16px;
			color: red;
		}

		.contact .kef {
			float: right;
			font-size: 16px;
			color: #000;
		}

		.footer {
			text-align: center;
			margin-top: .2rem;
			padding: 0 .2rem
		}

		.footer p {
			font-weight: bold;
			line-height: .8rem;
			font-size: 16px;
		}

		.footer .zhenjian {
			width: 100%;
			text-align: center;
			font-size: 0;
			padding-bottom: 5px
		}

		.footer .zhenjian img {
			width: 32%;
			margin: 10px .05rem .1rem .05rem;
			padding: 0 10px
		}
	}

	.friend_link {
		width: 100%;
		height: 32px;
	}

	.link_swipe {
		width: 90.666%;
		height: 32px;
		margin: 10px auto;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.link_swipe .van-swipe-item {
		width: 23%;
		height: 32px;

	}

	.link_list {
		float: left;
		height: 32px;
		margin-right: 2%;
	}

	.link_swipe img {
		height: 32px;
		width: 100%;
	}

	.slide_div {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
	}

	.modal {
		display: none;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		overflow: auto;
		background-color: #f4f4f4;
		margin: 15% auto;
		width: 100%;
		height: 100%;
		box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
		animation-name: modalopen;
		animation-duration: 1s;
	}

	.modal-header h2,
	.modal-footer h3 {
		margin: 0;
	}

	.modal-header {
		background-color: coral;
		padding: 15px;
		color: #fff;
	}

	.closeBtn {
		color: #fff;
		float: right;
		font-size: 30px;
	}

	.closeBtn:hover,
	.closeBtn:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}

	.modal-body {
		padding: 10px 20px;
	}

	.modal-footer {
		color: #fff;
		background-color: coral;
		padding: 10px;
		text-align: center;
	}

	.body-box {
		line-height: 1.8;
	}

	@keyframes modalopen {
		from {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}
	.mt0 {
		position: relative;
		background: #fff;
		box-shadow: 0.03125rem 0.125rem 0.34375rem 0.03125rem rgba(0, 0, 0, 0.09);
		border-radius: 0.15625rem;
		overflow: hidden;
		width: 90.66%;
		margin: 0 auto;
		padding-bottom: 0.21875rem;
		margin-top: 0.4375rem;
	}
	
	.mt0 .img_box {
	
		//padding-bottom: 38px;
	}
	
	.mt0 .img_box img {
		width: 100%;
		max-width: 100%;
	}
	
	.img_info {
		background-color: #0f51a0;
		color: #fff;
		line-height: 38px;
		border-radius: 3px;
		text-align: center;
		height: 38px;
		/* background-color: bisque; */
		width: 100%;
		font-weight: 700;
		font-size: 13px;
	}
	.btn_touzi {
		background-color: #fbbd08;
		color: #fff;
		line-height: 38px;
		border-radius: 3px;
		text-align: center;
		height: 38px;
		/* background-color: bisque; */
		width: 100%;
		font-weight: 700;
		font-size: 13px;
	}
	.btn_touzi_full {
		background-color: #d1d0c3;
		color: #fff;
		line-height: 38px;
		border-radius: 3px;
		text-align: center;
		height: 38px;
		/* background-color: bisque; */
		width: 100%;
		font-weight: 700;
		font-size: 13px;
	}
	
	.mt0 .mt0_title {
		background-color: #0f51a0;
		border-radius: 3px;
		color: #fff;
		padding: 15px;
	
	}
	
	.mt0 .mt0_intro {
		padding: 5px;
		width: 100%;
		color: #999;
		font-size: 12px;
		line-height: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	
	.mt0 .mt0_detail {
		padding-left: 5px;
		margin: .25rem 0 .15rem 0;
		font-size: 12px;
		color: #999;
		display: flex;
		width: 100%;
	
	}
	.mt0 .mt0_detail .mt0_detail_left {
		width: 50%;
		height: 100%;
		font-size: 12px;
		color: #000000;
	
	
	}
	
	.mt0 .mt0_detail .mt0_detail_right {
		flex: 1;
		height: 100%;
		font-size: 12px;
		color: #000000;
	
	}
	
	.mt0 .mt0_detail .mt0_detail_right_vip {
		flex: 1;
		height: 100%;
		font-size: 12px;
		color: #0f48c1;
	
	}
	
	.mt0 .mt0_detail .mt0_b_all {
		width: 100%;
		height: 100%;
		font-size: 12px;
		text-align:center;
		color: #bdb5bd;
	
	
	}
	
	.mt0 .mt0_detail .mt0_b_left {
		width: 50%;
		height: 100%;
		font-size: 12px;
		color: #bdb5bd;
	
	
	}
	
	
	.mt0 .mt0_detail .mt0_b_right {
		flex: 1;
		height: 100%;
		font-size: 12px;
		color: #c3602e;
	
	}
	
	.mt0 .mt0_detail .mt0_detail_item {
		background: rgba(239, 239, 239, 1);
		padding: 0 .2rem;
		border-radius: 3px;
		font-size: 12px;
		line-height: 18px;
		margin-right: 4px;
	
	}
	
	.mt0 .mt0_type {
		padding-left: 5px;
		color: #999;
		font-size: 12px;
		line-height: 17px;
		margin-top: 3px;
	
	}
	
	.mt0 .process {
		background: #3960e81c;
		border: 1px solid #2bb8ee78;
		width: 80%;
		height: 17px;
		line-height: 17px;
		border-radius: 1rem;
		display: inline-block;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.mt0 .process .percent_box {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		height: 15px;
		border-radius: 8px;
		border: 1px solid #e8c27d;
		background: #e2e2e2;
	}
	
	.mt0 .process .percent {
		height: 100%;
		background: linear-gradient(270deg, #40a4f2 0%, #3d67e8 100%);
	}
	
	.percent_num {
		position: absolute;
		top: 0;
		left: 80%;
		line-height: 17px;
		color: #3582b3;
		margin-left: 10px;
		font-size: 14px;
	}
	
	
	@media (max-width: 360px) {
		.mt0 .img_box .img_info {
			font-size: 18px;
		}
	
		.mt0 .mt0_type {
			text-indent: 16px;
		}
	}
	
	@media (min-width: 400px) {
		.mt0 .img_box .img_info {
	
			bottom: 8px;
		}
	}
	.outer_wrap_hot {
		margin-bottom: 40px;
		padding: 0px 0px 5px 0;
	}
</style>
