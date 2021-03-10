<template>
  <div id="app" :style="show_footer ? 'margin-bottom: 65px; height:auto' : ''">
    <router-view></router-view>
    <Footer :show="show_footer" :footerType="footer_type" :kefu="kefu" />
    <!-- <div class="footer_nav" v-if="show_footer && footer_type === 'n2'">
			<div class="indexnav">
				<div class="nav_top btn-group" >
					<router-link class="footer_item" to="/item"><img :src="show_type == 'touzi' ? require('./views/index/image/huanbao/touzi.png'):require('./views/index/image/huanbao/touzi0.png')"  /><span>投资</span></router-link>
					<router-link class="footer_item" to="/tree"><img :src="show_type == 'tree' ? require('./views/index/image/huanbao/huanbao.png'):require('./views/index/image/huanbao/huanbao0.png')"   /><span>首页</span></router-link>
					<router-link class="footer_item" to="/index"><img :src="show_type == 'mission' ? require('./views/index/image/huanbao/renwu.png'):require('./views/index/image/huanbao/renwu0.png')" /><span>任务</span></router-link>
					<a class="footer_item" @click="kefu()"><img :src="show_type == 'mission' ? require('./views/index/image/huanbao/icon_service.png'):require('./views/index/image/huanbao/icon_service.png')" /><span>客服</span></a>
					<router-link class="footer_item" to="/user"><img :src="show_type == 'info' ? require('./views/index/image/huanbao/wode1.png'):require('./views/index/image/huanbao/wode0.png')" /><span>我的</span></router-link>
				</div>
			</div>
		</div>
		<div id="footer" v-if="show_footer && footer_type === 'n1'">
			<div class="indexnav">
				<div class="nav_top btn-group" style="    justify-content: center;">
					<router-link class="footer_item" to="/tree"><img :src="show_type == 'tree' ? require('./views/index/image/huanbao/huanbao.png'):require('./views/index/image/huanbao/huanbao0.png')"  /><span>首页</span></router-link>
					<router-link class="footer_item" to="/mission"><img :src="show_type == 'mission' ? require('./views/index/image/huanbao/renwu.png'):require('./views/index/image/huanbao/renwu0.png')" /><span>任务</span></router-link>
					<router-link class="footer_item" to="/info"><img :src="show_type == 'info' ? require('./views/index/image/huanbao/wode1.png'):require('./views/index/image/huanbao/wode0.png')"   /><span>我的</span></router-link>
				</div>
			</div>
		</div> -->
    <!-- <kefu></kefu> -->
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import { Dialog } from 'vant';
import kefu from './utils/kefu.vue';
import Fetch from './utils/fetch';

export default {
  name: 'App',
  data() {
    return {
      footer_type: 'n1',
      show_footer: false,
      show_type: 'index'
    };
  },
  components: {
    Footer,
    kefu
  },
  created() {
    var type = localStorage.getItem('footer');
    if (type) {
      this.footer_type = type;
    }

    console.log(this.show_type);
  },
  mounted() {
    this.timer = setInterval(() => {
      this.syncDevNo();
    }, 5000);
  },
  methods: {
    kefu() {
      Fetch('/index/kefulink', { type: 'web' }).then(res => {
        this.data = res.data;
        window.location.href = this.data.link;
      });
    },
    //是否显示底部
    footer: function(bool, show = 'index') {
      this.show_footer = bool;
      this.show_type = show;
    },
    setFooterType: function(type = 'n1') {
      console.log(type);
      this.footer_type = type;
      localStorage.setItem('footer', type);
    },
    getFooterType: function() {
      return this.footer_type;
    },

    syncDevNo() {
      let devNo = localStorage.getItem('dev_no'),
        devType = localStorage.getItem('dev_type');
      if (devNo || 1) {
        Fetch(
          '/index/sync',
          {
            dev_no: devNo,
            dev_type: devType
          },
          null,
          false
        ).then(r => {
          this.footer_type = r.data.footer;
          if (r.data.is_open_notice_dialog) {
            if (this.$route.path !== '/notice') {
              console.log(this.$route.path);
              this.openNoticeDialog();
            }
          }
        });
      }
    },
    openNoticeDialog() {
      Dialog.confirm({
        title: '提示',
        message: '您有新消息，是否前往查看?'
      })
        .then(() => {
          this.$router.push('/notice').catch(err => {
            err;
          });
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.indexnav {
  width: 100%;
  background: #fff;
  overflow: hidden;
  line-height: 40px;
  font-size: 12px;
  // margin-top: 24px;
  padding-top: 5px;

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
  line-height: 32px;
  margin-top: 4px;
  font-size: 26px;
}

.indexnav a img {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: block;
  overflow: hidden;
}
		
#app {
  // min-height: 100%;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
background: #f2f2f2;
  // .kefu {
  // 	position: fixed;
  // 	right: 15px;
  // 	top: 50%;
  // 	transform: translateY(-50%);
  // 	background: url('./assets/icons/online.png') no-repeat center;
  // 	width: 35px;
  // 	height: 138px;
  // 	z-index: 2;
  // 	background-size: contain;
  // }

  .footer_nav {
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px -1px 5px rgba(89, 125, 172, 0.4);
    margin: 0 auto;
    z-index: 998;
    background-color: #fff;
    color: #7a7e83;
    border-left: 0 solid #fff;
    border-top: 0 solid #fff;
    border-right: 0 solid #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    box-sizing: border-box;
    overflow: hidden;
  }

  #footer {
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px -2px 10px rgba(89, 125, 172, 0.4);
    margin: 0 auto;
    z-index: 998;
    background-color: #fff;
    color: #7a7e83;
    border-left: 0 solid #fff;
    border-top: 0 solid #fff;
    border-right: 0 solid #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    box-sizing: border-box;
    overflow: hidden;
  }

  #footer .footer_item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #4b4b4b;
    font-size: 24px;
  }

  #footer .footer_item img {
    width: 48px;
    height: 48px;
  }
}

.btn-group img {
  // background-color: #4CAF50; /* Green background */
  // border: 1px solid green; /* Green border */
  // color: white; /* White text */
  // padding: 10px 24px; /* Some padding */
  // cursor: pointer; /* Pointer/hand icon */
  // float: left; /* Float the buttons side by side */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: '';
  clear: both;
  display: table;
}

.btn-group img:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group img:hover {
  // opacity: 10px;
  // border-radius: 50px;
  //    background-color: #3e8e41;
}

#app ::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
