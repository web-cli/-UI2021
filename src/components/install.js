import Vue from 'vue'
const files = require.context('@/components', true, /index\.vue$/)
files.keys().forEach(key => {
  const name = key.match(/\/(.+)\/index.vue/)[1]
  Vue.component(name, files(key).default || files(key))
})
