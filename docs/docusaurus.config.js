const path = require('path');
const metadata = require('./metadata');

module.exports = {
  title: 'SteamSpeak',
  tagline: 'Steam and TeamSpeak integration, done right!',
  url: 'https://steamspeak.netlify.app',
  baseUrl: '/',
  favicon: 'img/favicon-16x16.png',
  organizationName: 'dalexhd', // Usually your GitHub org/user name.
  projectName: 'SteamSpeak', // Usually your repo name.
  customFields: {
    metadata,
    chatUrl: 'https://gitter.im/SteamSpeak',
    discordUrl: 'https://discord.gg/st4nsXw'
  },
  onBrokenLinks: 'log',
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'SteamSpeak',
        src: 'img/logo-light.svg'
      },
      items: [
        { to: 'plugins', label: 'Plugins', position: 'left' },
        { to: 'guides', label: 'Guides', position: 'left' },
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
        { to: 'community', label: 'Community', position: 'right' },
        { to: 'releases', label: 'Download', position: 'right' },
        {
          href: 'https://github.com/dalexhd/SteamSpeak',
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
              href: 'https://github.com/dalexhd/SteamSpeak'
            }
          ]
        }
      ],
      logo: {
        src: '/img/netlify-color-bg.svg',
        alt: 'Deploys by Netlify',
        href: 'https://www.netlify.com'
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
    },
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ If you like SteamSpeak, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/dalexhd/SteamSpeak">GitHub</a>! ⭐️',
      backgroundColor: 'var(--ifm-color-primary)', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: true // Defaults to `true`.
    },
    hotjar: {
      siteId: 1807485,
      version: 6
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/dalexhd/SteamSpeak/edit/master/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'daily',
          priority: 0.5
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Fira+Code|Ubuntu|Roboto|Source+Code+Pro',
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
  plugins: [
    path.resolve(__dirname, './plugins/releases'),
    path.resolve(__dirname, './plugins/guides'),
    path.resolve(__dirname, './plugins/hotjar'),
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['always'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json' // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#191927'
          }
        ]
      }
    ]
  ]
};
