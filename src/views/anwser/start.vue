<template>
    <div class="main">
		<div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        看图猜成语
		    </div>
		</div>
        <img class="logo" src="logo" alt=""/>
        <div class="rule_box">
			
            <div class="rule_title">{{data.title}}</div>
			<div style="text-align: center;" ><img style="width: 100%;" :src="data.images"></div>
            <div class="rule_info_box">
                <div ref="anwser" class="anwser_item" v-for="(v, k) in data.values" :key="k"
                     @click="apply(v.id, $event)">{{v.value}}
                </div>
            </div>
        </div>
        <div class="mt3">答题倒计时:<span>
            <van-count-down class="mm" :time="data.m" @finish="stop" ref="countDown">
                <template v-slot="timeData">
                    <span class="item">{{timeData.seconds}}</span>
                </template>
            </van-count-down>
        </span>秒
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Fetch from '../../utils/fetch'
    import {CountDown} from 'vant';
    import {Dialog} from 'vant';

    Vue.use(CountDown);

    export default {
        name: "index",
        data() {
            return {
                data: {
                    title: '',
                    values: [],
                    m: 10 * 1000,
					type: 1,
					images: '',
					cid : '',
                }
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.$refs.countDown.pause();
            this.start();
        },
        methods: {
            start() {
                Fetch('/index/getAnswer', {type: this.data.type}).then(res => {
                    //this.data = res.data;
                    this.data.title = res.data.title;
                    this.data.values = res.data.values;
                    this.data.m = res.data.m * 1000 + 1000;
					this.data.images = res.data.image;
                    this.$refs.countDown.reset();
                    this.data.lid = res.data.lid;
					this.data.type = 3;
					this.data.cid = res.data.key;
					Dialog.alert({
					    message: res.data.status = res.info,
					   // message: res.data.status === 'Y' ? '点击'
					}).then(() => {
					    /* if (res.code > 1) {
					        this.setStyle();
					        this.start();
					    } else {
					        this.$router.replace('/anwser/stop');
					    } */
					});
                });
            },
            apply(id, event) {
                this.setStyle();
                event.target.style.background = '#f4c3d7';
                this.stop(id)
            },
            setStyle(){
                this.$refs.anwser.forEach((v) => {
                    v.style.background = ''
                });
            },
            stop(id = 0) {
				if(id != this.data.cid){
					this.data.type = 2;
				}
                this.$refs.countDown.pause();
                Fetch('/index/getAnswer', {type: this.data.type}).then(res => {
					//this.data = res.data;
					this.data.title = res.data.title;
					this.data.values = res.data.values;
					this.data.m = res.data.m * 1000 + 1000;
					this.data.images = res.data.image;
					this.$refs.countDown.reset();
					this.data.lid = res.data.lid;
					this.data.type = 3;
					this.data.cid = res.data.key;
					
                    Dialog.alert({
                        message: res.data.status = res.info,
                       // message: res.data.status === 'Y' ? '点击'
                    }).then(() => {
                        /* if (res.code > 1) {
                            this.setStyle();
                            this.start();
                        } else {
                            this.$router.replace('/anwser/stop');
                        } */
                    });
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .main {
        min-height: 100%;
        background-image: url(./image/bg.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        background-color: #0b0d2d;
        padding-bottom: 40px;
    }

    .main .rule_box .rule_info_box .answer_item.answer_item_active {
        background: #f4c3d7;
    }

    .main .logo {
        display: block;
        width: 77.08%;
        margin: 0 auto 14px auto;
    }

    .main .rule_box {
        width: 92.78%;
        margin: 0 auto;
        border-radius: 12px;
        background-color: #fff;
        padding: 14px 0 60px 0;
    }

    .main .rule_box .rule_title {
        text-align: center;
        font-size: 18px;
        color: #464545;
        line-height: 1.7;
        padding: 0 14px;
    }

    .main .rule_box .rule_info_box {
        text-align: left;
        font-size: 14px;
        color: #464545;
        line-height: 1.7;
    }

    .main .rule_box .rule_info_box .anwser_item {
        width: 98%;
        min-height: 50px;
        border-radius: 50px;
        background: #e4e4e9;
        padding: 15px 15px;
        text-align: left;
        font-size: 18px;
        color: #464545;
        font-weight: bold;
        margin: 30px auto;
        //line-height: 50px;
        text-indent: 30px;
    }

    .main .rule_box .rule_info_box .anwser_item.anwser_item_active {
        background: #f4c3d7;
    }

    .main .mt3 {
        width: 100%;
        // background: #ff0000;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        height: 40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 26px auto 0 auto;
    }

    .main .mt3 .mm {
        color: #ffffff;
        font-size: 26px;
        font-weight: bold;
        padding: 0 10px;
    }

    @media (max-width: 960px) {
    }
</style>


