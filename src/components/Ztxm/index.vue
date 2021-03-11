<template>
  <div class="card bg-w mt-16">
    <div class="card-title">
      <i class="icon iconfont icon-financial"></i>
      在投项目
    </div>
    <div class="card-item" v-for="(item, index) of data.list" :key="index">
      <div class="img-box">
        <img :src="item.thumb" class="cart-item-img" @click="goToDetail(item.id, item.schedule)" />
        <div class="desc">{{ item.title }}</div>
      </div>

      <Process :schedule="item.schedule" />

      <van-row class="card-desc">
        <van-col span="12" v-if="item.type === 7"> 产品小时利率：{{ item.rate }}% </van-col>
        <van-col span="12" v-if="item.type === 7"> 每小时收益：{{ item.apr_money }}元 </van-col>

        <van-col span="12"> 产品日利率：{{ item.rate }}% </van-col>
        <van-col span="12"> 每日收益：{{ item.apr_money }}元 </van-col>

        <van-col span="12" v-if="item.type === 7">项目周期：{{ item.day }}小时 </van-col>
        <van-col span="12" v-else>项目周期：{{ item.day }}天 </van-col>
        <van-col span="12">总收益：{{ item.allmoney }}元</van-col>

        <van-col span="12"> 您的等级：{{ item.vip }} </van-col>

        <van-col span="12" class="color-blue"> VIP日利率：{{ item.vip_rate }}% </van-col>

        <van-col span="12" v-if="item.type === 7"> 元宵福利】{{ item.type_name }} </van-col>

        <van-col span="12" v-else class="color-gray">{{ item.type_name }} </van-col>

        <van-col span="12" v-if="item.type !== 7" class="color-orange">
          积分：{{ item.min }}
        </van-col>

        <van-col style="margin-top: 12px" span="24">
          <van-button
            color="linear-gradient(to right,  #e89d4c, #ff6034)"
            round
            block
            @click="goToDetail(item.id, item.schedule)"
            :disabled="item.schedule === 100"
            size="small"
          >
            {{ item.schedule !== 100 ? '马上投资' : '项目结束' }}
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Process from '../Process'
export default {
  props: ['data'],
  components: { Process },
  data() {
    return {};
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.card-item{
  margin-bottom: 50px !important;
}
</style>
