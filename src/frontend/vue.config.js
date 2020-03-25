const _package = require('../backend/package.json');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'SteamSpeak';
      return args;
    });
    config.plugin('define').tap((args) => {
      args[0]['process.env'].VERSION = JSON.stringify(_package).version;
      return args;
    });
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pwa: {
    name: 'SteamSpeak',
    themeColor: '#448aff',
    msTileColor: '#da532c',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    gcm_sender_id: '1021489007211',
    manifestOptions: {
      background_color: '#448aff'
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  },
  // devServer: {
  //   overlay: {
  //     warnings: false,
  //     errors: false
  //   }
  // },
  integrity: true
};
