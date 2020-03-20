module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'SteamSpeak';
        return args;
      });
  },
  pwa: {
    name: 'SteamSpeak',
    themeColor: '#000000',
    msTileColor: '#da532c',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    gcm_sender_id: '1021489007211',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    exclude: [
      /\.map$/,
      /manifest\.json$/,
    ],
  },
  integrity: true,
};
