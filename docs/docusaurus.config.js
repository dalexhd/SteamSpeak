const path = require('path');
const metadata = require('./metadata');

module.exports = {
  title: 'SteamSpeak',
  tagline: 'Steam and TeamSpeak integration, done right!',
  url: 'https://dalexhd.github.io',
  baseUrl: '/SteamSpeak/',
  favicon: 'img/favicon-16x16.png',
  organizationName: 'dalexhd', // Usually your GitHub org/user name.
  projectName: 'steamspeak', // Usually your repo name.
  customFields: {
    metadata,
    chatUrl: 'https://gitter.im/SteamSpeak',
    discordUrl: 'https://discord.gg/st4nsXw'
  },
  themeConfig: {
    navbar: {
      logo: {
        alt: 'SteamSpeak',
        src: 'img/logo-light.svg'
      },
      links: [
        { to: 'plugins/', label: 'Plugins', position: 'left' },
        {
          to: 'docs/about/what-is-steamspeak',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/dalexhd/SteamSpeak/issues',
          label: 'Issues',
          position: 'right'
        },
        { to: 'community/', label: 'Community', position: 'right' },
        { to: 'releases/', label: 'Download', position: 'right' },
        {
          href: 'https://github.com/dalexhd/steamspeak',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'What is SteamSpeak',
              to: 'docs/about/what-is-steamspeak'
            },
            {
              label: 'Get Started',
              to: 'docs/setup/installation'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/steamspeak'
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/st4nsXw'
            }
          ]
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dalexhd/steamspeak'
            }
          ]
        }
      ],
      logo: {
        alt: 'SteamSpeak',
        src: '/img/logo-light.svg',
        href: 'https://dalexhd.github.io/SteamSpeak/'
      },
      copyright: `Copyright © ${new Date().getFullYear()} SteamSpeak.`
    },
    image: '/img/logo-square.png',
    algolia: {
      apiKey: 'd30054d0a4a3376e554f4e4bb53a0bd9',
      indexName: 'steamspeak',
      algoliaOptions: {} // Optional, if provided by Algolia
    },
    googleAnalytics: {
      trackingID: 'UA-124336116-3'
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/dalexhd/steamspeak/edit/master/docs/'
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'daily',
          priority: 0.5
        }
      }
    ]
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Ubuntu|Roboto|Source+Code+Pro',
    'https://at-ui.github.io/feather-font/css/iconfont.css'
  ],
  scripts: [
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      async: true
    },
    {
      src: 'https://use.fontawesome.com/releases/v5.13.0/js/all.js',
      integrity:
        'sha384-ujbKXb9V3HdK7jcWL6kHL1c+2Lj4MR4Gkjl7UtwpSHg/ClpViddK9TI7yU53frPN',
      crossorigin: 'anonymous'
    }
  ],
  plugins: [path.resolve(__dirname, './plugins/releases')],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: require.resolve('./src/css/custom.css')
      }
    ],
    '@docusaurus/theme-search-algolia'
  ]
};
