const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool('source-map')
    }
    config.plugin('html').tap(args => {
      args[0].title = 'front-vue';
      return args;
    })
  }  
})
