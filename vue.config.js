const path = require('path')
// const px2rem = require('postcss-px2rem')
// const px2rem = require('postcss-px2rem-exclude')
// const autoprefixer = require('autoprefixer')

// const postcss = px2rem({
//   exclude: /node_modules/i,
//   remUnit: 100 // 基准大小 baseSize，需要和 ./src/js/lib/flexible.js 中相同
// })


// const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [postcss, autoprefixer]
      // },
      sass: {
        prependData: '@import \'~@/assets/styles/index.scss\';'
        // rependData: "@import '~@/assets/styles/utils.scss';"
      }
    }
  },
  // devServer: {
  //   disableHostCheck: true,
  //   host: 'demo.bcn5ln.cn',
  //   port: 8080,
  //   https: true
  // },
  configureWebpack: {
    // externals: {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios'
    // },
    plugins: []
  },
  chainWebpack: config => {
    if (isProduction) {
      // 压缩图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
            quality: 80
          }
        })
        .end()
    }
  },
  lintOnSave: false,
  productionSourceMap: false
}
