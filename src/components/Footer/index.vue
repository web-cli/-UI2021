<template>
  <van-tabbar v-if="show" v-model="active" :active-color="activeColor">
    <van-tabbar-item
      v-if="isN2"
      icon="invest"
      icon-prefix="icon-invest iconfont"
      to="/item"
      size="22px"
    >
      投资
    </van-tabbar-item>
    <van-tabbar-item v-if="isN2" icon="todo-list-o" to="/index">任务</van-tabbar-item>
    <van-tabbar-item v-if="isN2 || isN1" icon="wap-home-o" to="/tree">首页</van-tabbar-item>
    <van-tabbar-item v-if="isN2" icon="chat-o">客服</van-tabbar-item>
    <van-tabbar-item v-if="isN2 || isN1" icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    footerType: {
      type: String,
      default: 'n1'
    }
  },
  computed: {
    isN1() {
      return this.footerType === 'n1';
    },
    isN2() {
      return this.footerType === 'n2';
    }
  },
  data() {
    return {
      active: 0,
      activeColor: '#2c6dfb'
    };
  }
};
</script>
<style lang="scss" scoped>
/deep/.icon-invest {
  font-size: 22px;
}
</style>
