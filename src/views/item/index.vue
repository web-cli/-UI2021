<template>
  <div class="item_body invest-container">
    <!-- banner -->
    <van-swipe :autoplay="2500" class="invest-banner">
      <van-swipe-item v-for="(image, index) of banner" :key="index" height="3rem">
        <a :href="image.url">
          <img :src="image.thumb" />
        </a>
      </van-swipe-item>
    </van-swipe>

    <!-- 公告 -->
    <van-notice-bar left-icon="volume-o" class="mt-16">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) of invest" :key="index">
          {{ item.phone }}成功投资{{ item.money }}元在项目{{ item.title }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    

    <!-- 在投项目	 -->
    <Ztxm :data="data" >

      	<svg class="svg iconImg" aria-hidden="true" style="width: 23px;height: 23px;vertical-align: text-bottom;">
					<use xlink:href="#icon-financial"></use>
				</svg>
				在投项目
    </Ztxm>

    <!-- <div class="mt0" v-for="item in data.list" @click="goToDetail(item.id, item.schedule)">
      <div class="img_box">
        <img class="img" :src="item.thumb" alt="" />
      </div>
      <div class="outer_wrap">
        <div class="mt0_title">{{ item.title }}</div>
        <div class="pro_wrap">
          <div class="process">
            <div class="percent" v-bind:style="schedule(item.schedule)"></div>
          </div>
          <span class="percent_num">{{ item.schedule }}%</span>
        </div>
        <div class="mt0_detail" v-if="item.type === 7">
          <span class="mt0_detail_left"> 产品小时利率：{{ item.rate }}%</span>
          <span class="mt0_detail_right">每小时收益：{{ item.apr_money }}元</span>
        </div>
        <div class="mt0_detail" v-else>
          <span class="mt0_detail_left"> 产品日利率：{{ item.rate }}%</span>
          <span class="mt0_detail_right">每日收益：{{ item.apr_money }}元</span>
        </div>
        <div class="mt0_detail">
          <span class="mt0_detail_left" v-if="item.type === 7">项目周期：{{ item.day }}小时</span>
          <span class="mt0_detail_left" v-else>项目周期：{{ item.day }}天</span>
          <span class="mt0_detail_right">总收益：{{ item.allmoney }}元</span>
        </div>
        <div class="mt0_detail">
          <span class="mt0_detail_left">项目总金额：{{ item.total }}万元</span>
          <span class="mt0_detail_right">起投金额：{{ item.min }}元起</span>
        </div>
        <div class="mt0_detail">
          <span class="mt0_detail_left">您的等级：{{ item.vip }}</span>
          <span class="mt0_detail_right_vip">VIP日利率：{{ item.vip_rate }}%</span>
        </div>
        <div class="mt0_detail">
          <span class="mt0_b_all" v-if="item.type === 7" style="color: #E54D42;font-weight:bold;"
            >【元宵福利】{{ item.type_name }}</span
          >
          <span class="mt0_b_left" v-else>{{ item.type_name }}</span>
          <span class="mt0_b_right" v-if="item.type !== 7">积分：{{ item.min }}</span>
        </div>

        <div
          class="btn_touzi"
          style="position: absolute;bottom: 0;"
          @click="goToDetail(item.id, item.schedule)"
          v-if="item.schedule !== 100"
        >
          马上投资
        </div>
        <div class="btn_touzi_full" style="position: absolute;bottom: 0;" v-else>项目结束</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue';
import Fetch from '../../utils/fetch';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { Swipe, SwipeItem, NoticeBar } from 'vant';
import Ztxm from '../../components/Ztxm';

Vue.use(NoticeBar);
export default {
  name: 'index',
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    videoPlayer,
    Ztxm
  },
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              'https://dongli1219.oss-cn-hangzhou.aliyuncs.com/99f234f4c150de9455218255be1fff4c.mp4', // 路径
            type: 'video/mp4' // 类型
          }
        ],
        poster: 'https://www.njmbttd.com/upload/ljy.jpg', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      data: {},
      down_show: true,
      link_width: 0,
      banner: [],
      notice: '',
      links: [],
      ad: {},
      ad_show: false,
      horn_msg: '',
      horn_block: false,
      notice_num: 1,
      invest: {}
    };
  },
  created() {
    this.$parent.footer(true, 'touzi');
  },
  mounted() {
    this.start();
  },
  methods: {
    onChange(index) {
      let els = this.$refs.dian.querySelectorAll('div');
      for (let i = 0; i < els.length; i++) {
        els[i].className = '';
      }
      els[index].className = 'selected';
    },
    start() {
      // 修复个别手机不能滚动到顶端
      setTimeout(() => {
        var element = document.getElementById('app');
        element.scrollIntoView();
      }, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // Fetch('/index/item').then(res => {
      // 	this.data = res.data;
      // })
      Fetch('/index/iteminfo').then(res => {
        this.data = res.data;
      });

      Fetch('/index/banner', {
        type: 'banner'
      }).then(res => {
        this.banner = res.data;
      });

      Fetch('/index/getinvest5').then(res => {
        // 首页公告 图标
        if (res.data.list) {
          this.invest = res.data.list;
        }
      });
    },
    schedule(schedule) {
      return {
        width: schedule + '%'
      };
    },
    goToDetail(id, schedule) {
      if (schedule >= 100) {
        this.$dialog
          .alert({
            title: '温馨提示',
            message: '项目已满，请更换项目投资。',
            theme: 'round-button'
          })
          .then(() => {
            // on close
          });
        return;
      }
      this.$router.replace('/item/' + id);
    },
    move() {
      var m_l = 50;
      var width = document.getElementById('horn_go1').getBoundingClientRect().width;
      var box = document.getElementById('horn_go1');
      var box2 = document.getElementById('horn_go2');
      box2.style.left = width + m_l + 'px';
      box2.style.display = 'block';
      var distance = 10;
      var distance2 = m_l + width;
      // 设置位移
      setInterval(function() {
        distance = distance - 1;
        distance2 = distance2 - 1;
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width + m_l) {
          distance = width + m_l;
        }
        if (-distance2 >= width + m_l) {
          distance2 = width + m_l;
        }
        box.style.left = distance + 'px';
        box2.style.left = distance2 + 'px';
      }, 40);
    },
    schedule_left(schedule) {
      if (schedule > 80) {
        return {
          left: schedule - 30 + '%',
          color: '#fff'
        };
      } else {
        return {
          left: schedule.slice(0, 5) + '%'
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.input_video {
  margin: 0 auto;
}
/*播放按钮设置成宽高一致，圆形，居中*/
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 2.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  margin-left: -1em !important;
  width: 2em !important;
  outline: none;
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

/*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time {
  order: 3 !important;
}

/*进度条背景轨道*/
.video-js .vjs-slider {
  border-radius: 1em;
}

/*进度条进度*/
.vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  border-radius: 1em;
}

/*鼠标进入播放器后，播放按钮颜色会变*/
.video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:active,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

/*control bar*/
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

/*点击按钮时不显示蓝色边框*/
.video-js .vjs-control-bar button {
  outline: none;
}
.horn_box {
  width: 76.8%;
  height: 26px;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 13px;
  // position: absolute;
  line-height: 26px;
  font-size: 12px;
  padding-left: 39px;

  .horn_icon {
    display: block;
    float: left;
    width: 19px;
    height: 19px;
    // position: absolute;
    left: 6px;
    top: 4px;
    background: url(../index/image/tree/horn.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .horn_tips {
    width: 95%;
    white-space: nowrap;
    height: 26px;
    overflow: hidden;
    line-height: 26px;
    position: relative;

    .horn_go {
      left: 0;
      position: absolute;
      top: 0;
    }
  }
}

.item_body .head {
  background: #fff;
  color: #212121;
  box-shadow: 0 0.0625rem 0.15625rem #eee;
  -webkit-box-shadow: 0 0.0625rem 0.15625rem #eee;
  -ms-box-shadow: 0 0.0625rem 0.15625rem #eee;
}

.top {
  padding: 30px 0 24px 0;
  background: #544b5e;
}

.outer_wrap {
  margin-bottom: 40px;
  padding: 0px 0px 5px 0;
}

.pro_wrap {
  width: 100%;
  position: relative;
  height: 17px;
  line-height: 17px;
  margin-top: 10px;
}

.top .title {
  width: 55.4%;
  height: 36px;
  line-height: 36px;
  border-radius: 36px;
  background: #e8c27d;
  margin: 0 auto;
  text-align: center;
  color: #333333;
  font-size: 18px;
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
  margin: 0.25rem 0 0.15rem 0;
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
  text-align: center;
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
  padding: 0 0.2rem;
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
.notice-swipe {
  height: 24px;
  line-height: 24px;
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
  	/deep/ .marquee_outer .van-notice-bar {}

	/deep/ .marquee_outer {
		box-shadow: none;
		background: none;
	}

	/deep/ .marquee_outer .van-icon-volume-o::before {
		content: '';
		width: 22px;
		height: 23px;
		background: url(../../assets/images/horn.png) no-repeat center center;
		background-size: 100% 100%;
		margin-right: 6px;
	}

	/deep/ .van-notice-bar__content {
		color: #202020;
	}

	/deep/ .van-notice-bar {
		padding: 0 7px;
	}
}
</style>
