<template>
  <van-tabbar v-if="show" v-model="active" :active-color="activeColor" @change="handleChange">
    <van-tabbar-item
      v-for="item of tarbarList"
      :key="item.name"
      :name="item.name"
      :v-show="item.show"
      :to="item.to"
      :icon="item.icon"
      :icon-prefix="item.iconPrefix || 'van-icon'"
      :size="item.size"
    >
      {{ item.text }}
    </van-tabbar-item>
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
    },
    kefu: {
      type: Function,
      default: () => {}
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
      active: 'home',
      activeColor: '#2c6dfb',
      tarbarList: [
        {
          show: this.isN2,
          text: '投资',
          name: 'invest',
          icon: 'invest',
          iconPrefix: 'icon-invest iconfont',
          to: '/item',
          size: '22px'
        },
        {
          show: this.isN2,
          text: '任务',
          name: 'task',
          icon: 'todo-list-o',
          to: '/index'
        },
        {
          show: this.isN2 || this.isN1,
          text: '首页',
          name: 'home',
          icon: 'wap-home-o',
          to: '/tree'
        },
        {
          show: this.isN2,
          text: '客服',
          name: 'kefu',
          icon: 'chat-o'
        },
        {
          show: this.isN2 || this.isN1,
          text: '我的',
          name: 'mine',
          icon: 'user-o',
          to: '/user'
        }
      ]
    };
  },
  methods: {
    handleChange() {
      if (this.active === 'kefu') {
        this.kefu();
      }
    }
  }
};
</script>
<style lang="scss">
.iconfont.icon-invest {
  font-size: 0.36rem;
}
</style>
