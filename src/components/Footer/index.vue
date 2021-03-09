<template>
  <van-tabbar v-if="show" v-model="active" :active-color="activeColor">
    <van-tabbar-item icon="invest" icon-prefix="icon-invest iconfont" to="/item" size="22px">
      投资
    </van-tabbar-item>
    <van-tabbar-item icon="todo-list-o" to="/index">任务</van-tabbar-item>
    <van-tabbar-item icon="wap-home-o" to="/tree">首页</van-tabbar-item>
    <van-tabbar-item icon="chat-o">客服</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'Footer',
  props: ['show'],
  computed: {},
  created() {
    this.footerType = localStorage.getItem('footer');
  },
  data() {
    return {
      active: 0,
      activeColor: '#2c6dfb',
      footerType: 'n1'
    };
  }
};
</script>
<style lang="scss" scoped>
/deep/.icon-invest {
  font-size: 22px;
}
</style>
