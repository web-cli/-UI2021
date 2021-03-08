<template>
	<div>
		<div class="header">
			<div class="head">
				<router-link to="/user" class="back"></router-link>
				邀请好友
			</div>
		</div>

            <div class="red_top_bg">
                <div class="introduce">
                    <div class="line left_line"></div>
                    <div class="tit">奖励介绍</div>
                    <div class="line right_line"></div>
                </div>
                <div class="award_tip">推荐新用户加入：可获得下级用户投资金额2%的佣金,例如您的朋友成功投资10000元项目，您可获得200元佣金!</div>
                <p class="bq">*本活动最终解释权归属官方所有*</p>
            </div>
            <div class="wrap_box wrap1">
                <!-- <p class="tory_tit">数据及记录</p> -->
                <div class="cut_box">
                    <div class="cut" @click="cutShare(1)" :class="cutNow==1?'choose':''">
                        <p class="num">{{data.share_user_num}}</p>
                        <p class="type">推荐新用户</p>
                        <div class="cur"></div>
                    </div>
                    <div class="line"></div>
                    <div class="cut" @click="cutShare(2)" :class="cutNow==2?'choose':''">
                        <p class="num">¥{{share_reward}}</p>
                        <p class="type">推广佣金</p>
                        <div class="cur"></div>
                    </div>
                </div>

            </div>
            <div class="wrap_box wrap2" v-show="cutShow">
                <div class="tit"><span></span>邀请记录</div>
                <div class="list">
                    <van-empty description="暂无邀请记录" v-if="shareUserDate" />
                    <div class="item" v-for="i in data.share_user">
                        <!-- <div class="name van-ellipsis">往事随风往往事随风往</div> -->
                        <div class="tel">{{i.phone}}</div>
                        <div class="time">{{i.time}}</div>
                    </div>
                </div>
            </div>
            <div class="wrap_box wrap3" v-show="!cutShow">
                <div class="tit"><span></span>邀请记录</div>
                <div class="list">
                    <van-empty description="暂无推广佣金记录" v-if="tgDataShow" />
                    <div class="item" v-for="item in tgData.share_data">
                        <div class="history_top">
                            <div class="name van-ellipsis">{{item.reason}}</div>
                            <div class="time">{{item.time}}</div>
                            <div class="price">¥{{item.money}}</div>
                        </div>
                        <p class="shop_title van-ellipsis">{{item.item_name}}</p>
                    </div>
                </div>
            </div>
            <div class="basic_btn" @click="downs()">保存推广二维码</div>
			
<!--            <div class="mask" v-show="qrcode" @click="qrcode = false">
                <div class="share_inner">
					
					
                </div>
            
			</div> -->
			
    </div>
</template>

<script>
    import Fetch from '../../utils/fetch';
    import Vue from 'vue';
    import { Empty,Dialog } from 'vant';
    import html2canvas from 'html2canvas';
    Vue.use(Empty);
    export default {
        name: "login",
        data() {
            return {
				dataURL: '',
                data: {},
                tgData:{},
                cutNow: 1,
                cutShow: true,
                qrcode: false,
                tgDataShow: false,
                shareUserDate:false,
				share_reward:0
            };
        },
        components: {

        },
        created() {
            this.$parent.footer('user', false);
        },
        mounted() {
            this.start();
            
        },
        methods: {
			downloadIamge(imgsrc, name) {//下载图片地址和图片名
			  var image = new Image();
			  // 解决跨域 Canvas 污染问题
			  image.setAttribute("crossOrigin", "anonymous");
			  image.onload = function() {
			    var canvas = document.createElement("canvas");
			    canvas.width = image.width;
			    canvas.height = image.height;
			    var context = canvas.getContext("2d");
			    context.drawImage(image, 0, 0, image.width, image.height);
			    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
			    console.log(url);
			    var a = document.createElement("a"); // 生成一个a元素
			    var event = new MouseEvent("click"); // 创建一个单击事件
			    a.download = name || "photo"; // 设置图片名称
			    a.href = url; // 将生成的URL设置为a.href属性
			    a.dispatchEvent(event); // 触发a的单击事件
			  };
			  image.src = imgsrc;
			},
			downs(){
			  this.downloadIamge(this.data.share_image_url, 'pic')
			},
			toImage() {
				// this.qrcode = true;
			    html2canvas(this.$refs.imageWrapper,{
			    }).then((canvas) => {
			        let dataURL = canvas.toDataURL("image/png");
			        this.dataURL = dataURL;
					// this.fileDownload(dataURL);
			    });
			},
			fileDownload(downloadUrl) {
			    let aLink = document.createElement("a");
			    aLink.style.display = "none";
			    aLink.href = downloadUrl;
			    aLink.download = "动理.png";
			    // 触发点击-然后移除
			    document.body.appendChild(aLink);
			    aLink.click();
			    document.body.removeChild(aLink);
				this.qrcode = false;
			},
            cutShare(idx){
                if(idx == 1){
                    this.cutNow = 1;
                    this.cutShow = true;
                }else{
                    this.cutNow = 2;
                    this.cutShow = false;
                }
            },
			onqrcode(){
			    if(this.qrcode == true){
			        this.qrcode = false;
			    }else{
			        this.qrcode = true;
			    }
			},
            start() {
                Fetch('/user/newshare',{
                    page_curren: 1,
                    page_num:1000000
                }).then((r) => {
                    this.data = r.data;
                    if(r.data.share_user.length == 0){
                        this.shareUserDate = true;
                    }else{
                        this.shareUserDate = false;
                    }
                });
                Fetch('/user/funds_fd',{
                    stype: 'item_raward',
                    api:'proxy'
                }).then((r) => {
                    this.tgData = r.data;
					this.share_reward = r.data.share_reward;
                    if(r.data.share_data.length == 0){
                        this.tgDataShow = true;
                    }else{
                        this.tgDataShow = false;
                    }
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    /deep/ .van-empty{
        padding: 0 0 20px 0;
    }
    .red_top_bg {
		padding: 25px 0 85px 0;
        // height: 257px;
        background: url(./images/tg_bg.png) no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        .big_tit{
            position: absolute;
        }
    }

    .tj_tit_icon {
        height: 27px;
        width: 226px;
        text-align: center;
        margin: 18px auto 0 auto;
        background: url(./images/ad_tit.png) no-repeat center center;
        background-size: 100% 100%;
    }

    .introduce {
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        line-height: 25px;
        color: #FFFFFF;
        margin-top: 15px;

        .line {
            width: 36px;
            height: 10px;
        }

        .tit {
            margin: 0 12px;
            font-weight: bold;
        }

        .left_line {
            background: url(./images/left_icon.png) no-repeat center center;
            background-size: 100% 100%;
        }

        .right_line {
            background: url(./images/right_icon.png) no-repeat center center;
            background-size: 100% 100%;
        }
    }

    .award_tip {
        width: 314px;
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        margin: 3px auto 0 auto;
    }

    .bq {
        width: 100%;
        line-height: 17px;
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 16px;
    }
	.wrap_box {
	    width: 10rem;
	    background: #fff;
	    box-shadow: 0 0.053333rem 0.24rem 0.053333rem hsla(0,0%,62.7%,.15);
	    border-radius: .16rem;
	}
    .wrap1 {
        padding-top: 8px;
        width: 351px;
        margin: -57px auto 0 auto;
        position: relative;
        z-index: 5;

        .tory_tit {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            padding-left: 11px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.8);
            padding-bottom: 5px;
            border-bottom: 1px solid #F6F6F6;
        }

        .cut_box {
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;

            .line {
                height: 42px;
                border-left: 2px solid rgba(0, 0, 0, 0.1);
            }

            .cut {
                width: 50%;
                height: 77px;
                position: relative;

                .num {
                    font-size: 22px;
                    font-weight: bold;
                    color: rgba(0,0,0,0.6);
                    margin-top: 18px;
                }

                .type {
                    height: 18px;
                    font-size: 13px;
                    color: rgba(0,0,0,0.6);
                    line-height: 18px;
                    margin-top: 4px;
                }

                .cur {
                    width: 90px;
                    height: 6px;
                    background: rgba(227, 56, 46, 1);
                    border-radius: 4px 4px 0px 0px;
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    bottom: 0;
                    display: none;
                }

                &.choose {

                    .num,
                    .type {
                        color: rgba(0,0,0,0.8);
                    }

                    .cur {
                        display: block;
                    }
                }
            }
        }
    }

    .wrap2,
    .wrap3 {
        width: 351px;
        margin: 14px auto 0 auto;
        overflow: hidden;

        .list {
            margin-top: 16px;
        }

        .tit {
            width: 75px;
            height: 20px;
            line-height: 20px;
            margin: 15px auto 0 auto;
            font-size: 14px;
            font-weight: 600;
            color: rgba(0,0,0,0.8);
            position: relative;
            text-align: center;

            span {
                width: 100%;
                height: 10px;
                background: rgba(255, 23, 0, 1);
                border-radius: 5px;
                opacity: 0.11;
                position: absolute;
                top: 11px;
                left: 0;
            }
        }
    }

    .wrap2 {
        width: 351px;
        margin: 14px auto 0 auto;
        overflow: hidden;

        .tit {
            width: 75px;
            height: 20px;
            line-height: 20px;
            margin: 15px auto 0 auto;
            font-size: 14px;
            font-weight: 600;
            color: rgba(0,0,0,0.8);
            position: relative;
            text-align: center;

            span {
                width: 100%;
                height: 10px;
                background: rgba(255, 23, 0, 1);
                border-radius: 5px;
                opacity: 0.11;
                position: absolute;
                top: 11px;
                left: 0;
            }
        }

        .item {
            height: 52px;
            line-height: 52px;
            width: 314px;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #E3E4E5;

            &:last-child {
                border-bottom: none;
            }

            .name {
                width: 84px;
                font-size: 14px;
                color: #000000;
            }

            .tel {
                width: 90px;
                font-size: 13px;
                color: #000;
                margin-left: 8px;
            }

            .time {
                flex: 1;
                margin-left: auto;
                text-align: right;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
            }
        }
    }

    .wrap3 {
        .item {
            height: 73px;
            width: 314px;
            margin: 0 auto;
            padding-top: 1px;
            border-bottom: 1px solid #E3E4E5;

            &:last-child {
                border-bottom: none;
            }

            .history_top {
                height: 20px;
                display: flex;
                margin-top: 13px;
                align-items: center;
                justify-content: flex-start;

                .name {
                    font-size: 13px;
                    color: #000000;
                }

                .time {
                    margin-left: 6px;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.4);
                }

                .price {
                    margin-left: auto;
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 122);
                }
            }

            .shop_title {
                font-size: 12px;
                color:rgba(0,0,0,0.6);
                line-height: 17px;
                height: 17px;
                margin-top: 11px;
            }
        }
    }

    .mask {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 30;

        .share_inner {
            width: 100%;
            height:100%;
            position: absolute;
			text-align:center;
            background: url(./images/code_bg.png) no-repeat center center;
            background-size: 100% 100%;
        }

        .white_bg {
            width: 160px;
            height: 160px;
            background-color: #FFFFFF;
            position: absolute;
            top: 209px;
            left: 92px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
				    width: 100px;
				    height: 100px;
				    display: inline-block;
				    vertical-align: middle;
				    background: blue;
            }
        }

        .basic_btn {
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
        }
    }
.basic_btn {
	width: 64%;
	margin: 35px auto 80px auto;
	height: 36px;
	font-size: 17px;
	background: linear-gradient(90deg,#e4392e,#ff4d16);
	border-radius: 5px;
	font-weight: 600;
	color: #fff;
	line-height: 36px;
	text-align: center;
    
}
    .basic_btn {
        margin: .8rem auto 0 auto;
    }
	.imgScale{
	    width: 320px; 
	    height: 670px; 
	    display: block; 
	    position: relative;
	}
	.imgScale img{
	    max-width: 100%;
	    max-height: 100%;
	    width:auto;
	    height:auto;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate3d(-50%,-50%,0);
	    -webkit-transform: translate3d(-50%,-50%,0);
	}
	.qrcode {
	    width: 134px;
	    height: 134px;
	    background-image: url(images/qrcode.png);
	    background-repeat: no-repeat;
	    background-position: center;
	    background-size: contain;
	    margin: 15px auto;
	}
</style>
