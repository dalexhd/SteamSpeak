module.exports = (context) => {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { hotjar } = themeConfig || {};

  if (!hotjar) {
    throw new Error(
      `You need to specify 'hotjar' object in 'themeConfig' with 'siteId' and 'version' field in it to use hotjar plugin`
    );
  }

  const { siteId, version } = hotjar;

  if (!siteId) {
    throw new Error(
      'You specified the `hotjar` object in `themeConfig` but the `siteId` field was missing. ' +
        'Please ensure this is not a mistake.'
    );
  }

  if (!version) {
    throw new Error(
      'You specified the `hotjar` object in `themeConfig` but the `version` field was missing. ' +
        'Please ensure this is not a mistake.'
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'hotjar',

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:${siteId},hjsv:${version}};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }
        ]
      };
    }
  };
};
