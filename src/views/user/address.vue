<template>
    <div class="wrap">
        <!-- <div id="header">
            <div class="header">
                <span class="back" @click="$router.push('/user')"></span>
                <span class="add" @click="$router.push('/editaddress')" >{{title}}</span>
                收货地址
            </div>
        </div> -->
          <van-nav-bar
        title="收货地址"
        left-arrow
        right-text="编辑地址"
        @click-right="$router.push({ path: '/editaddress' })"
        fixed
        @click-left="$router.push({ path: '/user' })"
      />
      <div class="address_wrap">
           <van-address-list
  v-model="chosenAddressId"
  :list="data.list"
  default-tag-text="默认"
 @add="onAdd"
  @edit="onEdit"
/>

      </div>
     
        <!-- <div class="address_wrap">
            <div class="item" v-for="(v,k) in data.list" :key="k" :class="v.is_default === 'Y' ? 'item_default' : ''">
                <span class="left"></span>
                <div class="center">
                    <div class="center_top">
                        <span class="item_name">{{v.name}}</span><span class="item_mobile">{{v.tel}}</span>
                    </div>
                    <div class="center_bottom">{{v.province}} {{v.city}} {{v.county}} {{v.address}}</div>
                </div>
                <span class="right" @click="$router.push('/editaddress/' + v.id)">编辑</span>
                
            </div> -->
            <!--            &lt;!&ndash; 默认地址加class item_default &ndash;&gt;-->
            <!--            <div class="item item_default">-->
            <!--                <span class="left"></span>-->
            <!--                <div class="center">-->
            <!--                    <div class="center_top">-->
            <!--                        <span class="item_name">X先生</span><span class="item_mobile">15888888888</span>-->
            <!--                    </div>-->
            <!--                    <div class="center_bottom">xx省 xx市 xx区 xx小区1栋2单元xxxx</div>-->
            <!--                </div>-->
            <!--                <span class="right">编辑</span>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>

import Fetch from '../../utils/fetch'
import { Dialog } from 'vant';

export default {
  name: "index",
  components: {},
  data () {
    return {
      data: {},
      money_info: '',
      money: '',
      chosenAddressId:'',
      title: '添加新地址',
    };
  },
  created () {
    this.$parent.footer(false);
  },
  mounted () {
    this.start();
  },
  methods: {
    onAdd () {
      Dialog.alert({
        title: '温馨提示',
        message: '暂时不支持添加地址功能',
      }).then(() => {
        // on close
      });
    
    //   this.$router.push({ path: '/editaddress' })
    },
    onEdit (v) {
      console.log(v)
      this.$router.push('/editaddress/' + v.id)
    },
    start () {

      Fetch('/user/address_list').then(res => {
        this.data = res.data;
        if (this.data.count > 0) {
          this.title = '';
        }
         this.data.list = this.data.list.map((item, index) => {
            return {
              ...item,
              address: `${item.province} ${item.city} ${item.county} ${item.address}`
            }
          })
          this.chosenAddressId =  this.data.list[0].id
      })

    },
    onDelete (id) {
      Fetch('/user/address_del', {
        id: id,
      }).then(() => {
        Fetch('/user/address_list').then(res => {
          this.data = res.data;
         
        })
      });
    },
  }
};
</script>

<style lang="less" scoped>
html,
body {
  background: #fff;
}

#header {
  width: 100%;
  height: 50px;
}

#header .header {
  height: 50px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  z-index: 20;
  background: #f4f4f4;
  font-size: 18px;
  color: #3e3e3e;
  text-align: center;
  line-height: 50px;
}

#header .header .back {
  display: inline-block;
  width: 15px;
  height: 17px;
  background-image: url(./images/back_l.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 10px;
  z-index: 21;
}

#header .header .add {
  display: inline-block;
  font-size: 14px;
  color: #3e3e3e;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 10px;
  z-index: 21;
}

.address_wrap {
  width: 100%;
  margin-top: 100px;
}

.address_wrap .item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 14px 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.address_wrap .item .left {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 34px;
  flex: 0 0 34px;
  height: 34px;
  border-radius: 34px;
  background: #b0b2b4;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  line-height: 34px;
}

.address_wrap .item .center {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0 16px 0 10px;
  max-width: 80%;
}

.address_wrap .item .center .center_top {
  font-size: 15px;
  color: #313131;
  margin-bottom: 2px;
}

.address_wrap .item .center .center_top .item_mobile {
  font-size: 13px;
  color: #a1a1a1;
  margin-left: 18px;
}

.address_wrap .item .center .center_bottom {
  font-size: 15px;
  color: #3e3e3e;
  line-height: 1.7;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.address_wrap .item .right {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 40px;
  flex: 0 0 40px;
  text-align: right;
  line-height: 24px;
  height: 24px;
  color: #979797;
  font-size: 13px;
  border-left: 1px solid #ededed;
}

.address_wrap .item.item_default .left {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(./images/home.svg);
}
</style>
<style lang="scss" scoped>
.wrap {
  background: #f2f2f2;
  height: 100vh;
}
</style>