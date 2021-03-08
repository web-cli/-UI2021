<template>
    <div class="jobsdetail_wrap">
        <div class="header">
            <div class="head">
                <router-link to="/jz" class="back"></router-link>
                {{data.title}}
            </div>
        </div>
        <div class="btn_box">
            <button type="button" class="btn btn_red" @click="showDown">立即分享</button>
            <van-uploader class="upload" :after-read="afterRead" :before-read="beforeRead">
                <van-button class="file" color="#ffb400" type="primary">上传图片</van-button>
            </van-uploader>
        </div>
        <div class="share_ctn">
            <p class="title">分享规则</p>
			<div class="info" v-html="data.content"></div>
           <!-- <p class="info">1.点击上方立即分享，复制文字和保存图片到手机相册</p>
            <p class="info">2.分享示例，可参考下方示例</p>
            <p class="info">3.截图已分享的图片，点击上传截图，把图片上传，等待官方审核</p>
            <p class="info">*本活动最终解释权归属官方所有*</p> -->
            <p class="title">分享示例</p>
            <img class="share_img" :src="data.share"/>
        </div>
        <div v-show="show_down" class="mask" @click="hideDown">
            <div class="wrapper">
                <div class="block" @click.stop>
                    <div class="share_img">
						<img :src="data.down_image">
						<img :src="data.qrcode" class="share_qr">
					</div>
                    <a :href="data.down_image" download="share.jpg">
                        <div class="down" id="download" ref="down">请截屏保存图片分享哦</div>
                    </a>
                    <!-- <div class="down" ref="down">长按保存图片哦</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import Fetch from '../../utils/fetch';
    import {Overlay} from 'vant';
    import {Uploader} from 'vant';
    import {Button} from 'vant';
    import axios from 'axios'

    Vue.use(Overlay).use(Uploader).use(Button);

    export default {
        name: "jz",
        data() {
            return {
                data: {},
                show_down: false,
                timer: null
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.timer = null;
            this.start();
        },
        methods: {
            start() {
                Fetch('/index/share_view', {id: this.$router.history.current.params.id}).then((r) => {
                    this.data = r.data;
                });
            },
            showDown() {
                this.show_down = true;
                var is_color = false;
                var down = document.getElementById('download');
                this.timer = setInterval(() => {
                    if(is_color){
                        is_color = false;
                        down.style.background = 'rgb(103, 58, 183)';
                    }else{
                        is_color = true;
                        down.style.background = 'rgb(233, 30, 99)';
                    }
                }, 500);
            },
            hideDown() {
                clearInterval(this.timer);
                this.show_down = false;
            },
            beforeRead(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    this.$notify('只支持jpg,png图片上传');
                    return false;
                }
                return true;
            },
            afterRead(file) {

                let formData = new FormData();
                formData.append('file', file.file);
                formData.append('id', this.$router.history.current.params.id);
                formData.append('ssid', localStorage.getItem('ssid'));
				formData.append('token', localStorage.getItem('token'));
                axios.post("/api/index/share_upload", formData).then((r) => {
                    if(r.data.code === 1){
                        this.$notify({
                            background: '#07c160',
                            message: '上传成功',
                        });
                    }else{
                        this.$notify(r.data.info);
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
        .mask{
            position: fixed;
            z-index: 20;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
        }
    .jobsdetail_wrap {
        height: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        background: #f5f5f5;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        background-image: url(./jobsdetail/bg.jpg);
    }

    .jobsdetail_wrap {

        /deep/ .van-uploader__input-wrapper {
            width: 100%;
            border-radius: 7px;
            background: #ffb400;
        }

        .wrapper {
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .file {
            width: 100%;
        }

        .upload {
            flex: 0 0 45%;
        }

        .block {
            width: 90%;
            height: 80%;
			.share_img{
				position: relative;
				.share_qr{
					position: absolute;
					bottom: 100px;
					width: 130px;
					height: 130px;
					left: 50%;
					margin-left: -67px;
				}
			}
            img {
                width: 100%;
				height: 600px;
            }
        }

        .down {
            border-radius: 2px;
            background: rgb(103, 58, 183);
            width: 190px;
            height: 40px;
            line-height: 40px;
            margin: 15px auto;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
        }
    }

    .jobsdetail_wrap .btn_box {
        padding: 40px 30px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .jobsdetail_wrap .btn_box .btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: relative;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 45%;
        flex: 0 0 45%;
        overflow: hidden;
        line-height: inherit;
        font-size: 16px;
        height: 45px;
        border-radius: 4px;
        color: #fff;
    }

    .jobsdetail_wrap .btn_box .btn.btn_red {
        background: #ef5050;
    }

    .jobsdetail_wrap .btn_box .btn.btn_yellow {
        background: #ffb400;
    }

    .jobsdetail_wrap .btn_box .btn .file {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
    }

    .jobsdetail_wrap .share_ctn {
        margin: 0 20px;
        background: rgba(255, 255, 255, 0.75);
        border-radius: 5px;
        padding: 10px;
    }

    .jobsdetail_wrap .share_ctn .title {
        font-size: 16px;
        color: #ffb400;
        line-height: 26px;
        margin: 10px auto;
        text-align: center;
    }

    .jobsdetail_wrap .share_ctn .info {
        font-size: 12px;
        color: #000;
        line-height: 1.6;
        margin-bottom: 6px;
    }

    .jobsdetail_wrap .share_ctn .share_img {
        display: block;
        max-width: 100%;
    }
</style>


