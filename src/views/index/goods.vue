<template>
  <div class="mobile">
    <!-- <div class="header">
			<div class="head">
				<a @click="$router.back()" class="back"></a>
				积分商城
			</div>
		</div> -->

    <van-nav-bar
      title="积分商城"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 		<div class="imgs">
			<img src="./image/huanbao/jiaoshi.png" style="width: 100%;" alt="">
		</div> -->
    <div
      style="
        font-size: 14px;
        font-weight: 500;
        padding-left: 25px;
        margin-top:50px;
				background:#f7f8fa;
      "
    >
      <p>我的积分：<span style="color:#ee0a24">{{ mydata.integral }}</span> </p>
    </div>
    <div class="goods_list">
      <div v-for="(item, j) in category_data.category" class="goods-wrap">
        <div class="right_list" v-for="(item2, j_num) in item.list">
          <div class="shop_pic"  @click="enterDetail(item2)">
            <img :src="item2.img" />
          </div>
          <div class="shop_detail">
            <p class="list_title" style="font-weight: 500; margin-top: 5px">
              {{ item2.title }}
            </p>
            <div class="shop_gb">
              <div class="vip_icon">
                <p>
                  <span>{{ item2.integral }} </span>积分
                </p>
              </div>
              <!-- <div class="vip_icon" :class="`vip${item2.level}`">
								<span>{{item2.price}}积分</span>
							</div> -->
              <!-- <div class="vip_icon2 vip_icon" :class="`vip${item2.next_level}`">
								<span>{{item2.next_level_price}}积分</span>
							</div> -->
            </div>
            <!-- <div class="dh_num"> -->
            <!-- <div class="add_del">
								<span @click="del(j,j_num)">-</span>
								<span class="num">{{dh_num[j][j_num]}}</span>
								<span @click="add(j,j_num)">+</span>
							</div> -->
            <!-- <div class="dh_btn" :class="[{'dh_yes':item2.status==1},{'dh_no':item2.status==2},{'dh_over':item2.status==3},]" @click="category_btn(item2.id,dh_num[j][j_num])">{{dh_status(item2.status)}}</div> -->
            <!-- <div class="dh_btn" @click="category_btn(item2.id,dh_num[j][j_num])">兑换</div> -->

            <!-- </div> -->
            <div class="btn">
              <van-button
                round
                block
                type="info"
                @click="category_btn(item2.id, dh_num[j][j_num])"
                size="small"
                >兑换</van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch';

export default {
  name: "shop",
  data () {
    return {
      mydata: {},
      data: {},
      dh_index: 0,
      horn_block: false,
      category_data: {},
      is_sleep: false,
      show_water: true,
      show_manure: true,
      treeImg: '',
      dh_num: [],
      only_num: 1,
      sign_ok: false,
      new_sign_ok: false,
      shop_show: false,
      show_apple: false,
      rule_mask: false,
      add_res: false,
      only_money: false,
      money_icon_show: false,
      show_delay_animate: '',
      level_lc: 'lv2',
      horn_msg: '',
      jump_url: '/item',
      fly_go: '',
      hide_tree: [],
      progress: '0%',
      notice_num: 1,
      mp3: '',
      sign_money: 0,
      dh_btn_type: '',
      water_time: '每日0点—24点',
      water_rule: 'cs2',
      rule_dh: false,
      rule_msg: 'cs'
    };
  },
  created () {
    this.$parent.footer(false);
  },
  mounted () {

    setTimeout(function () {
      document.getElementById('app').style.marginBottom = 0;
    }, 100)
    this.mp3 = require('./image/didi.mp3');
    this.start();
    if (location.href.indexOf('openshop') != -1) {
      this.shop_show = true;
    }


    // $(window).resize(function(){
    // 	set();
    // });

    // set();
    // this.start();
  },
  methods: {
    enterDetail (item) {
      this.$router.push({ path: '/goods_detail2', query: item })
    },
    start () {
      Fetch('/user/info').then(res => {
        this.mydata = res.data;
      })
      // 兑换信息
      Fetch('/index/goods_list').then(res => {

        this.category_data = res.data;
        for (var i = 0; i < res.data.category.length; i++) {
          this.dh_num.push([]);
          for (var j = 0; j < res.data.category[i].list.length; j++) {
            this.dh_num[i].push(1);
          }
        }
        if (res.data.exchange_rules.content || res.data.exchange_rules.title) {
          this.rule_msg = res.data.exchange_rules.content || res.data.exchange_rules.title;
        }
      });

    },
    category_btn (id, num) {
      Fetch('/index/shop_exchange', {
        gid: id,
        num: num
      }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info
        });
        this.start();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-size: 16 * 2px;
  height: 100%;
}

.goods_list {
  position: absolute;
  width: 100%;
  height: 100%;
}

.right_list {
  border-radius: 12 * 2px;
  background: #ffffff;
  border-radius: 12 * 2px;
  // margin-top: 2vw;
  width: 46%;
  height: 200 * 2px;
  box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2);
  margin-top: 30px;
	margin-bottom: 30px;
}
.goods-wrap {
  display: flex;
  justify-content: space-between;
  padding: 0 20 * 2px;
  flex-wrap: wrap;
  flex-shrink: 1;
  padding-bottom: 20 * 2px;
  background: #f7f8fa;
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
.shop_pic {
  @include flex-center();
  width: 150 * 2px;
  height: 76 * 2px;
  margin-top: 10 * 2px;
  img {
    max-width: 120 * 2px;
    max-height: 76 * 2px;
  }
}
.btn {
  width: 100 * 2px;
  margin: 10 * 2px auto 0 auto;
}
.vip_icon {
  color: #cbc9cc;
  font-size: 14 * 2px;
  span {
    font-weight: bold;
    color: #ee0a24;
  }
}
</style>
