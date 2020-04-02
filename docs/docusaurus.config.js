module.exports = {
  title: 'SteamSpeak',
  tagline: 'Steam and TeamSpeak integration, done right!',
  url: 'https://dalexhd.github.io',
  baseUrl: '/SteamSpeak/',
  favicon: 'img/favicon-16x16.png',
  organizationName: 'dalexhd', // Usually your GitHub org/user name.
  projectName: 'SteamSpeak', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'SteamSpeak',
      logo: {
        alt: 'SteamSpeak logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/about/what-is-steamspeak',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/dalexhd/SteamSpeak/issues',
          label: 'Issues',
          position: 'right',
        },
        {
          href: 'https://github.com/dalexhd/steamspeak',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'What is SteamSpeak',
              to: 'docs/about/what-is-steamspeak',
            },
            {
              label: 'Get Started',
              to: 'docs/setup/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/steamspeak',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/EcPkJP',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dalexhd/steamspeak',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SteamSpeak. Built with ❤️ with Docusaurus.`,
    },
    // algolia: {
    //   appId: 'app-id',
    //   apiKey: 'api-key',
    //   indexName: 'index-name',
    //   algoliaOptions: {}, // Optional, if provided by Algolia
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/dalexhd/steamspeak/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
